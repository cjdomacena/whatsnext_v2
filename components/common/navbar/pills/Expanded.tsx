import { MOVIE_GENRES, TV_GENRES } from "@lib/constants/genres";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/router";
import { IoCaretDownOutline } from "react-icons/io5";
import NavLink from "./NavLink";

const NavExpanded = () => {
  const router = useRouter();

  return (
    <NavigationMenu.Root
      className="relative transition-all text-xs 2xl:block xl:block hidden z-50"
      orientation="horizontal"
    >
      <NavigationMenu.List className="flex items-center gap-2">
        {/* <NavigationMenu.Item className="text-xs uppercase">
          <NavLink href="/browse/discover/">Discover</NavLink>
        </NavigationMenu.Item> */}
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
          absolute top-12 left-0 dark:bg-neutral-800 bg-neutral-100 w-auto rounded flex gap-1 items-center h-auto p-3"
          >
            <div className="relative flex gap-8 items-center">
              <div className="h-full">
                <div className=" whitespace-nowrap dark:text-neutral-300 text-neutral-500 ">
                  <h4 className="text-sm dark:text-neutral-400 px-3">Movies</h4>
                  <ul className="mt-3">
                    <li>
                      <NavLink href={`/browse/movie/popular`}>Popular</NavLink>
                    </li>
                    <li>
                      <NavLink href={`/browse/movie/upcoming`}>
                        Upcoming
                      </NavLink>
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
              <div className="px-4 border-l dark:border-l-neutral-700/40">
                <h4 className="p-3 text-sm dark:text-neutral-400">Genres</h4>
                <ul className="text-xs dark:text-neutral-300  whitespace-nowrap grid grid-flow-col grid-rows-4 ">
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
            <div className="absolute -top-2 left-2 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] dark:border-b-neutral-800 border-b-neutral-100  z-10"></div>
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
          absolute top-12 left-0 dark:bg-neutral-800 bg-neutral-100 w-auto h-auto rounded flex gap-4 p-3"
          >
            <div className=" relative flex gap-8 items-center">
              <div className="h-full ">
                <div className=" whitespace-nowrap dark:text-neutral-300 text-neutral-500 ">
                  <h4 className="text-sm dark:text-neutral-400 p-3">
                    TV Shows
                  </h4>
                  <ul>
                    <li>
                      <NavLink href={`/browse/tv/popular`}>Popular</NavLink>
                    </li>
                    <li>
                      <NavLink href={`/browse/tv/upcoming`}>Upcoming</NavLink>
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
              <div className="px-4 border-l dark:border-l-neutral-700/40">
                <h4 className="p-3 text-sm dark:text-neutral-400">Genres</h4>
                <ul className="text-xs dark:text-neutral-300  whitespace-nowrap grid grid-flow-col grid-rows-4 ">
                  {TV_GENRES.map((genre) => (
                    <li key={genre.id}>
                      <NavLink href={`/browse/tv/${genre.id}`}>
                        {genre.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="absolute -top-2 left-2 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] dark:border-b-neutral-800 border-b-neutral-100  z-10"></div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavExpanded;
