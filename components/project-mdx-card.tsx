import { ProjectCard } from "@/components/project-card";

type ProjectMdxCardProps = {
  project: {
    _meta: { path: string };
    title: string;
    href: string;
    type: string;
    image: string;
  };
};

function ProjectMdxCard({ project }: ProjectMdxCardProps) {
  return (
    <ProjectCard
      href={`/projects/${project._meta.path}`}
      target="_self"
      type={project.type}
      image={project.image}
    >
      <div className="space-y-1 flex flex-col">
        <span className="text-balance font-semibold text-base">
          {project.title}
        </span>
        <div className="text-pretty text-xs text-muted-foreground [&_p]:leading-5">
          {project.type}
        </div>
      </div>
    </ProjectCard>
  );
}

export { ProjectMdxCard };