"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Cpu, Database, Globe, Lock, Layers, GitBranch, ArrowRight, Zap } from "lucide-react";

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
        color: "text-luxury-purple",
        bg: "bg-luxury-purple/10 border-luxury-purple/20",
        items: ["Node.js + Express.js", "REST API endpoints", "JWT Auth middleware"],
      },
      {
        layer: "AI Layer",
        icon: Zap,
        color: "text-luxury-magenta",
        bg: "bg-luxury-magenta/10 border-luxury-magenta/20",
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
        color: "text-luxury-purple",
        bg: "bg-luxury-purple/10 border-luxury-purple/20",
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
        color: "text-luxury-purple",
        bg: "bg-luxury-purple/10 border-luxury-purple/20",
        items: ["Node.js + Express.js", "Session management", "Sentiment analysis pipeline"],
      },
      {
        layer: "AI Engine",
        icon: Zap,
        color: "text-luxury-magenta",
        bg: "bg-luxury-magenta/10 border-luxury-magenta/20",
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
    <div className="mt-4 border-t border-[var(--border-color)] pt-4">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={13} className="text-luxury-purple" />
        <h4 className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest">
          System Architecture · {arch.subtitle}
        </h4>
      </div>

      {/* Architecture nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
        {arch.nodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div key={idx} className="relative">
              <div className={`rounded-xl border p-3 ${node.bg} text-left`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon size={12} className={node.color} />
                  <span className={`text-[10px] font-bold mono-font uppercase tracking-wider ${node.color}`}>
                    {node.layer}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {node.items.map((item, i) => (
                    <li key={i} className="text-[10px] text-[var(--text-secondary)] flex items-start gap-1">
                      <span className="text-luxury-purple mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Arrow connector */}
              {idx < arch.nodes.length - 1 && (
                <div className="hidden xl:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                  <ArrowRight size={12} className="text-luxury-purple/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data flow */}
      <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-4 py-3 mb-3">
        <p className="text-[9px] text-[var(--text-muted)] mono-font uppercase tracking-wider mb-1 font-bold">Data Flow</p>
        <p className="text-[10px] text-[var(--text-secondary)] mono-font leading-relaxed">{arch.flow}</p>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2">
        {arch.metrics.map((m, i) => (
          <span
            key={i}
            className="text-[9px] bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple font-bold px-2.5 py-1 rounded-full mono-font"
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
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 text-[10px] font-bold mono-font transition-all cursor-pointer px-3 py-1.5 rounded-lg border ${
          open
            ? "bg-luxury-purple/15 border-luxury-purple/30 text-luxury-purple"
            : "border-[var(--border-color)] text-[var(--text-muted)] hover:border-luxury-purple/30 hover:text-luxury-purple hover:bg-luxury-purple/5"
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
