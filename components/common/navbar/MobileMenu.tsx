import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
const MobileMenu = () => {
  const user = useUser();
  return (
    <NavigationMenu.Root className="2xl:hidden xl:hidden lg:hidden block relative">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center gap-1 dark:bg-neutral-800 p-2 rounded">
            Menu
            <AiOutlineMenu className="w-4 h-4" />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute text-base right-0 p-3 dark:bg-neutral-800 min-w-[150px] top-10 z-50 rounded dark:text-neutral-300 bg-neutral-100">
            <ul className="space-y-2">
              <li className="">
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/browse/movie/popular">Movies</Link>
              </li>
              <li>
                <Link href="/browse/tv/popular">TV Shows</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              {!user ? (
                <>
                  <li>
                    <Link href="/auth/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Register</Link>
                  </li>
                </>
              ) : null}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default MobileMenu;
