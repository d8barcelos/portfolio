import { Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const items = [
  { href: identity.socials.github, label: "GitHub", Icon: Github },
  { href: identity.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${identity.email}`, label: "Email", Icon: Mail },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul
      className={cn("flex items-center gap-1", className)}
      aria-label="Social links"
    >
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            className="group inline-flex size-9 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-accent"
          >
            <Icon className="size-4 transition-transform group-hover:scale-110" />
          </a>
        </li>
      ))}
    </ul>
  );
}
