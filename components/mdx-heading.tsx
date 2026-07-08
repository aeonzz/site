"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type MdxHeadingProps = React.ComponentPropsWithoutRef<"h2"> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  headingId: string;
};

function MdxHeading({
  level,
  headingId,
  children,
  className,
  ...props
}: MdxHeadingProps) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${headingId}`;

    await navigator.clipboard.writeText(url);
    setCopied(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setCopied(false), 1200);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    void copyLink();
  }

  return React.createElement(
    `h${level}`,
    {
      ...props,
      id: headingId,
      role: "button",
      tabIndex: 0,
      title: copied ? "Copied" : "Copy link",
      "aria-label": copied ? "Copied heading link" : "Copy heading link",
      onClick: copyLink,
      onKeyDown: handleKeyDown,
      className: cn(
        "group/heading cursor-pointer rounded-[3px] outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      ),
    },
    <React.Fragment>
      <span>{children}</span>
      <span
        aria-hidden="true"
        data-state={copied ? "b" : "a"}
        className="t-icon-swap inline-grid size-4 shrink-0 translate-y-px place-items-center rounded-[3px] text-muted-foreground opacity-0 transition-[opacity,color,background-color] duration-150 ease-out-quad group-hover/heading:opacity-100"
      >
        <span className="t-icon flex items-center justify-center" data-icon="a">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </span>
        <span className="t-icon flex items-center justify-center" data-icon="b">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      </span>
    </React.Fragment>,
  );
}

export { MdxHeading };