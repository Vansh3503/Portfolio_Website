"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import { PROJECTS } from "@/lib/projects";
import styles from "./FeaturedWork.module.css";

export default function FeaturedWork() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <section className={styles.section}>
      <SectionBackdrop variant="ember" />
      <div className={styles.inner}>
        <div className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>Selected work</p>
            <h2 className={styles.title}>
              A few things I&apos;ve shipped recently.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/work" className={styles.viewAll}>
              View all
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <motion.ol
          className={styles.list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {featured.map((p) => (
            <motion.li
              key={p.slug}
              className={styles.row}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div>
                <h3 className={styles.rowTitle}>
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer noopener" style={{ color: "inherit", textDecoration: "none" }}>
                      {p.title}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: 6, opacity: 0.4 }}>
                        <path d="M7 17L17 7" /><path d="M8 7h9v9" />
                      </svg>
                    </a>
                  ) : p.title}
                </h3>
                <div className={styles.rowMeta}>{p.company}</div>
              </div>
              <div className={styles.rowImpact}>{p.impact}</div>
              <div className={styles.rowYear}>{p.year}</div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
