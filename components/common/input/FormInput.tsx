import {
  Dispatch,
  FC,
  SetStateAction,
  InputHTMLAttributes,
  useState,
} from "react";
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setter: Dispatch<SetStateAction<string>>;
  value: string;
  id: string;
  isPassword?: boolean;
  textLabel: string;
}
const FormInput: FC<FormInputProps> = ({
  setter,
  value,
  isPassword,
  id,
  textLabel,
  ...props
}) => {
  const [showPassword, setShowPassword] =
    useState<typeof props.type>("password");
  props.type = isPassword ? showPassword : props.type;
  return (
    <div className="space-y-1 dark:text-neutral-300 relative">
      <label htmlFor={id}>
        <span className="text-sm ">{textLabel}</span>
      </label>

      <div
        className=" bg-neutral-100 dark:bg-neutral-900/50 ring-1 ring-white/10  rounded w-full dark:placeholder:text-neutral-500 
       dark:focus-within:ring-amber-900/90
       disabled:bg-neutral-800
        text-xs
        flex items-center gap-2
        group
       focus-within:ring-neutral-200
        "
      >
        <input
          className={`appearance-none focus:outline-none  px-3 py-3 w-full rounded !bg-transparent       
          caret-black dark:caret-neutral-500 placeholder:text-neutral-400`}
          onChange={(e) => setter(e.target.value)}
          value={value}
          id={id}
          autoComplete="off"
          {...props}
        />
      </div>
      {isPassword && value.length !== 0 ? (
        <button
          type="button"
          className="text-xs absolute right-2 bottom-2"
          onClick={() =>
            setShowPassword((prev) =>
              prev === "password" ? "text" : "password"
            )
          }
        >
          <p className="dark:bg-neutral-900 h-fit px-2 py-1 rounded ring-1 dark:ring-neutral-800 bg-neutral-50 ring-neutral-200">
            {showPassword === "password" ? "Show" : "Hide"}
          </p>
        </button>
      ) : null}
    </div>
  );
};

export default FormInput;
