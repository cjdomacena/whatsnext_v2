const HeroText: React.FC<any> = () => {
  return (
    <div className=" w-full">
      <div className="container mx-auto rounded relative text-center leading-loose">
        <h1 className=" uppercase -tracking-wider font-black whitespace-wrap  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent 2xl:text-9xl  xl:text-9xl  lg:text-9xl  md:text-8xl text-6xl ">
          Life is too short for ordinary apps
        </h1>
      </div>
    </div>
  );
};

export default HeroText;
