import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Lenis from "lenis";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Corner brackets — 1px L-shaped marks at the 4 corners.              */
/* Parent needs `relative` and (for accent-on-hover) the `group` class. */
/* ------------------------------------------------------------------ */
export function Corners({
  size = 5,
  className,
  interactive = true,
}: {
  size?: 5 | 7;
  className?: string;
  interactive?: boolean;
}) {
  const cornerClass =
    "absolute h-[var(--corner-size)] w-[var(--corner-size)] border-current";
  const style = { "--corner-size": `${size}px` } as React.CSSProperties;
  return (
    <span
      aria-hidden
      style={style}
      className={cn(
        "pointer-events-none absolute inset-0 text-paragraph transition-colors duration-300",
        interactive && "group-hover:text-primary group-active:text-primary group-focus-visible:text-primary",
        className,
      )}
    >
      <span className={cn(cornerClass, "-top-px -left-px border-t border-l")} />
      <span className={cn(cornerClass, "-top-px -right-px border-t border-r")} />
      <span className={cn(cornerClass, "-bottom-px -left-px border-b border-l")} />
      <span className={cn(cornerClass, "-bottom-px -right-px border-b border-r")} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section tag — bordered pill with 11 progress bars + tiny label.     */
/* ------------------------------------------------------------------ */
export function SectionTag({
  label,
  bars,
  withDot = false,
  className,
}: {
  label: string;
  bars: number;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("group relative inline-flex items-center gap-2.5 border border-border bg-surface-2 px-3 py-2", className)}>
      <Corners />
      <span className="flex items-center gap-[3px]" aria-hidden>
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            className="h-[10px] w-[2px]"
            style={{ backgroundColor: i < bars ? "var(--color-primary)" : "var(--color-border)" }}
          />
        ))}
      </span>
      {withDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
      )}
      <span className="text-tiny uppercase text-paragraph">{label}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Rolling text — duplicated text stacked vertically, rolls up on hover */
/* ------------------------------------------------------------------ */
export function RollingText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("roll", className)}>
      <span className="roll-inner" aria-hidden={false}>
        <span className="flex items-center">{text}</span>
        <span className="flex items-center" aria-hidden>
          {text}
        </span>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Wipe button — dark surface, 1px border, corner brackets; on hover   */
/* a 1px accent line grows from the bottom into a full background      */
/* wipe while the text + arrow roll up.                                */
/* ------------------------------------------------------------------ */
interface WipeButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  iconClassName?: string;
}

export function WipeButton({
  children,
  href,
  onClick,
  type = "button",
  icon: Icon,
  disabled,
  className,
  iconClassName,
}: WipeButtonProps) {
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      <span className="roll relative z-10">
        <span className="roll-inner">
          <span className="flex items-center justify-center gap-2 text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
            {children}
            {Icon && <Icon size={16} className={iconClassName} strokeWidth={1.75} />}
          </span>
          <span
            aria-hidden
            className="flex items-center justify-center gap-2 text-primary-foreground"
          >
            {children}
            {Icon && <Icon size={16} className={iconClassName} strokeWidth={1.75} />}
          </span>
        </span>
      </span>
    </>
  );
  const base = cn(
    "group relative inline-flex items-center justify-center overflow-hidden border border-border bg-card px-6 py-3.5 text-sm font-medium transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60",
    className,
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} className={base}>
        <Corners />
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      <Corners />
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Section shell — full-width 1px top border + padded inner.           */
/* ------------------------------------------------------------------ */
export function Section({
  id,
  children,
  className,
  innerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section id={id} className={cn("border-t border-border", className)}>
      <div className={cn("px-5 py-16 md:px-10 md:py-24 lg:px-16", innerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHead({
  tag,
  bars,
  heading,
  subtitle,
  className,
}: {
  tag: string;
  bars: number;
  heading?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-6", className)}>
      <SectionTag label={tag} bars={bars} />
      {heading && <h2 className="h2 max-w-3xl">{heading}</h2>}
      {subtitle && <p className="text-large max-w-2xl text-paragraph">{subtitle}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Smooth scroll — Lenis, disabled under prefers-reduced-motion.       */
/* ------------------------------------------------------------------ */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth in-page anchor navigation (offset for the sticky navbar).
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

/* ------------------------------------------------------------------ */
/* Parallax wrapper for project images.                                */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-[-6%]" {...(reduced ? {} : { style: { y } })}>
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-color text — words go from #787878 to white while scrolling. */
/* ------------------------------------------------------------------ */
function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.32, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      {word}
    </motion.span>
  );
}

export function ScrollColorText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");
  if (reduced) {
    return <p ref={ref} className={className}>{text}</p>;
  }
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <RevealWord
          key={i}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, Math.min((i + 1.5) / words.length, 1)]}
        />
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Accordion helper — one item open at a time, animated height.        */
/* ------------------------------------------------------------------ */
export function AccordionBody({ open, children }: { open: boolean; children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return open ? <div className="overflow-hidden">{children}</div> : null;
  }
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
