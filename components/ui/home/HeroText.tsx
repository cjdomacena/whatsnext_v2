const HeroText: React.FC<any> = () => {
  return (
    <div className=" w-full">
      <div className="container mx-auto rounded relative text-center leading-loose">
        <h1 className=" uppercase -tracking-wider font-black whitespace-wrap  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent 2xl:text-9xl  xl:text-9xl  lg:text-9xl  md:text-8xl text-6xl leading-normal">
          Life is too short for ordinary apps
        </h1>
        <button className="my-12 px-8 py-2 bg-neutral-900 font-bold rounded">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroText;
