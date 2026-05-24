"use client";

import { useEffect, useRef } from "react";
import styles from "./NeuralNet.module.css";

/**
 * Interactive neural network background.
 * Floating nodes connect with lines whenever they get close (or close to the
 * cursor). Pure canvas, ~50 lines of math, no external dependencies.
 *
 *  - Pauses when the canvas is offscreen (IntersectionObserver)
 *  - Disables on touch / coarse pointers (no mouse to react to anyway)
 *  - Resizes with the parent container
 */
export default function NeuralNet({ density = 0.00012 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const sizeIt = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeIt();

    const resizeObs = new ResizeObserver(() => {
      sizeIt();
      seed();
    });
    resizeObs.observe(parent);

    let nodes = [];
    const seed = () => {
      const count = Math.max(36, Math.min(100, Math.floor(w * h * density)));
      nodes = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };
    seed();

    const mouse = { x: -1000, y: -1000, active: false };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };
    if (isFinePointer) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
    }

    let running = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const LINK_DIST = 130;
    const MOUSE_DIST = 170;

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!running) return;

      ctx.clearRect(0, 0, w, h);

      // Update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Mouse repel
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DIST) {
            const f = (MOUSE_DIST - d) / MOUSE_DIST;
            n.x += (dx / d) * f * 0.6;
            n.y += (dy / d) * f * 0.6;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 138, 61, 0.7)";
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const op = 1 - d / LINK_DIST;
            ctx.strokeStyle = `rgba(255, 138, 61, ${op * 0.32})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Cursor-to-node link
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DIST) {
            const op = 1 - d / MOUSE_DIST;
            ctx.strokeStyle = `rgba(255, 214, 179, ${op * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      resizeObs.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
