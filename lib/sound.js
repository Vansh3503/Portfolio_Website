"use client";

/**
 * Tiny synthesized UI sound engine — built on the Web Audio API so the site
 * doesn't need to ship any audio assets.
 *
 *  - click: short bright tap (UI primary action)
 *  - hover: very soft tick (light, sparingly used)
 *  - success: brief two-note chime
 *
 * AudioContext is created lazily and resumed on first user gesture (browsers
 * suspend it until the user interacts).
 */

let ctx = null;
let masterGain = null;
let unlocked = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.18; // global volume
  masterGain.connect(ctx.destination);
  return ctx;
}

export function unlockAudio() {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume().catch(() => {});
  unlocked = true;
}

export function setMuted(muted) {
  const c = getCtx();
  if (!c || !masterGain) return;
  masterGain.gain.cancelScheduledValues(c.currentTime);
  masterGain.gain.setTargetAtTime(muted ? 0 : 0.18, c.currentTime, 0.02);
}

function envelope(node, c, { attack = 0.005, decay = 0.12, peak = 1 } = {}) {
  const g = c.createGain();
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(peak, c.currentTime + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + attack + decay);
  node.connect(g);
  g.connect(masterGain);
  return g;
}

export function playClick() {
  const c = getCtx();
  if (!c || !unlocked) return;
  const now = c.currentTime;

  // Bright high tick — square + quick exponential decay
  const o1 = c.createOscillator();
  o1.type = "square";
  o1.frequency.setValueAtTime(1850, now);
  o1.frequency.exponentialRampToValueAtTime(820, now + 0.06);
  envelope(o1, c, { attack: 0.002, decay: 0.07, peak: 0.6 });
  o1.start(now);
  o1.stop(now + 0.09);

  // Sub thump for body
  const o2 = c.createOscillator();
  o2.type = "sine";
  o2.frequency.setValueAtTime(220, now);
  o2.frequency.exponentialRampToValueAtTime(90, now + 0.08);
  envelope(o2, c, { attack: 0.001, decay: 0.1, peak: 0.4 });
  o2.start(now);
  o2.stop(now + 0.12);
}

/**
 * Soft monospaced terminal tick — used by the preloader for each streamed line.
 * Lower & quieter than the click so they layer with no fatigue.
 */
export function playTick(variant = "low") {
  const c = getCtx();
  if (!c || !unlocked) return;
  const now = c.currentTime;
  const base =
    variant === "high" ? 1240 : variant === "mid" ? 880 : 540;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(base, now);
  o.frequency.exponentialRampToValueAtTime(base * 0.6, now + 0.08);
  const g = c.createGain();
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(0.22, now + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  o.connect(g);
  g.connect(masterGain);
  o.start(now);
  o.stop(now + 0.14);
}

/**
 * Boot sweep — used once when preloader hits the final state.
 */
export function playBoot() {
  const c = getCtx();
  if (!c || !unlocked) return;
  const now = c.currentTime;
  const o = c.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(220, now);
  o.frequency.exponentialRampToValueAtTime(880, now + 0.45);
  const g = c.createGain();
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(0.22, now + 0.1);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
  const filt = c.createBiquadFilter();
  filt.type = "lowpass";
  filt.frequency.setValueAtTime(900, now);
  filt.frequency.exponentialRampToValueAtTime(2400, now + 0.5);
  o.connect(filt);
  filt.connect(g);
  g.connect(masterGain);
  o.start(now);
  o.stop(now + 0.6);
}

export function playHover() {
  const c = getCtx();
  if (!c || !unlocked) return;
  const now = c.currentTime;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(1400, now);
  o.frequency.exponentialRampToValueAtTime(1900, now + 0.04);
  envelope(o, c, { attack: 0.001, decay: 0.05, peak: 0.16 });
  o.start(now);
  o.stop(now + 0.06);
}

export function playSuccess() {
  const c = getCtx();
  if (!c || !unlocked) return;
  const now = c.currentTime;
  // Two-note chime: G5 → C6
  [
    { f: 784, t: 0 },
    { f: 1046, t: 0.09 },
  ].forEach(({ f, t }) => {
    const o = c.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(f, now + t);
    const g = c.createGain();
    g.gain.setValueAtTime(0, now + t);
    g.gain.linearRampToValueAtTime(0.5, now + t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.4);
    o.connect(g);
    g.connect(masterGain);
    o.start(now + t);
    o.stop(now + t + 0.5);
  });
}
