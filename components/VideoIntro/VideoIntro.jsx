"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import RotatingRole from "@/components/RotatingRole/RotatingRole";
import styles from "./VideoIntro.module.css";

const VIDEO_SRC = "/media/hero.mp4";

export default function VideoIntro() {
  const heroRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  // True after the talking-head has played once end-to-end (so we stop looping)
  const playedThroughRef = useRef(false);
  // Set to true on first user gesture so we know unmuting is allowed
  const userInteractedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [endedOnce, setEndedOnce] = useState(false);

  // Sync drift between ambient + foreground (only while the foreground is still playing)
  const syncVideos = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg || playedThroughRef.current) return;
    if (Math.abs(fg.currentTime - bg.currentTime) > 0.25) {
      bg.currentTime = fg.currentTime;
    }
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reset to starting state every time, in case React re-mounted us
      gsap.set(`.${styles.nameInner}`, { yPercent: 110, clearProps: "" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(`.${styles.tagline}`, { opacity: 1, y: 0, duration: 0.7 }, 0)
        .to(
          `.${styles.nameInner}`,
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.out",
            clearProps: "transform",
          },
          0.1
        )
        .to(`.${styles.subtitle}`, { opacity: 1, y: 0, duration: 0.8 }, 0.45)
        .to(`.${styles.heroActions}`, { opacity: 1, y: 0, duration: 0.7 }, 0.55)
        .to(`.${styles.controls}`, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .to(`.${styles.metaChips}`, { opacity: 1, y: 0, duration: 0.6 }, 0.65)
        .to(`.${styles.scrollIndicator}`, { opacity: 1, y: 0, duration: 0.6 }, 0.75);
    }, heroRef);

    // Belt + suspenders: force the name into its final state after 2s,
    // regardless of what GSAP did. Prevents a stuck-at-110% bug on iOS Safari
    // when the page is restored from BFCache or the font swaps in late.
    const safety = setTimeout(() => {
      try {
        document
          .querySelectorAll(`.${styles.nameInner}`)
          .forEach((el) => {
            el.style.transform = "translateY(0)";
          });
      } catch {}
    }, 2200);

    // If the page is restored from BFCache (back/forward), reset state.
    const onPageShow = (e) => {
      if (e.persisted) {
        try {
          document
            .querySelectorAll(`.${styles.nameInner}`)
            .forEach((el) => {
              el.style.transform = "translateY(0)";
            });
        } catch {}
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      clearTimeout(safety);
      window.removeEventListener("pageshow", onPageShow);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(syncVideos, 1500);
    return () => clearInterval(id);
  }, [syncVideos]);

  useEffect(() => {
    if (videoReady) return;
    const t = setTimeout(() => {
      const fg = fgVideoRef.current;
      if (fg && fg.readyState >= 2) setVideoReady(true);
    }, 600);
    return () => clearTimeout(t);
  }, [videoReady]);

  // Track ANY user interaction so we know unmuting is allowed by the browser.
  useEffect(() => {
    const mark = () => {
      userInteractedRef.current = true;
    };
    window.addEventListener("pointerdown", mark, { passive: true });
    window.addEventListener("keydown", mark);
    window.addEventListener("touchstart", mark, { passive: true });
    window.addEventListener("scroll", mark, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", mark);
      window.removeEventListener("keydown", mark);
      window.removeEventListener("touchstart", mark);
      window.removeEventListener("scroll", mark);
    };
  }, []);

  // 🎬 When the preloader finishes:
  //    1. Rewind the hero video to the start
  //    2. Try to unmute (succeeds if any gesture was made during preload)
  //    3. Play it once
  useEffect(() => {
    const startWithVoice = () => {
      const fg = fgVideoRef.current;
      const bg = bgVideoRef.current;
      if (!fg || !bg) return;

      // Reset both videos
      try {
        fg.currentTime = 0;
        bg.currentTime = 0;
      } catch {}
      bg.muted = true; // ambient stays silent
      bg.play().catch(() => {});

      // Try to unmute. If the browser blocks (no gesture yet), play() rejects
      // and we silently fall back to muted playback. The first user click on
      // the unmute button will fix it.
      fg.muted = false;
      const p = fg.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          setIsMuted(false);
        }).catch(() => {
          fg.muted = true;
          fg.play().catch(() => {});
          setIsMuted(true);
        });
      } else {
        setIsMuted(false);
      }
    };

    window.addEventListener("preloader:done", startWithVoice);
    return () => window.removeEventListener("preloader:done", startWithVoice);
  }, []);

  // 🎞 When the talking-head finishes its first pass, freeze it on the last
  //    frame. Ambient blur keeps looping behind for atmosphere.
  useEffect(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const onEnded = () => {
      playedThroughRef.current = true;
      setEndedOnce(true);
      setIsPlaying(false);
      // Hold the frame instead of looping
      try {
        fg.pause();
        fg.currentTime = Math.max(0, (fg.duration || 0) - 0.05);
      } catch {}
    };
    fg.addEventListener("ended", onEnded);
    return () => fg.removeEventListener("ended", onEnded);
  }, []);

  // Pause when tab is hidden, resume on focus (only while still in first pass)
  useEffect(() => {
    const onVisibility = () => {
      const fg = fgVideoRef.current;
      const bg = bgVideoRef.current;
      if (!fg || !bg) return;
      if (document.hidden) {
        fg.pause();
        bg.pause();
      } else {
        if (!playedThroughRef.current && isPlaying) fg.play().catch(() => {});
        bg.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    if (fg.paused) {
      // If the user hits play AFTER it ended once, restart from 0
      if (playedThroughRef.current) {
        try {
          fg.currentTime = 0;
        } catch {}
        playedThroughRef.current = false;
        setEndedOnce(false);
      }
      fg.play().catch(() => {});
      bg.play().catch(() => {});
      setIsPlaying(true);
    } else {
      fg.pause();
      bg.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const next = !fg.muted;
    fg.muted = next;
    if (bgVideoRef.current) bgVideoRef.current.muted = true;
    setIsMuted(next);
    // If they're unmuting after the video ended, restart it from 0
    if (!next && playedThroughRef.current) {
      try {
        fg.currentTime = 0;
      } catch {}
      playedThroughRef.current = false;
      setEndedOnce(false);
      fg.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  const onVideoReady = useCallback(() => setVideoReady(true), []);

  const scrollToNext = useCallback(() => {
    const next = document.getElementById("next-section");
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Cinematic intro">
      {/* Ambient blurred background video — always loops, always silent */}
      <div className={styles.ambientWrap} aria-hidden="true">
        <video
          ref={bgVideoRef}
          className={styles.ambientVideo}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Foreground talking-head — does NOT loop; plays once with voice */}
      <div className={styles.foreground}>
        <video
          ref={fgVideoRef}
          className={`${styles.foregroundVideo} ${
            videoReady ? styles.foregroundReady : ""
          }`}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={onVideoReady}
          onCanPlay={onVideoReady}
        />
      </div>

      {/* Cinematic veils */}
      <div className={`${styles.veil} ${styles.veilWarm}`} />
      <div className={`${styles.veil} ${styles.veilTop}`} />
      <div className={`${styles.veil} ${styles.veilBottom}`} />
      <div className={`${styles.veil} ${styles.veilGrain}`} />

      {/* Content overlay */}
      <div className={styles.content}>
        <div className={styles.center}>
          <p className={styles.tagline}>AI Engineer · Portfolio · 2026</p>

          <h1 className={styles.nameStack}>
            <span className={styles.name}>
              <span className={styles.nameWord}>
                <span className={styles.nameInner} style={{ transform: "translateY(110%)" }}>
                  Vansh
                </span>
              </span>
            </span>
            <span className={`${styles.name} ${styles.nameLast}`}>
              <span className={styles.nameWord}>
                <span className={styles.nameInner} style={{ transform: "translateY(110%)" }}>
                  Malhotra
                </span>
              </span>
            </span>
          </h1>

          <p className={styles.subtitle}>
            <RotatingRole />
            <span className={styles.subtitleText}>
              {" "}
              · I build with Python, FastAPI, LangGraph, CrewAI, PgVector,
              Redis, and Azure OpenAI — shipping retrieval, orchestration, and
              eval pipelines that hold up in production.
            </span>
          </p>

          <div className={styles.heroActions}>
            <Link href="/work" className={styles.primaryBtn}>
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="/Vansh_Malhotra_Resume.pdf"
              download
              className={styles.ghostBtn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v12" />
                <path d="M6 12l6 6 6-6" />
                <path d="M5 20h14" />
              </svg>
              Download CV
            </a>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.glassBtn}
              onClick={togglePlay}
              aria-label={
                isPlaying
                  ? "Pause video"
                  : endedOnce
                  ? "Replay intro"
                  : "Play video"
              }
              aria-pressed={!isPlaying}
              data-no-sound
            >
              {isPlaying ? <PauseIcon /> : endedOnce ? <ReplayIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              className={styles.glassBtn}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              aria-pressed={!isMuted}
              data-no-sound
            >
              {isMuted ? <MutedIcon /> : <SoundIcon />}
            </button>
          </div>

          <div className={styles.metaChips}>
            <span className={styles.metaChip}>Based in Ahmedabad, IN</span>
            <span className={styles.metaChip}>Available for roles</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.scrollIndicator}
          onClick={scrollToNext}
          aria-label="Scroll to next section"
        >
          Scroll
          <span className={styles.scrollLine}>
            <span className={styles.scrollPulse} />
          </span>
        </button>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
      <rect x="14" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 11-3-6.7" />
      <path d="M21 4v5h-5" />
    </svg>
  );
}
function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 9.5h3l5-3.5v12l-5-3.5H5z" fill="currentColor" stroke="none" />
      <path d="M16 8.5a4.5 4.5 0 010 7" />
      <path d="M18.5 6a8 8 0 010 12" />
    </svg>
  );
}
function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 9.5h3l5-3.5v12l-5-3.5H5z" fill="currentColor" stroke="none" />
      <path d="M16 9l5 6M21 9l-5 6" />
    </svg>
  );
}
