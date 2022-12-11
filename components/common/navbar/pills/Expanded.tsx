import { MOVIE_GENRES, TV_GENRES } from "@lib/constants/genres";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoCaretDownOutline } from "react-icons/io5";
import NavLink from "./NavLink";

const NavExpanded = () => {
  const router = useRouter();

  return (
    <NavigationMenu.Root
      className="relative transition-all text-xs 2xl:block xl:block lg:block md:block hidden z-50"
      orientation="horizontal"
    >
      <NavigationMenu.List className="flex items-center gap-2">
        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className="uppercase">
            <p
              className={`px-3 py-2 uppercase ${
                router.asPath.includes("/browse/movie")
                  ? "  dark:hover:bg-neutral-700/20 px-3 py-2 rounded dark:bg-white/10 bg-neutral-200"
                  : "dark:text-neutral-300 text-neutral-500  hover:bg-neutral-700 hover:text-neutral-100 px-3 py-2 rounded"
              } transition-colors flex items-center gap-2`}
            >
              Movies
              <IoCaretDownOutline />
            </p>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="NavigationMenuContent 
            absolute top-10 left-0 dark:bg-neutral-900 rounded-sm ring-1  dark:ring-neutral-800 ring-neutral-100 bg-white w-auto px-2 pt-4 pb-4"
          >
            <div className="relative space-y-2">
              <div className="h-full">
                <div className=" whitespace-nowrap dark:text-neutral-300 text-neutral-500 ">
                  <h4 className="text-sm dark:text-neutral-400 px-3">Movies</h4>
                  <ul className="flex p-2 gap-4 px-3 text-sm">
                    <li>
                      <NavLink href={`/browse/movie/popular`}>Popular</NavLink>
                    </li>
                    <li>
                      <NavLink href={`/browse/movie/trending`}>
                        Trending
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href={`/browse/movie/top-rated`}>
                        Top Rated
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="px-3 text-sm dark:text-neutral-400">Genres</h4>
                <ul className="text-sm dark:text-neutral-300  whitespace-nowrap grid grid-flow-col grid-rows-4 gap-4 px-3">
                  {MOVIE_GENRES.map((genre) => (
                    <li key={genre.id}>
                      <NavLink href={`/browse/movie/genre/${genre.id}`}>
                        {genre.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className="uppercase">
            <p
              className={`px-3 py-2 uppercase ${
                router.asPath.includes("/browse/tv")
                  ? "  dark:hover:bg-neutral-700/20 px-3 py-2 rounded dark:bg-white/10 bg-neutral-200"
                  : "dark:text-neutral-300 text-neutral-500  hover:bg-neutral-700 hover:text-neutral-100 px-3 py-2 rounded"
              } transition-colors flex items-center gap-2`}
            >
              TV Shows
              <IoCaretDownOutline />
            </p>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="NavigationMenuContent 
            absolute top-10 left-0 dark:bg-neutral-900 rounded-sm ring-1  dark:ring-neutral-800 ring-neutral-100 bg-white w-auto px-2 pt-4 pb-4"
          >
            <div className="relative space-y-2">
              <div className="h-full">
                <div className=" whitespace-nowrap dark:text-neutral-300 text-neutral-500 ">
                  <h4 className="text-sm dark:text-neutral-400 px-3">
                    TV Shows
                  </h4>
                  <ul className="flex p-2 gap-4 px-3 text-sm">
                    <li>
                      <NavLink href={`/browse/tv/popular`}>Popular</NavLink>
                    </li>
                    <li>
                      <NavLink href={`/browse/tv/trending`}>Trending</NavLink>
                    </li>
                    <li>
                      <NavLink href={`/browse/tv/top-rated`}>Top Rated</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="px-3 text-sm dark:text-neutral-400">Genres</h4>
                <ul className="text-sm dark:text-neutral-300  whitespace-nowrap grid grid-flow-col grid-rows-5 gap-4 px-3">
                  {TV_GENRES.map((genre) => (
                    <li key={genre.id}>
                      <NavLink href={`/browse/tv/genre/${genre.id}`}>
                        {genre.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className="uppercase">
            <p
              className={`px-3 py-2 uppercase ${
                router.asPath.includes("/privacy") ||
                router.asPath.includes("/terms")
                  ? "  dark:hover:bg-neutral-700/20 px-3 py-2 rounded dark:bg-white/10 bg-neutral-200"
                  : "dark:text-neutral-300 text-neutral-500  hover:bg-neutral-700 hover:text-neutral-100 px-3 py-2 rounded"
              } transition-colors flex items-center gap-2`}
            >
              About
              <IoCaretDownOutline />
            </p>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className="NavigationMenuContent 
            absolute top-12 left-0 dark:bg-neutral-900 rounded-sm ring-1  dark:ring-neutral-800 ring-neutral-100 bg-white w-auto   p-2"
          >
            <div className="relative ">
              <ul className="text-base dark:text-neutral-300  whitespace-nowrap gap-2 space-y-2 w-52 p-1 ">
                <li>
                  <NavLink href="/privacy">Privacy</NavLink>
                </li>
                <li>
                  <NavLink href="/terms">Terms</NavLink>
                </li>
              </ul>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className="uppercase">
            <Link href={"/pricing"}>
              <p
                className={`px-3 py-2 uppercase ${
                  router.asPath.includes("/pricing")
                    ? "  dark:hover:bg-neutral-700/20 px-3 py-2 rounded dark:bg-white/10 bg-neutral-200"
                    : "dark:text-neutral-300 text-neutral-500  hover:bg-neutral-700 hover:text-neutral-100 px-3 py-2 rounded"
                } transition-colors flex items-center gap-2`}
              >
                Pricing
              </p>
            </Link>
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavExpanded;
