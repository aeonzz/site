import Link from "next/link";
import * as React from "react";

function ProjectCard({
  children,
  type,
  ...props
}: React.ComponentProps<typeof Link> & { type: string }) {
  return (
    <Link
      prefetch
      className="w-[calc(100%_+_24px)] rounded-xl p-3 text-sm text-foreground hover:bg-muted transition-all duration-600 ease-out-quad font-medium relative overflow-hidden group -mx-3"
      target="_blank"
      {...props}
    >
      <div className="relative z-10 flex items-center justify-between">
        {children}
        <span className="block text-xs text-muted-foreground">{type}</span>
      </div>
    </Link>
  );
}

export { ProjectCard };
