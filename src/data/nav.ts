export type NavItem = {
  id: "hero" | "about" | "experience" | "activity" | "projects" | "skills" | "contact";
  key: string;
  href: string;
};

export const navItems: readonly NavItem[] = [
  { id: "hero", key: "h", href: "#hero" },
  { id: "about", key: "a", href: "#about" },
  { id: "experience", key: "e", href: "#experience" },
  { id: "activity", key: "t", href: "#activity" },
  { id: "projects", key: "p", href: "#projects" },
  { id: "skills", key: "s", href: "#skills" },
  { id: "contact", key: "c", href: "#contact" },
] as const;
