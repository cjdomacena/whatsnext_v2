import { Dispatch, SetStateAction } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
type Props = {
  activeRating: number | null;
  setActiveRating: Dispatch<SetStateAction<number | null>>;
};

const RadioButtons = ({ activeRating, setActiveRating }: Props) => {
  const ratings = [0, 1, 2, 3, 4, 5];

  const handleClick = (e: string) => {
    setActiveRating(Number(e));
  };

  return (
    <RadioGroup.Root
      value={activeRating + ""}
      className="flex gap-4 text-xs"
      required={true}
      onValueChange={(e) => handleClick(e)}
    >
      {ratings.map((value) => (
        <RadioItem key={`custom-radio-${value}`} value={value} />
      ))}
    </RadioGroup.Root>
  );
};

const RadioItem = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center gap-1">
      <RadioGroup.Item
        value={String(value)}
        id={`radio-item-${value}`}
        className=" w-4 h-4 rounded-sm dark:bg-neutral-700 bg-neutral-400 shadow-inner"
      >
        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:block after:w-2 after:h-2 after:rounded-sm after:bg-neutral-200" />
      </RadioGroup.Item>
      <label className="Label" htmlFor={`radio-item-${value}`}>
        {value}
      </label>
    </div>
  );
};

export default RadioButtons;
