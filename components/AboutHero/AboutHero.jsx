"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "@/components/Reveal/Reveal";
import NeuralNet from "@/components/NeuralNet/NeuralNet";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import { SKILLS } from "@/lib/projects";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  const stageRef = useRef(null);
  const portraitRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    if (!stageRef.current) return;
    const stage = stageRef.current;
    const portrait = portraitRef.current;
    const halo = haloRef.current;

    // Slow ambient float
    const float = gsap.to(portrait, {
      y: -14,
      duration: 4.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Halo counter-float
    const haloFloat = gsap.to(halo, {
      y: 10,
      scale: 1.04,
      duration: 5.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Mouse parallax
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      gsap.to(portrait, {
        rotateY: x * 6,
        rotateX: -y * 5,
        x: x * 14,
        duration: 0.9,
        ease: "power3.out",
        transformPerspective: 900,
      });
      gsap.to(halo, {
        x: -x * 10,
        y: -y * 8,
        duration: 1.1,
        ease: "power3.out",
      });
    };
    const onLeave = () => {
      gsap.to(portrait, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(halo, { x: 0, y: 0, duration: 1.2, ease: "power3.out" });
    };

    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);

    return () => {
      float.kill();
      haloFloat.kill();
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className={styles.section}>
      <SectionBackdrop variant="warm" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Reveal>
            <p className={styles.eyebrow}>About</p>
            <h2 className={styles.title}>
              An AI engineer who founded AI Studio, shipped NomAIzo\u2122, and builds multi-agent LLM systems at production scale.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.lead}>
              I&apos;m <strong>Vansh Malhotra</strong>, an AI engineer who founded
              and scaled eInfoChips&apos; AI Studio initiative from a solo
              proof-of-concept into a 9–11 member team, productized company-wide
              as <strong>NomAIzo™ AI Studio</strong>.
            </p>
            <p className={styles.lead}>
              I build <strong>multi-agent LLM systems</strong> with{" "}
              <strong>Agno</strong>, <strong>RAG infrastructure</strong> with{" "}
              <strong>PgVector</strong> and <strong>Docling</strong>, and{" "}
              <strong>AI-driven test automation</strong> across web, desktop, and
              mobile using <strong>Playwright</strong> and{" "}
              <strong>Appium</strong>.
            </p>
            <p className={styles.lead}>
              I also built <strong>CyberStudio</strong> for EU CRA/RED compliance
              gap analysis, and established LLM observability and adversarial
              testing standards using <strong>Langfuse</strong> and{" "}
              <strong>Garak</strong>, achieving 90% security accuracy across 28
              attack probes.
            </p>
          </Reveal>

          <Reveal stagger={`.${styles.stat}`} className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statValue}>~2y</div>
              <div className={styles.statLabel}>In production AI</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>9–11</div>
              <div className={styles.statLabel}>Team members led</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>NomAIzo™</div>
              <div className={styles.statLabel}>Productized platform</div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div ref={stageRef} className={styles.stage}>
            <div ref={haloRef} className={styles.halo} aria-hidden="true" />
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.portraitWrap}>
              <div ref={portraitRef} className={styles.portrait}>
                <Image
                  src="/media/avatar.png"
                  alt="3D avatar of Vansh Malhotra"
                  width={720}
                  height={720}
                  priority
                  className={styles.portraitImg}
                />
                <div className={styles.portraitVignette} aria-hidden="true" />
              </div>
            </div>
            <div className={styles.tagFloating} aria-hidden="true">
              <span className={styles.tagDot} />
              Identity-consistent 3D avatar · AI generated
            </div>
            <div className={styles.tagBottom} aria-hidden="true">
              Ahmedabad, IN · UTC+5:30
            </div>
          </div>
        </Reveal>
      </div>

      <div className={styles.skills}>
        <div className={styles.skillsNet} aria-hidden="true">
          <NeuralNet />
        </div>
        <Reveal>
          <h3 className={styles.skillsTitle}>The toolbox</h3>
        </Reveal>
        <div className={styles.skillsGrid}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <Reveal key={cat} className={styles.skillCol}>
              <div className={styles.skillCat}>{cat}</div>
              <div className={styles.skillChips}>
                {items.map((s) => (
                  <span key={s} className={styles.skillChip}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
