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
    <button className="px-1 py-1 rounded mr-2" onClick={toggleDarkMode}>
      <IoSunnyOutline className="w-[1.15rem] h-[1.15rem]" />
    </button>
  );
};
