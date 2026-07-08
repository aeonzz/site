import { allProjects } from "content-collections";
import type { MetadataRoute } from "next";

const siteUrl = "https://aeonz.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...allProjects.map((project) => ({
      url: `${siteUrl}/projects/${project._meta.path}`,
      lastModified: new Date(),
    })),
  ];
}