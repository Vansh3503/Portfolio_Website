import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.bigType}>Let&apos;s build something cinematic.</h2>
          <p className={styles.lead}>
            Open to AI engineering roles, agentic system collaborations, and
            anything where retrieval, evaluation, and great UX meet.
          </p>
        </div>

        <div className={styles.socials}>
          <a
            className={styles.social}
            href="mailto:vanshmalhotra353@gmail.com"
          >
            Email
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            className={styles.social}
            href="https://www.linkedin.com/in/vansh-malhotra353/"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            className={styles.social}
            href="https://github.com/Vansh3503"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.legal}>
        <span>© {new Date().getFullYear()} Vansh Malhotra</span>
        <span>Built with Next.js · Three.js · GSAP</span>
      </div>
    </footer>
  );
}
