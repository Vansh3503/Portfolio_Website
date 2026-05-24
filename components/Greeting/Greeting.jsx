"use client";

import { motion } from "framer-motion";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import styles from "./Greeting.module.css";

export default function Greeting() {
  return (
    <section className={styles.section}>
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

        <h2 className={styles.headline} aria-label="Hi, I'm Vansh">
          {/* Line 1: wave + "Hi," */}
          <motion.span
            className={`${styles.row} ${styles.rowFlex}`}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
          >
            <motion.span
              className={styles.wave}
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              👋
            </motion.span>
            <span className={styles.word}>Hi,</span>
          </motion.span>

          {/* Line 2: "I'm" */}
          <motion.span
            className={styles.row}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.34 }}
          >
            I&apos;m
          </motion.span>

          {/* Line 3: "Vansh." */}
          <motion.span
            className={styles.row}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.46 }}
          >
            Vansh.
          </motion.span>
        </h2>

        <motion.p
          className={styles.lede}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.7 }}
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
