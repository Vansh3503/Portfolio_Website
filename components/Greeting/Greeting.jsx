"use client";

import { motion } from "framer-motion";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import styles from "./Greeting.module.css";

const WORDS = ["Hi,", "I'm", "Vansh."];

export default function Greeting() {
  return (
    <section id="next-section" className={styles.section}>
      <SectionBackdrop variant="warm" />
      <div className={styles.inner}>
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrowDot} />
          A quick hello
        </motion.div>

        <h2 className={styles.headline}>
          <motion.span
            className={styles.wave}
            initial={{ rotate: 0, opacity: 0 }}
            whileInView={{ opacity: 1, rotate: [0, 14, -8, 14, -4, 10, 0] }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.1, ease: "easeInOut" }}
            aria-hidden="true"
          >
            👋
          </motion.span>{" "}
          <motion.span
            className={styles.words}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
            }}
          >
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                className={styles.wordWrap}
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
                  },
                }}
              >
                {w}
                {i === WORDS.length - 1 ? null : (
                  <span aria-hidden="true">&nbsp;</span>
                )}
              </motion.span>
            ))}
          </motion.span>
        </h2>

        <motion.p
          className={styles.lede}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          I&apos;m an AI engineer who builds the unglamorous middle layer
          between models and product —{" "}
          <span className={styles.ledeAccent}>retrieval, orchestration,</span>{" "}
          and <span className={styles.ledeAccent}>evaluation pipelines</span>{" "}
          that hold up in production.
        </motion.p>

        <motion.div
          className={styles.kbd}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className={styles.cursor} />
          <span>Glad you&apos;re here</span>
        </motion.div>
      </div>
    </section>
  );
}
