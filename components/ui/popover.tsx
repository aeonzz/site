"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverContentProps = Omit<PopoverPrimitive.Popup.Props, "className"> &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    className?: string;
  };

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) scale-100 flex-col gap-2.5 bg-background p-2.5 text-sm text-pretty text-foreground opacity-100 shadow-[0_0_0_1px_color-mix(in_oklch,var(--foreground)_10%,transparent),0_18px_48px_color-mix(in_oklch,var(--background)_70%,black)] outline-none transition-[opacity,transform] duration-[var(--dropdown-open-dur)] ease-[var(--dropdown-ease)] data-[starting-style]:scale-[var(--dropdown-pre-scale)] data-[starting-style]:opacity-0 data-[ending-style]:scale-[var(--dropdown-closing-scale)] data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--dropdown-close-dur)] motion-reduce:transition-none",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  );
}

function PopoverTitle({
  className,
  ...props
}: Omit<PopoverPrimitive.Title.Props, "className"> & { className?: string }) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("text-balance font-medium", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: Omit<PopoverPrimitive.Description.Props, "className"> & {
  className?: string;
}) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
