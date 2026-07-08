"use client";

import { TableOfContents, type TableOfContentsItem } from "@/components/table-of-contents";
import * as React from "react";

type ProjectPageShellProps = {
  children: React.ReactNode;
  toc: TableOfContentsItem[];
};

function ProjectPageShell({ children, toc }: ProjectPageShellProps) {
  const scrollRef = React.useRef<HTMLElement | null>(null);

  return (
    <main
      ref={scrollRef}
      className="scroll-fade h-screen overflow-x-clip overflow-y-auto bg-background text-foreground"
    >
      {children}
      <aside className="fixed left-[calc(50%+23.75rem)] top-53 hidden w-56 xl:block">
        <TableOfContents items={toc} targetRef={scrollRef} history={false} />
      </aside>
    </main>
  );
}

export { ProjectPageShell };