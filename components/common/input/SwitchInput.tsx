import * as Switch from "@radix-ui/react-switch";
import { Dispatch, SetStateAction } from "react";

type SwitchInputProps = {
  setter: Dispatch<SetStateAction<boolean>>;
  value: boolean;
  loading: boolean;
};

const SwitchInput = ({ setter, value, loading }: SwitchInputProps) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <label htmlFor="toggle">
        Make Profile Private: <p>Current: {value ? "Yes" : "No"}</p>
      </label>
      <Switch.Root
        id="toggle"
        className=" w-10 h-6 bg-amber-800/50 dark:bg-amber-500/30 relative  rounded-full data-[state='checked']:dark:bg-amber-500 data-[state='checked']:bg-amber-500"
        value={value ? "on" : "off"}
        onCheckedChange={(checked) => setter(checked)}
        disabled={loading}
      >
        <Switch.Thumb className="w-4 h-4 data-[state='checked']:translate-x-4 bg-white  will-change-transform  transition-transform z-20 block ml-1 rounded-full " />
      </Switch.Root>{" "}
    </div>
  );
};

export default SwitchInput;
