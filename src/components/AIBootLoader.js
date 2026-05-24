"use client";

import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "Initializing VK Assistant...", color: "text-emerald-500", delay: 0 },
  { text: "Loading AI Systems...", color: "text-green-500", delay: 500 },
  { text: "Connecting to Engineering Portfolio...", color: "text-amber-500", delay: 1000 },
  { text: "Syncing GitHub repositories → AVPXM8", color: "text-emerald-400", delay: 1500 },
  { text: "Mapping project architectures...", color: "text-green-400", delay: 2000 },
  { text: "Calibrating DSA performance metrics...", color: "text-amber-400", delay: 2400 },
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
      style={{ background: "radial-gradient(ellipse at center, #022c22 0%, #030712 60%, #000000 100%)" }}
    >
      {/* Background grid - green */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Central glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500 opacity-10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500 opacity-10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg px-8">
        {/* Logo / Name */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-600 via-emerald-500 to-amber-500 opacity-80 animate-pulse" />
            <span className="relative text-white font-black text-2xl mono-font">VK</span>
          </div>
          <h1 className="text-white font-black text-2xl tracking-tight mb-1">
            Vivek Kumar<span className="text-[var(--accent-color)]">.AI</span>
          </h1>
          <p className="text-neutral-400 text-xs mono-font tracking-widest uppercase">
            Engineering Portfolio v2.0
          </p>
        </div>

        {/* Terminal window */}
        <div className="bg-[#050807] border border-green-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-green-500/5">
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-green-500/10 bg-[#080d0b]">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="flex-1 text-center text-[10px] text-neutral-400 mono-font tracking-widest uppercase">
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
                <span className="text-green-500/40">{">"}</span>
                <span>{line.text}</span>
                {visibleLines.includes(idx) && idx === visibleLines[visibleLines.length - 1] && idx < BOOT_LINES.length - 1 && (
                  <span className="inline-block w-2 h-3 bg-green-500 animate-pulse rounded-sm ml-0.5" />
                )}
                {visibleLines.includes(idx) && (
                  <span className="ml-auto text-green-400 text-[9px]">
                    {idx === BOOT_LINES.length - 1 ? "✓ DONE" : "✓"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-neutral-400 mono-font uppercase tracking-widest">System Boot</span>
              <span className="text-[9px] text-green-500 mono-font font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-green-500/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-600 via-emerald-500 to-amber-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-neutral-400 mt-6 mono-font">
          Building scalable AI systems from Noida, India 🇮🇳
        </p>
      </div>
    </div>
  );
}
