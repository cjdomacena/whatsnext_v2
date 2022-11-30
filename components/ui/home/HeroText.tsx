import { TbClick } from "react-icons/tb";
const HeroText: React.FC<any> = () => {
  return (
    <div className=" w-full">
      <h4 className=" font-bold">We are</h4>
      <div className="relative">
        <h1 className=" uppercase -tracking-wider font-black whitespace-wrap  bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent 2xl:text-9xl  xl:text-9xl  lg:text-9xl  md:text-8xl text-6xl ">
          WHATSNEXT
        </h1>
        <TbClick className="w-6 h-6 absolute top-0 right-0" />
      </div>
    </div>
  );
};

export default HeroText;
