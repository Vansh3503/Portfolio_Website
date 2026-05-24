"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import styles from "./OffDuty.module.css";

const HOBBIES = [
  { emoji: "🎬", label: "Reels & cinematography" },
  { emoji: "🥽", label: "Swimming" },
  { emoji: "🥾", label: "Hiking" },
  { emoji: "✈️", label: "Traveling" },
  { emoji: "📸", label: "Photo journals" },
  { emoji: "☕", label: "Long-walk thinking" },
];

export default function OffDuty() {
  return (
    <section className={styles.section}>
      <SectionBackdrop variant="violet" />
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>Off-duty</p>
          <h2 className={styles.title}>
            When I&apos;m not shipping models, I&apos;m{" "}
            <span className={styles.titleAccent}>chasing trails and frames.</span>
          </h2>
          <p className={styles.lead}>
            I make Instagram reels for fun, swim a couple times a week, and
            travel any chance I get. Mountains over malls, bookmarked cafés
            over big restaurants. The same craft I bring to engineering shows
            up here too — careful framing, slow cuts, real moments.
          </p>

          <motion.div
            className={styles.hobbies}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {HOBBIES.map((h) => (
              <motion.span
                key={h.label}
                className={styles.hobby}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <span className={styles.hobbyEmoji} aria-hidden="true">
                  {h.emoji}
                </span>
                {h.label}
              </motion.span>
            ))}
          </motion.div>

          <motion.a
            href="https://www.instagram.com/vansh_353__"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.instaCta}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
            Follow @vansh_353__
          </motion.a>
        </motion.div>

        <motion.div
          className={styles.stack}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
          whileHover={{ rotateZ: 0 }}
        >
          <motion.div
            className={`${styles.photo} ${styles.photoBack1}`}
            animate={{ y: [0, -8, 0], rotate: [-6, -7, -6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className={`${styles.photo} ${styles.photoBack2}`}
            animate={{ y: [0, 6, 0], rotate: [4, 5, 4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className={`${styles.photo} ${styles.photoMain}`}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02, rotate: -1 }}
          >
            <Image
              src="/media/hiking.png"
              alt="Vansh hiking on a mountain trail"
              width={900}
              height={1100}
              className={styles.photoImg}
              priority={false}
            />
            <div className={styles.photoVignette} aria-hidden="true" />
            <div className={styles.photoCaption}>
              <span className={styles.captionDot} />
              On the trail · 2025
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
