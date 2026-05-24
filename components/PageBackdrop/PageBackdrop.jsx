"use client";

import { motion } from "framer-motion";
import styles from "./PageBackdrop.module.css";

/**
 * Ambient backdrop for inner pages — drifting warm/cool orbs over a
 * subtle floating grid. Sits behind the PageHeader so it animates while
 * users read.
 *
 * Variants tweak position & color emphasis per page.
 */
export default function PageBackdrop({ variant = "warm" }) {
  return (
    <div className={`${styles.wrap} ${styles[variant] || ""}`} aria-hidden="true">
      <div className={styles.grid} />

      <motion.div
        className={`${styles.orb} ${styles.orbWarm}`}
        animate={{ x: [0, 60, -20, 0], y: [0, -40, 30, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${styles.orb} ${styles.orbCool}`}
        animate={{ x: [0, -40, 30, 0], y: [0, 50, -20, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${styles.orb} ${styles.orbAccent}`}
        animate={{ x: [0, 30, -50, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={styles.scan} />
      <div className={styles.fade} />
    </div>
  );
}
