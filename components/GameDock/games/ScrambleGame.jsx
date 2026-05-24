"use client";

import { useEffect, useState, useCallback } from "react";
import { useSound } from "@/components/SoundProvider/SoundProvider";
import styles from "../GameDock.module.css";

const WORDS = [
  { w: "LANGGRAPH", hint: "Graph-based agent orchestration" },
  { w: "FASTAPI", hint: "Python web framework I live in" },
  { w: "PGVECTOR", hint: "Postgres extension for embeddings" },
  { w: "DEEPEVAL", hint: "RAG quality evaluation" },
  { w: "GARAK", hint: "Adversarial LLM probing" },
  { w: "RABBITMQ", hint: "Message broker" },
  { w: "KUBERNETES", hint: "Container orchestration" },
  { w: "EMBEDDING", hint: "Vector representation of text" },
  { w: "RETRIEVAL", hint: "The R in RAG" },
  { w: "AGENT", hint: "An autonomous step-taker" },
];

function scramble(word) {
  const a = word.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const out = a.join("");
  return out === word ? scramble(word) : out;
}

export default function ScrambleGame() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * WORDS.length));
  const [puzzle, setPuzzle] = useState(() => scramble(WORDS[0].w));
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(null); // 'ok' | 'bad' | null
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(0);
  const sound = useSound();

  const target = WORDS[idx];

  // (Re)scramble whenever idx changes
  useEffect(() => {
    setPuzzle(scramble(WORDS[idx].w));
    setGuess("");
    setFeedback(null);
  }, [idx]);

  const next = useCallback(() => {
    setIdx((i) => {
      let n = Math.floor(Math.random() * WORDS.length);
      if (n === i) n = (n + 1) % WORDS.length;
      return n;
    });
  }, []);

  const submit = (e) => {
    e?.preventDefault();
    if (!guess.trim()) return;
    const ok = guess.trim().toUpperCase() === target.w;
    if (ok) {
      setScore((s) => s + 10);
      setSolved((s) => s + 1);
      setFeedback("ok");
      sound.success?.();
      setTimeout(next, 700);
    } else {
      setScore((s) => Math.max(0, s - 2));
      setFeedback("bad");
    }
  };

  return (
    <form onSubmit={submit}>
      <p className={styles.scHint}>{target.hint}</p>
      <div className={styles.scWord}>{puzzle}</div>

      <div className={styles.scInputRow}>
        <input
          className={styles.scInput}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your guess…"
          aria-label="Unscrambled word"
          autoFocus
        />
        <button type="submit" className={styles.scBtn}>
          Check
        </button>
      </div>

      <div
        className={`${styles.scFeedback} ${
          feedback === "ok" ? styles.scOk : feedback === "bad" ? styles.scBad : ""
        }`}
      >
        {feedback === "ok"
          ? `Correct! +10 → ${target.w}`
          : feedback === "bad"
          ? "Not quite. −2"
          : ""}
      </div>

      <div className={styles.scStatus}>
        <span>Solved · {solved}</span>
        <span>Score · {score}</span>
        <button
          type="button"
          onClick={next}
          className={styles.backBtn}
          style={{ margin: 0 }}
        >
          Skip →
        </button>
      </div>
    </form>
  );
}
