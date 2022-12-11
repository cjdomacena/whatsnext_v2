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
      ? "dark:text-white text-black"
      : "dark:hover:text-neutral-400 hover:text-neutral-300  text-neutral-700 dark:text-neutral-300";

  return (
    <Link href={props.href}>
      <p className={className + " transition-colors  rounded w-fit "}>
        {children}
      </p>
    </Link>
  );
};

export default NavLink;
