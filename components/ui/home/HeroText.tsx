const HeroText: React.FC<any> = () => {
  return (
    <div className="my-8 w-full p-4">
      <div className="container mx-auto  p-4 rounded relative text-center leading-loose">
        <h1 className=" uppercase -tracking-wider font-bold whitespace-wrap  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent 2xl:text-8xl  xl:text-8xl  lg:text-8xl  md:text-8xl text-7xl leading-loose">
          Life is too short for ordinary apps
        </h1>
      </div>
    </div>
  );
};

export default HeroText;
