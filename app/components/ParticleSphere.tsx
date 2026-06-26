"use client";

import { useEffect, useRef } from "react";

/* ----------------------------------------------------------------------------
   Hand-rolled 3D particle sphere on a 2D canvas (no three.js, no deps).
   - Points distributed via a Fibonacci sphere, rotated each frame, then
     perspective-projected to screen with depth-based size/opacity/colour.
   - rAF runs ONLY while the canvas is on-screen (IntersectionObserver) and the
     tab is visible — so it never burns cycles or blocks TTI.
   - Cursor parallax (lerped) + prefers-reduced-motion fallback (static render).
   ---------------------------------------------------------------------------- */
export default function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ---- build the point cloud (Fibonacci sphere) ----
    const COUNT = 1500;
    const pts: { x: number; y: number; z: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    let W = 0;
    let H = 0;
    let radius = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(W, H) * 0.38;
    };
    resize();

    // accent colours pulled from the palette
    const FRONT = [255, 200, 1]; // Forsythia
    const BACK = [25, 185, 166]; // teal

    let rot = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = nx * 0.6;
      targetTiltX = ny * 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;
      if (!reduce) rot += 0.0024;

      const cx = W / 2;
      const cy = H / 2;
      const sinY = Math.sin(rot + tiltY);
      const cosY = Math.cos(rot + tiltY);
      const sinX = Math.sin(tiltX);
      const cosX = Math.cos(tiltX);
      const fov = 2.6;

      for (let i = 0; i < COUNT; i++) {
        const p = pts[i];
        // rotate around Y
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        // rotate around X
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        x *= 1;
        y *= 1;

        const scale = fov / (fov + z); // perspective
        const sx = cx + x * radius * scale;
        const sy = cy + y * radius * scale;

        const depth = (z + 1) / 2; // 0 (front) .. 1 (back)
        const size = (1.6 - depth) * 1.5 * scale;
        const alpha = 0.25 + (1 - depth) * 0.75;
        const r = Math.round(FRONT[0] + (BACK[0] - FRONT[0]) * depth);
        const g = Math.round(FRONT[1] + (BACK[1] - FRONT[1]) * depth);
        const b = Math.round(FRONT[2] + (BACK[2] - FRONT[2]) * depth);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.arc(sx, sy, Math.max(0.4, size), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else if (!running) start();
    };
    document.addEventListener("visibilitychange", onVis);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    if (reduce) draw(); // single static frame

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className="sphere-canvas" aria-hidden />;
}
