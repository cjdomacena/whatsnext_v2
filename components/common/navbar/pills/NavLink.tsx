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
      ? ""
      : "dark:hover:bg-neutral-600 hover:bg-neutral-300  bg-neutral-400 dark:bg-neutral-700";

  return (
    <Link href={props.href}>
      <p className={className + " transition-colors  p-1 rounded w-fit "}>
        {children}
      </p>
    </Link>
  );
};

export default NavLink;
