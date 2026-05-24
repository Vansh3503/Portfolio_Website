"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import styles from "./Colophon.module.css";

const STACK = [
  { label: "Next.js 14", note: "App Router, JS, fully static" },
  { label: "React 18", note: "Client-side islands where needed" },
  { label: "Framer Motion", note: "Reveal, layout, exit, gesture animations" },
  { label: "GSAP", note: "Hero entrance timeline" },
  { label: "CSS Modules", note: "Co-located styles, no Tailwind" },
  { label: "Web Audio API", note: "Synthesized UI sounds — zero audio files" },
  { label: "Vercel", note: "Edge deploy, free tier" },
];

const FEATURES = [
  {
    title: "Cinematic preloader",
    body:
      "Terminal-style boot sequence streams lines with pitched synth ticks. Curtain wipes up with a boot sweep + chime, signalling the hero video to start.",
  },
  {
    title: "Talking-head with voice",
    body:
      "Foreground video plays once with audio after the preloader, then pauses on its final frame. A blurred ambient duplicate keeps drifting silently behind for atmosphere.",
  },
  {
    title: "Custom cursor",
    body:
      "A center dot tracks 1:1 while a soft trailing ring eases with spring physics. Mix-blend-mode keeps it visible on light or dark surfaces. Auto-disabled on touch devices.",
  },
  {
    title: "Always-on UI sounds",
    body:
      "Click, hover, success, tick, and boot voices are oscillator-based. The whole engine is ~120 lines of JS. No mp3s, no licensing.",
  },
  {
    title: "Inline GameDock",
    body:
      "A floating launcher offers three quick games — Stack Memory, Reaction, Word Scramble — without ever leaving the portfolio. Modal lifts with Framer Motion.",
  },
  {
    title: "Animated SVG project posters",
    body:
      "Each work card has a hand-drawn animated SVG that visualizes what the project does — agent graphs, microservice mesh, browser cursor sweeps, eval bars.",
  },
  {
    title: "Neural-network skill backdrop",
    body:
      "The toolbox section runs a canvas particle system that connects nearby nodes and reacts to the cursor. Pure 2D canvas, no Three.js.",
  },
  {
    title: "Cinematic motion language",
    body:
      "Every transition uses the same easing curve (cubic-bezier 0.22, 0.61, 0.36, 1) and slow durations. The vibe is intentional, not bouncy.",
  },
];

const TIMELINE = [
  {
    label: "Phase 1",
    title: "Identity-consistent 3D avatar",
    note:
      "A stylized 3D render that anchors the visual brand across the site (used in About).",
  },
  {
    label: "Phase 2",
    title: "Cinematic talking-head video",
    note:
      "AI-generated motion video, used full-screen as the hero with ambient blur fallback.",
  },
  {
    label: "Phase 3",
    title: "Frontend cinematic engineering",
    note:
      "Next.js + Framer Motion + GSAP. Designed for performance: ~170 KB First Load JS, every route prerendered as static HTML.",
  },
];

export default function Colophon() {
  return (
    <>
      <section className={styles.section}>
        <SectionBackdrop variant="warm" />
        <div className={styles.inner}>
          <Reveal>
            <p className={styles.eyebrow}>Stack</p>
            <h2 className={styles.title}>
              The pieces that make it{" "}
              <span className={styles.titleAccent}>feel cinematic.</span>
            </h2>
          </Reveal>

          <motion.ul
            className={styles.stack}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {STACK.map((s) => (
              <motion.li
                key={s.label}
                className={styles.stackItem}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className={styles.stackLabel}>{s.label}</div>
                <div className={styles.stackNote}>{s.note}</div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className={styles.section}>
        <SectionBackdrop variant="violet" />
        <div className={styles.inner}>
          <Reveal>
            <p className={styles.eyebrow}>Build pipeline</p>
            <h2 className={styles.title}>
              An AI-to-code{" "}
              <span className={styles.titleAccent}>cinematic pipeline.</span>
            </h2>
          </Reveal>

          <ol className={styles.phases}>
            {TIMELINE.map((p, i) => (
              <Reveal as="li" key={p.label} className={styles.phase} delay={i * 0.05}>
                <div className={styles.phaseLabel}>{p.label}</div>
                <h3 className={styles.phaseTitle}>{p.title}</h3>
                <p className={styles.phaseNote}>{p.note}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <SectionBackdrop variant="cool" />
        <div className={styles.inner}>
          <Reveal>
            <p className={styles.eyebrow}>Under the hood</p>
            <h2 className={styles.title}>
              Eight small details that{" "}
              <span className={styles.titleAccent}>add up.</span>
            </h2>
          </Reveal>

          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <Reveal key={f.title} className={styles.featureCard}>
                <div className={styles.featureBullet} />
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className={styles.cta}>
              <a
                href="https://github.com/Vansh3503/Portfolio_Website"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.ctaPrimary}
              >
                View source on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
              <Link href="/contact" className={styles.ctaGhost}>
                Hire me to build yours
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
