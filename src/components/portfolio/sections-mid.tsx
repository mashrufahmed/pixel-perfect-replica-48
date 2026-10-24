import { useState } from "react";
import { ArrowUpRight, Minus, Plus, Braces, Server, Database, Network, BrainCircuit, Container, type LucideIcon } from "lucide-react";
import {
  skills,
  skillsSection,
  approachSteps,
  approachSection,
  services,
  servicesSection,
  notes,
  notesSection,
} from "@/data/portfolio";
import { AccordionBody, Corners, Section, SectionHead, WipeButton } from "./primitives";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Skills — horizontal expanding-panel accordion (vertical on mobile). */
/* ------------------------------------------------------------------ */
const panelIcons: Record<string, LucideIcon> = {
  Frontend: Braces,
  "Backend & APIs": Server,
  Databases: Database,
  Architecture: Network,
  AI: BrainCircuit,
  DevOps: Container,
};

const levelDot: Record<string, string> = {
  "Daily use": "bg-primary",
  "Project use": "bg-foreground",
  Exploring: "bg-muted-foreground",
};

export function Skills() {
  const [active, setActive] = useState(0);
  return (
    <Section id="skills">
      <SectionHead
        tag={skillsSection.tag}
        bars={4}
        heading={skillsSection.heading}
        subtitle={skillsSection.subtitle}
        className="mb-12"
      />
      <div className="flex flex-col gap-3 md:h-[560px] md:flex-row">
        {skills.map((panel, i) => {
          const isActive = i === active;
          const Icon = panelIcons[panel.title] ?? Braces;
          return (
            <div
              key={panel.title}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              style={{ flexGrow: isActive ? 6 : 1 }}
              className={cn(
                "group relative cursor-pointer overflow-hidden border border-border bg-surface-2 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:flex-row md:transition-[flex-grow]",
                isActive ? "flex-col" : "flex-row md:flex-col",
              )}
            >
              <Corners size={7} interactive={false} className={cn(isActive && "text-primary")} />
              {/* Collapsed (desktop): vertical title */}
              <div className={cn("hidden items-center justify-center py-6 md:flex", isActive && "md:hidden")}>
                <span className="vertical-title flex items-center gap-3 text-small font-medium text-paragraph transition-colors group-hover:text-foreground">
                  <Icon size={15} strokeWidth={1.75} />
                  {panel.title}
                </span>
              </div>
              {/* Collapsed (mobile): horizontal row */}
              <div className={cn("flex items-center justify-between px-5 py-5 md:hidden", isActive && "hidden")}>
                <span className="flex items-center gap-3 text-small font-medium text-paragraph">
                  <Icon size={15} strokeWidth={1.75} />
                  {panel.title}
                </span>
                <Plus size={16} className="text-muted-foreground" />
              </div>
              {/* Active header */}
              <div className={cn("flex items-center gap-3 px-5 pb-2 pt-5 md:px-6 md:pt-6", !isActive && "hidden")}>
                <Icon size={16} className="text-primary" strokeWidth={1.75} />
                <h3 className="h3">{panel.title}</h3>
              </div>
              {/* Active content */}
              {isActive && (
                <div className="flex flex-col gap-6 overflow-y-auto px-5 pb-6 pt-2 md:px-6 md:pb-6">
                  {panel.groups.map((group) => (
                    <div key={group.title}>
                      <div className="flex items-center gap-2.5">
                        <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", levelDot[group.level])} />
                        <span className="text-tiny uppercase text-muted-foreground">{group.title}</span>
                        <span className="text-tiny text-paragraph">· {group.level}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="group relative border border-border bg-card px-3 py-1.5 text-small text-paragraph"
                          >
                            <Corners />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-small text-muted-foreground">{skillsSection.alsoExploring}</p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Approach — 4-step accordion, one open at a time, animated +/− icon. */
/* ------------------------------------------------------------------ */
export function Approach() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="approach">
      <SectionHead
        tag={approachSection.tag}
        bars={5}
        heading={approachSection.heading}
        subtitle={approachSection.subtitle}
        className="mb-12"
      />
      <div className="flex flex-col gap-4">
        {approachSteps.map((step, i) => {
          const isOpen = i === open;
          return (
            <div key={step.number} className="group relative border border-border bg-surface-2">
              <Corners size={7} interactive={false} className={cn(isOpen && "text-primary")} />
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-8 md:py-6"
              >
                <span className="flex items-center gap-4 md:gap-6">
                  <span className="text-tiny text-muted-foreground">{step.number}</span>
                  <span className="h3">{step.title}</span>
                </span>
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-card text-paragraph"
                >
                  {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                </span>
              </button>
              <AccordionBody open={isOpen}>
                <div className="px-5 pb-6 md:px-8">
                  <p className="max-w-2xl text-small text-paragraph">{step.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.chips.map((chip) => (
                      <span
                        key={chip}
                        className="group relative border border-border bg-card px-3 py-1.5 text-small text-paragraph"
                      >
                        <Corners />
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </AccordionBody>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Services — 4 bordered cards, custom quotation, no prices.           */
/* ------------------------------------------------------------------ */
export function Services() {
  return (
    <Section id="services">
      <SectionHead
        tag={servicesSection.tag}
        bars={6}
        heading={servicesSection.heading}
        subtitle={servicesSection.subtitle}
        className="mb-12"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service, i) => (
          <div key={service.title} className="group relative flex flex-col gap-4 border border-border bg-surface-2 p-6">
            <Corners size={7} />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-tiny uppercase text-paragraph">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                {servicesSection.quotationLabel}
              </span>
              <span className="text-tiny text-muted-foreground">/00{i + 1}/</span>
            </div>
            <h3 className="h3">{service.title}</h3>
            <p className="text-small text-paragraph">{service.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-6 border border-border bg-surface-2 p-6 md:flex-row md:items-center md:p-8">
        <p className="h3">{servicesSection.cta.label}</p>
        <WipeButton href={servicesSection.cta.href} className="shrink-0">
          {servicesSection.cta.button}
        </WipeButton>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Engineering notes — 3 article cards.                                */
/* ------------------------------------------------------------------ */
export function Notes() {
  return (
    <Section id="notes">
      <SectionHead
        tag={notesSection.tag}
        bars={7}
        heading={notesSection.heading}
        subtitle={notesSection.subtitle}
        className="mb-12"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {notes.map((note) => (
          <a
            key={note.title}
            href={note.href}
            className="group relative flex flex-col border border-border bg-card"
          >
            <Corners size={7} />
            <div className="img-placeholder relative flex h-40 items-center justify-center border-b border-border">
              <div aria-hidden className="blur-fade absolute bottom-0 left-0 right-0 h-10" />
              <ArrowUpRight
                size={20}
                className="text-paragraph transition-colors group-hover:text-primary"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <span className="text-tiny uppercase text-muted-foreground">{note.category}</span>
                <span className="text-tiny text-muted-foreground">{note.date}</span>
              </div>
              <h3 className="h3 leading-snug">{note.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
