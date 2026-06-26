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
          background: "linear-gradient(135deg, #080a12 0%, #05060a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#11141f",
              border: "1px solid #232838",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#19e3c2",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ color: "#f4f6fb", fontSize: 40, fontWeight: 700 }}>Nexora</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f4f6fb", fontSize: 74, fontWeight: 700, lineHeight: 1.05 }}>
            Automate your entire
          </div>
          <div style={{ color: "#7c5cff", fontSize: 74, fontWeight: 700, lineHeight: 1.05 }}>
            data pipeline with AI.
          </div>
          <div style={{ color: "#a6adc2", fontSize: 30, marginTop: 26 }}>
            Ingest · Enrich · Orchestrate — millions of records in real time, zero ops.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["300+ connectors", "12ms inference", "99.99% uptime"].map((t) => (
            <div
              key={t}
              style={{
                color: "#19e3c2",
                fontSize: 24,
                fontWeight: 600,
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid #232838",
                background: "#0a0c14",
                display: "flex",
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
