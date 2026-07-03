import styles from "./Marquee.module.css";

const ITEMS = [
  { label: "Multi-Agent Systems", accent: true },
  { label: "RAG Pipelines" },
  { label: "NomAIzo™ AI Studio", accent: true },
  { label: "FastAPI · Agno · PgVector" },
  { label: "CyberStudio · EU CRA", accent: true },
  { label: "Playwright · Appium" },
  { label: "Langfuse · Garak · DeepEval", accent: true },
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
