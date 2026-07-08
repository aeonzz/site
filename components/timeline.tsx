import * as React from "react";

type TimelineRootProps = React.ComponentPropsWithoutRef<"div">;

type TimelineItemProps = React.ComponentPropsWithoutRef<"article"> & {
  title: string;
  meta?: React.ReactNode;
  accent?: TimelineAccent;
};

type TimelineAccent = "blue" | "emerald" | "amber" | "rose" | "violet";

const accentClasses = {
  blue: "border-sky-400/70 bg-sky-400/80 shadow-[0_0_16px_color-mix(in_oklch,var(--color-sky-400)_35%,transparent)]",
  emerald:
    "border-emerald-400/70 bg-emerald-400/80 shadow-[0_0_16px_color-mix(in_oklch,var(--color-emerald-400)_35%,transparent)]",
  amber:
    "border-amber-300/70 bg-amber-300/80 shadow-[0_0_16px_color-mix(in_oklch,var(--color-amber-300)_35%,transparent)]",
  rose: "border-rose-400/70 bg-rose-400/80 shadow-[0_0_16px_color-mix(in_oklch,var(--color-rose-400)_35%,transparent)]",
  violet:
    "border-violet-400/70 bg-violet-400/80 shadow-[0_0_16px_color-mix(in_oklch,var(--color-violet-400)_35%,transparent)]",
};

const accentOrder = Object.keys(accentClasses) as TimelineAccent[];

function TimelineRoot({
  children,
  className = "",
  ...props
}: TimelineRootProps) {
  const items = React.Children.toArray(children);

  return (
    <div
      className={`relative flex flex-col gap-5 before:absolute before:top-1.5 before:bottom-1.5 before:left-1.5 before:w-px before:bg-border/70 ${className}`}
      {...props}
    >
      {items.map((child, index) => {
        if (!React.isValidElement<TimelineItemProps>(child)) {
          return child;
        }

        if (child.type !== TimelineItem) {
          return child;
        }

        return React.cloneElement(child, {
          accent: child.props.accent ?? accentOrder[index % accentOrder.length],
        });
      })}
    </div>
  );
}

function TimelineItem({
  title,
  meta,
  accent = "blue",
  children,
  className = "",
  ...props
}: TimelineItemProps) {
  return (
    <article className={`relative pl-7 ${className}`} {...props}>
      <span
        className={`absolute left-0 top-1.5 size-3 rounded-full border ring-4 ring-background ${accentClasses[accent]}`}
      />
      <div className="space-y-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-sm font-semibold leading-none text-foreground">
            {title}
          </h3>
          {meta ? (
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {meta}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </article>
  );
}

const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
});

export { Timeline };
