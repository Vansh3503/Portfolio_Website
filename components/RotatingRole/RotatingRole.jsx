"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./RotatingRole.module.css";

const ROLES = [
  "AI Engineer",
  "RAG Architect",
  "Multi-Agent Builder",
  "LLM Eval Nerd",
  "Python Engineer",
];

export default function RotatingRole({ interval = 2400 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <span className={styles.wrap}>
      <span className={styles.bracket}>&gt;</span>
      <span className={styles.measure}>
        {/* Invisible spacer with the longest word to lock width */}
        <span className={styles.ghost}>{"Multi-Agent Builder"}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={ROLES[i]}
            className={styles.token}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {ROLES[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.span
        className={styles.caret}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
    </span>
  );
}
