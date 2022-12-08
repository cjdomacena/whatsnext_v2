import Link from "next/link";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

type Props = {
  href: string;
};

const NavLink: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const { isReady, asPath } = useRouter();
  const className: string =
    isReady && asPath === props.href
      ? "hover:text-neutral-700  dark:hover:bg-neutral-900/20 px-3 py-2 rounded dark:bg-white/10 bg-neutral-200"
      : "dark:text-neutral-300 text-neutral-500  hover:bg-neutral-700 hover:text-neutral-100 px-3 py-2 rounded";

  return (
    <Link href={props.href}>
      <p className={className + " transition-colors"}>{children}</p>
    </Link>
  );
};

export default NavLink;
