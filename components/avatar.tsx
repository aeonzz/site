"use client";

import Image from "next/image";
import * as React from "react";

function Avatar({
  className,
  alt,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <Image
      width={36}
      height={36}
      alt={alt}
      className={`rounded-full overflow-hidden aspect-square shrink-0 ${className}`}
      {...props}
    />
  );
}

export { Avatar };
