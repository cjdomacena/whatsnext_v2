import { BASE_URL } from "@lib/constants/config";
import { useRef } from "react";
import toast from "react-hot-toast";
import { IoCopyOutline } from "react-icons/io5";

const ClipboardButton = ({ username }: { username: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${BASE_URL}/user/${username}/watchlist`);
    toast.success("Succefully copied to clipboard");
  };

  return (
    <button
      className=" z-20 dark:bg-neutral-800 bg-neutral-200 p-1 rounded flex gap-1 items-center text-xs h-fit  hover:bg-neutral-300 dark:hover:bg-neutral-800"
      onClick={handleCopy}
    >
      <IoCopyOutline />
      Share URL
    </button>
  );
};

export default ClipboardButton;
