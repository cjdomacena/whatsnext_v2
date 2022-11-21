import { useScroll } from "framer-motion";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import Navbar from "./Navbar";
type NavbarProps = {};
const NavbarRoot: FC<PropsWithChildren<NavbarProps>> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (ref.current) {
      scrollY.onChange((latest) => {
        if (latest === 0) {
          if (ref.current?.classList.contains("border")) {
            ref.current?.classList.remove(
              "border-b",
              "dark:border-b-neutral-900",
              "shadow-sm"
            );
          }
        } else {
          if (!ref.current?.classList.contains("border")) {
            ref.current?.classList.add(
              "border-b",
              "dark:border-b-neutral-900",
              "shadow-sm"
            );
          }
        }
      });
    }
  }, []);
  return (
    <div
      ref={ref}
      className="w-full h-auto sticky top-0 z-50 left-0 transition-colors border-transparent dark:bg-main bg-white"
    >
      <Navbar />
    </div>
  );
};

export default NavbarRoot;
