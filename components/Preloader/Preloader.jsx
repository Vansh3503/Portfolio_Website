"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { playTick, playBoot, playSuccess, unlockAudio } from "@/lib/sound";
import styles from "./Preloader.module.css";

const LINES = [
  { kind: "prompt", text: "$ vm-portfolio --boot" },
  { kind: "dim", text: "› Initializing environment…" },
  { kind: "dim", text: "› Loading RAG pipeline…" },
  { kind: "dim", text: "› Connecting to vector database (PgVector)…" },
  { kind: "dim", text: "› Spinning up multi-agent runtime (LangGraph · Agno)…" },
  { kind: "dim", text: "› Warming Azure OpenAI · evals via DeepEval…" },
  { kind: "ok", text: "✓ Model ready · context window primed" },
  { kind: "ok", text: "✓ Cinematic layer compiled" },
  { kind: "prompt", text: "$ launch portfolio" },
];

const MIN_DURATION = 2400; // ms — guarantees the preloader doesn't flicker

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [revealed, setRevealed] = useState(0);
  const lastSoundIdx = useRef(-1);

  // Smooth spring-driven progress bar
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 110, damping: 22, mass: 0.8 });
  const width = useTransform(spring, (v) => `${Math.min(100, v)}%`);

  // Try to unlock audio immediately so the preloader's own ticks can play.
  // Most browsers still gate this until a user gesture; we then layer in a
  // "kick" on the first pointermove/click which retries the unlock.
  useEffect(() => {
    unlockAudio();
    const kick = () => unlockAudio();
    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("keydown", kick, { once: true });
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
  }, []);

  // Stream lines with pitch-shifted ticks per kind
  useEffect(() => {
    const perLine = Math.max(160, Math.floor(MIN_DURATION / LINES.length));
    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        setRevealed((r) => Math.max(r, i + 1));
        if (lastSoundIdx.current < i) {
          lastSoundIdx.current = i;
          if (line.kind === "ok") playTick("high");
          else if (line.kind === "prompt") playTick("mid");
          else playTick("low");
        }
      }, perLine * i)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    raw.set((revealed / LINES.length) * 100);
  }, [revealed, raw]);

  useEffect(() => {
    const start = performance.now();
    let loaded = false;

    const onLoad = () => {
      loaded = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => {
        raw.set(100);
        // Boot sweep + chime as the curtain lifts
        playBoot();
        setTimeout(() => playSuccess(), 220);
        // Tell the hero video the preloader is done so it can unmute
        window.dispatchEvent(new Event("preloader:done"));
        setTimeout(() => setShow(false), 500);
      }, wait);
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    const cap = setTimeout(() => {
      if (!loaded) onLoad();
    }, 4500);

    return () => {
      clearTimeout(cap);
      window.removeEventListener("load", onLoad);
    };
  }, [raw]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className={styles.root}
          role="status"
          aria-busy="true"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className={styles.scan} aria-hidden="true" />

          <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className={styles.bar}>
              <span className={`${styles.dot} ${styles.dotR}`} />
              <span className={`${styles.dot} ${styles.dotY}`} />
              <span className={`${styles.dot} ${styles.dotG}`} />
              <span className={styles.barLabel}>vm-portfolio · zsh</span>
            </div>

            <div className={styles.body}>
              {LINES.slice(0, revealed).map((l, i) => (
                <motion.span
                  key={i}
                  className={`${styles.line} ${styles[l.kind] || ""}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {l.text}
                </motion.span>
              ))}
              {revealed < LINES.length ? (
                <span className={styles.cursor} />
              ) : null}

              <div className={styles.progressShell} aria-hidden="true">
                <motion.div className={styles.progressFill} style={{ width }} />
              </div>

              <div className={styles.signature}>
                Vansh Malhotra · AI Engineer · Booting cinematic layer
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
