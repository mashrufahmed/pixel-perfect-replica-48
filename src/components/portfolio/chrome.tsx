import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { site, navLinks, ctaButton, footer } from "@/data/portfolio";
import { Corners, RollingText, WipeButton, useSmoothScroll } from "./primitives";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Preloader — wordmark "MA®" centered, fades out in ~1s.              */
/* ------------------------------------------------------------------ */
export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduced ? 0 : 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <motion.span
            className="text-2xl font-semibold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {site.initials}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar — sticky, bordered bottom, rolling links, circular menu btn. */
/* ------------------------------------------------------------------ */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-shadow",
        scrolled && "shadow-[0_1px_0_0_var(--color-border)]",
      )}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10 lg:px-16">
        <a href="#top" className="text-lg font-semibold tracking-tight text-foreground">
          {site.wordmark}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="px-2 text-paragraph">
                  /
                </span>
              )}
              <a href={link.href} className="px-1 text-sm text-paragraph transition-colors hover:text-foreground">
                <RollingText text={link.label} />
              </a>
            </span>
          ))}
        </nav>

        <div className="hidden md:block">
          <WipeButton href={ctaButton.href} className="px-5 py-2.5">
            {ctaButton.label}
          </WipeButton>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-2 text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col px-5 pb-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 text-lg text-foreground"
                >
                  <RollingText text={link.label} />
                </a>
              ))}
              <div className="pt-5">
                <WipeButton href={ctaButton.href} className="w-full">
                  {ctaButton.label}
                </WipeButton>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Footer — 3 columns + bottom bar.                                    */
/* ------------------------------------------------------------------ */
export function Footer() {
  useSmoothScroll();
  const socialIcons = [
    { label: "GitHub", href: "#", Icon: Github },
    { label: "LinkedIn", href: "#", Icon: Linkedin },
    { label: "Email", href: "#contact", Icon: Mail },
  ];
  return (
    <footer className="border-t border-border">
      <div className="grid gap-10 px-5 py-14 md:grid-cols-3 md:px-10 lg:px-16">
        <div>
          <p className="text-tiny uppercase text-muted-foreground">Navigation</p>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-small text-paragraph transition-colors hover:text-foreground">
                  <RollingText text={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-tiny uppercase text-muted-foreground">Social</p>
          <div className="mt-5 flex gap-3">
            {socialIcons.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group relative flex h-11 w-11 items-center justify-center border border-border bg-surface-2 text-paragraph transition-colors hover:text-foreground"
              >
                <Corners />
                <Icon size={17} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-tiny uppercase text-muted-foreground">Legal</p>
          <ul className="mt-5 flex flex-col gap-3">
            {footer.legal.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-small text-paragraph transition-colors hover:text-foreground">
                  <RollingText text={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-border px-5 py-6 text-small text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <span>{site.copyright}</span>
        <span>{site.builtWith}</span>
      </div>
    </footer>
  );
}
