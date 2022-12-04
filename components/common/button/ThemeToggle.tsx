import { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode((prev) => !prev);
  };

  return (
    <button
      className="px-2 py-1 rounded mr-2 dark:bg-neutral-800 bg-neutral-100 dark:text-white text-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800/50 transition-colors 2xl:block xl:block lg:block md:block hidden"
      onClick={toggleDarkMode}
    >
      <IoSunnyOutline className="w-[1.15rem] h-[1.15rem]" />
    </button>
  );
};
