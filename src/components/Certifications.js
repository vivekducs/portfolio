"use client";

import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      title: "Back-End Apps with Node.js & Express",
      issuer: "IBM Corporation",
      accent: "border-l-2 border-[var(--text-primary)]"
    },
    {
      title: "Google Attention Mechanism",
      issuer: "Google Cloud",
      accent: "border-l-2 border-[var(--text-secondary)]"
    },
    {
      title: "Supervised Machine Learning",
      issuer: "Stanford University",
      accent: "border-l-2 border-[var(--text-muted)]"
    },
    {
      title: "JavaScript Programming Essentials",
      issuer: "IBM Corporation",
      accent: "border-l-2 border-[var(--border-color)]"
    },
    {
      title: "Python for AI & Data Science",
      issuer: "IBM Corporation",
      accent: "border-l-2 border-[var(--text-primary)]"
    },
    {
      title: "Google Responsible AI",
      issuer: "Google Cloud",
      accent: "border-l-2 border-[var(--text-secondary)]"
    },
    {
      title: "Google Generative AI Fundamental",
      issuer: "Google Cloud",
      accent: "border-l-2 border-[var(--text-muted)]"
    },
    {
      title: "Google Introduction to LLMs",
      issuer: "Google Cloud",
      accent: "border-l-2 border-[var(--border-color)]"
    }
  ];

  return (
    <section id="certifications" className="relative py-12 border-t border-[var(--border-color)]">
      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-[var(--text-primary)] mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Award size={13} /> VERIFIED CREDENTIALS
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Certifications & Training
          </h2>
        </div>

        {/* 3D Hover Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {certs.map((c, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-2xl border border-[var(--glass-border)] hover:border-[var(--text-primary)] p-4.5 flex flex-col justify-between shadow-sm transition-all relative overflow-hidden group ${c.accent}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mono-font">
                    {c.issuer}
                  </span>
                  <ShieldCheck size={14} className="text-[var(--text-primary)] shrink-0" />
                </div>

                <h4 className="font-bold text-xs leading-snug tracking-tight text-[var(--text-primary)] min-h-[36px] group-hover:text-[var(--text-secondary)] transition-all">
                  {c.title}
                </h4>
              </div>

              {/* Bottom tag block */}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)] font-semibold mono-font">
                <span className="flex items-center gap-1">
                  <CheckCircle size={10} className="text-[var(--text-primary)]" />
                  <span>Verified Credentials</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
