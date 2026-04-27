export const siteConfig = {
  name: "Diogo Barcelos",
  title: "Diogo Barcelos — Back-end Developer",
  description:
    "Back-end developer focused on C# / .NET, scalable REST APIs, microservices and cloud.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://diogobarcelos.dev",
  ogImage: "/og.png",
  locale: "en_US",
  author: "Diogo Barcelos",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "d8barcelos",
} as const;

export type SiteConfig = typeof siteConfig;
