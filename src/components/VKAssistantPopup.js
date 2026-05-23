"use client";

import { useEffect, useRef } from "react";
import { X, Sparkles, Cpu } from "lucide-react";
import VKAssistant from "./VKAssistant";
import styles from "./VKAssistantPopup.module.css";

export default function VKAssistantPopup({ isOpen, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.el_1}>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className={styles.el_2}
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      {/* Dialog — bottom sheet on mobile, centered on desktop */}
      <div
        className={styles.el_3}
        style={{ animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Decorative glow blobs */}
        <div className={styles.el_4} />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-primary opacity-15 rounded-full blur-3xl pointer-events-none" />

        {/* Header bar */}
        <div className={styles.el_5}>
          {/* Drag handle on mobile */}
          <div className={styles.el_7} />

          <div className={styles.el_6}>
            <div className="w-full h-full rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <Sparkles size={16} className="text-brand-secondary animate-pulse" />
            </div>
          </div>

          <div className={styles.el_8}>
            <h3 className={styles.el_9}>
              VK <span className="gradient-text">Assistant</span>
            </h3>
            <p className={styles.el_10}>
              AI · Voice · Recruiter Mode
            </p>
          </div>

          {/* Waveform decoration */}
          <div className={styles.el_10}>
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className={styles.el_11}
                style={{
                  height: `${8 + (i % 3) * 6}px`,
                  animation: `soundwave 1.4s infinite ease-in-out alternate`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className={styles.el_12}
          >
            <X size={17} />
          </button>
        </div>

        {/* Chat body */}
        <div className={styles.el_10}>
          <VKAssistant isModal={true} onClose={onClose} />
        </div>

        {/* Footer */}
        <div className={styles.el_13}>
          <span className="text-[9px] text-[var(--text-muted)] mono-font flex items-center gap-1">
            <Cpu size={9} />
            Powered by VK AI · Gemini 1.5 Flash
          </span>
          <span className={styles.el_14}>● Online</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}
