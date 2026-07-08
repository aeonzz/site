"use client";

import { Scrollspy } from "@/components/scrollspy";
import { cn } from "@/lib/utils";
import * as React from "react";

type TableOfContentsItem = {
  id: string;
  title: string;
  depth?: 1 | 2 | 3;
};

type TableOfContentsProps = React.ComponentPropsWithoutRef<"nav"> & {
  items: TableOfContentsItem[];
  targetRef?: React.RefObject<HTMLElement | HTMLDivElement | Document | null>;
  offset?: number;
  history?: boolean;
};

function TableOfContents({
  items,
  targetRef,
  offset = 96,
  history = true,
  className,
  ...props
}: TableOfContentsProps) {
  const documentRef = React.useRef<Document | null>(null);

  React.useEffect(() => {
    documentRef.current = document;
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn("text-xs", className)}
      {...props}
    >
      <p className="mb-3 flex items-center gap-1.5 font-medium leading-none text-[color-mix(in_oklch,var(--foreground)_60%,var(--muted-foreground))]">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5 text-[color-mix(in_oklch,var(--foreground)_60%,var(--muted-foreground))]"
        >
          <path d="M8 6h13" />
          <path d="M8 12h13" />
          <path d="M8 18h13" />
          <path d="M3 6h.01" />
          <path d="M3 12h.01" />
          <path d="M3 18h.01" />
        </svg>
        Contents
      </p>
      <Scrollspy
        targetRef={targetRef ?? documentRef}
        offset={offset}
        history={history}
        className="flex flex-col gap-2"
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={history ? `#${item.id}` : undefined}
            data-scrollspy-anchor={item.id}
            role={history ? undefined : "button"}
            tabIndex={history ? undefined : 0}
            className={cn(
              "block cursor-pointer text-muted-foreground transition-colors duration-150 ease-out-quad hover:text-foreground focus-visible:text-foreground focus-visible:outline-none data-[active=true]:text-foreground",
              item.depth === 2 && "pl-3",
              item.depth === 3 && "pl-6",
            )}
          >
            {item.title}
          </a>
        ))}
      </Scrollspy>
    </nav>
  );
}

export { TableOfContents, type TableOfContentsItem };
