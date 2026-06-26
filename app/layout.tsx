import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

/* ------------------------------------------------------------------
   TWO PRIMARY FONT FAMILIES (from the asset fontlist):
   JetBrains Mono -> headers/code aesthetic | Inter -> body & UI.
   ------------------------------------------------------------------ */
const fontDisplay = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-src",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-src",
  display: "swap",
});

const SITE = "https://nexora-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Nexora — Autonomous AI Data Automation Platform",
    template: "%s · Nexora",
  },
  description:
    "Nexora is the next-gen AI platform that automates your entire data pipeline — ingest, enrich, and orchestrate millions of records in real time with zero ops. Start free.",
  keywords: [
    "AI data automation",
    "data pipeline platform",
    "workflow orchestration",
    "AI ETL",
    "real-time data enrichment",
    "no-code automation",
  ],
  authors: [{ name: "Nexora" }],
  creator: "Nexora",
  applicationName: "Nexora",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Nexora",
    title: "Nexora — Autonomous AI Data Automation Platform",
    description:
      "Automate your entire data pipeline with AI. Ingest, enrich, and orchestrate millions of records in real time with zero ops.",
    // og:image is supplied by app/opengraph-image.tsx (generated PNG).
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora — Autonomous AI Data Automation Platform",
    description:
      "Automate your entire data pipeline with AI. Ingest, enrich, and orchestrate millions of records in real time with zero ops.",
    // twitter:image is supplied by app/twitter-image.tsx (generated PNG).
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0e1a21",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
