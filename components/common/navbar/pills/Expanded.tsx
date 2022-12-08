import { MOVIE_GENRES, TV_GENRES } from "@lib/constants/genres";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NavLink from "./NavLink";

const NavExpanded = () => {
  return (
    <NavigationMenu.Root
      className="relative transition-all text-xs 2xl:block xl:block hidden z-50"
      orientation="horizontal"
    >
      <NavigationMenu.List className="flex items-center gap-2">
        <NavigationMenu.Item className="text-xs uppercase">
          <NavLink href="/browse/discover/">Discover</NavLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="relative">
          <NavigationMenu.Trigger className="uppercase">
            <NavLink href="/browse/movies/">Movies</NavLink>
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
                      <NavLink
                        href={`/browse/movie/${genre.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                      >
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
            <NavLink href="/browse/tv">TV Shows</NavLink>
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
                      <NavLink
                        href={`/browse/tv/${genre.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                      >
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
