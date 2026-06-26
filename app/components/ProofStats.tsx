"use client";

import { useEffect, useRef } from "react";

type Stat = { value: number; decimals?: number; suffix?: string; prefix?: string; label: string };

const STATS: Stat[] = [
  { value: 4.2, decimals: 1, suffix: "B+", label: "records automated daily" },
  { value: 63, suffix: "%", label: "lower pipeline cost" },
  { value: 8, suffix: " min", label: "median time-to-first-flow" },
];

const DURATION = 1200;

export default function ProofStats() {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));

    const run = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const dec = parseInt(el.dataset.decimals || "0", 10);
      const pre = el.dataset.prefix || "";
      const suf = el.dataset.suffix || "";
      if (reduce) {
        el.textContent = `${pre}${target.toFixed(dec)}${suf}`;
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.textContent = `${pre}${(target * eased).toFixed(dec)}${suf}`;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = `${pre}${target.toFixed(dec)}${suf}`;
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run(e.target as HTMLElement);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.5 }
    );
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <dl className="proof__stats" ref={ref} data-reveal>
      {STATS.map((s) => (
        <div key={s.label} className="proof__stat">
          <dt
            data-count={s.value}
            data-decimals={s.decimals ?? 0}
            data-suffix={s.suffix ?? ""}
            data-prefix={s.prefix ?? ""}
          >
            {s.prefix ?? ""}0{s.suffix ?? ""}
          </dt>
          <dd className="muted">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
