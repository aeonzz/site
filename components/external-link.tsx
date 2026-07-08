import Link from "next/link";
import * as React from "react";

function ExternalLink({
  children,
  className = "",
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      prefetch={false}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative z-0 isolate inline-block origin-center rounded-xs px-0.5 text-xs font-medium leading-none text-current transition-[color,transform] duration-150 ease-out-quad before:absolute before:-inset-x-0.75 before:-inset-y-0.75 before:-z-10 before:scale-y-75 before:rounded-[3px] before:bg-foreground/10 before:opacity-0 before:transition-[opacity,transform] before:duration-150 before:ease-out-quad before:content-[''] hover:text-foreground hover:before:scale-y-100 hover:before:opacity-100 focus-visible:text-foreground focus-visible:outline-none focus-visible:before:scale-y-100 focus-visible:before:opacity-100 active:scale-[0.98] motion-reduce:transition-none motion-reduce:before:transition-none ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export { ExternalLink };
