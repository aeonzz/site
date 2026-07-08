import { render, screen } from "@testing-library/react";
import { allProjects } from "content-collections";
import { describe, expect, it } from "vitest";
import { ProjectMdxCard } from "@/components/project-mdx-card";

describe("ProjectMdxCard", () => {
  it("wraps project MDX content in an internal project page link", () => {
    const project = allProjects.find((item) => item.title === "eo-n/ui");

    if (!project) {
      throw new Error("Expected eo-n/ui project fixture to exist");
    }

    render(<ProjectMdxCard project={project} />);

    const link = screen.getByRole("link", { name: /eo-n\/ui/i });

    expect(link.getAttribute("href")).toBe("/projects/eo-n-ui");
    expect(link.getAttribute("target")).toBe("_self");
    expect(screen.getByText("UI registry")).toBeTruthy();
  });
});