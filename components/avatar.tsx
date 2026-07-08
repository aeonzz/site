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
      className={`aspect-square shrink-0 overflow-hidden outline outline-1 -outline-offset-1 outline-white/10 ${className}`}
      {...props}
    />
  );
}

export { Avatar };
