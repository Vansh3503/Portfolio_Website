"use client";

import { createContext, useContext, useEffect } from "react";
import {
  playClick,
  playHover,
  playSuccess,
  setMuted as setEngineMuted,
  unlockAudio,
} from "@/lib/sound";

const SoundCtx = createContext({
  click: () => {},
  hover: () => {},
  success: () => {},
});

export function useSound() {
  return useContext(SoundCtx);
}

export default function SoundProvider({ children }) {
  // Sound is always on — engine starts unmuted.
  useEffect(() => {
    setEngineMuted(false);
  }, []);

  // Browsers suspend AudioContext until the user interacts.
  // Unlock it on the first pointer/keydown.
  useEffect(() => {
    const onFirst = () => {
      unlockAudio();
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst, { once: true });
    window.addEventListener("keydown", onFirst, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
  }, []);

  // Global click sound on any interactive element
  useEffect(() => {
    const isInteractive = (el) => {
      if (!el) return false;
      if (el.closest?.("[data-no-sound]")) return false;
      return !!el.closest?.(
        'a, button, [role="button"], input[type="submit"], input[type="button"], summary, [data-sound]'
      );
    };
    const onClick = (e) => {
      if (isInteractive(e.target)) playClick();
    };
    document.addEventListener("pointerdown", onClick, true);
    return () => document.removeEventListener("pointerdown", onClick, true);
  }, []);

  const value = {
    click: playClick,
    hover: playHover,
    success: playSuccess,
  };

  return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>;
}
