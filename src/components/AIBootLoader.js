"use client";

import { useState, useEffect } from "react";
import styles from "./AIBootLoader.module.css";

const BOOT_LINES = [
  { text: "Initializing VK Assistant...", color: "text-brand-primary", delay: 0 },
  { text: "Loading AI Systems...", color: "text-brand-secondary", delay: 500 },
  { text: "Connecting to Engineering Portfolio...", color: "text-brand-primary", delay: 1000 },
  { text: "Syncing GitHub repositories → AVPXM8", color: "text-emerald-400", delay: 1500 },
  { text: "Mapping project architectures...", color: "text-sky-400", delay: 2000 },
  { text: "Calibrating DSA performance metrics...", color: "text-yellow-400", delay: 2400 },
  { text: "Portfolio Ready.", color: "text-white font-black", delay: 2900 },
];

export default function AIBootLoader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Show lines sequentially
    BOOT_LINES.forEach((line, idx) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, idx]);
        setProgress(Math.round(((idx + 1) / BOOT_LINES.length) * 100));
      }, line.delay);
      return () => clearTimeout(t);
    });

    // Start fade out
    const fadeTimer = setTimeout(() => setFading(true), 3600);
    // Unmount
    const doneTimer = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 4200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "radial-gradient(ellipse at center, #0d0a1e 0%, #08080a 60%, #000000 100%)" }}
    >
      {/* Background grid */}
      <div
        className={styles.el_1}
        style={{
          backgroundImage:
            "linear-gradient(rgba(147,51,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Central glow orbs */}
      <div className={styles.el_2} />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-secondary opacity-15 rounded-full blur-[100px] pointer-events-none" />

      <div className={styles.el_3}>
        {/* Logo / Name */}
        <div className={styles.el_4}>
          <div className={styles.el_5}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-primary via-orange-400 to-brand-secondary opacity-80 animate-pulse" />
            <span className={styles.el_6}>VK</span>
          </div>
          <h1 className={styles.el_7}>
            Vivek Kumar<span className="gradient-text"> AI</span>
          </h1>
          <p className={styles.el_8}>
            Engineering Portfolio v2.0
          </p>
        </div>

        {/* Terminal window */}
        <div className={styles.el_9}>
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-primary/10 bg-[#111116]">
            <span className={styles.el_10} />
            <span className={styles.el_11} />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className={styles.el_12}>
              vk-ai-system boot
            </span>
          </div>

          {/* Terminal body */}
          <div className={styles.el_13}>
            {BOOT_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 text-[11px] mono-font transition-all duration-300 ${
                  visibleLines.includes(idx)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                } ${line.color}`}
              >
                <span className={styles.el_14}>{">"}</span>
                <span>{line.text}</span>
                {visibleLines.includes(idx) && idx === visibleLines[visibleLines.length - 1] && idx < BOOT_LINES.length - 1 && (
                  <span className={styles.el_15} />
                )}
                {visibleLines.includes(idx) && (
                  <span className={styles.el_16}>
                    {idx === BOOT_LINES.length - 1 ? "✓ DONE" : "✓"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className={styles.el_17}>
            <div className={styles.el_18}>
              <span className="text-[9px] text-[var(--text-muted)] mono-font uppercase tracking-widest">System Boot</span>
              <span className={styles.el_19}>{progress}%</span>
            </div>
            <div className={styles.el_20}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-primary via-orange-400 to-brand-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className={styles.el_21}>
          Building scalable AI systems from Noida, India 🇮🇳
        </p>
      </div>
    </div>
  );
}
