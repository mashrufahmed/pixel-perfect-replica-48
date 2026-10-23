import { Atom, Boxes, Braces, Container, Database, DatabaseZap, Hexagon, Layers, Triangle, Wind, ArrowRight, type LucideIcon } from "lucide-react";
import NumberFlow from "@number-flow/react";
import portraitAsset from "@/assets/mashruf-portrait.png.asset.json";
import { hero, techTicker, about } from "@/data/portfolio";
import {
  Corners,
  Parallax,
  ScrollColorText,
  Section,
  SectionHead,
  SectionTag,
  WipeButton,
} from "./primitives";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow absolute inset-0" />
      <div aria-hidden className="bg-noise absolute inset-0 opacity-60" />
      <div className="relative px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="flex flex-col items-start gap-8">
          <SectionTag label={hero.tag} bars={1} withDot />
          <h1 className="h1 max-w-4xl">{hero.title}</h1>
          <p className="text-large max-w-2xl text-paragraph">{hero.subtitle}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <WipeButton href={hero.primaryButton.href} icon={ArrowRight}>
              {hero.primaryButton.label}
            </WipeButton>
            <WipeButton href={hero.secondaryButton.href}>
              {hero.secondaryButton.label}
            </WipeButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tech ticker — infinite marquee in bordered cells with corners.      */
/* ------------------------------------------------------------------ */
const tickerIcons: Record<string, LucideIcon> = {
  TypeScript: Braces,
  React: Atom,
  "Next.js": Layers,
  "Node.js": Hexagon,
  NestJS: Boxes,
  PostgreSQL: Database,
  Prisma: Triangle,
  Docker: Container,
  Redis: DatabaseZap,
  Tailwind: Wind,
};

export function TechTicker() {
  const items = [...techTicker, ...techTicker];
  return (
    <div className="ticker-hover overflow-hidden border-t border-border py-5" aria-label="Technologies I work with">
      <div className="animate-ticker flex w-max">
        {items.map((tech, i) => {
          const Icon = tickerIcons[tech.name] ?? Braces;
          return (
            <div
              key={`${tech.name}-${i}`}
              aria-hidden={i >= techTicker.length}
              className="group relative mr-3 flex items-center gap-2.5 border border-border bg-surface-2 px-5 py-3"
            >
              <Corners />
              <Icon size={15} className="text-paragraph" strokeWidth={1.75} />
              <span className="text-small text-paragraph">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About — scroll-color statement, portrait, NumberFlow stats.         */
/* ------------------------------------------------------------------ */
export function About() {
  return (
    <Section id="about">
      <div className="flex flex-col items-center gap-12">
        <SectionHead tag={about.tag} bars={2} className="items-center text-center" />
        <ScrollColorText
          text={about.statement}
          className="text-xlarge max-w-4xl text-center leading-relaxed"
        />
        <figure className="group relative border border-border">
          <Corners size={7} />
          <img
            src={portraitAsset.url}
            alt={`Portrait of ${about.portraitCaption}`}
            className="h-auto w-[240px] md:w-[280px]"
            loading="lazy"
          />
          <figcaption className="border-t border-border px-4 py-3 text-center text-tiny uppercase text-paragraph">
            {about.portraitCaption}
          </figcaption>
        </figure>
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <div key={stat.number} className="group relative border border-border bg-surface-2 p-6">
              <Corners size={7} />
              <span className="text-tiny text-muted-foreground">{stat.number}</span>
              <div className="mt-4 flex items-baseline gap-1">
                <NumberFlow
                  value={stat.value}
                  suffix={stat.suffix}
                  format={{ minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals }}
                  className="text-xlarge"
                />
              </div>
              <p className="mt-2 text-small text-paragraph">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Keep Parallax referenced for potential future real screenshots (tree-shake safe).
export { Parallax };
