import { MdxHeading } from "@/components/mdx-heading";
import { TechStackGrid } from "@/components/tech-stack-grid";
import { getMdxHeadingId } from "@/lib/mdx-toc";
import { cn } from "@/lib/utils";
import GithubSlugger from "github-slugger";
import Image from "next/image";
import * as React from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingStyles: Record<HeadingLevel, string> = {
  1: "mt-10 scroll-m-24 text-base font-semibold leading-tight text-foreground first:mt-0",
  2: "mt-10 scroll-m-24 text-sm font-semibold leading-snug text-foreground first:mt-0",
  3: "mt-8 scroll-m-24 text-[0.8125rem] font-semibold leading-snug text-foreground",
  4: "mt-7 scroll-m-24 text-xs font-semibold leading-snug text-foreground",
  5: "mt-6 scroll-m-24 text-xs font-medium leading-snug text-muted-foreground",
  6: "mt-6 scroll-m-24 text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.08em] text-muted-foreground",
};

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }

  return "";
}

function createHeading(
  level: HeadingLevel,
  slugger: GithubSlugger,
): React.ComponentType<React.ComponentPropsWithoutRef<"h2">> {
  function Heading({
    children,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"h2">) {
    const id = getMdxHeadingId(getTextContent(children), slugger);

    return (
      <MdxHeading
        {...props}
        level={level}
        headingId={id}
        className={cn(
          "flex scroll-m-24 items-center gap-1.5 focus-visible:outline-none",
          headingStyles[level],
          className,
        )}
      >
        {children}
      </MdxHeading>
    );
  }

  return Heading;
}

function Paragraph({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "mt-4 text-pretty text-sm leading-6 text-muted-foreground first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

function UnorderedList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn(
        "mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-muted-foreground/60 first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

function OrderedList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn(
        "mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-muted-foreground/70 first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

function ListItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return <li className={cn("pl-1 text-pretty", className)} {...props} />;
}

function MdxLink({
  className,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 ease-out-quad hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    />
  );
}

function MdxImage({
  src,
  alt,
}: React.ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") {
    return null;
  }

  return (
    <span className="relative my-8 block aspect-video overflow-hidden border border-border bg-muted first:mt-0">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(min-width: 768px) 42rem, calc(100vw - 4.5rem)"
        className="object-cover"
      />
    </span>
  );
}

function SectionSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("my-14 flex justify-center", className)}
      {...props}
    >
      <span className="flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="h-px w-4 rounded-full bg-border"
          />
        ))}
      </span>
    </div>
  );
}

function createMdxComponents() {
  const slugger = new GithubSlugger();

  return {
    a: MdxLink,
    h1: createHeading(1, slugger),
    h2: createHeading(2, slugger),
    h3: createHeading(3, slugger),
    h4: createHeading(4, slugger),
    h5: createHeading(5, slugger),
    h6: createHeading(6, slugger),
    hr: SectionSeparator,
    img: MdxImage,
    ol: OrderedList,
    p: Paragraph,
    SectionSeparator,
    TechStackGrid,
    ul: UnorderedList,
    li: ListItem,
  };
}

export { createMdxComponents };