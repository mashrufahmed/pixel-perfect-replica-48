import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/portfolio";
import { Preloader, Navbar, Footer } from "@/components/portfolio/chrome";
import { Hero, TechTicker, About } from "@/components/portfolio/sections-top";
import { Projects } from "@/components/portfolio/sections-work";
import { Skills, Approach, Services, Notes } from "@/components/portfolio/sections-mid";
import { Faq, Contact } from "@/components/portfolio/sections-end";
import { useSmoothScroll } from "@/components/portfolio/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.title },
      { name: "description", content: site.metaDescription },
      { property: "og:title", content: site.title },
      { property: "og:description", content: site.metaDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: site.title },
      { name: "twitter:description", content: site.metaDescription },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  useSmoothScroll();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Preloader />
      {/* Framed page: 1px vertical border lines on a max-width container */}
      <div id="top" className="mx-auto max-w-[1600px] border-x border-border">
        <Navbar />
        <main>
          <Hero />
          <TechTicker />
          <About />
          <Projects />
          <Skills />
          <Approach />
          <Services />
          <Notes />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
