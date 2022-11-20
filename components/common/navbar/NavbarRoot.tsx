import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

type NavbarProps = {};
const NavbarRoot: FC<PropsWithChildren<NavbarProps>> = ({ children }) => {
  return (
    <header className="w-full h-auto absolute top-0 left-0">
      <Navbar />
    </header>
  );
};

export default NavbarRoot;
