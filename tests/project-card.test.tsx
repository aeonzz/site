import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/project-card";

describe("ProjectCard", () => {
  it("renders an external project link with its label", () => {
    render(
      <ProjectCard
        href="https://example.com"
        type="Example project"
        image="/images/example.png"
      >
        <span>Example</span>
      </ProjectCard>,
    );

    const link = screen.getByRole("link", { name: /example/i });

    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(screen.getByText("Example")).toBeTruthy();
  });
});