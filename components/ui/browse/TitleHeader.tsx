type TitleHeaderProps = {
  name: string | null;
  media: string;
};

const TitleHeader = ({ name, media }: TitleHeaderProps) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="text-4xl uppercase font-bold -tracking-widest">
        {name ? name : "Not available"}
      </div>
      <div className="border-r py-4 dark:border-r-neutral-700" />
      <p className="uppercase font-medium dark:text-neutral-300 text-xs">
        {media}
      </p>
    </div>
  );
};

export default TitleHeader;
