"use client";

import Reveal from "@/components/Reveal/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import styles from "./Highlights.module.css";

const ITEMS = [
  {
    title: "Multi-Agent Systems & Orchestration",
    body:
      "Designed supervisor-routing Team architectures on Agno, scaling a solo proof-of-concept into a 9–11 member initiative (NomAIzo™). Shipped CyberStudio with 6+ specialized GPT-4o agents, automating EU Cyber Resilience Act compliance gap assessments at ~70% accuracy.",
    tags: ["Agno", "GPT-4o", "CrewAI", "NomAIzo™"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 7.5L12 3l9 4.5-9 4.5L3 7.5z" />
        <path d="M3 12.5L12 17l9-4.5" />
        <path d="M3 17.5L12 22l9-4.5" />
      </svg>
    ),
  },
  {
    title: "Enterprise RAG & Microservices",
    body:
      "Architected event-driven 14-microservice systems on FastAPI and RabbitMQ. Engineered high-throughput RAG pipelines with Docling OCR and dual, physically isolated PgVector knowledge bases utilizing hybrid semantic + keyword search and content-hash deduplication.",
    tags: ["FastAPI", "RabbitMQ", "PgVector", "Docling"],
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
    title: "Model Safety & Platform Security",
    body:
      "Established Langfuse and Garak observability and adversarial testing (90% security accuracy across 28 attack probes). Integrated Wiz for continuous code/container scanning and hardened APIs via Fernet/bcrypt encryption and Redis JWT blacklisting.",
    tags: ["Langfuse", "Garak", "Wiz", "DeepEval"],
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
    <section className={styles.section}>
      <SectionBackdrop variant="warm" />
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
              <div className={styles.cardTags}>
                {it.tags.map((t) => (
                  <span key={t} className={styles.cardTag}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
