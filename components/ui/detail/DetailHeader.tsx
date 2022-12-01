type DetailHeaderProps = {
  tagline?: string;
  title: string;
};

const DetailHeader: React.FC<DetailHeaderProps> = ({ tagline, title }) => {
  return (
    <div className=" dark:text-white text-neutral-900 relative break-all space-y-4">
      <div className=" max-w-3xl">
        <h2 className=" font-medium dark:text-neutral-400 text-neutral-900">
          {tagline}
        </h2>
        <h1 className=" font-black text-6xl leading-tight tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default DetailHeader;
