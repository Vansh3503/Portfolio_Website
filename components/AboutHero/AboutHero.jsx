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
              An AI engineer who treats UX, infra, and storytelling as one craft.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.lead}>
              I&apos;m <strong>Vansh Malhotra</strong>, an AI engineer who builds
              the unglamorous middle layer between models and product —
              retrieval, orchestration, evaluation, and the infra that keeps
              it all honest in production.
            </p>
            <p className={styles.lead}>
              I work in <strong>Python</strong> across{" "}
              <strong>FastAPI</strong>, <strong>LangGraph</strong>,{" "}
              <strong>CrewAI</strong>, and <strong>Agno</strong> for agentic
              systems; <strong>PgVector</strong>, <strong>Redis</strong>, and{" "}
              <strong>RabbitMQ</strong> for retrieval and async pipelines;
              and <strong>Docker</strong>, <strong>Kubernetes (AKS)</strong>,
              and <strong>Kong</strong> when those systems need to ship.
            </p>
            <p className={styles.lead}>
              On the rigor side I lean on <strong>DeepEval</strong> for RAG
              quality and <strong>Garak</strong> for adversarial probing
              across the OWASP-LLM Top-10. I care about retrieval precision,
              eval discipline, and motion that makes the work feel as good as
              it works.
            </p>
          </Reveal>

          <Reveal stagger={`.${styles.stat}`} className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statValue}>~1.5y</div>
              <div className={styles.statLabel}>In production AI</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>Python</div>
              <div className={styles.statLabel}>Primary language</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>Ship</div>
              <div className={styles.statLabel}>Default mode</div>
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
