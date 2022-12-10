import { InputHTMLAttributes } from "react";
import { AiOutlineEnter } from "react-icons/ai";

const Search = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <div className="relative dark:bg-white/10 bg-neutral-100 rounded flex focus-within:ring-1 ring-neutral-300 transition-all dark:ring-neutral-600 items-center">
        <input
          className=" rounded w-full p-3 text-sm appearance-none focus:outline-none bg-transparent dark:text-neutral-300 text-neutral-600 flex-grow"
          placeholder="Search for Movies, TV Shows, Person...."
          {...props}
        />
        <div className=" flex items-center gap-1">
          <button
            type="submit"
            className="text-xs px-2 py-1 dark:bg-neutral-800 my-2 rounded font-medium dark:text-neutral-300 flex items-center gap-1 whitespace-nowrap bg-neutral-200 dark:hover:bg-neutral-700 hover:bg-neutral-300 mr-4"
            disabled={props.disabled}
          >
            <AiOutlineEnter />
            Enter
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
