const HeroText: React.FC<any> = () => {
  return (
    <div className=" w-full">
      <div className="relative">
        <h1 className=" uppercase -tracking-wider font-black whitespace-wrap  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent 2xl:text-9xl  xl:text-9xl  lg:text-9xl  md:text-8xl text-6xl  selection:bg-neutral-800 dark:selection:bg-white">
          Be your own critic.
        </h1>
      </div>
    </div>
  );
};

export default HeroText;
