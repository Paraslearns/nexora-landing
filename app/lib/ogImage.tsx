import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "Nexora — Autonomous AI Data Automation Platform";

/* Shared branded OG/Twitter card, rendered to PNG at request/build time. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #172b36 0%, #0e1a21 100%)",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#0e1a21",
              border: "1px solid #244853",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffc801",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ color: "#f1f6f4", fontSize: 40, fontWeight: 700 }}>Nexora</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f1f6f4", fontSize: 68, fontWeight: 700, lineHeight: 1.08 }}>
            Automate your entire
          </div>
          <div style={{ color: "#ffc801", fontSize: 68, fontWeight: 700, lineHeight: 1.08 }}>
            data pipeline with AI.
          </div>
          <div style={{ color: "#a7bebc", fontSize: 28, marginTop: 26, fontFamily: "sans-serif" }}>
            Ingest · Enrich · Orchestrate — millions of records in real time, zero ops.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["300+ connectors", "12ms inference", "99.99% uptime"].map((t) => (
            <div
              key={t}
              style={{
                color: "#ff9932",
                fontSize: 24,
                fontWeight: 600,
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid #244853",
                background: "#172b36",
                display: "flex",
                fontFamily: "sans-serif",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize
  );
}
