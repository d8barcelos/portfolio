import type { Locale } from "@/lib/i18n";
import {
  identityPt,
  aboutPt,
  experiencePt,
  projectsPt,
  skillsPt,
  educationPt,
} from "./portfolio.pt";

export type Identity = {
  name: string;
  role: string;
  positioning: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    resume: string;
  };
};

export type Experience = {
  company: string;
  via?: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  stack: readonly string[];
  highlights: readonly string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: readonly string[];
  repo?: string;
  demo?: string;
  featured: boolean;
  year: number;
};

export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
};

export const identity: Identity = {
  name: "Diogo Barcelos",
  role: "Back-end Developer",
  positioning:
    "Back-end developer focused on C# / .NET, scalable REST APIs, microservices and cloud. Complementary hands-on experience with Node.js / TypeScript and a solid Java foundation.",
  email: "d8barcelos@gmail.com",
  phone: "+55 (27) 99576-7832",
  location: "Brazil — Remote",
  socials: {
    github: "https://github.com/d8barcelos",
    linkedin: "https://linkedin.com/in/diogo-barcelos",
    resume: "/resume.pdf",
  },
};

export const about: readonly string[] = [
  "I build the quiet half of products — the APIs, services, pipelines and infrastructure that stay out of the way when they work and become very loud when they don't. My focus is C# / .NET, but I've shipped production code in Node.js / TypeScript and keep a solid Java foundation from earlier work.",
  "My work tends to live at the seams: refactoring legacy monoliths into microservices, designing resilient integrations against flaky upstreams, and raising test coverage on systems that nobody wanted to touch. I care about SOLID, clean architecture, and tests that actually catch regressions — not just lift a coverage number.",
  "I'm currently a Developer Analyst working on Petrobras systems via Global Hitss, and I'm finishing a postgraduate in Software Architecture at FIAP. When I'm not writing code, I'm usually reading about distributed systems, tuning my terminal, or arguing with myself about folder structures.",
] as const;

export const experience: readonly Experience[] = [
  {
    company: "Petrobras",
    via: "Global Hitss",
    role: "Developer Analyst",
    location: "Remote",
    start: "2025-05",
    end: "Present",
    current: true,
    stack: ["C#", ".NET", "SQL Server", "xUnit", "Jenkins", "Git"],
    highlights: [
      "Refactored critical modules of a legacy monolithic system, isolating responsibilities and reducing coupling across the domain layer.",
      "Migrated monolith features to a microservices architecture, coordinating contract design and deployment sequencing.",
      "Maintained xUnit test coverage in line with project standards, with a bias toward meaningful tests over coverage theatre.",
    ],
  },
  {
    company: "Unidesk",
    role: "Mid-level Back-end Developer",
    location: "Remote",
    start: "2024-09",
    end: "2025-05",
    current: false,
    stack: ["C#", ".NET 9", "PostgreSQL", "xUnit", "Azure"],
    highlights: [
      "Designed and maintained scalable REST APIs on .NET 9, with Clean Architecture and strict separation of concerns.",
      "Built a resilient integration with a critical real-estate API, processing 100k+ records via daily sync (Polly retries, HttpClient, caching).",
      "Led a continuous unit-testing strategy that meaningfully raised coverage and production stability.",
    ],
  },
  {
    company: "Simple PM",
    role: "Junior .NET Back-end Developer",
    location: "Remote",
    start: "2024-02",
    end: "2024-09",
    current: false,
    stack: ["C#", ".NET", "Azure", "Azure DevOps", "Linux", "CI/CD"],
    highlights: [
      "Led end-to-end implementation of a new orders module, from data model to HTTP surface to tests.",
      "Structured and automated CI/CD pipelines on Azure DevOps, cutting manual release steps.",
      "Architected and deployed production infrastructure on Azure; implemented BCrypt password hashing on the auth path.",
    ],
  },
] as const;

export const projects: readonly Project[] = [
  {
    slug: "dotnet-rpg-game",
    title: ".NET RPG Game",
    tagline: "Text-based RPG with full character CRUD and auth.",
    description:
      "A text-based RPG API with full character CRUD, user authentication, and role-based authorization. Built to exercise EF Core relationships, identity, and clean controller/service layering.",
    stack: ["C#", ".NET 7", "SQL Server", "Entity Framework"],
    repo: "https://github.com/d8barcelos/dotnet-rpg-game",
    featured: true,
    year: 2024,
  },
  {
    slug: "requests-api",
    title: "Requests API",
    tagline: "MongoDB-backed REST API with Redis caching and JWT auth.",
    description:
      "A REST API backed by MongoDB, with a Redis caching layer, JWT authentication, and role-based authorization. Focused on read-heavy endpoints and cache invalidation strategy.",
    stack: ["C#", ".NET", "MongoDB", "Redis", "JWT"],
    repo: "https://github.com/d8barcelos/requests-api",
    featured: true,
    year: 2024,
  },
] as const;

export const skills: readonly SkillGroup[] = [
  {
    label: "Languages",
    items: ["C#", "TypeScript", "JavaScript", "Java", "SQL"],
  },
  {
    label: "Frameworks",
    items: [
      ".NET 6 / 7 / 8 / 9",
      "ASP.NET Core",
      "EF Core",
      "Node.js",
      "Angular",
    ],
  },
  {
    label: "Architecture",
    items: [
      "REST APIs",
      "Microservices",
      "SOLID",
      "Clean Code",
      "Design Patterns",
    ],
  },
  {
    label: "Databases",
    items: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS",
      "Azure",
      "Azure DevOps",
      "Jenkins",
      "Git",
      "CI/CD",
      "Linux",
    ],
  },
  { label: "Quality", items: ["xUnit", "TDD", "Code coverage"] },
  { label: "Methodologies", items: ["Scrum", "Agile", "Kanban"] },
] as const;

export const education: readonly Education[] = [
  {
    school: "FIAP",
    degree: "Postgraduate in Software Architecture",
    start: "2025-02",
    end: "2026-02",
  },
  {
    school: "UNINTER",
    degree: "Systems Analysis and Development",
    start: "2022-08",
    end: "2025-02",
  },
] as const;

export type PortfolioContent = {
  identity: Identity;
  about: readonly string[];
  experience: readonly Experience[];
  projects: readonly Project[];
  skills: readonly SkillGroup[];
  education: readonly Education[];
};

const portfolioByLocale: Record<Locale, PortfolioContent> = {
  en: { identity, about, experience, projects, skills, education },
  pt: {
    identity: identityPt,
    about: aboutPt,
    experience: experiencePt,
    projects: projectsPt,
    skills: skillsPt,
    education: educationPt,
  },
};

export function getPortfolio(locale: Locale): PortfolioContent {
  return portfolioByLocale[locale];
}
