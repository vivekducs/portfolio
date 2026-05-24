"use client";

import { X, Download, ShieldCheck, Zap, Briefcase, Award, Code2, Database } from "lucide-react";
import { projectsData } from "@/data/projects";

import { trackDownload } from "@/lib/analytics";

export default function RecruiterDashboard({ onClose }) {
  return (
    <div className="w-full mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="glass-card rounded-3xl border-2 border-luxury-orange/30 p-6 md:p-10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)]">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxury-purple/10 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-luxury-orange uppercase tracking-widest mono-font">
                Recruiter Evaluation Mode Active
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Executive Summary
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              High-signal engineering overview tailored for hiring managers and CTOs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={() => trackDownload("Resume.pdf")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-luxury-violet to-luxury-orange text-white text-xs font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity"
            >
              <Download size={14} />
              <span>Resume.pdf</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-colors text-[var(--text-secondary)]"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 text-left">
          
          {/* Column 1: Core Strengths & Why Hire */}
          <div className="space-y-6">
            <div className="bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-luxury-orange" />
                Why Hire Vivek?
              </h3>
              <ul className="space-y-3">
                {[
                  "Proven ability to build scalable full-stack products from zero to production.",
                  "Deep expertise in Node.js backend architectures and RESTful API design.",
                  "Hands-on experience integrating modern AI (Gemini, Pinecone) into real apps.",
                  "Strong CS fundamentals (Top 16% globally on LeetCode, 500+ problems).",
                  "Meticulous attention to UX, UI design, and frontend performance."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-[var(--text-secondary)] font-medium leading-relaxed">
                    <span className="text-luxury-orange mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Database size={16} className="text-luxury-purple" />
                Technical Arsenal
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {["Node.js", "Express", "React", "Next.js", "MongoDB", "SQL", "Docker", "AWS", "Python", "C++"].map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[var(--bg-tertiary)] border border-[var(--glass-border)] rounded-md text-[10px] font-bold text-[var(--text-primary)] mono-font">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Experience & Stats */}
          <div className="space-y-6">
            <div className="bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Award size={16} className="text-luxury-magenta" />
                Fast Facts
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--glass-border)]">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase mono-font mb-1">Education</div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">MCA (2024-26)</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Delhi University</div>
                </div>
                <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--glass-border)]">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase mono-font mb-1">LeetCode</div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">Max: 1664</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Top 16.4% Global</div>
                </div>
                <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--glass-border)]">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase mono-font mb-1">Impact</div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">3,000+ Users</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Mathem Solvex</div>
                </div>
                <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--glass-border)]">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase mono-font mb-1">Location</div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">Noida, India</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Open to Relocate</div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Briefcase size={16} className="text-luxury-orange" />
                Current Role
              </h3>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Backend Intern</h4>
                  <p className="text-[10px] text-[var(--text-secondary)]">Vercel & Next.js Ecosystem</p>
                </div>
                <span className="text-[10px] font-bold text-luxury-orange mono-font">Present</span>
              </div>
            </div>
          </div>

          {/* Column 3: Top Projects */}
          <div className="space-y-6">
            <div className="bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl p-5 h-full">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Code2 size={16} className="text-luxury-purple" />
                Flagship Projects
              </h3>
              <div className="space-y-4">
                {projectsData.slice(0, 3).map((p) => (
                  <div key={p.id} className="group relative">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-luxury-purple transition-colors">
                        {p.title}
                      </h4>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded border border-[var(--border-color)] text-[var(--text-secondary)] uppercase mono-font">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-1 line-clamp-2">
                      {p.desc}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {p.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[8px] text-[var(--text-muted)] border border-[var(--border-color)] px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
