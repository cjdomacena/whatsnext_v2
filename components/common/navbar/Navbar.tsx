import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FC } from "react";
import { ThemeToggle } from "../button/ThemeToggle";
import { Logo } from "../util";
import NavExpanded from "./pills/Expanded";
import UserNav from "./userNav";

const Navbar: FC = () => {
  const user = useUser();
  return (
    <nav className="p-4 rounded ">
      <div className=" flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link href="/">
            <Logo />
          </Link>
          <NavExpanded />
        </div>
        <div className="flex gap-4 text-xs items-center">
          {user ? (
            <UserNav user={user} />
          ) : (
            <>
              <Link href={"/auth/login"} legacyBehavior role="button">
                <a className="px-6  dark:text-amber-500 font-semibold  py-2 rounded dark:hover:bg-amber-900/50 transition-opacity hover:bg-neutral-200">
                  Log In
                </a>
              </Link>
              <Link href={"/auth/register"} legacyBehavior role="button">
                <a className="px-6 bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-900/20 dark:hover:bg-amber-900/50 transition-opacity dark:text-amber-500 font-semibold py-2 rounded">
                  Register
                </a>
              </Link>
            </>
          )}
          <div className="border-r dark:border-neutral-700 border-neutral-300 py-2 2xl:block xl:block lg:block md:block hidden" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
