/*
 * ============================================================
 *  ALL PAGE COPY LIVES HERE. Edit text in this file only —
 *  no component changes needed for content updates.
 * ============================================================
 *
 * CONTENT RULES (do not remove):
 * - Never invent numbers, clients, reviews, awards, logos, ratings
 *   or testimonials. Placeholders are marked "[Add ...]".
 * - Skill levels must stay exactly as written: "Daily use" /
 *   "Project use" / "Exploring" — never present exploring tech as expert.
 * - No PHP/Laravel anywhere. No personal-life biography.
 * - Pricing is custom quotation only — no price tags.
 * - Lines marked "// VERIFY" need confirmation before publishing.
 */

export type SkillLevel = "Daily use" | "Project use" | "Exploring";

export type ProjectStatus = "production" | "demo" | "prototype" | "in progress";

export interface Project {
  id: string;
  number: string; // "/001/"
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  architecture: string;
  features: string[];
  hardProblem: string;
  hardSolution: string;
  screenshotUrl?: string; // leave empty to show the initials placeholder
  liveUrl?: string; // shown only when filled in
  repoUrl?: string; // shown only when filled in
}

export const site = {
  wordmark: "Mashruf®",
  initials: "MA®",
  name: "Mashruf Ahmed",
  role: "Full Stack Engineer",
  title: "Mashruf Ahmed | Full Stack Engineer",
  metaDescription:
    "Full stack engineer building SaaS products that scale — React/Next.js interfaces, NestJS APIs, PostgreSQL data models, authentication, multi-tenancy and deployment.",
  builtWith: "Built with React + TypeScript",
  copyright: "© 2026 Mashruf Ahmed",
};

export const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Approach", href: "#approach" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

export const ctaButton = {
  label: "Get in touch",
  href: "#contact",
};

export const hero = {
  tag: "Available for work",
  title: "Full stack engineer building SaaS products that scale.",
  subtitle:
    "I design and build web applications end to end: React/Next.js interfaces, NestJS APIs, PostgreSQL data models, authentication, multi-tenancy and deployment.",
  primaryButton: { label: "View projects", href: "#projects" },
  secondaryButton: { label: "Get in touch", href: "#contact" },
};

export const techTicker = [
  { name: "TypeScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "NestJS" },
  { name: "PostgreSQL" },
  { name: "Prisma" },
  { name: "Docker" },
  { name: "Redis" },
  { name: "Tailwind" },
];

export const about = {
  tag: "About",
  statement:
    "Full stack engineer focused on modern web applications and SaaS. I work across interfaces, APIs, databases, authentication, multi-tenant patterns and deployment, with growing interest in AI-enabled applications, RAG and scalable service architecture.",
  portraitCaption: "Mashruf Ahmed — Full Stack Engineer",
  stats: [
    {
      number: "/001/",
      // VERIFY: confirm the "2.5+ years" timeline before publishing this claim.
      value: 2.5,
      suffix: "+",
      decimals: 1,
      label: "Years practical experience",
    },
    { number: "/002/", value: 4, suffix: "", decimals: 0, label: "Featured projects" },
    { number: "/003/", value: 6, suffix: "", decimals: 0, label: "Skill areas" },
  ],
};

export const projectsSection = {
  tag: "Selected work",
  heading: "Projects that show how I build.",
  subtitle:
    "A selection of products I designed and built end to end. Open a card for the full case study.",
  moreWork: {
    label: "More work on GitHub",
    hint: "Additional repositories, experiments and ongoing work.",
    // TODO: replace with the real GitHub profile URL.
    githubUrl: "[Add GitHub URL]",
  },
  caseStudyLabels: {
    summary: "Summary",
    problem: "Problem",
    role: "My role",
    stack: "Stack",
    architecture: "Architecture",
    features: "Key features",
    hardProblem: "The hard problem",
    solution: "Solution",
    status: "Status",
    links: "Links",
    live: "Live URL",
    repo: "Repository",
  },
};

export const projects: Project[] = [
  {
    id: "cartivo",
    number: "/001/",
    title: "Cartivo",
    category: "E-commerce SaaS",
    // VERIFY: deployment status before publishing.
    status: "in progress",
    summary: "Multi-tenant e-commerce SaaS with a store-owner dashboard.",
    problem:
      "Independent stores need their own products, categories and orders on a shared platform — without their data ever leaking into another tenant's workspace.",
    role: "Full stack development: frontend, API, database model and deployment setup.",
    stack: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "S3-compatible storage",
      "RabbitMQ",
      "Redis",
    ],
    architecture:
      "Next.js frontend, NestJS API, PostgreSQL with tenant-scoped data through Prisma, S3-compatible storage for product media, RabbitMQ for background jobs and Redis for caching.",
    features: [
      "Tenant-aware login",
      "Owner vs platform-admin roles",
      "Product and category management",
      "Dynamic product attributes",
      "Status and marketing flags",
      "Sales chart",
      "Low-stock alerts",
      "Light/dark theme",
    ],
    hardProblem:
      "Product attributes differ from store to store, so a fixed schema would break quickly.",
    hardSolution:
      "Dynamic product attributes are stored per tenant and validated at the API layer, so each store defines its own fields without database migrations.",
  },
  {
    id: "taskflow",
    number: "/002/",
    title: "TaskFlow",
    category: "SaaS · Task management",
    // VERIFY: deployment status before publishing.
    status: "in progress",
    summary: "Multi-tenant SaaS task management built around organizations.",
    problem:
      "Teams need to belong to organizations, switch between them, and invite members — while every task and setting stays scoped to a single organization.",
    role: "Full stack development: frontend, API, database model and invitation flow.",
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "RabbitMQ"],
    architecture:
      "Next.js frontend, NestJS API, PostgreSQL through Prisma, RabbitMQ for queued work; every query is scoped by organization at the service layer.",
    features: [
      "Organization switcher",
      "Organization settings",
      "Team member management",
      "Invitation creation and acceptance flow",
      "Org-scoped workflows",
    ],
    hardProblem:
      "Invitations have to be safe to accept across sign-in sessions and can never grant access to the wrong organization.",
    hardSolution:
      "A token-based invitation flow with organization-scoped membership checks before any access is granted.",
  },
  {
    id: "docmind",
    number: "/003/",
    title: "DocMind",
    category: "AI · Document intelligence",
    // VERIFY: deployment status before publishing.
    status: "in progress",
    summary: "AI document intelligence: ingest documents, retrieve answers with RAG.",
    problem:
      "Finding the right passage inside large document sets is slow, and keyword search misses meaning.",
    role: "Backend and AI pipeline development with a Next.js interface.",
    stack: ["NestJS", "Next.js", "PostgreSQL + pgvector", "Embeddings", "RAG", "BullMQ"],
    architecture:
      "NestJS services, PostgreSQL with pgvector for similarity search, an embedding and RAG pipeline, and BullMQ workers for document ingestion.",
    features: [
      "Document ingestion",
      "Chunked embeddings stored in pgvector",
      "AI-assisted retrieval",
      "RAG pipeline over private documents",
    ],
    hardProblem: "Ingesting large documents would block the API and time out uploads.",
    hardSolution:
      "Ingestion moved to BullMQ background workers, so uploads stay responsive while chunks are embedded and indexed.",
  },
  {
    id: "dream-rome-tours",
    number: "/004/",
    title: "Dream Rome Tours",
    category: "Web application · Booking",
    // VERIFY: deployment status before publishing.
    status: "in progress",
    summary: "Tour booking site on Next.js (Bun), fully Dockerized.",
    problem:
      "The site needed verified email sign-ups, file uploads and payments in one self-contained deployment.",
    role: "Full stack development: application, infrastructure and deployment.",
    stack: ["Next.js on Bun", "NestJS", "PostgreSQL 16", "MinIO", "Redis", "Stripe", "Docker"],
    architecture:
      "Dockerized stack with PostgreSQL 16, MinIO, Redis and separate app and worker containers; NestJS services for email verification and file handling.",
    features: [
      "Email verification with token URL",
      "Reusable S3-compatible file service (upload, stream, delete)",
      "Zod-validated lazy env config",
      "Stripe integration",
    ],
    hardProblem: "Configuration errors only surfaced at runtime, deep into a request.",
    hardSolution:
      "Zod-validated lazy environment config that fails fast at startup with readable errors instead.",
  },
];

export interface SkillGroup {
  title: string;
  level: SkillLevel;
  items: string[];
}

export interface SkillPanel {
  title: string;
  groups: SkillGroup[];
}

export const skillsSection = {
  tag: "What I work with",
  heading: "Skills, honestly leveled.",
  subtitle:
    "Grouped by how I actually use them — daily tools, project work and things I'm currently exploring.",
  alsoExploring: "Also exploring: Python (FastAPI), Go, Java.",
};

export const skills: SkillPanel[] = [
  {
    title: "Frontend",
    groups: [
      {
        title: "Interfaces",
        level: "Daily use",
        items: [
          "React",
          "Next.js (App Router)",
          "Tailwind v4",
          "shadcn/ui",
          "React Hook Form",
          "Zod",
          "TanStack Query",
        ],
      },
    ],
  },
  {
    title: "Backend & APIs",
    groups: [
      {
        title: "Services",
        level: "Daily use",
        items: ["Node.js", "NestJS", "Express", "REST"],
      },
      { title: "Query layers", level: "Project use", items: ["GraphQL"] },
    ],
  },
  {
    title: "Databases",
    groups: [
      { title: "Relational", level: "Daily use", items: ["PostgreSQL", "Prisma"] },
      { title: "Document", level: "Project use", items: ["MongoDB", "Mongoose"] },
      { title: "Query builders", level: "Exploring", items: ["Drizzle"] },
    ],
  },
  {
    title: "Architecture",
    groups: [
      {
        title: "Patterns",
        level: "Daily use",
        items: ["Multi-tenant SaaS", "RBAC", "Modular backends"],
      },
      { title: "Messaging & cache", level: "Project use", items: ["RabbitMQ", "Redis", "BullMQ"] },
      { title: "Scale", level: "Exploring", items: ["Kafka", "Microservices"] },
    ],
  },
  {
    title: "AI",
    groups: [
      {
        title: "Applied AI",
        level: "Project use",
        items: ["RAG", "Embeddings", "pgvector"],
      },
      {
        title: "Tooling",
        level: "Exploring",
        items: ["LangChain", "LangGraph", "Qdrant", "Groq"],
      },
    ],
  },
  {
    title: "DevOps",
    groups: [
      {
        title: "Workflow",
        level: "Daily use",
        items: ["Docker", "Docker Compose", "Git/GitHub", "Vercel"],
      },
      {
        title: "Infrastructure",
        level: "Project use",
        items: ["Nginx", "Traefik", "S3/MinIO", "Render"],
      },
    ],
  },
];

export const approachSection = {
  tag: "How I build",
  heading: "A repeatable way of working.",
  subtitle: "Four steps from first conversation to handover.",
};

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
  chips: string[];
}

export const approachSteps: ApproachStep[] = [
  {
    number: "/001/",
    title: "Plan",
    description:
      "Before any code, we agree on what is actually being built: the scope, the data model and the API contract. Clear decisions here prevent rework later.",
    chips: ["Scope", "Data model", "API contract", "Risks"],
  },
  {
    number: "/002/",
    title: "Design",
    description:
      "I design the UI as a system — reusable components, consistent states and accessibility from the start, not bolted on at the end.",
    chips: ["UI system", "Components", "States", "Accessibility"],
  },
  {
    number: "/003/",
    title: "Build",
    description:
      "Type-safe code across the stack, validation on every boundary, and authentication and authorization designed in as core features.",
    chips: ["Type safety", "Validation", "Auth", "Code review"],
  },
  {
    number: "/004/",
    title: "Ship",
    description:
      "Containerized deployments, CI/CD, monitoring and a proper handover — you own everything when the project ends.",
    chips: ["Docker", "CI/CD", "Monitoring", "Handover"],
  },
];

export const servicesSection = {
  tag: "Services",
  heading: "What I can do for you.",
  subtitle: "Every engagement is quoted individually after we discuss scope.",
  quotationLabel: "Custom quotation",
  cta: { label: "Not sure what fits? Let's talk.", button: "Get in touch", href: "#contact" },
};

export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "Web application development",
    description:
      "Complete web applications with React/Next.js frontends, typed APIs and validated data flows.",
  },
  {
    title: "API and backend development",
    description:
      "Node.js and NestJS services: REST APIs, authentication, authorization, background jobs and integrations.",
  },
  {
    title: "E-commerce and SaaS platforms",
    description:
      "Multi-tenant platforms, dashboards and e-commerce systems with role-based access and scoped data.",
  },
  {
    title: "AI integration (RAG, document processing)",
    description:
      "Document ingestion, embeddings, retrieval-augmented generation and AI-assisted features built on PostgreSQL/pgvector.",
  },
];

export const notesSection = {
  tag: "Engineering notes",
  heading: "Notes from the workshop.",
  subtitle: "Write-ups of problems I ran into and how I solved them.",
  datePlaceholder: "[Add date]",
};

export interface Note {
  category: string;
  title: string;
  date: string; // placeholder until confirmed
  href: string;
}

export const notes: Note[] = [
  {
    category: "DevOps",
    title: "Environment variables during a Docker build",
    date: "[Add date]",
    href: "#",
  },
  {
    category: "Backend",
    title: "Building a reusable S3-compatible storage service in NestJS",
    date: "[Add date]",
    href: "#",
  },
  {
    category: "Architecture",
    title: "Organization switching and invitations in multi-tenant SaaS",
    date: "[Add date]",
    href: "#",
  },
];

export const faqSection = {
  tag: "FAQ",
  heading: "Questions, answered.",
  tabs: [
    { id: "working", label: "Working together" },
    { id: "projects", label: "Projects" },
  ] as const,
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: Record<"working" | "projects", FaqItem[]> = {
  working: [
    {
      question: "How do we agree on scope and quotation?",
      answer:
        "We start with a short call or written brief. I break the work into a scope document with the data model and API contract, and you get a custom quotation based on that scope — no hourly surprises.",
    },
    {
      question: "How long does a project take?",
      answer:
        "It depends entirely on scope. A focused API or dashboard is typically weeks, a full SaaS platform is longer. After scoping you get a realistic timeline with milestones before anything starts.",
    },
    {
      question: "Can I choose the technology stack?",
      answer:
        "Yes — within reason. I work primarily with TypeScript, React/Next.js, Node.js/NestJS and PostgreSQL, and I'll advise honestly if a different choice fits your product better.",
    },
    {
      question: "What happens after launch?",
      answer:
        "Handover includes documentation and a walkthrough of the codebase and deployment. Ongoing support and maintenance can be arranged as a separate agreement.",
    },
  ],
  projects: [
    {
      question: "What kind of projects do you take on?",
      answer:
        "Web applications, SaaS platforms, APIs and backends, e-commerce systems, and AI features like document processing and RAG pipelines.",
    },
    {
      question: "Do you work with existing codebases?",
      answer:
        "Yes. I can audit, extend or refactor an existing application — after reading the code I'll tell you plainly what state it's in and what I'd change first.",
    },
    {
      question: "How do you handle multi-tenancy and data isolation?",
      answer:
        "Tenant scoping is designed into the data model and enforced at the service layer, with role-based access for owner vs admin situations. It's a first-class concern, not an afterthought.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You do. On completion you receive the full repository, infrastructure configuration and deployment knowledge — no lock-in.",
    },
  ],
};

export const contactSection = {
  tag: "Contact",
  heading: "Let's build something.",
  subtitle:
    "Tell me about your project and I'll reply with questions, a rough scope and next steps.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    projectTypeLabel: "Project type",
    servicesLabel: "Services",
    messageLabel: "Message",
    messagePlaceholder: "What are you building? What should I know?",
    submit: "Send message",
    submitting: "Sending…",
    successTitle: "Message sent",
    successBody: "Thanks — I'll get back to you as soon as I can.",
    errorTitle: "Something went wrong",
    errorBody: "Please try again, or reach out directly by email.",
    requiredHint: "Required",
  },
  cards: [
    { icon: "mail", label: "Email", value: "[Add email]", href: "" },
    { icon: "github", label: "GitHub", value: "[Add URL]", href: "" },
    { icon: "linkedin", label: "LinkedIn", value: "[Add URL]", href: "" },
  ],
};

export const footer = {
  columns: [
    { label: "Navigation", type: "nav" },
    { label: "Social", type: "social" },
    { label: "Legal", type: "legal" },
  ] as const,
  legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
    { label: "Back to top", href: "#top" },
  ],
};
