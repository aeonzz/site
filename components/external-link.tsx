import Link from "next/link";
import * as React from "react";

function ExternalLink({
  children,
  className,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      prefetch
      className={`relative inline-block text-sm font-medium leading-none after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-600 after:ease-out-quad hover:after:w-full ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export { ExternalLink };
