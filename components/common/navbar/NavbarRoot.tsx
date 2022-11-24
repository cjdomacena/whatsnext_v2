import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";
type NavbarProps = {};
const NavbarRoot: FC<PropsWithChildren<NavbarProps>> = ({ children }) => {
  // const ref = useRef<HTMLDivElement | null>(null);
  // const { scrollY } = useScroll();

  // useEffect(() => {
  //   if (ref.current) {
  //     scrollY.onChange((latest) => {
  //       if (latest === 0) {
  //         ref.current?.classList.remove(
  //           "border-b",
  //           "dark:border-b-neutral-900",
  //           "shadow-sm"
  //         );
  //       } else {
  //         if (!ref.current?.classList.contains("border")) {
  //           ref.current?.classList.add(
  //             "border-b",
  //             "dark:border-b-neutral-900",
  //             "shadow-sm"
  //           );
  //         }
  //       }
  //     });
  //   }
  // }, []);
  return (
    <div className="w-full h-auto transition-colors bg-transparent">
      <Navbar />
    </div>
  );
};

export default NavbarRoot;
