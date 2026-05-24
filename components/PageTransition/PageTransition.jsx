"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./PageTransition.module.css";

/**
 * Soft cinematic fade between routes:
 *  - On pathname change, fade content slightly + slide up.
 *  - No layout shift, no jank.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 18, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        ease: "power3.out",
      }
    );
  }, [pathname]);

  return (
    <div className={styles.wrap}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
