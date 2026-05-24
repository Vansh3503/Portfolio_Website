"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSound } from "@/components/SoundProvider/SoundProvider";
import styles from "./MemoryGame.module.css";

const TOOLS = [
  { label: "FastAPI", glyph: "⚡" },
  { label: "LangGraph", glyph: "🕸️" },
  { label: "PgVector", glyph: "🧮" },
  { label: "Redis", glyph: "🟥" },
  { label: "RabbitMQ", glyph: "🐰" },
  { label: "Docker", glyph: "🐳" },
  { label: "Azure OpenAI", glyph: "☁️" },
  { label: "DeepEval", glyph: "🎯" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck() {
  const pairs = TOOLS.flatMap((t, i) => [
    { id: `${i}-a`, key: t.label, ...t },
    { id: `${i}-b`, key: t.label, ...t },
  ]);
  return shuffle(pairs);
}

export default function MemoryGame({ embedded = false }) {
  const [deck, setDeck] = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]); // currently face-up indices (0-2)
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [start, setStart] = useState(null);
  const [now, setNow] = useState(0);
  const lockRef = useRef(false);
  const sound = useSound();

  const won = matched.size === deck.length;

  // Play a chime once when the board is fully solved
  useEffect(() => {
    if (won) sound.success?.();
  }, [won, sound]);

  // Timer
  useEffect(() => {
    if (start === null || won) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [start, won]);

  const elapsed = useMemo(() => {
    if (start === null) return 0;
    return Math.floor(((won ? now : Date.now()) - start) / 1000);
  }, [start, now, won]);

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setStart(null);
    setNow(0);
    lockRef.current = false;
  };

  const onCardClick = (idx) => {
    if (lockRef.current) return;
    if (flipped.includes(idx)) return;
    if (matched.has(deck[idx].id)) return;
    if (start === null) setStart(Date.now());

    const next = [...flipped, idx];
    setFlipped(next);

    if (next.length === 2) {
      lockRef.current = true;
      setMoves((m) => m + 1);
      const [a, b] = next;
      const isMatch = deck[a].key === deck[b].key;

      setTimeout(() => {
        if (isMatch) {
          setMatched((prev) => {
            const s = new Set(prev);
            s.add(deck[a].id);
            s.add(deck[b].id);
            return s;
          });
        }
        setFlipped([]);
        lockRef.current = false;
      }, isMatch ? 420 : 820);
    }
  };

  return (
    <section className={`${styles.section} ${embedded ? styles.sectionEmbedded : ""}`}>
      <div className={`${styles.inner} ${embedded ? styles.innerEmbedded : ""}`}>
        <div className={styles.head}>
          {embedded ? null : (
            <div>
              <p className={styles.eyebrow}>Mini-game</p>
              <h2 className={styles.title}>
                Match the{" "}
                <span className={styles.titleAccent}>AI stack.</span>{" "}
                Eight pairs. How fast can you go?
              </h2>
            </div>
          )}
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statValue}>{moves}</div>
              <div className={styles.statLabel}>Moves</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>
                {String(Math.floor(elapsed / 60)).padStart(2, "0")}:
                {String(elapsed % 60).padStart(2, "0")}
              </div>
              <div className={styles.statLabel}>Time</div>
            </div>
            <button type="button" onClick={reset} className={styles.resetBtn}>
              Reset
            </button>
          </div>
        </div>

        <div className={styles.board}>
          {deck.map((card, idx) => {
            const isMatched = matched.has(card.id);
            const isFlipped = flipped.includes(idx) || isMatched;
            return (
              <motion.div
                key={card.id}
                className={`${styles.cardWrap} ${
                  isMatched ? styles.matched : ""
                }`}
                onClick={() => onCardClick(idx)}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <motion.div
                  className={styles.card}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div className={`${styles.face} ${styles.front}`}>
                    <span className={styles.frontMark}>VM</span>
                  </div>
                  <div className={`${styles.face} ${styles.back}`}>
                    <span className={styles.glyph} aria-hidden="true">
                      {card.glyph}
                    </span>
                    <span className={styles.label}>{card.label}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {won ? (
            <motion.div
              className={styles.win}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div>
                <h3 className={styles.winTitle}>Solved! 🎉</h3>
                <p className={styles.winSub}>
                  {moves} moves · {Math.floor(elapsed / 60)}m {elapsed % 60}s.
                  You officially know my stack better than most recruiters.
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className={styles.resetBtn}
              >
                Play again
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
