import { fetchContributions } from "@/lib/github";
import { HeatmapView } from "@/components/heatmap-view";

export async function GitHubHeatmap() {
  const stats = await fetchContributions();
  return <HeatmapView stats={stats} />;
}
