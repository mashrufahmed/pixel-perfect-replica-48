import { describe, it, expect } from "vitest";
import * as data from "@/data/portfolio";

/**
 * Hard content rules from the portfolio brief:
 * - No invented numbers, clients, reviews, ratings or testimonials.
 * - No PHP/Laravel anywhere.
 * - Skill levels are exactly: Daily use / Project use / Exploring.
 * - Project statuses are limited to the four allowed values.
 * - Unconfirmed facts render as [Add ...] placeholders.
 */
const allowedLevels = new Set(["Daily use", "Project use", "Exploring"]);
const allowedStatuses = new Set(["production", "demo", "prototype", "in progress"]);

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectStrings(v, out));
  }
  return out;
}

const allStrings = collectStrings(data);

describe("portfolio content rules", () => {
  it("never mentions PHP or Laravel", () => {
    for (const s of allStrings) {
      expect(s.toLowerCase()).not.toContain("php");
      expect(s.toLowerCase()).not.toContain("laravel");
    }
  });

  it("contains no invented client counts, ratings or review numbers", () => {
    for (const s of allStrings) {
      expect(s).not.toMatch(/100\+/);
      expect(s).not.toMatch(/\b4\.9\b/);
      expect(s).not.toMatch(/\b\d+\/5\b/);
      expect(s).not.toMatch(/clients/i);
      expect(s).not.toMatch(/testimonials/i);
      expect(s).not.toMatch(/review/i);
    }
  });

  it("uses only the three honest skill levels", () => {
    const levels = data.skills.flatMap((p) => p.groups.map((g) => g.level));
    expect(levels.length).toBeGreaterThan(0);
    for (const level of levels) expect(allowedLevels.has(level)).toBe(true);
  });

  it("uses only allowed project statuses", () => {
    for (const project of data.projects) {
      expect(allowedStatuses.has(project.status)).toBe(true);
    }
  });

  it("keeps unconfirmed facts as placeholders, not invented values", () => {
    expect(data.projectsSection.moreWork.githubUrl).toBe("[Add GitHub URL]");
    for (const card of data.contactSection.cards) {
      expect(card.value).toMatch(/^\[Add /);
      expect(card.href).toBe("");
    }
    for (const note of data.notes) {
      expect(note.date).toBe("[Add date]");
      expect(note.href).toBe("#");
    }
  });

  it("never attaches a price to a service", () => {
    for (const s of allStrings) {
      expect(s).not.toMatch(/\$\d/);
      expect(s).not.toMatch(/\bfrom €?\d/i);
    }
  });

  it("has exactly 4 featured projects matching the /002/ stat claim", () => {
    expect(data.projects).toHaveLength(4);
    expect(data.about.stats[1]!.value).toBe(data.projects.length);
  });

  it("has exactly 6 skill panels matching the /003/ stat claim", () => {
    expect(data.skills).toHaveLength(6);
    expect(data.about.stats[2]!.value).toBe(data.skills.length);
  });
});
