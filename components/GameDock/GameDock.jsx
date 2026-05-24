"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import MemoryGame from "@/components/MemoryGame/MemoryGame";
import ReactionGame from "./games/ReactionGame";
import ScrambleGame from "./games/ScrambleGame";
import styles from "./GameDock.module.css";

const GAMES = [
  {
    id: "memory",
    emoji: "🧠",
    name: "Stack Memory",
    desc: "Match pairs of tools from my AI stack.",
  },
  {
    id: "reaction",
    emoji: "⚡",
    name: "Reaction",
    desc: "Click the orange flash. How fast can you react?",
  },
  {
    id: "scramble",
    emoji: "🔤",
    name: "Word Scramble",
    desc: "Unscramble AI/engineering vocab.",
  },
];

export default function GameDock() {
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState(null);
  const [showHint, setShowHint] = useState(true);

  // Auto-hide the launcher hint after 6s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // ESC closes the modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => setGame(null), 280);
  };

  return (
    <>
      <motion.button
        type="button"
        className={styles.fab}
        onClick={() => {
          setOpen(true);
          setShowHint(false);
        }}
        aria-label="Open mini-games"
        data-no-sound
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className={styles.fabPulse} aria-hidden="true" />
        {/* Game controller icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 11h4M8 9v4" />
          <circle cx="15" cy="11" r="0.6" fill="currentColor" />
          <circle cx="17" cy="13" r="0.6" fill="currentColor" />
          <path d="M5.5 7.5h13a3 3 0 013 3v3a3 3 0 01-3 3h-1.2c-.5 0-1-.2-1.4-.6l-1-1c-.4-.4-.9-.6-1.4-.6h-3.4c-.5 0-1 .2-1.4.6l-1 1c-.4.4-.9.6-1.4.6H5.5a3 3 0 01-3-3v-3a3 3 0 013-3z" />
        </svg>
        <AnimatePresence>
          {showHint ? (
            <motion.span
              className={styles.fabHint}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
            >
              Take a break · play
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className={styles.scrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Mini games"
          >
            <motion.div
              className={styles.panel}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className={styles.panelHead}>
                <h3 className={styles.panelTitle}>
                  <span className={styles.panelDot} />
                  {game
                    ? GAMES.find((g) => g.id === game)?.name
                    : "Pick a quick game"}
                </h3>
                <button
                  type="button"
                  className={styles.panelClose}
                  onClick={close}
                  aria-label="Close games"
                  data-no-sound
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className={styles.panelBody}>
                <AnimatePresence mode="wait">
                  {!game ? (
                    <motion.div
                      key="picker"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={styles.picker}
                    >
                      {GAMES.map((g) => (
                        <motion.button
                          type="button"
                          key={g.id}
                          className={styles.pickerCard}
                          onClick={() => setGame(g.id)}
                          whileHover={{ y: -3 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 22,
                          }}
                        >
                          <span className={styles.pickerEmoji}>{g.emoji}</span>
                          <h4 className={styles.pickerName}>{g.name}</h4>
                          <p className={styles.pickerDesc}>{g.desc}</p>
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={game}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        type="button"
                        className={styles.backBtn}
                        onClick={() => setGame(null)}
                      >
                        ← Back to games
                      </button>
                      {game === "memory" ? <MemoryGame embedded /> : null}
                      {game === "reaction" ? <ReactionGame /> : null}
                      {game === "scramble" ? <ScrambleGame /> : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
