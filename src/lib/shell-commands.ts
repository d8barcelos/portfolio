import { identity, projects } from "@/data/portfolio";

export type ShellOutputLine = {
  kind: "stdout" | "stderr" | "input" | "hint";
  text: string;
};

export type ShellEnv = {
  exitHackerMode: () => void;
  clear: () => void;
  goTo: (section: string) => void;
};

type CommandResult = { output: ShellOutputLine[]; side?: "clear" | "exit" };

const out = (text: string): ShellOutputLine => ({ kind: "stdout", text });
const err = (text: string): ShellOutputLine => ({ kind: "stderr", text });
const hint = (text: string): ShellOutputLine => ({ kind: "hint", text });

const helpLines = [
  "available commands:",
  "  help                  show this list",
  "  whoami                print identity",
  "  ls                    list virtual filesystem",
  "  cat <file>            read a file (about.md, contact.txt, skills.txt)",
  "  projects              list projects",
  "  contact               show contact info",
  "  goto <section>        scroll to a section (hero, about, experience, projects, skills, contact)",
  "  theme                 toggle theme (disabled in hacker mode)",
  "  clear                 clear the terminal",
  "  exit                  leave hacker mode",
  "",
  "easter eggs: sudo hire-me · rm -rf /doubts · git blame",
];

const filesystem: Record<string, string[]> = {
  "about.md": [
    "# about",
    "",
    "back-end developer focused on C# / .NET, REST APIs,",
    "microservices, and cloud. currently at petrobras via",
    "global hitss; postgrad at fiap in software architecture.",
  ],
  "contact.txt": [
    `email    ${identity.email}`,
    `github   ${identity.socials.github}`,
    `linkedin ${identity.socials.linkedin}`,
  ],
  "skills.txt": [
    "languages  C#, TypeScript, JavaScript, Java, SQL",
    "frameworks .NET 6/7/8/9, ASP.NET Core, EF Core, Node.js, Angular",
    "databases  SQL Server, PostgreSQL, MongoDB, Redis",
    "cloud      AWS, Azure, Azure DevOps, Jenkins, Linux",
  ],
};

const lsEntries = ["about.md", "contact.txt", "skills.txt", "projects/"];

export function runCommand(raw: string, env: ShellEnv): CommandResult {
  const input = raw.trim();
  if (!input) return { output: [] };

  const [cmd, ...args] = input.split(/\s+/);

  switch (cmd) {
    case "help":
      return { output: helpLines.map(out) };

    case "whoami":
      return {
        output: [
          out(`${identity.name.toLowerCase().replace(/\s+/g, "-")}@portfolio`),
          out(`role     ${identity.role}`),
          out(`location ${identity.location}`),
        ],
      };

    case "ls":
      return { output: [out(lsEntries.join("  "))] };

    case "cat": {
      const file = args[0];
      if (!file) return { output: [err("usage: cat <file>")] };
      const body = filesystem[file];
      if (!body) return { output: [err(`cat: ${file}: no such file`)] };
      return { output: body.map(out) };
    }

    case "projects":
      return {
        output: [
          out("featured:"),
          ...projects.map((p) =>
            out(`  - ${p.slug.padEnd(20)} ${p.tagline}`),
          ),
          hint("tip: goto projects — to scroll the grid in the page."),
        ],
      };

    case "contact":
      return {
        output: [
          out(`email    ${identity.email}`),
          out(`github   ${identity.socials.github}`),
          out(`linkedin ${identity.socials.linkedin}`),
        ],
      };

    case "goto": {
      const section = args[0];
      if (!section) return { output: [err("usage: goto <section>")] };
      const valid = [
        "hero",
        "about",
        "experience",
        "projects",
        "skills",
        "contact",
      ];
      if (!valid.includes(section)) {
        return { output: [err(`unknown section: ${section}`)] };
      }
      env.goTo(section);
      return { output: [hint(`scrolling to #${section} …`)] };
    }

    case "clear":
      env.clear();
      return { output: [], side: "clear" };

    case "exit":
      env.exitHackerMode();
      return { output: [out("logout. see you around.")], side: "exit" };

    case "theme":
      return {
        output: [err("theme toggle disabled while hacker mode is active.")],
      };

    case "sudo": {
      if (args[0] === "hire-me") {
        return {
          output: [
            out("[sudo] password for hr: ****"),
            out("permission granted."),
            out(`→ drafting offer... please email ${identity.email}.`),
          ],
        };
      }
      return { output: [err(`sudo: ${args.join(" ") || "command"}: not found`)] };
    }

    case "rm": {
      if (args.join(" ") === "-rf /doubts") {
        return {
          output: [
            out("rm: removing '/doubts' ..."),
            out("rm: 248 files purged."),
            out("confidence restored."),
          ],
        };
      }
      return {
        output: [err("rm: operation requires hazard pay. try a safer path.")],
      };
    }

    case "git": {
      if (args[0] === "blame") {
        return {
          output: [
            out("commit d8b4rc3l0s                                                                      "),
            out(`Author: ${identity.name} <${identity.email}>`),
            out("Date:   the night before a deadline"),
            out(""),
            out("    it was me. i wrote the bug. i also fixed it. we move."),
          ],
        };
      }
      return { output: [err(`git: '${args[0] ?? ""}' is not a git command`)] };
    }

    default:
      return {
        output: [err(`command not found: ${cmd}. try 'help'.`)],
      };
  }
}

export { hint, out, err };
