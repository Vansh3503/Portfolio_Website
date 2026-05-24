"use client";

import Reveal from "@/components/Reveal/Reveal";
import styles from "./PageHeader.module.css";

export default function PageHeader({ eyebrow, title, accent, lead }) {
  return (
    <header className={styles.wrap}>
      <div className={styles.inner}>
        <Reveal>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1 className={styles.title}>
            {title}
            {accent ? (
              <>
                {" "}
                <span className={styles.titleAccent}>{accent}</span>
              </>
            ) : null}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={0.1}>
            <p className={styles.lead}>{lead}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
