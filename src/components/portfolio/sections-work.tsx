import { useState } from "react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  projects,
  projectsSection,
  type Project,
  type ProjectStatus,
} from "@/data/portfolio";
import { Corners, Parallax, Section, SectionHead, WipeButton } from "./primitives";
import { cn } from "@/lib/utils";

const statusLabels: Record<ProjectStatus, string> = {
  production: "Production",
  demo: "Demo",
  prototype: "Prototype",
  "in progress": "In progress",
};

function CaseStudyDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const labels = projectsSection.caseStudyLabels;
  const hasLinks = Boolean(project?.liveUrl || project?.repoUrl);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-border bg-card focus:outline-none">
          {project && (
            <div className="p-6 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-tiny text-muted-foreground">{project.number}</span>
                  <Dialog.Title className="h3 mt-2">{project.title}</Dialog.Title>
                  <Dialog.Description className="mt-1 text-small text-paragraph">
                    {project.summary}
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  className="group relative flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-surface-2 text-paragraph transition-colors hover:text-foreground"
                  aria-label="Close case study"
                >
                  <Corners />
                  <X size={16} />
                </Dialog.Close>
              </div>

              <dl className="mt-8 flex flex-col gap-6">
                <div>
                  <dt className="text-tiny uppercase text-muted-foreground">{labels.status}</dt>
                  <dd className="mt-2 inline-flex items-center gap-2 border border-border bg-surface-2 px-3 py-1.5 text-small text-paragraph">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    {statusLabels[project.status]}
                  </dd>
                </div>
                <div>
                  <dt className="text-tiny uppercase text-muted-foreground">{labels.problem}</dt>
                  <dd className="mt-2 text-small text-paragraph">{project.problem}</dd>
                </div>
                <div>
                  <dt className="text-tiny uppercase text-muted-foreground">{labels.role}</dt>
                  <dd className="mt-2 text-small text-paragraph">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-tiny uppercase text-muted-foreground">{labels.stack}</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="group relative border border-border bg-surface-2 px-3 py-1.5 text-small text-paragraph"
                      >
                        <Corners />
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-tiny uppercase text-muted-foreground">{labels.architecture}</dt>
                  <dd className="mt-2 text-small text-paragraph">{project.architecture}</dd>
                </div>
                <div>
                  <dt className="text-tiny uppercase text-muted-foreground">{labels.features}</dt>
                  <dd>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-small text-paragraph">
                          <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-tiny uppercase text-muted-foreground">{labels.hardProblem}</dt>
                  <dd className="mt-2 text-small text-paragraph">{project.hardProblem}</dd>
                  <dt className="mt-4 text-tiny uppercase text-muted-foreground">{labels.solution}</dt>
                  <dd className="mt-2 text-small text-paragraph">{project.hardSolution}</dd>
                </div>
                {hasLinks && (
                  <div>
                    <dt className="text-tiny uppercase text-muted-foreground">{labels.links}</dt>
                    <dd className="mt-3 flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group relative inline-flex items-center gap-2 border border-border bg-surface-2 px-4 py-2 text-small text-foreground"
                        >
                          <Corners />
                          {labels.live}
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group relative inline-flex items-center gap-2 border border-border bg-surface-2 px-4 py-2 text-small text-foreground"
                        >
                          <Corners />
                          {labels.repo}
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <article className="group relative border border-border bg-card">
      <Corners size={7} />
      <div className="relative">
        {project.screenshotUrl ? (
          <Parallax className="h-[300px] md:h-[380px]">
            <img
              src={project.screenshotUrl}
              alt={`${project.title} interface screenshot`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </Parallax>
        ) : (
          <Parallax className="h-[300px] md:h-[380px]">
            <div className="img-placeholder flex h-full w-full items-center justify-center">
              <span className="text-xlarge text-paragraph" aria-hidden>
                {initials}
              </span>
            </div>
          </Parallax>
        )}
        {/* Dark gradient overlay + progressive blur at card bottom */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div aria-hidden className="blur-fade pointer-events-none absolute bottom-0 left-0 right-0 h-20" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="border border-border bg-background/80 px-2.5 py-1.5 text-tiny text-paragraph backdrop-blur-sm">
            {project.number}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex flex-wrap items-center justify-end gap-2">
          <span className="border border-border bg-background/80 px-2.5 py-1.5 text-tiny uppercase text-paragraph backdrop-blur-sm">
            {project.category}
          </span>
          <span className="flex items-center gap-2 border border-border bg-background/80 px-2.5 py-1.5 text-tiny text-paragraph backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {statusLabels[project.status]}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 p-6">
        <div>
          <h3 className="h3">{project.title}</h3>
          <p className="mt-2 max-w-xl text-small text-paragraph">{project.summary}</p>
        </div>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${project.title} case study`}
          className="group relative flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-surface-2 text-foreground transition-colors hover:text-primary"
        >
          <Corners />
          <ArrowUpRight size={18} strokeWidth={1.75} />
        </button>
      </div>
    </article>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const openCase = (project: Project) => {
    setActive(project);
    setOpen(true);
  };
  return (
    <Section id="projects">
      <SectionHead
        tag={projectsSection.tag}
        bars={3}
        heading={projectsSection.heading}
        subtitle={projectsSection.subtitle}
        className="mb-12"
      />
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => openCase(project)} />
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-border bg-surface-2 p-6 md:flex-row md:items-center md:p-8">
        <div>
          <p className="h3">{projectsSection.moreWork.label}</p>
          <p className="mt-2 text-small text-paragraph">{projectsSection.moreWork.hint}</p>
        </div>
        <WipeButton href="#" icon={ArrowUpRight} className={cn("shrink-0")}>
          {projectsSection.moreWork.githubUrl}
        </WipeButton>
      </div>

      <CaseStudyDialog project={active} open={open} onOpenChange={setOpen} />
    </Section>
  );
}
