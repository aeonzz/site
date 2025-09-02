import { Avatar } from "@/components/avatar";
import { ExternalLink } from "@/components/external-link";
import { ProjectCard } from "@/components/project-card";
import avatar from "@/public/avatar.png";
import GitHubCalendar from "react-github-calendar";

export default function Home() {
  return (
    <main className="grid place-items-center min-h-screen">
      <div className="max-w-[42rem] h-full py-16 px-4 md:px-0 border border-border border-dashed flex items-center">
        <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-6 py-4 border-y border-border border-dashed">
          <div className="space-y-3 px-3">
            <Avatar src={avatar} alt="Christian Caneos" />
            <h3 className="text-base font-medium leading-7 text-muted-foreground">
              <span className="font-bold text-pretty text-lg text-foreground">
                Hi, I am Christian
              </span>{" "}
              — a frontend developer passionate about crafting responsive and
              accessible web interfaces using React, Tailwind CSS, and modern
              JavaScript frameworks.
            </h3>
          </div>
          <div className="h-fit inline-flex items-center gap-4 px-3">
            {[
              { val: "Twitter", href: "https://x.com/aeonzz_" },
              { val: "Github", href: "https://github.com/aeonzz" },
              {
                val: "Linkedin",
                href: "https://www.linkedin.com/in/christian-caneos-a17514214/",
              },
            ].map(({ val, href }, i) => (
              <ExternalLink key={i} href={href}>
                {val}
              </ExternalLink>
            ))}
          </div>
          <div className="flex items-center justify-center px-3 [&_article]:text-muted-foreground [&_article]:font-semibold">
            <GitHubCalendar
              username="aeonzz"
              blockMargin={3}
              blockSize={9}
              fontSize={12}
              hideColorLegend
              hideTotalCount
            />
          </div>
          <div className="py-6 flex flex-col px-3">
            <h3 className="text-lg font-semibold leading-none mb-3">
              Projects
            </h3>
            {[
              {
                val: "eo-n/ui",
                href: "https://eo-n.vercel.app/",
                type: "UI registry",
              },
              {
                val: "grydal",
                href: "https://grydal.vercel.app/",
                type: "Image gallery",
              },
            ].map(({ val, href, type }, i) => (
              <ProjectCard key={i} href={href} type={type}>
                {val}
              </ProjectCard>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
