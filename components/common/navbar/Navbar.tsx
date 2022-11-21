import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FC } from "react";
import { IoBarcodeOutline } from "react-icons/io5";
import { ThemeToggle } from "../button/ThemeToggle";
import UserNav from "./userNav";

type NavbarProps = {};
const Navbar: FC<NavbarProps> = ({}) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  return (
    <nav className="p-4 rounded dark:drop-shadow-[0_1px_35px_rgba(32,32,32,0.4)] drop-shadow">
      <div className=" flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-1 px-1 ">
            <IoBarcodeOutline className="w-6 h-6" />
            <p className="text-sm font-black">WN</p>
          </div>
        </Link>
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
          <div className="border-r border-neutral-700 py-2" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
