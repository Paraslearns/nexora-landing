"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  TIERS,
  CURRENCIES,
  CURRENCY_ORDER,
  type CurrencyCode,
  type BillingCycle,
  computePrice,
  computeAnnualTotal,
  formatPrice,
} from "../lib/pricing";
import { CheckIcon, ChevronIcon, ArrowIcon } from "./Icons";

/* ----------------------------------------------------------------------------
   FEATURE 1 — Performance-isolated multi-currency pricing.

   STATE ISOLATION GUARANTEE: this component holds NO React state. Currency and
   billing live in refs; toggling them mutates ONLY the targeted price text
   nodes (and the controls' own active markers) via direct DOM writes. React
   never re-renders this component or any parent, so the rest of the page does
   not reflow. The initial USD/monthly strings are server-rendered, so the
   prices are real, crawlable text in the HTML.
   ---------------------------------------------------------------------------- */

const DEFAULT_CURRENCY: CurrencyCode = "USD";
const DEFAULT_CYCLE: BillingCycle = "monthly";

function priceLabel(tierIndex: number, currency: CurrencyCode, cycle: BillingCycle) {
  const tier = TIERS[tierIndex];
  if (tier.baseRate === 0) {
    return { amount: "Free", period: "forever", note: "No credit card required" };
  }
  const amount = formatPrice(computePrice(tier, currency, cycle), currency);
  if (cycle === "annual") {
    const total = formatPrice(computeAnnualTotal(tier, currency), currency);
    return { amount, period: "/mo", note: `Billed ${total} per year` };
  }
  const annualMonthly = formatPrice(computePrice(tier, currency, "annual"), currency);
  return { amount, period: "/mo", note: `or ${annualMonthly}/mo billed annually` };
}

export default function Pricing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<CurrencyCode>(DEFAULT_CURRENCY);
  const cycleRef = useRef<BillingCycle>(DEFAULT_CYCLE);
  const menuOpenRef = useRef(false);

  // Imperatively repaint every price text node from the matrix. No setState.
  const applyPricing = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const currency = curRef.current;
    const cycle = cycleRef.current;

    TIERS.forEach((tier, i) => {
      const { amount, period, note } = priceLabel(i, currency, cycle);
      const set = (kind: string, text: string) => {
        const el = root.querySelector<HTMLElement>(
          `[data-price="${kind}"][data-tier="${tier.id}"]`
        );
        if (el) el.textContent = text;
      };
      set("amount", amount);
      set("period", period);
      set("note", note);
    });
  }, []);

  const setCycle = useCallback(
    (cycle: BillingCycle) => {
      if (cycleRef.current === cycle) return;
      cycleRef.current = cycle;
      const seg = rootRef.current?.querySelector<HTMLElement>("[data-billing]");
      if (seg) {
        seg.dataset.billing = cycle;
        seg.querySelectorAll<HTMLButtonElement>("button[data-cycle]").forEach((b) => {
          b.setAttribute("aria-pressed", String(b.dataset.cycle === cycle));
        });
      }
      applyPricing();
    },
    [applyPricing]
  );

  const closeMenu = useCallback(() => {
    menuOpenRef.current = false;
    const dd = rootRef.current?.querySelector<HTMLElement>("[data-currency-dd]");
    if (dd) {
      dd.dataset.open = "false";
      dd.querySelector<HTMLButtonElement>("[data-dd-trigger]")?.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }, []);

  const setCurrency = useCallback(
    (currency: CurrencyCode) => {
      curRef.current = currency;
      const root = rootRef.current;
      if (root) {
        const label = root.querySelector<HTMLElement>("[data-dd-label]");
        if (label) label.textContent = `${CURRENCIES[currency].symbol} ${currency}`;
        root.querySelectorAll<HTMLElement>("[data-dd-option]").forEach((o) => {
          o.setAttribute("aria-selected", String(o.dataset.ddOption === currency));
        });
      }
      applyPricing();
      closeMenu();
    },
    [applyPricing, closeMenu]
  );

  const toggleMenu = useCallback(() => {
    const dd = rootRef.current?.querySelector<HTMLElement>("[data-currency-dd]");
    if (!dd) return;
    menuOpenRef.current = !menuOpenRef.current;
    dd.dataset.open = String(menuOpenRef.current);
    dd.querySelector<HTMLButtonElement>("[data-dd-trigger]")?.setAttribute(
      "aria-expanded",
      String(menuOpenRef.current)
    );
  }, []);

  // Outside-click & Escape close the currency menu. Listener only — no state.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!menuOpenRef.current) return;
      const dd = rootRef.current?.querySelector("[data-currency-dd]");
      if (dd && !dd.contains(e.target as Node)) closeMenu();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpenRef.current) closeMenu();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [closeMenu]);

  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="shell" ref={rootRef}>
        <header className="sec-head pricing__head" data-reveal>
          <p className="eyebrow"><span className="dot" /> Pricing</p>
          <h2 id="pricing-title" className="section-title">
            Scale-priced for <span className="grad-text">every region</span>
          </h2>
          <p className="muted sec-head__sub">
            Switch currency and billing cycle — prices recompute instantly from a
            single pricing matrix. Annual saves a flat 20%.
          </p>

          {/* ---- Isolated controls ---- */}
          <div className="pricing__controls" data-reveal>
            <div className="seg" data-billing={DEFAULT_CYCLE} role="group" aria-label="Billing cycle">
              <span className="seg__thumb" aria-hidden />
              <button
                type="button"
                data-cycle="monthly"
                aria-pressed={DEFAULT_CYCLE === "monthly"}
                onClick={() => setCycle("monthly")}
              >
                Monthly
              </button>
              <button
                type="button"
                data-cycle="annual"
                aria-pressed={DEFAULT_CYCLE === "annual"}
                onClick={() => setCycle("annual")}
              >
                Annual <span className="seg__save">−20%</span>
              </button>
            </div>

            <div className="cdd" data-currency-dd data-open="false">
              <button
                type="button"
                className="cdd__trigger"
                data-dd-trigger
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-label="Select currency"
                onClick={toggleMenu}
              >
                <span data-dd-label>
                  {CURRENCIES[DEFAULT_CURRENCY].symbol} {DEFAULT_CURRENCY}
                </span>
                <ChevronIcon className="cdd__chev" />
              </button>
              <ul className="cdd__menu" role="listbox" aria-label="Currency">
                {CURRENCY_ORDER.map((code) => (
                  <li
                    key={code}
                    role="option"
                    data-dd-option={code}
                    aria-selected={code === DEFAULT_CURRENCY}
                  >
                    <button type="button" onClick={() => setCurrency(code)}>
                      <span className="cdd__sym">{CURRENCIES[code].symbol}</span>
                      {code}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <div className="tiers" data-reveal>
          {TIERS.map((tier, i) => {
            const init = priceLabel(i, DEFAULT_CURRENCY, DEFAULT_CYCLE);
            return (
              <article
                key={tier.id}
                className={`tier ${tier.highlight ? "tier--hot" : ""}`}
              >
                {tier.highlight && <span className="tier__badge">Most popular</span>}
                <h3 className="tier__name">{tier.name}</h3>
                <p className="tier__blurb muted">{tier.blurb}</p>

                <p className="tier__price">
                  <span className="tier__amount" data-price="amount" data-tier={tier.id}>
                    {init.amount}
                  </span>
                  <span className="tier__period muted" data-price="period" data-tier={tier.id}>
                    {init.period}
                  </span>
                </p>
                <p className="tier__note" data-price="note" data-tier={tier.id}>
                  {init.note}
                </p>

                <a
                  href="#"
                  className={`btn ${tier.highlight ? "btn--primary" : "btn--ghost"} tier__cta`}
                >
                  {tier.cta} <ArrowIcon />
                </a>

                <ul className="tier__features">
                  {tier.features.map((f) => (
                    <li key={f}>
                      <CheckIcon className="tier__check" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
