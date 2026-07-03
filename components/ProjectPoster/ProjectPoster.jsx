"use client";

import { motion } from "framer-motion";
import styles from "./ProjectPoster.module.css";

/**
 * Animated SVG posters for each project. They convey what the project does
 * better than a placeholder image — and they animate on hover.
 *
 * Variants: ai-studio | cyberstudio | assessment-studio
 */
export default function ProjectPoster({ slug, accent = "#ff8a3d" }) {
  const Variant = VARIANTS[slug] || DefaultPoster;
  return (
    <div className={styles.wrap} style={{ "--c": accent }}>
      <Variant accent={accent} />
      <div className={styles.scan} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
    </div>
  );
}

/* ============================================================
   1) AI Studio — microservice mesh
   ============================================================ */
function AiStudioPoster() {
  const cells = Array.from({ length: 20 });
  return (
    <svg className={styles.svg} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="aiHotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="100%" stopColor="#ffb16b" />
        </linearGradient>
      </defs>

      {/* Mesh grid */}
      <g>
        {cells.map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const x = 40 + col * 64;
          const y = 30 + row * 44;
          const lit = (row + col) % 3 === 0;
          return (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width="46"
              height="30"
              rx="4"
              fill={lit ? "url(#aiHotGrad)" : "rgba(255,255,255,0.05)"}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.7"
              initial={{ opacity: lit ? 0.85 : 0.5 }}
              animate={{ opacity: lit ? [0.6, 1, 0.6] : 0.5 }}
              transition={{
                duration: 2.4,
                repeat: lit ? Infinity : 0,
                delay: i * 0.07,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </g>
      {/* Connection lines */}
      <motion.path
        d="M40 60 Q120 100 200 70 T 360 110"
        stroke="url(#aiHotGrad)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="3 5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ============================================================
   2) Multi-Agent QA — agent graph
   ============================================================ */
function MultiAgentPoster() {
  const agents = [
    { x: 80, y: 60, label: "Plan" },
    { x: 200, y: 40, label: "Browse" },
    { x: 320, y: 70, label: "Test" },
    { x: 130, y: 150, label: "Verify" },
    { x: 270, y: 160, label: "Report" },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [2, 4],
    [1, 3],
  ];
  return (
    <svg className={styles.svg} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="maNodeGrad">
          <stop offset="0%" stopColor="#ffd6b3" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </radialGradient>
      </defs>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={agents[a].x}
          y1={agents[a].y}
          x2={agents[b].x}
          y2={agents[b].y}
          stroke="rgba(255,138,61,0.55)"
          strokeWidth="1.2"
          strokeDasharray="2 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: i * 0.18, repeat: Infinity, repeatDelay: 1.2 }}
        />
      ))}
      {/* Nodes */}
      {agents.map((a, i) => (
        <g key={i}>
          <motion.circle
            cx={a.x}
            cy={a.y}
            r="20"
            fill="url(#maNodeGrad)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.06, 0.9] }}
            transition={{ duration: 2.6, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${a.x}px ${a.y}px` }}
          />
          <text
            x={a.x}
            y={a.y + 4}
            textAnchor="middle"
            fill="#1a0c04"
            fontSize="9"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            {a.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   3) Browser Automation — browser window with flowing cursor
   ============================================================ */
function BrowserAutomationPoster() {
  return (
    <svg className={styles.svg} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="baTab" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>
      {/* Window shell */}
      <rect x="40" y="30" width="320" height="160" rx="10" fill="url(#baTab)" stroke="rgba(255,255,255,0.14)" />
      <rect x="40" y="30" width="320" height="22" rx="10" fill="rgba(255,255,255,0.04)" />
      <circle cx="56" cy="41" r="3.5" fill="#ff5f57" />
      <circle cx="68" cy="41" r="3.5" fill="#febc2e" />
      <circle cx="80" cy="41" r="3.5" fill="#28c840" />
      <rect x="100" y="36" width="240" height="11" rx="5" fill="rgba(255,255,255,0.06)" />

      {/* Page content lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={60}
          y={70 + i * 22}
          width={i === 1 ? 220 : i === 3 ? 160 : 280}
          height="8"
          rx="3"
          fill="rgba(255,255,255,0.08)"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 1.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}

      {/* CTA button */}
      <rect x="60" y="160" width="86" height="22" rx="11" fill="#ff8a3d" />
      <text x="103" y="174" textAnchor="middle" fill="#1a0c04" fontSize="9" fontWeight="700" fontFamily="Inter">
        Submit
      </text>

      {/* Animated cursor */}
      <motion.g
        initial={{ x: 200, y: 80 }}
        animate={{ x: [200, 100, 60, 86, 86], y: [80, 110, 158, 168, 168] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M0 0 L0 14 L4 11 L8 18 L10 17 L6 10 L12 9 Z" fill="#fff" stroke="#000" strokeWidth="0.5" />
      </motion.g>
    </svg>
  );
}

/* ============================================================
   4) LLM Eval & Security — shield + sweeping bars
   ============================================================ */
function LlmEvalPoster() {
  const bars = [62, 88, 41, 75, 92, 56, 70, 84, 48, 67];
  return (
    <svg className={styles.svg} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="evalBar" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="100%" stopColor="#ffd6b3" />
        </linearGradient>
        <linearGradient id="evalShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd6b3" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>

      {/* Bars */}
      <g>
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={40 + i * 28}
            y={170 - h}
            width="18"
            height={h}
            rx="3"
            fill="url(#evalBar)"
            initial={{ scaleY: 0.4, opacity: 0.6 }}
            animate={{ scaleY: [0.4, 1, 0.7], opacity: [0.6, 1, 0.7] }}
            transition={{ duration: 2.2, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${40 + i * 28 + 9}px 170px` }}
          />
        ))}
      </g>

      {/* Baseline */}
      <line x1="30" y1="172" x2="370" y2="172" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />

      {/* Shield */}
      <g transform="translate(310 36)">
        <motion.path
          d="M30 0 L58 14 V36 C58 52 44 62 30 68 C16 62 2 52 2 36 V14 Z"
          fill="url(#evalShield)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <path d="M18 36 L26 44 L42 24" stroke="#1a0c04" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ============================================================
   5) Multimodal RAG — stacked layers (text/image/video)
   ============================================================ */
function MultimodalPoster() {
  return (
    <svg className={styles.svg} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mmA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8a3d" />
          <stop offset="100%" stopColor="#ffb16b" />
        </linearGradient>
        <linearGradient id="mmB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5aa9ff" />
          <stop offset="100%" stopColor="#9ec9ff" />
        </linearGradient>
      </defs>

      {/* Three stacked layers */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="60" y="50" width="220" height="40" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
        <text x="74" y="74" fill="#fff" fontSize="11" fontFamily="SFMono-Regular,Menlo,monospace">
          📄 docs · pdfs · text
        </text>
      </motion.g>

      <motion.g
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <rect x="100" y="100" width="220" height="40" rx="6" fill="url(#mmA)" />
        <text x="114" y="124" fill="#1a0c04" fontSize="11" fontWeight="700" fontFamily="Inter">
          🖼  images · CLIP embeddings
        </text>
      </motion.g>

      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="140" y="148" width="220" height="40" rx="6" fill="url(#mmB)" />
        <text x="154" y="172" fill="#0a1929" fontSize="11" fontWeight="700" fontFamily="Inter">
          🎞  video · LLaVA visuals
        </text>
      </motion.g>

      {/* Connecting beam */}
      <motion.line
        x1="40"
        y1="120"
        x2="380"
        y2="120"
        stroke="rgba(255,138,61,0.4)"
        strokeWidth="1"
        strokeDasharray="2 5"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

/* ============================================================
   6) DocuQuery — search beam over a document
   ============================================================ */
function DocuQueryPoster() {
  return (
    <svg className={styles.svg} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dqDoc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>

      {/* Document */}
      <rect x="80" y="30" width="180" height="160" rx="8" fill="url(#dqDoc)" stroke="rgba(255,255,255,0.14)" />
      {/* Lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={94}
          y={50 + i * 16}
          width={i % 3 === 0 ? 140 : i % 3 === 1 ? 110 : 150}
          height="6"
          rx="2"
          fill="rgba(255,255,255,0.1)"
        />
      ))}

      {/* Highlighted line */}
      <motion.rect
        x={94}
        y={114}
        width={140}
        height="6"
        rx="2"
        fill="#ff8a3d"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      {/* Magnifier sweeping */}
      <motion.g
        animate={{ x: [0, 80, 0], y: [0, 30, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "0 0" }}
      >
        <circle cx="290" cy="100" r="22" fill="rgba(255,138,61,0.12)" stroke="#ff8a3d" strokeWidth="2" />
        <line x1="306" y1="116" x2="324" y2="134" stroke="#ff8a3d" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

/* Default fallback */
function DefaultPoster() {
  return (
    <svg className={styles.svg} viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="rgba(255,138,61,0.08)" />
    </svg>
  );
}

const VARIANTS = {
  "ai-studio": AiStudioPoster,
  cyberstudio: MultiAgentPoster,
  "assessment-studio": BrowserAutomationPoster,
};
