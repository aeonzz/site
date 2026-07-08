import { cn } from "@/lib/utils";

type TechStackItem = {
  name: string;
  logo?: string;
  href?: string;
};

type TechStackGridProps = {
  items: TechStackItem[];
  className?: string;
};

function getInitials(name: string) {
  return name
    .split(/[\s./-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TechStackGrid({ items, className }: TechStackGridProps) {
  return (
    <div
      className={cn(
        "mt-4 grid grid-cols-2 border-l border-t border-border",
        className,
      )}
    >
      {items.map((item) => {
        const content = (
          <>
            <span className="flex size-8 items-center justify-center text-foreground">
              {item.logo ? (
                <span
                  aria-hidden="true"
                  className="size-5 bg-current"
                  style={{
                    maskImage: `url(${item.logo})`,
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                  }}
                />
              ) : (
                <span className="text-[0.6875rem] font-semibold leading-none text-muted-foreground">
                  {getInitials(item.name)}
                </span>
              )}
            </span>
            <span className="mt-2 text-center text-[0.6875rem] font-medium leading-none text-muted-foreground">
              {item.name}
            </span>
          </>
        );

        if (item.href) {
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-24 flex-col items-center justify-center border-b border-r border-border bg-card p-3 transition-colors duration-150 ease-out-quad hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
            >
              {content}
            </a>
          );
        }

        return (
          <div
            key={item.name}
            className="flex min-h-24 flex-col items-center justify-center border-b border-r border-border bg-card p-3"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

export { TechStackGrid, type TechStackItem };
