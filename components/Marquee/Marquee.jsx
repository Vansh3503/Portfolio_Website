import styles from "./Marquee.module.css";

const ITEMS = [
  { label: "Multi-Agent Systems", accent: true },
  { label: "RAG Pipelines" },
  { label: "LLM Evaluation", accent: true },
  { label: "FastAPI · LangGraph · Agno" },
  { label: "Azure AKS · Kong · Helm", accent: true },
  { label: "Browser Automation" },
  { label: "PgVector · Redis · RabbitMQ", accent: true },
  { label: "Production Ready" },
];

export default function Marquee() {
  // Duplicate for seamless loop
  const loop = [...ITEMS, ...ITEMS];
  return (
    <section className={styles.section} aria-hidden="true">
      <div className={styles.track}>
        {loop.map((it, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            <span className={it.accent ? styles.accent : undefined}>
              {it.label}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
