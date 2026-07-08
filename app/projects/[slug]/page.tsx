import { ExternalLink } from "@/components/external-link";
import { createMdxComponents } from "@/components/mdx-components";
import { ProjectPageShell } from "@/components/project-page-shell";
import { getProjectJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { MDXContent } from "@content-collections/mdx/react";
import { allProjects } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const links = [
  { label: "Twitter", href: "https://x.com/aeonzz_" },
  { label: "Github", href: "https://github.com/aeonzz" },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/christian-caneos-a17514214/",
  },
];

function getProject(slug: string) {
  return allProjects.find((project) => project._meta.path === slug);
}

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project._meta.path }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [
        {
          url: project.image,
          alt: `${project.title} project preview`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const mdxComponents = createMdxComponents();

  return (
    <ProjectPageShell toc={project.toc ?? []}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(getProjectJsonLd(project)),
        }}
      />
      <div className="relative mx-auto grid min-h-screen max-w-176 grid-cols-[1rem_minmax(0,1fr)_1rem] md:max-w-[45.5rem] md:grid-cols-[1.75rem_minmax(0,42rem)_1.75rem]">
        <div className="diagonal-rail row-span-2 border-x border-border/60" />
        <article className="full-bleed-divider col-start-2 px-5 py-14 md:px-8 md:py-16">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="relative z-0 isolate inline-block origin-center rounded-xs px-0.5 text-xs font-medium leading-none text-muted-foreground transition-[color,transform] duration-150 ease-out-quad before:absolute before:inset-x-[-3px] before:inset-y-[-3px] before:-z-10 before:scale-y-75 before:rounded-[3px] before:bg-foreground/10 before:opacity-0 before:transition-[opacity,transform] before:duration-150 before:ease-out-quad before:content-[''] hover:text-foreground hover:before:scale-y-100 hover:before:opacity-100 focus-visible:text-foreground focus-visible:outline-none focus-visible:before:scale-y-100 focus-visible:before:opacity-100 active:scale-[0.98] motion-reduce:transition-none motion-reduce:before:transition-none"
            >
              Back home
            </Link>
            <ExternalLink href={project.href}>View project</ExternalLink>
          </div>
          <header className="full-bleed-divider space-y-3 pb-8">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {project.type}
            </p>
            <h1 className="text-balance text-2xl font-semibold leading-tight text-foreground">
              {project.title}
            </h1>
          </header>
          <div className="max-w-none pt-8">
            <MDXContent code={project.body} components={mdxComponents} />
          </div>
        </article>
        <footer className="col-start-2 flex flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="space-y-1">
            <h3 className="text-balance text-sm font-medium leading-none">
              Connect
            </h3>
            <p className="text-pretty text-xs leading-5 text-muted-foreground">
              Find me around the web.
            </p>
          </div>
          <nav
            aria-label="Connect"
            className="flex flex-wrap items-center gap-4"
          >
            {links.map(({ label, href }) => (
              <ExternalLink key={href} href={href}>
                {label}
              </ExternalLink>
            ))}
          </nav>
        </footer>
        <div className="diagonal-rail col-start-3 row-span-2 row-start-1 border-x border-border/60" />
      </div>
    </ProjectPageShell>
  );
}
