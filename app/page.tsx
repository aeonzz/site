import { Avatar } from "@/components/avatar";
import { ExternalLink } from "@/components/external-link";
import { ProjectMdxCard } from "@/components/project-mdx-card";
import { Timeline } from "@/components/timeline";
import avatar from "@/public/avatar.png";
import { allProjects } from "content-collections";

const projects = allProjects.toSorted(
  (projectA, projectB) => projectA.order - projectB.order,
);

const links = [
  { label: "Twitter", href: "https://x.com/aeonzz_" },
  { label: "Github", href: "https://github.com/aeonzz" },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/christian-caneos-a17514214/",
  },
];

const experiences = [
  {
    company: "SupportZebra",
    role: "Frontend Developer (Intern)",
    period: "January 2025 - May 2025",
    location: "Cagayan De Oro City, Northern Mindanao, Philippines",
    highlights: [
      "Maintained and improved React interfaces with Tailwind CSS and TypeScript, focusing on responsive layouts and reusable UI patterns.",
      "Collaborated through code reviews, daily standups, and Agile task workflows to ship frontend updates with the development team.",
      "Used Git, QA checks, and issue tracking to test changes, review edge cases, and keep implementation work organized.",
    ],
  },
  {
    company: "CK Children's Publishing",
    role: "Full Stack Laravel Developer",
    period: "February 2025 - Present",
    highlights: [
      "Built and maintained Laravel application features across backend routes, controllers, database-backed workflows, and frontend views.",
      "Developed and maintained school management systems with PHP, Laravel, Blade, and MySQL to support daily administrative workflows.",
      "Handled full-stack implementation details from data flow and validation to responsive interface updates and QA checks.",
    ],
  },
  {
    company: "Personal Projects",
    role: "Software Developer",
    period: "February 2023 - Present",
    location: "Cagayan De Oro City, Northern Mindanao, Philippines",
    href: "https://github.com/aeonzz",
    highlights: [
      "Built and maintained open-source applications, UI components, and developer tools with React, Tailwind CSS, and TypeScript.",
      "Designed reusable components with clear APIs, documentation, and examples so projects are easier to extend and reuse.",
      "Explored content-driven workflows, interaction polish, and frontend architecture through public projects on GitHub.",
    ],
  },
];

export default function Home() {
  return (
    <main className="scroll-fade h-screen overflow-x-clip overflow-y-auto bg-background text-foreground">
      <div className="mx-auto grid min-h-screen max-w-176 grid-cols-[1rem_minmax(0,1fr)_1rem] md:max-w-[45.5rem] md:grid-cols-[1.75rem_minmax(0,42rem)_1.75rem]">
        <div className="diagonal-rail border-x border-border/60" />
        <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_auto_1fr_auto]">
          <section className="full-bleed-divider px-5 pt-14 pb-10 md:px-8 md:pt-16 md:pb-12">
            <header className="full-bleed-divider flex items-center gap-4 pb-8">
              <Avatar src={avatar} alt="Christian Caneos" />
              <div className="space-y-1">
                <h1 className="text-balance text-base font-semibold leading-none text-foreground">
                  Christian Caneos
                </h1>
                <p className="text-sm font-medium leading-none text-muted-foreground">
                  Software Developer
                </p>
              </div>
            </header>
            <div className="space-y-5 pt-8 text-pretty text-sm leading-6 text-muted-foreground">
              <p>
                I build responsive, accessible interfaces with React, Tailwind
                CSS, and modern JavaScript frameworks. I care deeply about
                craft, performance, and the small details that make software
                feel considered.
              </p>
              <p>
                Recently, I have been working on compact design systems,
                content-driven websites, and polished UI components. You can see
                my work in the{" "}
                <span className="font-medium text-sm text-foreground">Projects</span>{" "}
                section or find me on{" "}
                <ExternalLink
                  href="https://github.com/aeonzz"
                  className="font-semibold text-foreground"
                >
                  GitHub
                </ExternalLink>
                .
              </p>
            </div>
          </section>
          <section className="full-bleed-divider flex flex-col gap-4 px-5 py-10 md:px-8">
            <div className="full-bleed-title-divider mb-6 py-3">
              <h3 className="text-balance text-sm font-medium leading-none">
                Projects
              </h3>
            </div>
            {projects.map((project) => (
              <ProjectMdxCard key={project._meta.path} project={project} />
            ))}
          </section>
          <section className="full-bleed-divider flex flex-col gap-4 px-5 py-10 md:px-8">
            <div className="full-bleed-title-divider mb-6 py-3">
              <h3 className="text-balance text-sm font-medium leading-none">
                Work Experience
              </h3>
            </div>
            <Timeline>
              {experiences.map((experience) => (
                <Timeline.Item
                  key={experience.company}
                  title={experience.company}
                  meta={experience.period}
                >
                  <div className="space-y-3 text-pretty text-sm leading-6 text-muted-foreground">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {experience.role}
                      </p>
                      {experience.location ? (
                        <p className="text-xs leading-5">
                          {experience.location}
                        </p>
                      ) : null}
                      {experience.href ? (
                        <ExternalLink
                          href={experience.href}
                          className="text-xs font-medium text-foreground"
                        >
                          GitHub
                        </ExternalLink>
                      ) : null}
                    </div>
                    <ul className="space-y-1.5">
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </section>
          <footer className="flex flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="space-y-1">
              <h3 className="text-balance text-sm font-medium leading-none">Connect</h3>
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
        </div>
        <div className="diagonal-rail border-x border-border/60" />
      </div>
    </main>
  );
}
