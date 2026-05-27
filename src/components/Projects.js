"use client";

import { useState } from "react";
import { ExternalLink, Sparkles, BookOpen, Layers, Target, Shield } from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { projectsData } from "@/data/projects";
import { GithubIcon as Github } from "./icons";
import Link from "next/link";


export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = projectsData;

  const filteredProjects = filter === "all" 
    ? projects.filter(p => !p.featured) 
    : projects.filter(p => p.category === filter && !p.featured);

  const featuredProject = projects.find(p => p.featured);

  return (
    <section id="projects" className="relative py-16 border-t border-[var(--border-color)]">
      <div className="w-full max-w-5xl mx-auto z-10 px-4">
        
        {/* Section Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <p className="text-xs font-bold text-[var(--text-secondary)] mono-font uppercase tracking-widest mb-3 flex items-center gap-2">
            <Layers size={14} /> Selected Work
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Engineering Impact
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-4 max-w-2xl">
            A showcase of production-grade systems, focusing on robust architecture, scalable backends, and tangible business value.
          </p>
        </div>

        {/* Featured Project Showcase (Editorial Style) */}
        {featuredProject && (
          <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] p-8 md:p-12 shadow-sm mb-12 relative overflow-hidden group hover:border-[var(--border-hover)] transition-all">
            
            <div className="absolute top-0 right-0 px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold tracking-widest uppercase rounded-bl-2xl shadow-sm flex items-center gap-1.5">
              <Sparkles size={11} /> Featured Case Study
            </div>

            <div className="max-w-3xl space-y-8 relative z-10 pt-4">
              
              <div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
                  {featuredProject.title}
                </h3>
                <p className="text-xs text-[var(--accent-color)] font-bold uppercase tracking-widest mono-font">
                  AI-powered Educational Platform
                </p>
              </div>

              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
                {featuredProject.desc}
              </p>

              {/* Highlights & Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {featuredProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-[var(--border-color)] rounded-xl bg-[var(--bg-primary)] shadow-sm">
                    <Target size={16} className="text-[var(--accent-color)] mt-0.5 shrink-0" />
                    <span className="text-sm text-[var(--text-primary)] font-semibold leading-tight">{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="pt-2">
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3">Technology Stack</p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium px-3 py-1.5 rounded-lg mono-font shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--border-color)]">
                <Link
                  href={`/projects/${featuredProject.id}`}
                  className="px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--text-secondary)] text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Read Case Study</span>
                  <BookOpen size={14} />
                </Link>
                {featuredProject.live && (
                  <a
                    href={featuredProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-transparent border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-sm font-bold rounded-xl transition-all flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    <span>Live Site</span>
                  </a>
                )}
                {featuredProject.github && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-transparent border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-sm font-bold rounded-xl transition-all flex items-center gap-2"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filtering */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-sm">
            {[
              { id: "all", label: "All Projects" },
              { id: "ai-ml", label: "AI & ML" },
              { id: "fullstack", label: "Full Stack" },
              { id: "systems", label: "Systems" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer mono-font ${
                  filter === btn.id
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] p-8 shadow-sm flex flex-col justify-between hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="font-bold text-xl text-[var(--text-primary)] tracking-tight">
                      {p.title}
                    </h4>
                    <span className="text-[10px] text-[var(--accent-color)] font-bold uppercase tracking-widest mono-font mt-1 block">
                      {p.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Icon indicators */}
                  <div className="flex gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] text-[var(--text-secondary)] transition-all shadow-sm"
                        title="GitHub Code"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] text-[var(--text-secondary)] transition-all shadow-sm"
                        title="Live Site"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed min-h-[60px] font-medium">
                  {p.desc}
                </p>
              </div>

              {/* Technologies used */}
              <div className="mt-6 pt-5 border-t border-[var(--border-color)]">
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold px-2.5 py-1 rounded-md mono-font shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
