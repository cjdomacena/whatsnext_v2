import { FC, PropsWithChildren } from "react";

type NavbarProps = {};
const NavbarRoot: FC<PropsWithChildren<NavbarProps>> = ({ children }) => {
  return <header className="w-full h-auto">{children}</header>;
};

export default NavbarRoot;
