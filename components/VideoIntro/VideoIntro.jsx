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

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  // Sync drift between ambient + foreground
  const syncVideos = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (Math.abs(fg.currentTime - bg.currentTime) > 0.25) {
      bg.currentTime = fg.currentTime;
    }
  }, []);

  // GSAP entrance timeline — quick & confident
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(`.${styles.nameInner}`, { yPercent: 110 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(`.${styles.tagline}`, { opacity: 1, y: 0, duration: 0.7 }, 0)
        .to(
          `.${styles.nameInner}`,
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.out",
          },
          0.1
        )
        .to(
          `.${styles.subtitle}`,
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        )
        .to(
          `.${styles.heroActions}`,
          { opacity: 1, y: 0, duration: 0.7 },
          0.55
        )
        .to(
          `.${styles.controls}`,
          { opacity: 1, y: 0, duration: 0.6 },
          0.6
        )
        .to(
          `.${styles.metaChips}`,
          { opacity: 1, y: 0, duration: 0.6 },
          0.65
        )
        .to(
          `.${styles.scrollIndicator}`,
          { opacity: 1, y: 0, duration: 0.6 },
          0.75
        )
        .to(
          `.${styles.soundBadge}`,
          { opacity: 1, y: 0, duration: 0.6 },
          0.85
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!showSoundBadge) return;
    const t = setTimeout(() => setShowSoundBadge(false), 6500);
    return () => clearTimeout(t);
  }, [showSoundBadge]);

  useEffect(() => {
    const id = setInterval(syncVideos, 1500);
    return () => clearInterval(id);
  }, [syncVideos]);

  useEffect(() => {
    const onVisibility = () => {
      const fg = fgVideoRef.current;
      const bg = bgVideoRef.current;
      if (!fg || !bg) return;
      if (document.hidden) {
        fg.pause();
        bg.pause();
      } else if (isPlaying) {
        fg.play().catch(() => {});
        bg.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, [isPlaying]);

  // Safety net: if browser doesn't fire canPlay/loadedData reliably,
  // reveal once the video has any data after 600ms.
  useEffect(() => {
    if (videoReady) return;
    const t = setTimeout(() => {
      const fg = fgVideoRef.current;
      if (fg && fg.readyState >= 2) setVideoReady(true);
    }, 600);
    return () => clearTimeout(t);
  }, [videoReady]);

  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (fg.paused) {
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
    if (!next) setShowSoundBadge(false);
  }, []);

  const handleSoundBadge = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = false;
    setIsMuted(false);
    setShowSoundBadge(false);
  }, []);

  const onVideoReady = useCallback(() => setVideoReady(true), []);

  const scrollToNext = useCallback(() => {
    const next = document.getElementById("next-section");
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
    else
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Cinematic intro">
      {/* Ambient blurred background video */}
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

      {/* Foreground talking-head video — full screen */}
      <div className={styles.foreground}>
        <video
          ref={fgVideoRef}
          className={`${styles.foregroundVideo} ${
            videoReady ? styles.foregroundReady : ""
          }`}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={onVideoReady}
          onCanPlay={onVideoReady}
        />
      </div>

      {/* Cinematic veils for legibility */}
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
                <span className={styles.nameInner}>Vansh</span>
              </span>
            </span>
            <span className={`${styles.name} ${styles.nameLast}`}>
              <span className={styles.nameWord}>
                <span className={styles.nameInner}>Malhotra</span>
              </span>
            </span>
          </h1>

          <p className={styles.subtitle}>
            <RotatingRole />
            <span className={styles.subtitleText}>
              {" "}
              · I build with Python, FastAPI, LangGraph, CrewAI, PgVector, Redis,
              and Azure OpenAI — shipping retrieval, orchestration, and eval
              pipelines that hold up in production.
            </span>
          </p>

          <div className={styles.heroActions}>
            <Link href="/work" className={styles.primaryBtn}>
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/about" className={styles.ghostBtn}>
              About me
            </Link>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.glassBtn}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              aria-pressed={!isPlaying}
              data-no-sound
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
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

        {/* Tap-for-sound badge */}
        <button
          type="button"
          onClick={handleSoundBadge}
          className={`${styles.soundBadge} ${
            showSoundBadge && isMuted
              ? styles.soundBadgeVisible
              : styles.soundBadgeHidden
          }`}
          aria-label="Tap for sound"
        >
          <span className={styles.soundBadgeIcon}>
            <SoundIcon />
          </span>
          Tap for sound
        </button>

        {/* Scroll indicator */}
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
