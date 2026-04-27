import { Suspense } from "react";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Experience } from "@/sections/experience";
import { Activity, HeatmapSkeleton } from "@/sections/activity";
import { Projects } from "@/sections/projects";
import { Skills } from "@/sections/skills";
import { Contact } from "@/sections/contact";
import { GitHubHeatmap } from "@/components/github-heatmap";

export default function HomePage() {
  return (
    <main id="main" className="relative">
      <Hero />
      <About />
      <Experience />
      <Activity>
        <Suspense fallback={<HeatmapSkeleton />}>
          <GitHubHeatmap />
        </Suspense>
      </Activity>
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
