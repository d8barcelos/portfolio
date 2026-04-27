import type { Identity, Experience, Project, SkillGroup, Education } from "./portfolio";

export const identityPt: Identity = {
  name: "Diogo Barcelos",
  role: "Desenvolvedor Backend",
  positioning:
    "Desenvolvedor backend com foco em C# / .NET, APIs REST escaláveis, microsserviços e cloud. Experiência sólida em Node.js / TypeScript e uma base bem fincada em Java.",
  email: "d8barcelos@gmail.com",
  phone: "+55 (27) 99576-7832",
  location: "Brasil — Remoto",
  socials: {
    github: "https://github.com/d8barcelos",
    linkedin: "https://linkedin.com/in/diogo-barcelos",
    resume: "/resume.pdf",
  },
};

export const aboutPt: readonly string[] = [
  "Eu cuido da metade silenciosa dos produtos — as APIs, serviços, pipelines e a infra que ninguém percebe quando funcionam e que ficam muito barulhentas quando quebram. Meu foco é C# / .NET, mas já entreguei código em produção em Node.js / TypeScript e mantenho uma base sólida de Java de trabalhos anteriores.",
  "Meu trabalho costuma morar nas costuras do sistema: quebrar monolitos legados em microsserviços, desenhar integrações resilientes contra APIs externas instáveis, e subir cobertura de testes em código que ninguém queria encostar. Levo SOLID, clean architecture e testes a sério — testes que pegam regressão de verdade, não só inflam métrica de coverage.",
  "Hoje atuo como Analista Desenvolvedor em sistemas da Petrobras via Global Hitss, e tô terminando uma pós em Arquitetura de Software na FIAP. Quando não tô codando, geralmente tô lendo sobre sistemas distribuídos, mexendo no terminal ou discutindo comigo mesmo sobre como organizar pastas.",
] as const;

export const experiencePt: readonly Experience[] = [
  {
    company: "Petrobras",
    via: "Global Hitss",
    role: "Analista Desenvolvedor",
    location: "Remoto",
    start: "2025-05",
    end: "Present",
    current: true,
    stack: ["C#", ".NET", "SQL Server", "xUnit", "Jenkins", "Git"],
    highlights: [
      "Refatorei módulos críticos de um sistema monolítico legado, isolando responsabilidades e reduzindo acoplamento na camada de domínio.",
      "Migrei features do monolito pra uma arquitetura de microsserviços, coordenando o desenho dos contratos e a ordem dos deploys.",
      "Mantive a cobertura de testes em xUnit dentro do padrão do projeto, sempre priorizando testes que pegam coisa de verdade em vez de teatro de cobertura.",
    ],
  },
  {
    company: "Unidesk",
    role: "Desenvolvedor Backend Pleno",
    location: "Remoto",
    start: "2024-09",
    end: "2025-05",
    current: false,
    stack: ["C#", ".NET 9", "PostgreSQL", "xUnit", "Azure"],
    highlights: [
      "Projetei e mantive APIs REST escaláveis em .NET 9, com Clean Architecture e separação de responsabilidades bem definida.",
      "Construí uma integração resiliente com uma API crítica do mercado imobiliário, processando 100k+ registros em sync diário (retries com Polly, HttpClient, caching).",
      "Liderei uma estratégia contínua de testes unitários que subiu cobertura de forma significativa e deixou produção mais estável.",
    ],
  },
  {
    company: "Simple PM",
    role: "Desenvolvedor Backend Júnior em .NET",
    location: "Remoto",
    start: "2024-02",
    end: "2024-09",
    current: false,
    stack: ["C#", ".NET", "Azure", "Azure DevOps", "Linux", "CI/CD"],
    highlights: [
      "Conduzi a implementação ponta a ponta de um novo módulo de pedidos, do modelo de dados à camada HTTP e aos testes.",
      "Estruturei e automatizei pipelines de CI/CD no Azure DevOps, eliminando passos manuais de release.",
      "Arquitetei e fiz deploy da infra de produção na Azure; implementei hash de senha com BCrypt no fluxo de auth.",
    ],
  },
] as const;

export const projectsPt: readonly Project[] = [
  {
    slug: "dotnet-rpg-game",
    title: ".NET RPG Game",
    tagline: "RPG por texto com CRUD completo de personagens e auth.",
    description:
      "Uma API de RPG por texto com CRUD completo de personagens, autenticação de usuário e autorização baseada em roles. Feito pra exercitar relacionamentos de EF Core, Identity e a separação entre controllers e services.",
    stack: ["C#", ".NET 7", "SQL Server", "Entity Framework"],
    repo: "https://github.com/d8barcelos/dotnet-rpg-game",
    featured: true,
    year: 2024,
  },
  {
    slug: "requests-api",
    title: "Requests API",
    tagline: "API REST com MongoDB, cache em Redis e auth via JWT.",
    description:
      "Uma API REST apoiada em MongoDB, com camada de cache em Redis, autenticação via JWT e autorização por roles. Foco em endpoints de leitura pesada e estratégia de invalidação de cache.",
    stack: ["C#", ".NET", "MongoDB", "Redis", "JWT"],
    repo: "https://github.com/d8barcelos/requests-api",
    featured: true,
    year: 2024,
  },
] as const;

export const skillsPt: readonly SkillGroup[] = [
  {
    label: "Linguagens",
    items: ["C#", "TypeScript", "JavaScript", "Java", "SQL"],
  },
  {
    label: "Frameworks",
    items: [".NET 6 / 7 / 8 / 9", "ASP.NET Core", "EF Core", "Node.js", "Angular"],
  },
  {
    label: "Arquitetura",
    items: ["APIs REST", "Microsserviços", "SOLID", "Clean Code", "Design Patterns"],
  },
  {
    label: "Bancos de dados",
    items: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Azure", "Azure DevOps", "Jenkins", "Git", "CI/CD", "Linux"],
  },
  { label: "Qualidade", items: ["xUnit", "TDD", "Cobertura de testes"] },
  { label: "Metodologias", items: ["Scrum", "Agile", "Kanban"] },
] as const;

export const educationPt: readonly Education[] = [
  {
    school: "FIAP",
    degree: "Pós em Arquitetura de Software",
    start: "2025-02",
    end: "2026-02",
  },
  {
    school: "UNINTER",
    degree: "Análise e Desenvolvimento de Sistemas",
    start: "2022-08",
    end: "2025-02",
  },
] as const;
