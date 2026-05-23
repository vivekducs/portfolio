"use client";

import { useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Globe2 } from "lucide-react";
import styles from "./GlobeSection.module.css";

// Dynamically import Three.js scene to avoid SSR issues
const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div className={styles.el_1}>
      <div className="text-center space-y-3">
        <div className={styles.el_2} />
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
    <section className={styles.el_3}>
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary opacity-[0.07] rounded-full blur-[100px] pointer-events-none" />

      <div className={styles.el_4}>
        {/* Section title */}
        <div className={styles.el_5}>
          <p className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Globe2 size={13} /> GLOBAL PRESENCE
          </p>
          <h2 className={styles.el_6}>
            Building From <span className="gradient-text">Noida, India 🇮🇳</span>
          </h2>
          <p className={styles.el_7}>
            Building scalable AI-powered systems that reach users worldwide — from Noida to the global stage.
          </p>
        </div>

        {/* Main Globe + Info grid */}
        <div className={styles.el_8}>
          
          {/* Left: Globe */}
          <div className={styles.el_10}>
            <div className={styles.el_9}>
              <GlobeCanvas />
              {/* Location badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-brand-primary/30 text-white rounded-full px-4 py-2 text-xs font-semibold mono-font flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                Noida, Uttar Pradesh, India
              </div>
            </div>
          </div>

          {/* Right: Tech stack orbiting info + description */}
          <div className={styles.el_11}>
            <div className={styles.el_12}>
              <h3 className="text-sm font-bold text-brand-primary mono-font uppercase tracking-widest mb-4">
                Tech Orbit
              </h3>
              <div className={styles.el_13}>
                {TECH_ICONS.map((tech) => (
                  <div
                    key={tech.name}
                    className={styles.el_14}
                  >
                    <span className={styles.el_15}>{tech.emoji}</span>
                    <span
                      className={styles.el_16}
                      style={{ color: tech.color }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.el_17}>
              <h3 className="text-sm font-bold text-brand-primary mono-font uppercase tracking-widest">
                Global Impact
              </h3>
              {[
                { label: "Search Impressions", value: "330K+", color: "text-brand-primary" },
                { label: "Active Users", value: "3,000+", color: "text-emerald-500" },
                { label: "GitHub Repos", value: "30+", color: "text-brand-primary" },
                { label: "DSA Problems", value: "500+", color: "text-brand-secondary" },
              ].map((stat) => (
                <div key={stat.label} className={styles.el_18}>
                  <span className={styles.el_19}>{stat.label}</span>
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
