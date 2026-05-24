"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `${form.msg}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:vanshmalhotra353@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className={styles.section}>
      <SectionBackdrop variant="green" />
      <div className={styles.inner}>
        <div className={styles.left}>
          <Reveal>
            <p className={styles.eyebrow}>Get in touch</p>
            <h2 className={styles.title}>
              I read every message.{" "}
              <span className={styles.titleAccent}>
                Roles, collabs, and curious questions are all welcome.
              </span>
            </h2>
          </Reveal>

          <Reveal stagger={`.${styles.contactRow}`} className={styles.contactList}>
            <a
              className={styles.contactRow}
              href="mailto:vanshmalhotra353@gmail.com"
            >
              <div className={styles.contactLabel}>Email</div>
              <div className={styles.contactValue}>
                vanshmalhotra353@gmail.com
              </div>
              <span className={styles.contactArrow} aria-hidden="true">→</span>
            </a>
            <a
              className={styles.contactRow}
              href="https://www.linkedin.com/in/vansh-malhotra353/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className={styles.contactLabel}>LinkedIn</div>
              <div className={styles.contactValue}>
                /in/vansh-malhotra353
              </div>
              <span className={styles.contactArrow} aria-hidden="true">↗</span>
            </a>
            <a
              className={styles.contactRow}
              href="https://github.com/Vansh3503"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className={styles.contactLabel}>GitHub</div>
              <div className={styles.contactValue}>/Vansh3503</div>
              <span className={styles.contactArrow} aria-hidden="true">↗</span>
            </a>
            <a className={styles.contactRow} href="tel:+919925351328">
              <div className={styles.contactLabel}>Phone</div>
              <div className={styles.contactValue}>+91 99253 51328</div>
              <span className={styles.contactArrow} aria-hidden="true">→</span>
            </a>
            <a
              className={styles.contactRow}
              href="/Vansh_Malhotra_Resume.pdf"
              download
            >
              <div className={styles.contactLabel}>Resume</div>
              <div className={styles.contactValue}>
                Download PDF · 132 KB
              </div>
              <span className={styles.contactArrow} aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className={styles.formWrap}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={onChange}
                placeholder="Ada Lovelace"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                placeholder="ada@studio.com"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="msg">Message</label>
              <textarea
                id="msg"
                name="msg"
                rows={5}
                required
                value={form.msg}
                onChange={onChange}
                placeholder="Tell me a bit about what you're building…"
              />
            </div>
            <button type="submit" className={styles.submit}>
              Send message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </svg>
            </button>
            <p className={styles.fineprint}>
              Submitting opens your email client with a pre-filled draft —
              nothing leaves the browser without your hand on the trigger.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
