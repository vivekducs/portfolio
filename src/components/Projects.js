"use client";

import { useState } from "react";
import { ExternalLink, Sparkles, BookOpen, Layers, Target, Shield } from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { projectsData } from "@/data/projects";
import Link from "next/link";

const Github = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = projectsData;

  const filteredProjects = filter === "all" 
    ? projects.filter(p => !p.featured) 
    : projects.filter(p => p.category === filter && !p.featured);

  const featuredProject = projects.find(p => p.featured);

  return (
    <section id="projects" className="relative py-12 border-t border-[var(--border-color)]">
      {/* Glow Orbs */}
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-luxury-magenta opacity-[0.07] rounded-full blur-[90px] pointer-events-none"></div>

      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 text-left">
          <div>
            <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Layers size={13} /> PORTFOLIO PROJECTS
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Featured Innovations
            </h2>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0 bg-[var(--bg-tertiary)] border border-[var(--border-color)] p-1 rounded-xl">
            {[
              { id: "all", label: "Other Projects" },
              { id: "ai-ml", label: "AI / ML" },
              { id: "fullstack", label: "Full Stack" },
              { id: "systems", label: "Systems" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer mono-font ${
                  filter === btn.id
                    ? "bg-gradient-to-r from-luxury-purple to-luxury-magenta text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project Showcase */}
        {featuredProject && (
          <div className="glass-card rounded-3xl border border-[var(--glass-border)] p-6 md:p-8 shadow-lg mb-8 relative overflow-hidden text-left hover:border-luxury-purple/35 transition-all">
            
            {/* Corner glowing badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-luxury-purple to-luxury-magenta text-white text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-bl-3xl shadow-sm mono-font flex items-center gap-1.5 select-none animate-pulse">
              <Sparkles size={11} /> FEATURED CASE STUDY
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4 lg:pt-0">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {featuredProject.title}
                  </h3>
                  <p className="text-xs text-luxury-orange font-bold uppercase tracking-wider mono-font mt-1">
                    AI-powered Educational Doubts solver
                  </p>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {featuredProject.desc}
                </p>

                {/* Highlights List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest">
                    Performance Metrics & Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {featuredProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] font-medium">
                        <Target size={12} className="text-luxury-orange mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest">
                    Infrastructure Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold px-2.5 py-1 rounded-full mono-font"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/projects/${featuredProject.id}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-luxury-violet to-luxury-purple text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Read Case Study</span>
                    <BookOpen size={12} />
                  </Link>
                  {featuredProject.live && (
                    <a
                      href={featuredProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-luxury-purple text-[var(--text-primary)] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <ExternalLink size={12} className="text-luxury-purple" />
                      <span>Live Site</span>
                    </a>
                  )}
                  {featuredProject.github && (
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-luxury-purple text-[var(--text-primary)] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Github size={12} className="text-luxury-purple" />
                      <span>GitHub Spec</span>
                    </a>
                  )}
                  <ArchitectureDiagram projectId={featuredProject.id} />
                </div>
              </div>

              {/* Right Column: Dynamic Terminal Mockup */}
              <div className="lg:col-span-5 select-none">
                <div className="w-full bg-neutral-900 text-neutral-300 rounded-2xl border border-neutral-800 p-4 shadow-xl font-mono text-[10px] space-y-2 relative overflow-hidden h-64 flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-purple/10 blur-xl rounded-full"></div>
                  
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    </div>
                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">vk-terminal@mathem</span>
                  </div>

                  {/* Terminal Body */}
                  <div className="flex-1 space-y-1.5 text-left overflow-y-auto">
                    <p className="text-neutral-500"># Initializing vector space index</p>
                    <p className="text-luxury-orange">$ pinecone.init_index("math-doubts")</p>
                    <p className="text-green-400">✓ Index linked: 4,500 dimensions loaded</p>
                    <p className="text-neutral-500"># Invoking Gemini semantic search inference</p>
                    <p className="text-luxury-magenta">$ gemini.embed_query("linear equations graph")</p>
                    <p className="text-neutral-300">↳ Embeddings: [0.124, -0.984, 0.443, ...]</p>
                    <p className="text-neutral-500"># Query response complete (98.4% match)</p>
                    <p className="text-luxury-gold">✓ Doubts resolved for user session 3,104</p>
                  </div>

                  {/* Terminal Footer */}
                  <div className="text-[9px] text-neutral-600 border-t border-neutral-800 pt-2 flex justify-between">
                    <span>Active connections: 104</span>
                    <span>Lat: 42ms</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="glass-card glass-card-hover rounded-2xl border border-[var(--glass-border)] p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-base text-[var(--text-primary)] leading-tight">
                      {p.title}
                    </h4>
                    <span className="text-[9px] text-luxury-purple font-bold uppercase tracking-widest mono-font">
                      {p.category}
                    </span>
                  </div>

                  {/* Icon indicators */}
                  <div className="flex gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-[var(--border-color)] hover:border-luxury-purple text-[var(--text-muted)] hover:text-luxury-purple transition-all"
                        title="GitHub Code"
                      >
                        <Github size={13} />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-[var(--border-color)] hover:border-luxury-purple text-[var(--text-muted)] hover:text-luxury-purple transition-all"
                        title="Live Site"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed min-h-[48px]">
                  {p.desc}
                </p>
              </div>

              {/* Technologies used */}
              <div className="mt-4 pt-3 border-t border-[var(--border-color)] space-y-3">
                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold px-2 py-0.5 rounded-md mono-font"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ArchitectureDiagram projectId={p.id} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
