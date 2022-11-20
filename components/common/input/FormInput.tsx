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
    <div className="space-y-1 text-neutral-300 relative">
      <label htmlFor={id}>
        <span className="text-sm text-neutral-400">{textLabel}</span>
      </label>

      <div
        className=" bg-neutral-900/5 ring-1 ring-white/10  rounded w-full placeholder:text-neutral-500 
       focus-within:ring-amber-900/50
       disabled:bg-neutral-800
        autofill:bg-neutral-900
        text-xs
        flex items-center gap-2
        group

        "
      >
        <input
          className={`appearance-none focus:outline-none  px-3 py-3 w-full rounded !bg-transparent `}
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
          <p className="bg-neutral-900 h-fit px-2 py-1 rounded ring-1 ring-neutral-800">
            {showPassword === "password" ? "Show" : "Hide"}
          </p>
        </button>
      ) : null}
    </div>
  );
};

export default FormInput;
