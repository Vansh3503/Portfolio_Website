"use client";

import Reveal from "@/components/Reveal/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import { EXPERIENCE, CERTIFICATIONS, AWARDS } from "@/lib/projects";
import styles from "./Timeline.module.css";

export default function Timeline() {
  return (
    <section className={styles.section}>
      <SectionBackdrop variant="cool" />
      <div className={styles.inner}>
        <ol className={styles.list}>
          {EXPERIENCE.map((job, idx) => (
            <Reveal as="li" key={`${job.role}-${job.company}`} className={styles.item} delay={idx * 0.05}>
              <div className={styles.dot} />
              <div className={styles.head}>
                <div>
                  <h3 className={styles.role}>{job.role}</h3>
                  <div className={styles.company}>{job.company}</div>
                </div>
                <div className={styles.meta}>
                  <div className={styles.period}>{job.period}</div>
                  <div className={styles.where}>{job.where}</div>
                </div>
              </div>
              <ul className={styles.bullets}>
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {job.link ? (
                <a
                  className={styles.jobLink}
                  href={job.link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Read more on {job.link.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              ) : null}
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className={styles.certBlock}>
            <h3 className={styles.certTitle}>Certifications</h3>
            <ul className={styles.certList}>
              {CERTIFICATIONS.map((c) => (
                <li key={c} className={styles.certItem}>
                  <span className={styles.certBullet} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {AWARDS && AWARDS.length > 0 && (
          <Reveal>
            <div className={styles.certBlock}>
              <h3 className={styles.certTitle}>Awards</h3>
              <ul className={styles.certList}>
                {AWARDS.map((a) => (
                  <li key={a.title} className={styles.certItem}>
                    <span className={styles.certBullet} />
                    <strong>{a.title}</strong>, {a.org} ({a.year}) — {a.detail}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className={styles.eduBlock}>
            <h3 className={styles.certTitle}>Education</h3>
            <div className={styles.eduCard}>
              <div className={styles.eduTop}>
                <div>
                  <div className={styles.eduRole}>
                    B.E. in Information Technology
                  </div>
                  <div className={styles.eduCompany}>
                    NEW LJIET (Affiliated with GTU)
                  </div>
                </div>
                <div className={styles.meta}>
                  <div className={styles.period}>Nov 2020 – May 2024</div>
                  <div className={styles.where}>Ahmedabad, India</div>
                </div>
              </div>
              <div className={styles.eduGpa}>GPA · 3.7 / 4.0</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
