import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the profile, projects, work experience, and connect sections", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Christian Caneos" })).toBeTruthy();
    expect(screen.getAllByText("Software Developer").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Projects" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Work Experience" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Connect" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Github" })).toBeTruthy();
    expect(screen.getByText("eo-n/ui")).toBeTruthy();
    expect(screen.getByText("grydal")).toBeTruthy();
    expect(screen.getByText("SupportZebra")).toBeTruthy();
    expect(screen.getByText("Frontend Developer (Intern)")).toBeTruthy();
    expect(screen.getByText("CK Children's Publishing")).toBeTruthy();
    expect(screen.getByText("Full Stack Laravel Developer")).toBeTruthy();
    expect(screen.getByText("February 2025 - Present")).toBeTruthy();
    expect(screen.getByText("Personal Projects")).toBeTruthy();
    expect(screen.getByText("February 2023 - Present")).toBeTruthy();
  });
});