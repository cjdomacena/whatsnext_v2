import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";
import * as Popover from "@radix-ui/react-popover";
import { HTMLAttributes, PropsWithChildren } from "react";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG } from "@lib/constants/config";

const UserNav = ({ user }: { user: User }) => {
  const supabase = useSupabaseClient();
  const subscriptionInfo: any = async (userId: string) => {
    const data = await supabase
      .from("profiles")
      .select("is_subscribed, stripe_id")
      .eq("id", userId)
      .single();
    return data;
  };

  const { data, status, error } = useQuery(
    ["subscription_info", user.id],
    () => subscriptionInfo(user.id),
    {
      ...QUERY_CONFIG,
    }
  );
  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (status === "success") {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <div
            className="flex gap-2 dark:bg-neutral-800 dark:hover:bg-neutral-800 p-2 rounded
          bg-neutral-50 hover:bg-neutral-200
          "
          >
            <h4>{user.user_metadata.full_name}</h4>

            <div className="border-r dark:border-r-neutral-700" />
            <span className="text-xs capitalize  text-green-500 rounded ">
              {data.data && data.data.is_subscribed ? "Pro" : "Free"}
            </span>
          </div>
        </Popover.Trigger>
        {/* <Popover.Anchor className="" /> */}
        <Popover.Portal className="relative">
          <Popover.Content className="absolute text-sm  ring-1 ring-amber-900/10  space-y-1 py-1 text-neutral-300 -right-12 top-2 w-52 rounded dark:bg-neutral-800 bg-white">
            <ul>
              <MenuItemHeader>
                <div className="flex gap-1 items-center">
                  <IoPersonOutline />
                  My Stuff
                </div>
              </MenuItemHeader>
              <MenuItemButton text="Profile" />
              <MenuItemButton text="Watchlist" />
              <Separator />
              <MenuItemHeader>
                <div className="flex gap-1 items-center">
                  <IoSettingsOutline />
                  Settings
                </div>
              </MenuItemHeader>
              <MenuItemButton text="Manage Subscription" />
              <MenuItemButton text="Account Settings" />
              <MenuItemButton
                text="Logout"
                onClick={() => {
                  supabase.auth.signOut();
                }}
                buttonType="error"
              />
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  } else {
    return (
      <div className="px-12 py-3 dark:bg-neutral-800 rounded-sm animate-pulse"></div>
    );
  }
};

const MenuItemButton: React.FC<
  {
    text: string;
    buttonType?: "normal" | "error";
  } & HTMLAttributes<HTMLButtonElement>
> = ({ text, buttonType = "normal", ...props }) => {
  return (
    <li>
      <button
        className={`text-main   rounded px-3 py-2 w-full text-left ${
          buttonType === "error"
            ? "dark:text-red-500 dark:hover:bg-red-900/50 text-red-900 hover:bg-red-600/60 font-bold"
            : "dark:text-inherit hover:bg-neutral-100 dark:hover:bg-neutral-700"
        }`}
        {...props}
      >
        {text}
      </button>
    </li>
  );
};

const MenuItemHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <li className="text-xs text-neutral-500 flex gap-1 px-3 py-2 items-center font-bold justify-between">
      {children}
    </li>
  );
};

const Separator = () => {
  return <hr className="border-t border-neutral-700/50  mx-3 my-1" />;
};

export default UserNav;
