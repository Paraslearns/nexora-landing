"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURES } from "../lib/features";
import { FeatureIcon, ChevronIcon } from "./Icons";

/* ----------------------------------------------------------------------------
   FEATURE 2 — Bento grid (desktop) -> Accordion (mobile), zero dependencies.

   Single source of truth: `active` (the active node index).
   - Desktop: visual hover is pure CSS (no re-render). We record the hovered
     index in `hoverRef` purely so the CONTEXT can be transferred on resize.
   - Mobile: tapping a header toggles `active` (accordion).
   - Context lock: a matchMedia listener detects the breakpoint crossing and
     transfers the last-hovered desktop node into the accordion's open state
     (and vice-versa), so the matching panel is already open after the reflow.

   Accordion height uses the native grid-template-rows 0fr -> 1fr transition.
   Desktop detail reveal uses opacity/transform only (compositor, no reflow).
   ---------------------------------------------------------------------------- */

// One bento area per feature id (desktop layout only).
const AREA: Record<string, string> = {
  orchestrate: "a",
  enrich: "b",
  deploy: "c",
  govern: "d",
  observe: "e",
};

const MOBILE_QUERY = "(max-width: 760px)";

export default function Features() {
  const [active, setActive] = useState(0);
  const hoverRef = useRef(0); // last hovered desktop node (no re-render)
  const isMobileRef = useRef(false);

  // Desktop hover: record context only, let CSS handle the visual.
  const onEnter = (i: number) => {
    hoverRef.current = i;
  };

  // Header activation (tap on mobile = accordion toggle; click on desktop = pin).
  const onActivate = (i: number) => {
    hoverRef.current = i;
    if (isMobileRef.current) {
      setActive((prev) => (prev === i ? -1 : i)); // mobile: collapsible
    } else {
      setActive(i); // desktop: pin highlight
    }
  };

  // Context-lock across the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => {
      const mobile = mq.matches;
      if (mobile === isMobileRef.current) return;
      if (mobile) {
        // desktop -> mobile: open the panel for the node we were hovering.
        setActive(hoverRef.current < 0 ? 0 : hoverRef.current);
      } else {
        // mobile -> desktop: keep context; ensure one tile stays pinned.
        setActive((prev) => {
          const next = prev < 0 ? 0 : prev;
          hoverRef.current = next;
          return next;
        });
      }
      isMobileRef.current = mobile;
    };
    isMobileRef.current = mq.matches;
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section id="features" className="features" aria-labelledby="features-title">
      <div className="shell">
        <header className="sec-head" data-reveal>
          <p className="eyebrow"><span className="dot" /> The platform</p>
          <h2 id="features-title" className="section-title">
            One canvas for every <span className="grad-text">data motion</span>
          </h2>
          <p className="muted sec-head__sub">
            A modular runtime that ingests, reasons over, and routes your data —
            explore each capability below.
          </p>
        </header>

        <div className="bento" data-reveal role="list">
          {FEATURES.map((f, i) => {
            const open = active === i;
            const panelId = `feat-panel-${f.id}`;
            return (
              <article
                key={f.id}
                role="listitem"
                className={`fnode fnode--${f.span} ${open ? "is-open" : ""}`}
                style={{ gridArea: AREA[f.id] }}
                onMouseEnter={() => onEnter(i)}
                data-index={i}
              >
                <button
                  type="button"
                  className="fnode__head"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => onActivate(i)}
                >
                  <span className="fnode__icon">
                    <FeatureIcon name={f.icon} />
                  </span>
                  <span className="fnode__heading">
                    <h3>{f.title}</h3>
                    <p className="fnode__summary muted">{f.summary}</p>
                  </span>
                  <ChevronIcon className="fnode__chevron" />
                </button>

                <div className="fnode__panelwrap">
                  <div className="fnode__panel" id={panelId} role="region" aria-label={f.title}>
                    <p className="fnode__detail">{f.detail}</p>
                    <p className="fnode__metric">
                      <strong>{f.metric.value}</strong>
                      <span className="muted">{f.metric.label}</span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
