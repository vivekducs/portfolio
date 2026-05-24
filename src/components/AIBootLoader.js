"use client";

import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "Initializing VK Assistant...", color: "text-luxury-purple", delay: 0 },
  { text: "Loading AI Systems...", color: "text-luxury-magenta", delay: 500 },
  { text: "Connecting to Engineering Portfolio...", color: "text-luxury-orange", delay: 1000 },
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
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(147,51,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Central glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-purple opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-luxury-magenta opacity-15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg px-8">
        {/* Logo / Name */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-luxury-violet via-luxury-magenta to-luxury-orange opacity-80 animate-pulse" />
            <span className="relative text-white font-black text-2xl mono-font">VK</span>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tight mb-1">
            Vivek Kumar<span className="gradient-text"> AI</span>
          </h1>
          <p className="text-[var(--text-muted)] text-xs mono-font tracking-widest uppercase">
            Engineering Portfolio v2.0
          </p>
        </div>

        {/* Terminal window */}
        <div className="bg-[#0d0d10] border border-luxury-purple/20 rounded-2xl overflow-hidden shadow-2xl shadow-luxury-purple/10">
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-luxury-purple/10 bg-[#111116]">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="flex-1 text-center text-[10px] text-[var(--text-muted)] mono-font tracking-widest uppercase">
              vk-ai-system boot
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 space-y-2 min-h-[180px]">
            {BOOT_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 text-[11px] mono-font transition-all duration-300 ${
                  visibleLines.includes(idx)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                } ${line.color}`}
              >
                <span className="text-luxury-purple/60">{">"}</span>
                <span>{line.text}</span>
                {visibleLines.includes(idx) && idx === visibleLines[visibleLines.length - 1] && idx < BOOT_LINES.length - 1 && (
                  <span className="inline-block w-2 h-3 bg-luxury-purple animate-pulse rounded-sm ml-0.5" />
                )}
                {visibleLines.includes(idx) && (
                  <span className="ml-auto text-emerald-400 text-[9px]">
                    {idx === BOOT_LINES.length - 1 ? "✓ DONE" : "✓"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-[var(--text-muted)] mono-font uppercase tracking-widest">System Boot</span>
              <span className="text-[9px] text-luxury-purple mono-font font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-luxury-purple/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-luxury-violet via-luxury-magenta to-luxury-orange transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[var(--text-muted)] mt-6 mono-font">
          Building scalable AI systems from Noida, India 🇮🇳
        </p>
      </div>
    </div>
  );
}
