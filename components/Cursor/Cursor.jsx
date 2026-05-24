"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/SoundProvider/SoundProvider";
import styles from "./Cursor.module.css";

/**
 * Custom cursor:
 *  - Tiny center dot follows pointer 1:1.
 *  - Outer ring lerps with spring-like easing (smooth trailing).
 *  - Grows on hover over interactive elements; contracts on press.
 *  - Soft hover tick sound (only when sound is enabled).
 *  - Disabled on coarse pointer / touch via CSS.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const sound = useSound();

  useEffect(() => {
    // Skip on touch devices entirely
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setActive(true);

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!ready) setReady(true);
    };
    const onDown = () => setPress(true);
    const onUp = () => setPress(false);
    const onLeave = () => setReady(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    // Hover detection via event delegation
    const onOver = (e) => {
      const el = e.target;
      if (!el || !el.closest) return;
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]'
      );
      if (interactive) {
        setHover(true);
        sound.hover?.();
      }
    };
    const onOut = (e) => {
      const el = e.target;
      if (!el || !el.closest) return;
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]'
      );
      if (interactive) setHover(false);
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Dot tracks instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      // Ring eases toward target (spring-ish)
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [ready, sound]);

  if (!active) return null;

  const cls = [
    ready ? styles.ready : "",
    hover ? styles.hover : "",
    press ? styles.press : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div ref={ringRef} className={`${styles.ring} ${cls}`} aria-hidden="true" />
      <div ref={dotRef} className={`${styles.dot} ${cls}`} aria-hidden="true" />
    </>
  );
}
