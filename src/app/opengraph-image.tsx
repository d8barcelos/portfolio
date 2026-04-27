import { ImageResponse } from "next/og";
import { identity } from "@/data/portfolio";

export const runtime = "edge";
export const alt = "Diogo Barcelos — Back-end Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse at top, rgba(255,176,0,0.15), transparent 60%), #0f0f11",
          color: "#fafafa",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "ui-monospace, monospace",
            fontSize: 20,
            color: "#a1a1aa",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "1px solid #27272a",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffb000",
              fontWeight: 700,
            }}
          >
            d8
          </span>
          <span style={{ color: "#fafafa" }}>diogo</span>
          <span style={{ color: "#ffb000" }}>.</span>
          <span>dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "ui-monospace, monospace",
              fontSize: 18,
              color: "#a1a1aa",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#ffb000" }}>●</span>
            Back-end Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {identity.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#d4d4d8",
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            C# / .NET · Microservices · Cloud. Building the quiet half of
            products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, monospace",
            fontSize: 16,
            color: "#71717a",
          }}
        >
          <span>{"// press ⌘K when you arrive"}</span>
          <span>github.com/d8barcelos</span>
        </div>
      </div>
    ),
    size,
  );
}
