/* ============================================================================
   FEATURE 2 — content for the Bento-grid / Accordion.
   The same data drives BOTH layouts (desktop bento + mobile accordion),
   so the active-index context transfers cleanly across the breakpoint.
   `span` controls the bento footprint on desktop only.
   ============================================================================ */

export interface FeatureNode {
  id: string;
  /** Bento grid span on desktop: "lg" = hero tile, "md" = wide, "sm" = unit. */
  span: "lg" | "md" | "sm";
  icon: "flow" | "spark" | "shield" | "graph" | "bolt" | "globe";
  title: string;
  summary: string;
  detail: string;
  metric: { value: string; label: string };
}

export const FEATURES: FeatureNode[] = [
  {
    id: "orchestrate",
    span: "lg",
    icon: "flow",
    title: "Visual flow orchestration",
    summary: "Compose pipelines from 300+ connectors on an infinite canvas.",
    detail:
      "Drag, branch, and fan-out data flows without writing glue code. Nexora compiles your canvas into a fault-tolerant DAG that auto-retries, back-pressures, and scales horizontally as volume spikes.",
    metric: { value: "300+", label: "native connectors" },
  },
  {
    id: "enrich",
    span: "md",
    icon: "spark",
    title: "AI enrichment engine",
    summary: "Classify, dedupe, and label records inline with frontier models.",
    detail:
      "Route each record through the right model automatically — extraction, sentiment, entity-resolution — with streaming results and per-field confidence scores.",
    metric: { value: "12ms", label: "median inference" },
  },
  {
    id: "govern",
    span: "sm",
    icon: "shield",
    title: "Governance & lineage",
    summary: "Full audit trail on every transformation.",
    detail:
      "Column-level lineage, PII masking, and SOC 2 controls baked into the runtime — so compliance is a query, not a quarter-long project.",
    metric: { value: "100%", label: "lineage coverage" },
  },
  {
    id: "observe",
    span: "sm",
    icon: "graph",
    title: "Live observability",
    summary: "Trace throughput and cost in real time.",
    detail:
      "Stream-level metrics, anomaly alerts, and cost attribution per flow — catch a broken upstream before it reaches your warehouse.",
    metric: { value: "<1s", label: "alert latency" },
  },
  {
    id: "deploy",
    span: "md",
    icon: "globe",
    title: "Deploy anywhere",
    summary: "Run managed, in your VPC, or fully on-prem.",
    detail:
      "One control plane, any substrate. Ship the same flows to Nexora Cloud, your own Kubernetes, or an air-gapped on-prem cluster with no code changes.",
    metric: { value: "3", label: "deploy targets" },
  },
];
