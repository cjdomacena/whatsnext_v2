import { TbClick } from "react-icons/tb";
const HeroText: React.FC<any> = () => {
  return (
    <div className=" w-full">
      <div className="container mx-auto rounded relative text-center leading-loose">
        <h4 className="text-4xl font-bold">WE ARE</h4>
        <div className="relative">
          <h1 className=" uppercase -tracking-wider font-black whitespace-wrap  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent 2xl:text-9xl  xl:text-9xl  lg:text-9xl  md:text-8xl text-6xl ">
            WATCHFLIX
          </h1>
          <TbClick className="w-6 h-6 absolute top-0 right-0" />
        </div>
        <div className="w-full h-52 bg-neutral-900"></div>
      </div>
    </div>
  );
};

export default HeroText;
