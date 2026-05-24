"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Reveal — IntersectionObserver-driven entrance animation.
 * Lighter than ScrollTrigger; perfect for staggered section content.
 *
 * Props:
 *  - as: element tag (default 'div')
 *  - delay: seconds
 *  - y: travel distance (default 28px)
 *  - duration: seconds (default 0.9)
 *  - stagger: stagger child animations (selector-based via .reveal-child)
 */
export default function Reveal({
  as: Tag = "div",
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  stagger,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger
      ? el.querySelectorAll(stagger)
      : [el];

    gsap.set(targets, { opacity: 0, y, filter: "blur(6px)" });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true;
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration,
              delay,
              ease: "power3.out",
              stagger: stagger ? 0.09 : 0,
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [delay, y, duration, stagger]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
