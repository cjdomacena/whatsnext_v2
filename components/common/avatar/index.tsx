import { IMAGE_URL } from "@lib/constants/config";
import * as RadixAvatar from "@radix-ui/react-avatar";

type AvatarProps = {
  src?: string;
  name: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, name }) => {
  const formattedName =
    name
      .trim()
      .split(" ")
      .reduce((acc, initial) => acc + initial[0], "") ?? "";
  return (
    <RadixAvatar.Root className=" flex items-center justify-center rounded-full w-fit">
      <RadixAvatar.Image
        src={src ? `${IMAGE_URL}/w185/${src}` : undefined}
        alt={name}
        className="w-12 h-12 rounded-full object-cover object-center"
      />
      <RadixAvatar.Fallback className="uppercase dark:bg-neutral-800 bg-neutral-200 w-12 h-12 grid place-items-center rounded-full font-bold text-xs">
        <p>{formattedName.slice(0, 2)}</p>
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};
export default Avatar;
