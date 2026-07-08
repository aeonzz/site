import * as React from "react";
import { vi } from "vitest";

type MockImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src"
> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
};

vi.mock("next/image", () => ({
  default: (mockProps: MockImageProps) => {
    const { src, alt, fill, priority, ...imageProps } = mockProps;

    void fill;
    void priority;

    return React.createElement("img", {
      src: typeof src === "string" ? src : src.src,
      alt,
      ...imageProps,
    });
  },
}));

type MockLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string | { toString(): string };
  children: React.ReactNode;
  prefetch?: boolean;
};

vi.mock("next/link", () => ({
  default: (mockProps: MockLinkProps) => {
    const { href, children, prefetch, ...linkProps } = mockProps;

    void prefetch;

    return React.createElement(
      "a",
      {
        href: href.toString(),
        ...linkProps,
      },
      children,
    );
  },
}));