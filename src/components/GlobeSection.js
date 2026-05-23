"use client";

import { useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Globe2 } from "lucide-react";

// Dynamically import Three.js scene to avoid SSR issues
const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-luxury-violet to-luxury-magenta animate-spin opacity-60" />
        <p className="text-xs text-[var(--text-muted)] mono-font">Loading 3D Globe...</p>
      </div>
    </div>
  ),
});

const TECH_ICONS = [
  { name: "React", color: "#61DAFB", emoji: "⚛️" },
  { name: "Node.js", color: "#43853D", emoji: "🟢" },
  { name: "MongoDB", color: "#47A248", emoji: "🍃" },
  { name: "TensorFlow", color: "#FF6F00", emoji: "🧠" },
  { name: "Docker", color: "#2496ED", emoji: "🐳" },
  { name: "Gemini", color: "#9333EA", emoji: "✨" },
];

export default function GlobeSection() {
  return (
    <section className="relative py-12 border-t border-[var(--border-color)] overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-luxury-violet opacity-[0.07] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl z-10 px-4 mx-auto">
        {/* Section title */}
        <div className="flex flex-col mb-6 text-left">
          <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Globe2 size={13} /> GLOBAL PRESENCE
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Building From <span className="gradient-text">Noida, India 🇮🇳</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-lg">
            Building scalable AI-powered systems that reach users worldwide — from Noida to the global stage.
          </p>
        </div>

        {/* Main Globe + Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Globe */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl border border-[var(--glass-border)] overflow-hidden shadow-xl relative">
              <GlobeCanvas />
              {/* Location badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-luxury-purple/30 text-white rounded-full px-4 py-2 text-xs font-semibold mono-font flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-luxury-orange animate-ping" />
                Noida, Uttar Pradesh, India
              </div>
            </div>
          </div>

          {/* Right: Tech stack orbiting info + description */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-5 shadow-sm">
              <h3 className="text-sm font-bold text-luxury-purple mono-font uppercase tracking-widest mb-4">
                Tech Orbit
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {TECH_ICONS.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-2.5 hover:border-luxury-purple/30 hover:scale-[1.02] transition-all group cursor-default"
                  >
                    <span className="text-lg">{tech.emoji}</span>
                    <span
                      className="text-xs font-bold mono-font"
                      style={{ color: tech.color }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-luxury-purple mono-font uppercase tracking-widest">
                Global Impact
              </h3>
              {[
                { label: "Search Impressions", value: "330K+", color: "text-luxury-orange" },
                { label: "Active Users", value: "3,000+", color: "text-emerald-500" },
                { label: "GitHub Repos", value: "30+", color: "text-luxury-purple" },
                { label: "DSA Problems", value: "500+", color: "text-luxury-magenta" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{stat.label}</span>
                  <span className={`text-sm font-black mono-font ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
