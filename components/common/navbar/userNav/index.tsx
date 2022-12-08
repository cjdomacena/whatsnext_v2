import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";
import * as Popover from "@radix-ui/react-popover";
import { HTMLAttributes, PropsWithChildren } from "react";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { subscriptionInfo } from "@lib/api/getSubscriptionInfo";
import Avatar from "../../avatar";

const UserNav = ({ user }: { user: User }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const { data, status, error } = useQuery(
    ["subscription_info", user.id],
    () => subscriptionInfo(user.id, supabase),
    {
      refetchOnWindowFocus: true,
      cacheTime: 50000 * 100,
      staleTime: 5000 * 100,
    }
  );
  if (error) {
    return <div>Something went wrong...</div>;
  }

  if (status === "success") {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <div className="flex items-center gap-2 text-left">
            <div className="text-right dark:bg-neutral-800 px-2 py-1 rounded  items-center space-x-2 bg-neutral-100 2xl:flex xl:flex lg:flex md:flex hidden">
              <h4 className="text-xs">{user.user_metadata.full_name}</h4>
              <div className="border-r dark:border-neutral-700 border-neutral-300 py-2 " />
              <span className="text-xs capitalize  text-green-500 py-1 rounded 2xl:block xl:block lg:block md:block hidden">
                {data && data.is_subscribed ? "Pro" : "Member"}
              </span>
            </div>
            <div className="2xl:hidden xl:hidden lg:hidden md:hidden block">
              <Avatar name={user.user_metadata.full_name ?? ""} />
            </div>
          </div>
        </Popover.Trigger>
        {/* <Popover.Anchor className="" /> */}
        <Popover.Portal className="relative">
          <Popover.Content className="absolute text-sm  ring-1 ring-amber-900/10  space-y-1 py-1 text-neutral-300  top-2 w-52 rounded dark:bg-neutral-800 bg-white 2xl:-right-20 xl:-right-20 lg:-right-20 md:-right-20 -right-4">
            <ul>
              <MenuItemHeader>
                <div className="flex gap-1 items-center">
                  <IoPersonOutline />
                  My Stuff
                </div>
              </MenuItemHeader>
              <MenuItemButton
                text="Profile"
                onClick={() =>
                  router.push(`/user/${user.user_metadata.username}/profile`)
                }
              />
              <MenuItemButton
                text="Watchlist"
                onClick={() =>
                  router.push(`/user/${user.user_metadata.username}/watchlist`)
                }
              />
              <Separator />
              <MenuItemHeader>
                <div className="flex gap-1 items-center">
                  <IoSettingsOutline />
                  Settings
                </div>
              </MenuItemHeader>
              <MenuItemButton
                text="Manage Subscription"
                onClick={() => router.push("/settings/manage-subscription")}
              />
              {/* <MenuItemButton text="Account Settings" /> */}
              <MenuItemButton
                text="Logout"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.reload();
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
