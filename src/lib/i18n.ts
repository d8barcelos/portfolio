export type Locale = "en" | "pt";

export const LOCALES: readonly Locale[] = ["en", "pt"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "portfolio-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "pt";
}

export function detectInitialLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const fromAttr = document.documentElement.dataset.locale;
  if (isLocale(fromAttr)) return fromAttr;
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // no-op
  }
  if (typeof navigator !== "undefined") {
    const lang = navigator.language?.toLowerCase() ?? "";
    if (lang.startsWith("pt")) return "pt";
  }
  return DEFAULT_LOCALE;
}

type StringsShape = {
  header: {
    paletteLabel: string;
    paletteAria: string;
    skipToContent: string;
    themeAriaLight: string;
    themeAriaDark: string;
    localeAria: (next: Locale) => string;
  };
  hero: {
    available: string;
    cta: { contact: string; resume: string };
    paletteHint: string;
  };
  sections: {
    about: { index: string; label: string; title: string };
    experience: {
      index: string;
      label: string;
      title: string;
      description: string;
      via: string;
    };
    activity: {
      index: string;
      label: string;
      title: string;
      description: string;
    };
    projects: {
      index: string;
      label: string;
      title: string;
      description: string;
      featured: string;
      lab: string;
      source: string;
      demo: string;
      readCaseStudy: string;
      cardAria: (title: string) => string;
    };
    skills: { index: string; label: string; title: string; description: string };
    contact: {
      index: string;
      label: string;
      title: string;
      description: string;
      body: string;
      sendEmail: string;
    };
  };
  about: {
    nowLabel: string;
    educationLabel: string;
  };
  footer: {
    viewSource: string;
    builtWith: string;
  };
  copyEmail: { copy: string; copied: string; aria: (email: string) => string };
  palette: {
    placeholder: string;
    empty: { prefix: string; suffix: string };
    groupNav: string;
    groupActions: string;
    goTo: (label: string) => string;
    themeToLight: string;
    themeToDark: string;
    hackerEnable: string;
    hackerDisable: string;
    hackerHint: string;
    copyEmail: string;
    emailMe: string;
    openResume: string;
    resumeHint: string;
    openGithub: string;
    openLinkedin: string;
    openUses: string;
    usesHint: string;
    shortcuts: string;
    switchLocale: (next: Locale) => string;
    footHints: { navigate: string; run: string; toggle: string };
  };
  shortcuts: {
    title: string;
    description: string;
    groups: { palette: string; navigation: string; hacker: string };
    rows: {
      openPalette: string;
      openShortcuts: string;
      closeDialog: string;
      nextSection: string;
      prevSection: string;
      jumpTo: (label: string) => string;
      toggleShell: string;
      shellHistory: string;
      clearShell: string;
    };
  };
  heatmap: {
    last12: string;
    contributions: (n: string) => { lead: string; trail: string };
    aria: (n: number) => string;
    statMaxDay: string;
    statCurrentStreak: string;
    statLongestStreak: string;
    streakUnit: string;
    less: string;
    more: string;
    liveVia: string;
    placeholderPrefix: string;
    placeholderSuffix: string;
    cellNone: (date: string) => string;
    cellSome: (n: number, date: string) => string;
    months: readonly string[];
    days: readonly [string, string, string];
  };
  nav: Record<
    "hero" | "about" | "experience" | "activity" | "projects" | "skills" | "contact",
    string
  >;
  now: { working: string; studying: string; reading: string; listening: string };
  project: {
    backLink: string;
    caseStudyTag: string;
    sourceOnGithub: string;
    liveDemo: string;
  };
  uses: {
    backLink: string;
    title: string;
    intro: { lead: string; suffix: string };
    sections: {
      hardware: { title: string; items: { label: string; value: string }[] };
      editor: {
        title: string;
        note: string;
        items: { label: string; value: string }[];
      };
      terminal: { title: string; items: { label: string; value: string }[] };
      keyboard: { title: string; items: { label: string; value: string }[] };
      daily: { title: string; items: { label: string; value: string }[] };
    };
  };
  dates: { present: string; locale: string };
};

export const ui: Record<Locale, StringsShape> = {
  en: {
    header: {
      paletteLabel: "palette",
      paletteAria: "Open command palette",
      skipToContent: "Skip to content",
      themeAriaLight: "Switch to light theme",
      themeAriaDark: "Switch to dark theme",
      localeAria: (next) =>
        next === "pt" ? "Mudar para português" : "Switch to English",
    },
    hero: {
      available: "available for back-end & architecture work",
      cta: { contact: "Get in touch", resume: "Résumé" },
      paletteHint: "press",
    },
    sections: {
      about: {
        index: "01",
        label: "About",
        title: "Back-end by focus, architecture by curiosity.",
      },
      experience: {
        index: "02",
        label: "Experience",
        title: "Where I've shipped.",
        description:
          "Remote-first .NET roles, each one a deliberate step deeper into architecture.",
        via: "via",
      },
      activity: {
        index: "03",
        label: "Activity",
        title: "Shipped lately.",
        description: "A year of public commits, pulled live from GitHub.",
      },
      projects: {
        index: "04",
        label: "Projects",
        title: "Selected work.",
        description:
          "Side projects I've used to stress-test patterns I care about. Click a card for the full case study.",
        featured: "featured",
        lab: "lab",
        source: "source",
        demo: "demo",
        readCaseStudy: "read case study →",
        cardAria: (title) => `Open case study for ${title}`,
      },
      skills: {
        index: "05",
        label: "Skills",
        title: "The toolbox.",
        description:
          "Opinionated picks, not a kitchen sink. If it's here, I've shipped with it.",
      },
      contact: {
        index: "06",
        label: "Contact",
        title: "Let's talk.",
        description:
          "I read every message. Best for back-end, architecture, and any-tech questions — quickest replies over email.",
        body: "Got a project, a tricky migration, or just want to compare notes on .NET, microservices, or architecture? My inbox is open.",
        sendEmail: "Send an email",
      },
    },
    about: { nowLabel: "now", educationLabel: "education" },
    footer: {
      viewSource: "view source",
      builtWith: "built with Next.js · deployed on Vercel",
    },
    copyEmail: {
      copy: "copy",
      copied: "copied",
      aria: (email) => `Copy email ${email}`,
    },
    palette: {
      placeholder: "Type a command or search…",
      empty: { prefix: "No matches. Try ", suffix: ", or theme." },
      groupNav: "Navigation",
      groupActions: "Actions",
      goTo: (label) => `Go to ${label}`,
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
      hackerEnable: "Enable hacker mode",
      hackerDisable: "Disable hacker mode",
      hackerHint: "crt · green on black",
      copyEmail: "Copy email",
      emailMe: "Email me",
      openResume: "Open résumé",
      resumeHint: "pdf",
      openGithub: "Open GitHub",
      openLinkedin: "Open LinkedIn",
      openUses: "Open /uses page",
      usesHint: "hardware, editor, tools",
      shortcuts: "Keyboard shortcuts",
      switchLocale: (next) =>
        next === "pt" ? "Mudar idioma para português" : "Switch language to English",
      footHints: { navigate: "navigate", run: "run", toggle: "toggle" },
    },
    shortcuts: {
      title: "Keyboard shortcuts",
      description: "vim-flavoured nav, palette everywhere.",
      groups: {
        palette: "Palette & help",
        navigation: "Navigation",
        hacker: "Hacker mode",
      },
      rows: {
        openPalette: "Open command palette",
        openShortcuts: "Open this shortcuts dialog",
        closeDialog: "Close any dialog",
        nextSection: "Next section",
        prevSection: "Previous section",
        jumpTo: (label) => `Jump to ${label}`,
        toggleShell: "Show / hide terminal (while hacker mode is on)",
        shellHistory: "Shell history",
        clearShell: "Clear shell",
      },
    },
    heatmap: {
      last12: "last 12 months",
      contributions: (n) => ({ lead: n, trail: " contributions on GitHub" }),
      aria: (n) => `GitHub contribution heatmap — ${n} contributions in the last year.`,
      statMaxDay: "max/day",
      statCurrentStreak: "current streak",
      statLongestStreak: "longest streak",
      streakUnit: "d",
      less: "less",
      more: "more",
      liveVia: "live via",
      placeholderPrefix: "placeholder — set ",
      placeholderSuffix: " to enable live data",
      cellNone: (date) => `No contributions on ${date}`,
      cellSome: (n, date) =>
        `${n} contribution${n === 1 ? "" : "s"} on ${date}`,
      months: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
      days: ["mon", "wed", "fri"],
    },
    nav: {
      hero: "Home",
      about: "About",
      experience: "Experience",
      activity: "Activity",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    now: {
      working: "Working at",
      studying: "Studying at",
      reading: "Reading",
      listening: "Listening",
    },
    project: {
      backLink: "back to projects",
      caseStudyTag: "case study",
      sourceOnGithub: "source on GitHub",
      liveDemo: "live demo",
    },
    uses: {
      backLink: "back home",
      title: "What I use, day to day.",
      intro: {
        lead: "Inspired by ",
        suffix:
          ". Tools I've actually adopted, not aspirational ones. This page drifts over time — last refresh whenever the editor did.",
      },
      sections: {
        hardware: {
          title: "Hardware",
          items: [
            { label: "Laptop", value: "Personal dev machine · Windows 11 + WSL2" },
            { label: "Monitor", value: "External 27\" · set to 1440p, scaled typography" },
            { label: "Audio", value: "Wired over wireless, every time" },
          ],
        },
        editor: {
          title: "Editor",
          note: "The editor is where I live most of the day.",
          items: [
            { label: "IDE", value: "Visual Studio + Rider for .NET · VS Code for everything else" },
            { label: "Theme", value: "Dark, low contrast, amber accent where possible" },
            { label: "Font", value: "Geist Mono / JetBrains Mono, 14px, ligatures on" },
          ],
        },
        terminal: {
          title: "Terminal",
          items: [
            { label: "Shell", value: "bash (git-bash) + WSL for anything Linux-flavoured" },
            { label: "Prompt", value: "Minimal, one-line, branch + dirty indicator" },
            { label: "Multiplexer", value: "tmux when a session lasts longer than an hour" },
          ],
        },
        keyboard: {
          title: "Keyboard",
          items: [
            { label: "Layout", value: "US International · PT-BR dead keys without fighting the compiler" },
            { label: "Shortcuts", value: "vim-flavoured everywhere I can make it stick" },
          ],
        },
        daily: {
          title: "Daily tools",
          items: [
            { label: "Notes", value: "Obsidian for anything that needs to survive a week" },
            { label: "Browser", value: "Arc / Edge, split on work vs personal profiles" },
            { label: "API client", value: "Bruno — plain-text collections, git-friendly" },
            { label: "DB client", value: "DBeaver for heavy work · psql for quick checks" },
          ],
        },
      },
    },
    dates: { present: "Present", locale: "en-US" },
  },
  pt: {
    header: {
      paletteLabel: "paleta",
      paletteAria: "Abrir paleta de comandos",
      skipToContent: "Pular para o conteúdo",
      themeAriaLight: "Mudar para tema claro",
      themeAriaDark: "Mudar para tema escuro",
      localeAria: (next) =>
        next === "pt" ? "Mudar para português" : "Switch to English",
    },
    hero: {
      available: "aberto a projetos de backend e arquitetura",
      cta: { contact: "Conversar", resume: "Currículo" },
      paletteHint: "tecla",
    },
    sections: {
      about: {
        index: "01",
        label: "Sobre",
        title: "Backend por escolha, arquitetura por curiosidade.",
      },
      experience: {
        index: "02",
        label: "Experiência",
        title: "Por onde já passei.",
        description:
          "Funções em .NET, todas remotas, cada uma um passo mais fundo na arquitetura.",
        via: "via",
      },
      activity: {
        index: "03",
        label: "Atividade",
        title: "O que saiu pro ar.",
        description: "Um ano de commits públicos, puxado em tempo real do GitHub.",
      },
      projects: {
        index: "04",
        label: "Projetos",
        title: "Trabalhos selecionados.",
        description:
          "Projetos paralelos que usei pra estressar padrões que me interessam. Clica num card pra ver o case completo.",
        featured: "destaque",
        lab: "lab",
        source: "código",
        demo: "demo",
        readCaseStudy: "ver case completo →",
        cardAria: (title) => `Abrir case do projeto ${title}`,
      },
      skills: {
        index: "05",
        label: "Skills",
        title: "A caixa de ferramentas.",
        description:
          "Escolhas com critério, não lista pra inglês ver. Se tá aqui, já entreguei algo com isso.",
      },
      contact: {
        index: "06",
        label: "Contato",
        title: "Bora conversar.",
        description:
          "Leio todas as mensagens. Funciona pra backend, arquitetura ou qualquer dúvida técnica — respondo mais rápido por e-mail.",
        body: "Tem um projeto, uma migração complicada, ou só quer trocar uma ideia sobre .NET, microsserviços ou arquitetura? Minha caixa de entrada tá aberta.",
        sendEmail: "Mandar e-mail",
      },
    },
    about: { nowLabel: "agora", educationLabel: "formação" },
    footer: {
      viewSource: "ver código",
      builtWith: "feito com Next.js · deploy na Vercel",
    },
    copyEmail: {
      copy: "copiar",
      copied: "copiado",
      aria: (email) => `Copiar e-mail ${email}`,
    },
    palette: {
      placeholder: "Digite um comando ou pesquise…",
      empty: { prefix: "Nada encontrado. Tenta ", suffix: " ou theme." },
      groupNav: "Navegação",
      groupActions: "Ações",
      goTo: (label) => `Ir pra ${label}`,
      themeToLight: "Mudar para tema claro",
      themeToDark: "Mudar para tema escuro",
      hackerEnable: "Ativar modo hacker",
      hackerDisable: "Desativar modo hacker",
      hackerHint: "crt · verde no preto",
      copyEmail: "Copiar e-mail",
      emailMe: "Mandar e-mail",
      openResume: "Abrir currículo",
      resumeHint: "pdf",
      openGithub: "Abrir GitHub",
      openLinkedin: "Abrir LinkedIn",
      openUses: "Abrir página /uses",
      usesHint: "setup, editor, ferramentas",
      shortcuts: "Atalhos de teclado",
      switchLocale: (next) =>
        next === "pt" ? "Mudar idioma para português" : "Switch language to English",
      footHints: { navigate: "navegar", run: "executar", toggle: "abrir/fechar" },
    },
    shortcuts: {
      title: "Atalhos de teclado",
      description: "navegação estilo vim, paleta em todo lugar.",
      groups: {
        palette: "Paleta & ajuda",
        navigation: "Navegação",
        hacker: "Modo hacker",
      },
      rows: {
        openPalette: "Abrir paleta de comandos",
        openShortcuts: "Abrir esta janela de atalhos",
        closeDialog: "Fechar qualquer modal",
        nextSection: "Próxima seção",
        prevSection: "Seção anterior",
        jumpTo: (label) => `Pular pra ${label}`,
        toggleShell: "Mostrar / esconder terminal (com modo hacker ativo)",
        shellHistory: "Histórico do shell",
        clearShell: "Limpar shell",
      },
    },
    heatmap: {
      last12: "últimos 12 meses",
      contributions: (n) => ({ lead: n, trail: " contribuições no GitHub" }),
      aria: (n) =>
        `Mapa de contribuições do GitHub — ${n} contribuições no último ano.`,
      statMaxDay: "máx/dia",
      statCurrentStreak: "sequência atual",
      statLongestStreak: "maior sequência",
      streakUnit: "d",
      less: "menos",
      more: "mais",
      liveVia: "ao vivo via",
      placeholderPrefix: "placeholder — defina ",
      placeholderSuffix: " para puxar dados reais",
      cellNone: (date) => `Sem contribuições em ${date}`,
      cellSome: (n, date) =>
        `${n} contribuiç${n === 1 ? "ão" : "ões"} em ${date}`,
      months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
      days: ["seg", "qua", "sex"],
    },
    nav: {
      hero: "Início",
      about: "Sobre",
      experience: "Experiência",
      activity: "Atividade",
      projects: "Projetos",
      skills: "Skills",
      contact: "Contato",
    },
    now: {
      working: "Trabalhando em",
      studying: "Estudando em",
      reading: "Lendo",
      listening: "Ouvindo",
    },
    project: {
      backLink: "voltar pra projetos",
      caseStudyTag: "case study",
      sourceOnGithub: "código no GitHub",
      liveDemo: "demo ao vivo",
    },
    uses: {
      backLink: "voltar pro início",
      title: "O que uso no dia a dia.",
      intro: {
        lead: "Inspirado em ",
        suffix:
          ". Ferramentas que adotei de verdade, não aspiracionais. Esta página vai mudando — última atualização junto com a do editor.",
      },
      sections: {
        hardware: {
          title: "Hardware",
          items: [
            { label: "Notebook", value: "Máquina pessoal · Windows 11 + WSL2" },
            { label: "Monitor", value: "Externo de 27\" · 1440p, tipografia escalada" },
            { label: "Áudio", value: "Cabo em vez de wireless, sempre" },
          ],
        },
        editor: {
          title: "Editor",
          note: "O editor é onde eu passo a maior parte do dia.",
          items: [
            { label: "IDE", value: "Visual Studio + Rider pra .NET · VS Code pro resto" },
            { label: "Tema", value: "Escuro, baixo contraste, accent amber onde rolar" },
            { label: "Fonte", value: "Geist Mono / JetBrains Mono, 14px, ligaturas ligadas" },
          ],
        },
        terminal: {
          title: "Terminal",
          items: [
            { label: "Shell", value: "bash (git-bash) + WSL pra qualquer coisa Linux" },
            { label: "Prompt", value: "Minimalista, uma linha, branch + indicador de dirty" },
            { label: "Multiplexer", value: "tmux quando uma sessão dura mais de uma hora" },
          ],
        },
        keyboard: {
          title: "Teclado",
          items: [
            { label: "Layout", value: "US Internacional · acentos PT-BR sem brigar com o compilador" },
            { label: "Atalhos", value: "estilo vim em todo lugar que eu consigo fixar" },
          ],
        },
        daily: {
          title: "Ferramentas do dia",
          items: [
            { label: "Notas", value: "Obsidian pra qualquer coisa que precisa sobreviver uma semana" },
            { label: "Browser", value: "Arc / Edge, com perfis separados pra trabalho e pessoal" },
            { label: "Cliente HTTP", value: "Bruno — coleções em texto plano, amigáveis ao git" },
            { label: "Cliente de DB", value: "DBeaver pro pesado · psql pra checagem rápida" },
          ],
        },
      },
    },
    dates: { present: "Atual", locale: "pt-BR" },
  },
};

export type UI = StringsShape;
