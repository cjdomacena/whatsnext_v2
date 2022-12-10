import Image from "next/image";
import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";
import { ThemeToggle } from "../button/ThemeToggle";
import { Logo } from "../util";

const items = [
  {
    title: "Website",
    links: [
      {
        text: "Home",
        href: "/",
      },
      {
        text: "Login",
        href: "/auth/login",
      },
      {
        text: "Register",
        href: "/auth/register",
      },
    ],
  },
  {
    title: "Quick Links",
    links: [
      {
        text: "Trending Movies",
        href: "/browse/movie/trending",
      },
      {
        text: "Trending TV",
        href: "/browse/tv/trending",
      },
      {
        text: "Popular Movies",
        href: "/browse/movie/popular",
      },
      {
        text: "Popular TV",
        href: "/browse/tv/popular",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        text: "Privacy",
        href: "/privacy",
      },
      {
        text: "Terms",
        href: "/terms",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full  dark:bg-neutral-800 bg-neutral-100 border-t dark:border-t-neutral-700 py-8 text-neutral-600">
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
          {items.map((item, index) => (
            <FooterColumn
              links={item.links}
              title={item.title}
              key={item.title + "-" + index}
            />
          ))}
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
                    className="mt-2 w-auto h-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-4 text-sm dark:text-neutral-400 font-medium flex justify-between">
        <p className="px-4">&copy; Whatsnext — 2022.</p>
        <ThemeToggle />
      </div>
    </footer>
  );
};

const FooterColumn = ({
  links,
  title,
}: {
  links: { text: string; href: string }[];
  title: string;
}) => {
  return (
    <div className="flex justify-center">
      <div>
        <h4 className="font-medium dark:text-neutral-400">{title}</h4>
        <ul className="text-sm space-y-2 mt-2 dark:text-neutral-500 text-neutral-500 font-medium ">
          {links.map((link, index) => (
            <li
              key={`${link.text}-${index}`}
              className="dark:hover:text-neutral-300 hover:text-neutral-900 "
            >
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
