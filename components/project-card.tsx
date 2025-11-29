import Link from "next/link";
import Image from "next/image";
import * as React from "react";

function ProjectCard({
  children,
  type,
  image,
  ...props
}: React.ComponentProps<typeof Link> & { type: string; image: string }) {
  return (
    <Link
      prefetch
      className="w-full p-3 text-sm bg-card border border-border text-card-foreground hover:bg-muted transition-all duration-600 ease-out-quad font-medium relative overflow-hidden group"
      target="_blank"
      {...props}
    >
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-15 aspect-video bg-muted border border-border overflow-hidden">
            <Image src={image} alt={type} fill className="object-cover" />
          </div>
          {children}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 text-muted-foreground/50 group-hover:text-foreground transition-colors duration-300"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </Link>
  );
}

export { ProjectCard };
