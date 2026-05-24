"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal/Reveal";
import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import { useSound } from "@/components/SoundProvider/SoundProvider";
import styles from "./Contact.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialState = { name: "", email: "", msg: "" };

/**
 * Map character usage to a CSS tone class.
 *  < 75% → muted
 *  75-90% → warm
 *  >= 90% → red
 */
function counterTone(len, max) {
  const ratio = len / max;
  if (ratio >= 0.9) return styles.counterDanger;
  if (ratio >= 0.75) return styles.counterWarn;
  return "";
}

function validate({ name, email, msg }) {
  const e = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMsg = msg.trim();

  if (!trimmedName) e.name = "Please enter your name.";
  else if (trimmedName.length < 2) e.name = "Name should be at least 2 characters.";
  else if (trimmedName.length > 80) e.name = "Name is too long (max 80).";

  if (!trimmedEmail) e.email = "We need an email to reply.";
  else if (!EMAIL_RE.test(trimmedEmail)) e.email = "Hmm, that doesn't look like a valid email.";

  if (!trimmedMsg) e.msg = "Tell me a bit about what you're working on.";
  else if (trimmedMsg.length < 12)
    e.msg = "A few more words help me write a better reply (12+ chars).";
  else if (trimmedMsg.length > 2000) e.msg = "Message is too long (max 2000).";

  return e;
}

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const sound = useSound();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (touched[name] || errors[name]) {
      setErrors((prev) => {
        const next = validate({ ...form, [name]: value });
        return { ...prev, [name]: next[name] };
      });
    }
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const next = validate(form);
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    setTouched({ name: true, email: true, msg: true });

    if (Object.keys(next).length > 0) {
      // Focus the first invalid input
      const first = Object.keys(next)[0];
      const el = document.getElementById(first);
      if (el) el.focus();
      return;
    }

    sound.success?.();

    const subject = encodeURIComponent(`Portfolio inquiry — ${form.name.trim()}`);
    const body = encodeURIComponent(
      `${form.msg.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`
    );
    const mailto = `mailto:vanshmalhotra353@gmail.com?subject=${subject}&body=${body}`;

    // Trigger the user's mail client + show a confirmation card
    window.location.href = mailto;
    setSent(true);
  };

  const reset = () => {
    setForm(initialState);
    setErrors({});
    setTouched({});
    setSent(false);
  };

  const fieldClass = (name) =>
    `${styles.field} ${
      touched[name] && errors[name]
        ? styles.fieldError
        : touched[name] && !errors[name] && form[name].trim()
        ? styles.fieldOk
        : ""
    }`;

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
            <a className={styles.contactRow} href="mailto:vanshmalhotra353@gmail.com">
              <div className={styles.contactLabel}>Email</div>
              <div className={styles.contactValue}>vanshmalhotra353@gmail.com</div>
              <span className={styles.contactArrow} aria-hidden="true">→</span>
            </a>
            <a
              className={styles.contactRow}
              href="https://www.linkedin.com/in/vansh-malhotra353/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className={styles.contactLabel}>LinkedIn</div>
              <div className={styles.contactValue}>/in/vansh-malhotra353</div>
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
              <div className={styles.contactValue}>Download PDF · 132 KB</div>
              <span className={styles.contactArrow} aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className={styles.formWrap}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                className={styles.success}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.successIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Almost there.</h3>
                <p className={styles.successBody}>
                  Your email client should have opened a draft addressed to me.
                  If it didn&apos;t, just send a note straight to{" "}
                  <a href="mailto:vanshmalhotra353@gmail.com">
                    vanshmalhotra353@gmail.com
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className={styles.successReset}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={fieldClass("name")}>
                  <label htmlFor="name">
                    Your name
                    <span
                      className={`${styles.counter} ${counterTone(form.name.length, 80)}`}
                    >
                      {form.name.length}/80
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-err" : undefined}
                    maxLength={80}
                  />
                  <FieldError id="name-err" message={errors.name} />
                </div>

                <div className={fieldClass("email")}>
                  <label htmlFor="email">
                    Email
                    <span
                      className={`${styles.counter} ${counterTone(form.email.length, 120)}`}
                    >
                      {form.email.length}/120
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="ada@studio.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    maxLength={120}
                  />
                  <FieldError id="email-err" message={errors.email} />
                </div>

                <div className={fieldClass("msg")}>
                  <label htmlFor="msg">
                    Message
                    <span
                      className={`${styles.counter} ${counterTone(form.msg.length, 2000)}`}
                    >
                      {form.msg.length}/2000
                    </span>
                  </label>
                  <textarea
                    id="msg"
                    name="msg"
                    rows={5}
                    value={form.msg}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Tell me a bit about what you're building…"
                    aria-invalid={Boolean(errors.msg)}
                    aria-describedby={errors.msg ? "msg-err" : undefined}
                    maxLength={2000}
                  />
                  <FieldError id="msg-err" message={errors.msg} />
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
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function FieldError({ id, message }) {
  return (
    <div className={styles.errorRow} aria-live="polite">
      <AnimatePresence>
        {message ? (
          <motion.span
            id={id}
            className={styles.errorMsg}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" /><path d="M12 16h.01" />
            </svg>
            {message}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
