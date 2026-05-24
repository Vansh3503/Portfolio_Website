"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Logo.module.css";

/**
 * VM logo — "Infinite Path" concept.
 * A single continuous stroke draws the 'V' then flows into the 'M',
 * with a gradient that runs warm → bright. Animates on hover.
 */
export default function Logo({ showLabel = true }) {
  return (
    <Link href="/" className={styles.wrap} aria-label="Vansh Malhotra — Home">
      <motion.svg
        className={styles.mark}
        viewBox="0 0 64 64"
        initial="rest"
        whileHover="hover"
        animate="rest"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="vmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd6b3" />
            <stop offset="55%" stopColor="#ff8a3d" />
            <stop offset="100%" stopColor="#ffb16b" />
          </linearGradient>
          <filter id="vmGlow">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle ring */}
        <motion.circle
          cx="32"
          cy="32"
          r="29"
          fill="none"
          stroke="url(#vmGrad)"
          strokeWidth="1"
          strokeOpacity="0.18"
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: 360 },
          }}
          style={{ transformOrigin: "32px 32px" }}
          transition={{ duration: 6, ease: "linear" }}
        />

        {/* Continuous V → M path */}
        <motion.path
          d="M14 18 L24 46 L32 24 L40 46 L48 24 L56 46"
          fill="none"
          stroke="url(#vmGrad)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#vmGlow)"
          variants={{
            rest: { pathLength: 1, pathOffset: 0, opacity: 1 },
            hover: {
              pathLength: [0, 1],
              pathOffset: [0, 0],
              opacity: [0.4, 1],
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}
        />

        {/* Anchor nodes */}
        {[
          [14, 18],
          [32, 24],
          [48, 24],
          [56, 46],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="1.6"
            fill="#ff8a3d"
            variants={{
              rest: { scale: 1 },
              hover: { scale: [1, 1.6, 1] },
            }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
          />
        ))}
      </motion.svg>

      {showLabel ? (
        <span className={styles.label}>
          Vansh Malhotra <span className={styles.labelDim}>· Portfolio</span>
        </span>
      ) : null}
    </Link>
  );
}
