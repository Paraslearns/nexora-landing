"use client";

import { useEffect } from "react";

/* ----------------------------------------------------------------------------
   Custom cursor (zero deps). A precise dot that tracks 1:1 and a ring that
   trails with rAF lerp. The ring scales on hover over interactive targets and
   morphs into a labelled pill for elements carrying `data-cursor-label`
   (e.g. "View", "Drag"). Press feedback + viewport-edge hide.
   Disabled on touch devices and when prefers-reduced-motion is set.
   ---------------------------------------------------------------------------- */
export default function Cursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    const label = document.createElement("span");
    label.className = "cursor-ring__label";
    ring.appendChild(label);
    document.body.append(dot, ring);
    document.body.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      place(dot, mx, my);
      if (reduce) place(ring, mx, my);
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      place(ring, rx, ry);
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);

    const TARGET = "a, button, [data-cursor], input, .fnode__head, .cdd__menu li";
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest<HTMLElement>(TARGET);
      if (!t) return;
      ring.classList.add("is-hover");
      const lbl = t.getAttribute("data-cursor-label");
      ring.dataset.variant = t.getAttribute("data-cursor") || "link";
      if (lbl) {
        ring.classList.add("has-label");
        label.textContent = lbl;
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest<HTMLElement>(TARGET);
      if (!t) return;
      ring.classList.remove("is-hover", "has-label");
      ring.dataset.variant = "";
      label.textContent = "";
    };

    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const hide = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const show = () => {
      dot.style.opacity = "";
      ring.style.opacity = "";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      dot.remove();
      ring.remove();
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
