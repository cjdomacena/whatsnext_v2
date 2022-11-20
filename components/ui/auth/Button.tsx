import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Button: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => {
  return (
    <button
      className="w-full px-6 py-3 text-sm  transition-colors rounded dark:bg-amber-600 dark:text-amber-50 dark:hover:bg-amber-900 flex items-center justify-center gap-2 dark:disabled:bg-orange-900
    bg-amber-500 ring-amber-300 text-white font-bold
    "
    >
      {children}
      {props.disabled ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : null}
    </button>
  );
};

export const CancelButton: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => {
  return (
    <button
      className="py-3 text-sm w-full text-neutral-400 font-medium bg-neutral-900 rounded hover:bg-neutral-800 transition-colors disabled:bg-neutral-800"
      {...props}
    >
      {children}
    </button>
  );
};
