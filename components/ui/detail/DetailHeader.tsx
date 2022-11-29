import { IoBookmarkSharp, IoEyeSharp } from "react-icons/io5";

type DetailHeaderProps = {
  tagline?: string;
  title: string;
};

const DetailHeader: React.FC<DetailHeaderProps> = ({ tagline, title }) => {
  return (
    <div className="p-4 dark:text-white text-neutral-900 relative break-all space-y-4">
      <div className=" max-w-3xl">
        <h2 className=" font-medium dark:text-neutral-400 text-neutral-900">
          {tagline}
        </h2>
        <h1 className=" font-black text-6xl leading-tight tracking-tight">
          {title}
        </h1>
        <div className="flex gap-2 text-xs mt-6 text-white ">
          <button className="px-4 py-4 bg-blue-900 rounded-sm flex items-center gap-1">
            <IoBookmarkSharp />
            Add to Watchlist
          </button>
          <button className="px-4 py-4 bg-blue-900 rounded-sm flex items-center gap-1">
            <IoEyeSharp />
            Seen it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
