"use client";

import { useEffect, useState } from "react";

/* ----------------------------------------------------------------------------
   Entry orchestration — total timeline <= 500ms, non-blocking for TTI.
   The page HTML is already server-rendered & crawlable; this overlay is a
   pure visual veneer that fades out and reveals the hero. We ALSO wire up the
   IntersectionObserver that plays [data-reveal] entrances for lower sections.
   ---------------------------------------------------------------------------- */
const LOADER_MS = 460; // < 500ms cap

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 1) Scroll-reveal observer for all [data-reveal] elements.
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));

    // 2) Reveal the hero immediately (within the 500ms window).
    const hero = document.querySelectorAll<HTMLElement>('[data-reveal="hero"]');
    hero.forEach((el) => el.classList.add("is-in"));

    // 3) Tear down the loader veil.
    const t = window.setTimeout(() => setDone(true), LOADER_MS);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <div className={`loader ${done ? "loader--done" : ""}`} aria-hidden={done} role="presentation">
      <div className="loader__mark">
        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden>
          <defs>
            <linearGradient id="ld" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7c5cff" />
              <stop offset="1" stopColor="#19e3c2" />
            </linearGradient>
          </defs>
          <path
            d="M12 36V12l24 24V12"
            fill="none"
            stroke="url(#ld)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="loader__path"
          />
        </svg>
      </div>
    </div>
  );
}
