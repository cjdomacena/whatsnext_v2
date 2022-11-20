import { ButtonHTMLAttributes } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BackButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button
      className="text-xs px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded flex items-center gap-2"
      type="button"
      {...props}
    >
      <AiOutlineArrowLeft />
      Back
    </button>
  );
};

export default BackButton;
