import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Diogo Barcelos",
    "Back-end developer",
    "C#",
    ".NET",
    "microservices",
    "REST API",
    "software architecture",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f11" },
  ],
  width: "device-width",
  initialScale: 1,
};

const devtoolsGreeting = `
  ┌──────────────────────────────────────────┐
  │                                          │
  │   d8888b.  d8888b.   —   hey, welcome.   │
  │   88  \`8D  88  \`8D       source below.   │
  │   88   88  88oooY'                       │
  │   88   88  88~~~b.                       │
  │   88  .8D  88   8D       press  Cmd+K    │
  │   Y8888D'  Y8888P'       or type  help   │
  │                                          │
  └──────────────────────────────────────────┘
  Source: https://github.com/d8barcelos
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
    >
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script
          dangerouslySetInnerHTML={{
            __html: `/*${devtoolsGreeting}*/`,
          }}
        />
        {/* eslint-disable-next-line react/no-danger */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='portfolio-locale';var s=localStorage.getItem(k);var l=(s==='en'||s==='pt')?s:((navigator.language||'').toLowerCase().indexOf('pt')===0?'pt':'en');document.documentElement.lang=l;document.documentElement.dataset.locale=l;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
          disableTransitionOnChange
        >
          <AppShell>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
            >
              Skip to content
            </a>
            <Header />
            {children}
            <Footer />
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
