"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/components/SoundProvider/SoundProvider";
import styles from "../GameDock.module.css";

/**
 * Reaction game:
 *  - Click the arena once to arm.
 *  - After a random 1.2-3s delay, it lights orange.
 *  - Click as fast as possible to log your reaction time.
 *  - Click during the wait = "Too soon!"
 */
export default function ReactionGame() {
  const [phase, setPhase] = useState("idle"); // idle | wait | go | tooSoon | done
  const [time, setTime] = useState(null);
  const [best, setBest] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const startedAt = useRef(0);
  const tRef = useRef(0);
  const sound = useSound();

  useEffect(() => () => clearTimeout(tRef.current), []);

  const arm = () => {
    clearTimeout(tRef.current);
    setPhase("wait");
    setTime(null);
    const delay = 1200 + Math.random() * 2200;
    tRef.current = setTimeout(() => {
      startedAt.current = performance.now();
      setPhase("go");
    }, delay);
  };

  const onClick = () => {
    if (phase === "idle" || phase === "done" || phase === "tooSoon") {
      arm();
    } else if (phase === "wait") {
      clearTimeout(tRef.current);
      setPhase("tooSoon");
    } else if (phase === "go") {
      const t = Math.round(performance.now() - startedAt.current);
      setTime(t);
      setAttempts((n) => n + 1);
      if (best === null || t < best) {
        setBest(t);
        sound.success?.();
      }
      setPhase("done");
    }
  };

  const arenaCls = `${styles.rxArena} ${
    phase === "wait" ? styles.rxArenaWaiting : ""
  } ${phase === "go" ? styles.rxArenaGo : ""} ${
    phase === "tooSoon" ? styles.rxArenaTooSoon : ""
  }`;

  let value = "Click to start";
  let label = "Reaction test";
  if (phase === "wait") {
    value = "Wait…";
    label = "Click when it turns orange";
  } else if (phase === "go") {
    value = "CLICK!";
    label = "Now!";
  } else if (phase === "tooSoon") {
    value = "Too soon";
    label = "Click again to retry";
  } else if (phase === "done" && time !== null) {
    value = `${time} ms`;
    label = "Click again to retry";
  }

  return (
    <>
      <div className={arenaCls} onClick={onClick} role="button" tabIndex={0}>
        <div className={styles.rxStatus}>
          <div className={styles.rxStatusValue}>{value}</div>
          <div className={styles.rxStatusLabel}>{label}</div>
        </div>
      </div>
      <div className={styles.rxBest}>
        <span>Attempts · {attempts}</span>
        <span>Best · {best != null ? `${best} ms` : "—"}</span>
      </div>
    </>
  );
}
