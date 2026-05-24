"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import styles from "./SectionBackdrop.module.css";

/**
 * Lightweight section-level backdrop. Drops behind a section's content to
 * give it ambient AI/data motion — drifting orbs over a faint floating grid,
 * plus a static SVG neural-connection layer that visually echoes graph
 * databases and multi-agent topology.
 *
 * Variants control color & emphasis (warm | cool | violet | ember | green).
 */
export default function SectionBackdrop({
  variant = "warm",
  showNodes = true,
  showWeb = true,
}) {
  const orbs = ORB_PRESETS[variant] || ORB_PRESETS.warm;

  // Generate a random-looking but stable neural web per render
  const web = useMemo(() => {
    const nodes = NODE_POSITIONS.map((p) => ({
      x: parsePct(p.left),
      y: parsePct(p.top),
    }));
    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy);
        if (d < 38) edges.push([i, j, d]);
      }
    }
    return { nodes, edges };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.grid} />

      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`${styles.orb} ${styles[o.color]} ${styles[o.pos]}`}
          animate={{
            x: o.x,
            y: o.y,
            scale: o.scale ?? [1, 1.06, 0.95, 1],
          }}
          transition={{
            duration: o.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {showWeb ? (
        <svg className={styles.web} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {web.edges.map(([a, b, d], i) => (
            <motion.line
              key={i}
              x1={web.nodes[a].x}
              y1={web.nodes[a].y}
              x2={web.nodes[b].x}
              y2={web.nodes[b].y}
              stroke="rgba(255, 138, 61, 0.32)"
              strokeWidth="0.12"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 4 + (d % 3),
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      ) : null}

      {showNodes ? (
        <>
          {NODE_POSITIONS.map((p, i) => (
            <motion.span
              key={i}
              className={styles.node}
              style={{ top: p.top, left: p.left }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
              transition={{
                duration: 2 + (i % 3) * 0.6,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}

function parsePct(v) {
  return parseFloat(v);
}

const ORB_PRESETS = {
  warm: [
    { color: "orbWarm", pos: "posRight", x: [0, 50, -30, 0], y: [0, -40, 30, 0], duration: 18 },
    { color: "orbCool", pos: "posLeft", x: [0, -30, 40, 0], y: [0, 30, -20, 0], duration: 22 },
  ],
  cool: [
    { color: "orbCool", pos: "posRight", x: [0, 30, -50, 0], y: [0, 20, -40, 0], duration: 20 },
    { color: "orbWarm", pos: "posBottom", x: [0, -40, 30, 0], y: [0, 30, -10, 0], duration: 24 },
  ],
  violet: [
    { color: "orbViolet", pos: "posLeft", x: [0, 40, -20, 0], y: [0, -30, 20, 0], duration: 19 },
    { color: "orbWarm", pos: "posRight", x: [0, -30, 40, 0], y: [0, 20, -30, 0], duration: 23 },
  ],
  ember: [
    { color: "orbWarm", pos: "posLeft", x: [0, 50, -30, 0], y: [0, -20, 40, 0], duration: 21 },
    { color: "orbWarm", pos: "posRight", x: [0, -50, 20, 0], y: [0, 30, -20, 0], duration: 26 },
  ],
  green: [
    { color: "orbGreen", pos: "posRight", x: [0, 30, -40, 0], y: [0, -20, 30, 0], duration: 19 },
    { color: "orbWarm", pos: "posLeft", x: [0, -30, 40, 0], y: [0, 30, -20, 0], duration: 24 },
  ],
};

const NODE_POSITIONS = [
  { top: "12%", left: "8%" },
  { top: "28%", left: "92%" },
  { top: "55%", left: "6%" },
  { top: "70%", left: "88%" },
  { top: "40%", left: "50%" },
  { top: "85%", left: "30%" },
  { top: "20%", left: "60%" },
  { top: "62%", left: "42%" },
  { top: "76%", left: "68%" },
];
