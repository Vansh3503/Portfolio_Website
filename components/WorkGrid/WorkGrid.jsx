"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PROJECTS } from "@/lib/projects";
import ProjectPoster from "@/components/ProjectPoster/ProjectPoster";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import styles from "./WorkGrid.module.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "ai-studio", label: "AI Studio" },
  { key: "rag", label: "RAG" },
  { key: "eval", label: "Eval & Security" },
  { key: "personal", label: "Personal" },
];

function tagOf(slug) {
  if (slug === "ai-studio" || slug === "multi-agent-qa" || slug === "browser-automation")
    return "ai-studio";
  if (slug === "multimodal-rag") return "rag";
  if (slug === "llm-eval-security") return "eval";
  if (slug === "docuquery") return "personal";
  return "all";
}

export default function WorkGrid() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => tagOf(p.slug) === filter);
  }, [filter]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className={styles.section}>
      <SectionBackdrop variant="warm" />
      <div className={styles.inner}>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`${styles.filterBtn} ${
                filter === f.key ? styles.filterActive : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.ul className={styles.list} layout>
          {filtered.map((p, i) => {
            return (
              <motion.li
                key={p.slug}
                className={styles.card}
                style={{ "--c": p.accent }}
                onMouseMove={onMove}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: (i % 4) * 0.05,
                }}
                whileHover={{ y: -6 }}
              >
                <div className={styles.poster} aria-hidden="true">
                  <ProjectPoster slug={p.slug} accent={p.accent} />
                  <span className={styles.posterChip}>
                    <span className={styles.posterChipDot} />
                    {p.company}
                  </span>
                  <span className={styles.posterYear}>{p.year}</span>
                </div>

                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardSummary}>{p.summary}</p>

                <span className={styles.impact}>
                  <span className={styles.impactDot} />
                  {p.impact}
                </span>

                <div className={styles.stack}>
                  {p.stack.map((s) => (
                    <span key={s} className={styles.chip}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
