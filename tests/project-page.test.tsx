import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage, { generateMetadata, generateStaticParams } from "@/app/projects/[slug]/page";

describe("ProjectPage", () => {
  it("renders a project from the route slug", async () => {
    const projectPage = await ProjectPage({
      params: Promise.resolve({ slug: "eo-n-ui" }),
    });

    render(projectPage);

    expect(screen.getByRole("heading", { name: "eo-n/ui" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Back home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "View project" }).getAttribute("href")).toBe(
      "https://eo-n.vercel.app/",
    );
    expect(screen.getAllByText("UI registry").length).toBeGreaterThan(0);
  });

  it("renders project JSON-LD", async () => {
    const projectPage = await ProjectPage({
      params: Promise.resolve({ slug: "eo-n-ui" }),
    });

    render(projectPage);

    const jsonLd = document.querySelector('script[type="application/ld+json"]');

    expect(jsonLd?.textContent).toBeTruthy();
    expect(JSON.parse(jsonLd?.textContent ?? "{}")).toMatchObject({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "eo-n/ui",
      url: "https://aeonz.dev/projects/eo-n-ui",
      sameAs: "https://eo-n.vercel.app/",
      author: {
        "@type": "Person",
        name: "Christian Caneos",
      },
    });
  });

  it("generates static params for content projects", () => {
    expect(generateStaticParams()).toContainEqual({ slug: "eo-n-ui" });
  });

  it("generates project metadata", async () => {
    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "eo-n-ui" }) }),
    ).resolves.toMatchObject({
      title: "eo-n/ui",
      description:
        "A Base UI-powered component registry for reusable React, Tailwind CSS, and shadcn-style interface patterns.",
      openGraph: {
        description:
          "A Base UI-powered component registry for reusable React, Tailwind CSS, and shadcn-style interface patterns.",
        images: [
          {
            url: "/images/eo-n.png",
            alt: "eo-n/ui project preview",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        description:
          "A Base UI-powered component registry for reusable React, Tailwind CSS, and shadcn-style interface patterns.",
        images: ["/images/eo-n.png"],
      },
    });
  });
});