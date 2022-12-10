import * as Select from "@radix-ui/react-select";
import { Dispatch, SetStateAction } from "react";
import { AiFillCaretDown } from "react-icons/ai";
const SelectRadix = ({
  query,
  setter,
  value,
  isLoading,
  setEnabled,
}: {
  query: string;
  value: string;
  setter: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Select.Root
      onValueChange={(val) => {
        setter(val);
        if (query.length > 2) {
          setEnabled(true);
        }
      }}
      value={value}
      disabled={isLoading}
    >
      <Select.Trigger
        className="text-sm flex items-center gap-1 dark:bg-neutral-800 p-1 rounded whitespace-nowrap px-2 min-w-[90px] justify-between bg-neutral-200 font-medium"
        aria-label="Filter"
      >
        <Select.Value placeholder="All" />
        <Select.Icon className="SelectIcon">
          <AiFillCaretDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className="w-auto h-auto dark:bg-neutral-800 bg-neutral-100 text-sm rounded space-y-2 dark:text-neutral-50  p-1 text-neutral-800 font-medium z-20">
        <Select.Item
          value="multi"
          className="cursor-pointer dark:hover:bg-neutral-600 px-2 py-1 rounded dark:data-[state='checked']:bg-neutral-700 data-[state='checked']:bg-neutral-300"
        >
          <Select.ItemText>All</Select.ItemText>
        </Select.Item>
        <Select.Item
          value="movie"
          className="cursor-pointer dark:hover:bg-neutral-600 px-2 py-1 rounded dark:data-[state='checked']:bg-neutral-700 data-[state='checked']:bg-neutral-300"
        >
          <Select.ItemText>Movies</Select.ItemText>
        </Select.Item>
        <Select.Item
          value="tv"
          className="cursor-pointer dark:hover:bg-neutral-600 px-2 py-1 rounded dark:data-[state='checked']:bg-neutral-700 data-[state='checked']:bg-neutral-300"
        >
          <Select.ItemText>TV Show</Select.ItemText>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectRadix;
