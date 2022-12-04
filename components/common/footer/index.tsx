import Image from "next/image";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";
import { Logo } from "../util";

const Footer = () => {
  return (
    <footer className="w-full  dark:bg-neutral-800 bg-neutral-100 border-t dark:border-t-neutral-700 py-8">
      <div className="container mx-auto py-8 flex flex-wrap items-start gap-8 border-b dark:border-b-neutral-700 justify-center">
        <div className="text-2xl space-y-2  w-[300px]">
          <div>
            <Logo />
            <div className="px-7 text-xs">
              <p>Be your own critic.</p>
            </div>
          </div>
          <div className="px-7">
            <ul className="flex gap-2 items-center text-lg ">
              <li>
                <IoLogoFacebook />
              </li>
              <li>
                <IoLogoTwitter />
              </li>
              <li>
                <IoLogoInstagram />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-grow 2xl:w-auto xl:w-auto lg:w-auto md:w-auto w-full grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex justify-center">
            <div>
              <h4 className="font-bold">Website</h4>
              <ul className="text-sm space-y-2 mt-2 dark:text-neutral-400 font-medium">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/auth/login">Login</Link>
                </li>
                <li>
                  <Link href="/auth/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <div>
              <h4 className="font-bold">Quick Links</h4>
              <ul className="text-sm space-y-2 mt-2 dark:text-neutral-400 font-medium">
                <li>Browse</li>
                <li>Movies</li>
                <li>TV</li>
                <li>People</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <h4 className="font-bold">Company</h4>
              <ul className="text-sm space-y-2 mt-2 dark:text-neutral-400 font-medium">
                <li>Privacy</li>
                <li>Terms</li>
                <li>About Us</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <h4 className="text-sm dark:text-neutral-400 font-medium">
                Data provided by
              </h4>
              <div>
                <a href="https://www.themoviedb.org/">
                  <Image
                    src="/assets/tmdb-logo.svg"
                    alt="TMDB Logo"
                    width="80"
                    height="80"
                    className="mt-2"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-4 text-sm dark:text-neutral-400 font-medium">
        <p className="px-4">&copy; Whatsnext — 2022.</p>
      </div>
    </footer>
  );
};

export default Footer;
