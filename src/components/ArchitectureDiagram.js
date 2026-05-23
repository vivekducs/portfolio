"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Cpu, Database, Globe, Lock, Layers, GitBranch, ArrowRight, Zap } from "lucide-react";
import styles from "./ArchitectureDiagram.module.css";

const ARCHITECTURES = {
  "mathem-solvex": {
    title: "Mathem Solvex",
    subtitle: "AI-Powered Educational Platform",
    nodes: [
      {
        layer: "Frontend",
        icon: Globe,
        color: "text-sky-400",
        bg: "bg-sky-500/10 border-sky-500/20",
        items: ["React.js SPA", "Tailwind CSS UI", "Admin Dashboard"],
      },
      {
        layer: "Backend API",
        icon: Cpu,
        color: "text-brand-primary",
        bg: "bg-brand-primary/10 border-brand-primary/20",
        items: ["Node.js + Express.js", "REST API endpoints", "JWT Auth middleware"],
      },
      {
        layer: "AI Layer",
        icon: Zap,
        color: "text-brand-secondary",
        bg: "bg-brand-secondary/10 border-brand-secondary/20",
        items: ["Gemini API (embeddings)", "Pinecone vector DB", "Semantic search pipeline"],
      },
      {
        layer: "Database",
        icon: Database,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        items: ["MongoDB (primary DB)", "4,500+ math questions", "User sessions & analytics"],
      },
      {
        layer: "Auth & Deploy",
        icon: Lock,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10 border-yellow-500/20",
        items: ["JWT Authentication", "Vercel deployment", "Custom domain (maarula.in)"],
      },
    ],
    flow: "User Query → React UI → Express API → Gemini Embedding → Pinecone Search → MongoDB → Response",
    metrics: ["3,000+ users", "330K+ impressions", "98.4% semantic match"],
  },
  "observeflow": {
    title: "ObserveFlow",
    subtitle: "Real-Time Log Aggregation Platform",
    nodes: [
      {
        layer: "Dashboard",
        icon: Globe,
        color: "text-sky-400",
        bg: "bg-sky-500/10 border-sky-500/20",
        items: ["React.js dashboard", "Real-time chart views", "Alert notification UI"],
      },
      {
        layer: "Log Aggregator",
        icon: Cpu,
        color: "text-brand-primary",
        bg: "bg-brand-primary/10 border-brand-primary/20",
        items: ["Node.js log collector", "Event stream parser", "Threshold alert engine"],
      },
      {
        layer: "Containerization",
        icon: Layers,
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
        items: ["Docker containers", "Multi-service orchestration", "Container networking"],
      },
      {
        layer: "Storage",
        icon: Database,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        items: ["MongoDB log persistence", "Time-series indexing", "Retention policies"],
      },
      {
        layer: "CI/CD",
        icon: GitBranch,
        color: "text-orange-400",
        bg: "bg-orange-500/10 border-orange-500/20",
        items: ["GitHub Actions pipeline", "Automated testing", "Docker image registry"],
      },
    ],
    flow: "Distributed Services → Log Collector → Parser → MongoDB → Alert Engine → Dashboard",
    metrics: ["Real-time alerts", "Docker containerized", "CI/CD automated"],
  },
  "palora": {
    title: "Palora",
    subtitle: "AI Emotional Wellness Platform",
    nodes: [
      {
        layer: "User Interface",
        icon: Globe,
        color: "text-pink-400",
        bg: "bg-pink-500/10 border-pink-500/20",
        items: ["Responsive web UI", "Journaling interface", "Wellness dashboard"],
      },
      {
        layer: "API Server",
        icon: Cpu,
        color: "text-brand-primary",
        bg: "bg-brand-primary/10 border-brand-primary/20",
        items: ["Node.js + Express.js", "Session management", "Sentiment analysis pipeline"],
      },
      {
        layer: "AI Engine",
        icon: Zap,
        color: "text-brand-secondary",
        bg: "bg-brand-secondary/10 border-brand-secondary/20",
        items: ["Gemini API (NLP)", "Emotion classification", "Wellness recommendations"],
      },
      {
        layer: "Database",
        icon: Database,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        items: ["MongoDB user data", "Journal entries store", "Progress tracking"],
      },
    ],
    flow: "User Journal → Sentiment Analysis → Gemini AI → Wellness Insights → MongoDB → Dashboard",
    metrics: ["Real-time sentiment", "Gemini-powered", "Encrypted journals"],
  },
};

function ArchitecturePanel({ projectId }) {
  const arch = ARCHITECTURES[projectId];
  if (!arch) return null;

  return (
    <div className={styles.el_1}>
      <div className="flex items-center gap-2 mb-4">
        <Layers size={13} className={styles.el_2} />
        <h4 className={styles.el_3}>
          System Architecture · {arch.subtitle}
        </h4>
      </div>

      {/* Architecture nodes */}
      <div className={styles.el_4}>
        {arch.nodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div key={idx} className={styles.el_5}>
              <div className={`rounded-xl border p-3 ${node.bg} text-left`}>
                <div className={styles.el_6}>
                  <Icon size={12} className={node.color} />
                  <span className={`text-[10px] font-bold mono-font uppercase tracking-wider ${node.color}`}>
                    {node.layer}
                  </span>
                </div>
                <ul className={styles.el_7}>
                  {node.items.map((item, i) => (
                    <li key={i} className={styles.el_8}>
                      <span className="text-brand-primary mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Arrow connector */}
              {idx < arch.nodes.length - 1 && (
                <div className={styles.el_9}>
                  <ArrowRight size={12} className="text-brand-primary/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data flow */}
      <div className={styles.el_10}>
        <p className="text-[9px] text-[var(--text-muted)] mono-font uppercase tracking-wider mb-1 font-bold">Data Flow</p>
        <p className={styles.el_11}>{arch.flow}</p>
      </div>

      {/* Metrics */}
      <div className={styles.el_12}>
        {arch.metrics.map((m, i) => (
          <span
            key={i}
            className={styles.el_13}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ArchitectureDiagram({ projectId }) {
  const [open, setOpen] = useState(false);
  const hasArch = !!ARCHITECTURES[projectId];

  if (!hasArch) return null;

  return (
    <div>
      <button
        suppressHydrationWarning
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 text-[10px] font-bold mono-font transition-all cursor-pointer px-3 py-1.5 rounded-lg border ${
          open
            ? "bg-brand-primary/15 border-brand-primary/30 text-brand-primary"
            : "border-[var(--border-color)] text-[var(--text-muted)] hover:border-brand-primary/30 hover:text-brand-primary hover:bg-brand-primary/5"
        }`}
      >
        <Layers size={11} />
        {open ? "Hide Architecture" : "View Architecture"}
        {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </button>

      {/* Expand panel */}
      <div
        className={`overflow-hidden transition-all duration-400 ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ transition: "max-height 0.4s ease, opacity 0.3s ease" }}
      >
        {open && <ArchitecturePanel projectId={projectId} />}
      </div>
    </div>
  );
}
