/* ============================================================================
   FEATURE 1 — PRICING MATRIX (multi-dimensional config, zero hardcoded UI)
   Every price string rendered in the UI is DERIVED from this matrix via
   computePrice(). Nothing in the markup hardcodes a currency value.

   price = baseRate                       (tier dimension)
         × fx[currency]                   (currency dimension)
         × tariff[currency]               (regional tariff dimension)
         × (annual ? 1 - ANNUAL_DISCOUNT : 1)   (billing-cycle dimension)
   ============================================================================ */

export type CurrencyCode = "USD" | "INR" | "EUR";
export type BillingCycle = "monthly" | "annual";

export interface CurrencyMeta {
  symbol: string;
  /** Foreign-exchange multiplier relative to the USD base rate. */
  fx: number;
  /** Regional tariff variable (tax / purchasing-power / VAT adjustment). */
  tariff: number;
  /** Intl locale used for grouping & symbol placement. */
  locale: string;
  /** Round prices to the nearest step for clean regional figures. */
  step: number;
}

export interface Tier {
  id: string;
  name: string;
  /** Base MONTHLY rate, expressed in USD units, before any dimension. */
  baseRate: number;
  blurb: string;
  highlight?: boolean;
  cta: string;
  features: string[];
}

/** Flat 20% annual discount multiplier (per brief). */
export const ANNUAL_DISCOUNT = 0.2;

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  USD: { symbol: "$", fx: 1, tariff: 1.0, locale: "en-US", step: 1 },
  INR: { symbol: "₹", fx: 83, tariff: 0.85, locale: "en-IN", step: 10 },
  EUR: { symbol: "€", fx: 0.92, tariff: 1.08, locale: "de-DE", step: 1 },
};

export const CURRENCY_ORDER: CurrencyCode[] = ["INR", "USD", "EUR"];

export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    baseRate: 0,
    blurb: "For solo builders validating their first automated pipeline.",
    cta: "Start free",
    features: [
      "Up to 10K records / month",
      "3 active data flows",
      "Community connectors",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    baseRate: 49,
    blurb: "For teams scaling real-time enrichment across products.",
    highlight: true,
    cta: "Start 14-day trial",
    features: [
      "Up to 5M records / month",
      "Unlimited data flows",
      "AI enrichment & dedupe",
      "Priority support + SLA",
      "Role-based access control",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    baseRate: 149,
    blurb: "For data platforms running mission-critical orchestration.",
    cta: "Talk to sales",
    features: [
      "Unlimited records",
      "Dedicated compute lanes",
      "Custom model routing",
      "24/7 solutions engineer",
      "On-prem / VPC deploy",
    ],
  },
];

/** Pure, deterministic price computation across all four dimensions. */
export function computePrice(
  tier: Tier,
  currency: CurrencyCode,
  cycle: BillingCycle
): number {
  const c = CURRENCIES[currency];
  const cycleMultiplier = cycle === "annual" ? 1 - ANNUAL_DISCOUNT : 1;
  const raw = tier.baseRate * c.fx * c.tariff * cycleMultiplier;
  // round to clean regional step
  return Math.round(raw / c.step) * c.step;
}

/** Formats a numeric price into a localized currency string. */
export function formatPrice(value: number, currency: CurrencyCode): string {
  const c = CURRENCIES[currency];
  return new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
}

/** The annual-billing total (what the customer is actually charged / year). */
export function computeAnnualTotal(tier: Tier, currency: CurrencyCode): number {
  return computePrice(tier, currency, "annual") * 12;
}
