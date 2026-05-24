"use client";

import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      title: "Back-End Apps with Node.js & Express",
      issuer: "IBM Corporation",
      logoColor: "text-blue-500",
      accent: "border-l-2 border-luxury-purple"
    },
    {
      title: "Google Attention Mechanism",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-luxury-magenta"
    },
    {
      title: "Supervised Machine Learning",
      issuer: "Stanford University",
      logoColor: "text-red-800",
      accent: "border-l-2 border-luxury-orange"
    },
    {
      title: "JavaScript Programming Essentials",
      issuer: "IBM Corporation",
      logoColor: "text-blue-500",
      accent: "border-l-2 border-luxury-gold"
    },
    {
      title: "Python for AI & Data Science",
      issuer: "IBM Corporation",
      logoColor: "text-blue-500",
      accent: "border-l-2 border-luxury-purple"
    },
    {
      title: "Google Responsible AI",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-luxury-magenta"
    },
    {
      title: "Google Generative AI Fundamental",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-luxury-orange"
    },
    {
      title: "Google Introduction to LLMs",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-luxury-gold"
    }
  ];

  return (
    <section id="certifications" className="relative py-12 border-t border-[var(--border-color)]">
      {/* Light highlights */}
      <div className="absolute bottom-10 left-[10%] w-72 h-72 bg-luxury-gold opacity-[0.05] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
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
              className={`glass-card glass-card-hover rounded-2xl border p-4.5 flex flex-col justify-between shadow-sm relative overflow-hidden group ${c.accent}`}
            >
              {/* Subtle background glow on card hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-luxury-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-luxury-orange font-bold uppercase tracking-widest mono-font">
                    {c.issuer}
                  </span>
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                </div>

                <h4 className="font-bold text-xs leading-snug tracking-tight text-[var(--text-primary)] min-h-[36px] group-hover:text-luxury-purple transition-all">
                  {c.title}
                </h4>
              </div>

              {/* Bottom tag block */}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)] font-semibold mono-font">
                <span className="flex items-center gap-1">
                  <CheckCircle size={10} className="text-emerald-500" />
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
