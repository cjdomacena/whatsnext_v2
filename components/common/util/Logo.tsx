import { TbClick } from "react-icons/tb";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 px-1 ">
      <TbClick className="w-5 h-5 mb-1 " />
      <p className=" font-black bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
        WHATSNEXT
      </p>
    </div>
  );
};

export default Logo;
