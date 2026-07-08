const siteUrl = "https://aeonz.dev";
const personName = "Christian Caneos";

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    alternateName: "Aeonz",
    url: siteUrl,
    image: `${siteUrl}/avatar.png`,
    jobTitle: "Software Developer",
    sameAs: [
      "https://x.com/aeonzz_",
      "https://github.com/aeonzz",
      "https://www.linkedin.com/in/christian-caneos-a17514214/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "Frontend development",
    ],
  };
}

function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aeonz",
    url: siteUrl,
    description:
      "Showcasing the creative work and projects of Aeonz, a passionate developer and designer.",
    author: {
      "@type": "Person",
      name: personName,
      url: siteUrl,
    },
    inLanguage: "en-US",
  };
}

function getProjectJsonLd(project: {
  title: string;
  summary: string;
  href: string;
  image: string;
  _meta: { path: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/projects/${project._meta.path}`,
    image: `${siteUrl}${project.image}`,
    sameAs: project.href,
    author: {
      "@type": "Person",
      name: personName,
      url: siteUrl,
    },
    inLanguage: "en-US",
  };
}

export { getPersonJsonLd, getProjectJsonLd, getWebsiteJsonLd, serializeJsonLd };
