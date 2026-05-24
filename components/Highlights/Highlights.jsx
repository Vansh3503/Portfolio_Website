"use client";

import Reveal from "@/components/Reveal/Reveal";
import styles from "./Highlights.module.css";

const ITEMS = [
  {
    title: "Multi-Agent Systems",
    body:
      "Agentic pipelines built with Agno, CrewAI, and LangGraph that orchestrate tools, memory, and reasoning across long-running tasks.",
    kpi: "Agno · CrewAI",
    label: "Orchestration",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 7.5L12 3l9 4.5-9 4.5L3 7.5z" />
        <path d="M3 12.5L12 17l9-4.5" />
        <path d="M3 17.5L12 22l9-4.5" />
      </svg>
    ),
  },
  {
    title: "RAG Infrastructure",
    body:
      "Document ingestion, chunking, embedding, and PgVector retrieval with FastAPI, Redis, and RabbitMQ for async workloads.",
    kpi: "PgVector",
    label: "Retrieval engine",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "LLM Evaluation",
    body:
      "Quality and safety testing for production models — DeepEval for RAG metrics, Garak for adversarial probing across OWASP-LLM Top-10.",
    kpi: "DeepEval · Garak",
    label: "Quality & safety",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="11" cy="11" r="7" />
        <path d="M16.5 16.5L21 21" />
      </svg>
    ),
  },
];

export default function Highlights() {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="next-section" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>What I do</p>
            <h2 className={styles.title}>
              Production AI work, written like{" "}
              <span className={styles.titleAccent}>software engineering.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.lead}>
              Most of my time goes into the unglamorous middle layer between
              models and product — retrieval, orchestration, evaluation, and
              the infra that keeps it all honest.
            </p>
          </Reveal>
        </div>

        <Reveal stagger={`.${styles.card}`} className={styles.grid}>
          {ITEMS.map((it) => (
            <article
              key={it.title}
              className={styles.card}
              onMouseMove={onMove}
            >
              <div className={styles.cardIcon}>{it.icon}</div>
              <h3 className={styles.cardTitle}>{it.title}</h3>
              <p className={styles.cardBody}>{it.body}</p>
              <div className={styles.cardKpi}>
                <span className={styles.kpiNum}>{it.kpi}</span>
                <span className={styles.kpiLbl}>{it.label}</span>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
