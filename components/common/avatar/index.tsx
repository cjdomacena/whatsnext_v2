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
    <RadixAvatar.Root className=" flex items-center justify-center rounded-full">
      <RadixAvatar.Image src={src} alt={name} />
      <RadixAvatar.Fallback
        className="uppercase dark:bg-neutral-800 bg-neutral-200 p-4 rounded-full font-bold text-xs"
        delayMs={600}
      >
        <p> {formattedName}</p>
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};
export default Avatar;
