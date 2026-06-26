"use client";

import { useEffect, useRef } from "react";

/* Scroll-linked word reveal: words fill dim -> bright as the block travels
   through the viewport. rAF-throttled scroll math, no libraries. The words are
   real text nodes (crawlable); only their color animates. */
export default function RevealText({
  lead,
  text,
  accentFrom = 0,
}: {
  lead: string;
  text: string;
  accentFrom?: number; // index from which lit words use the accent color
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".rt__word"));
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh * 0.5 + rect.height;
      const passed = vh * 0.8 - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      const lit = Math.round(p * words.length);
      for (let i = 0; i < words.length; i++) {
        words[i].classList.toggle("is-lit", i < lit);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = text.split(" ");
  return (
    <section className="reveal" aria-labelledby="reveal-text">
      <div className="shell">
        <p className="eyebrow"><span className="dot" /> {lead}</p>
        <h2 id="reveal-text" className="reveal__text" ref={ref}>
          {words.map((w, i) => (
            <span
              className={`rt__word ${i >= accentFrom ? "rt__word--accent" : ""}`}
              key={`${w}-${i}`}
            >
              {w}{" "}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
