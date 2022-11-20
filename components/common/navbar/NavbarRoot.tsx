import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

type NavbarProps = {};
const NavbarRoot: FC<PropsWithChildren<NavbarProps>> = ({ children }) => {
  return (
    <header className="w-full h-auto ">
      <Navbar />
    </header>
  );
};

export default NavbarRoot;
