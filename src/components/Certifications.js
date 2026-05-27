"use client";

import { Award, CheckCircle, ShieldCheck } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      title: "Developing Back-End Apps with Node.js and Express",
      issuer: "IBM Corporation",
      url: "https://www.coursera.org/account/accomplishments/verify/0YG3Z7CCMHOS",
      themeColor: "teal",
      badge: "IBM"
    },
    {
      title: "JavaScript Programming Essentials",
      issuer: "IBM Corporation",
      url: "https://www.coursera.org/account/accomplishments/verify/Z7YY3ZUEVQLG",
      themeColor: "violet",
      badge: "IBM"
    },
    {
      title: "Python for Data Science and AI",
      issuer: "IBM Corporation",
      url: "https://www.credly.com/badges/2f5144fb-cef8-404d-b828-528bed14ca82/linked_in_profile",
      themeColor: "violet",
      badge: "IBM"
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "Stanford University",
      url: "https://www.coursera.org/account/accomplishments/verify/CULB58YLS97K",
      themeColor: "crimson",
      badge: "SU"
    },
    {
      title: "Attention Mechanism",
      issuer: "Google Cloud",
      url: "https://www.skills.google/public_profiles/eb50a643-6f3d-4bb1-a4b2-6dddd48ecc40/badges/23294807?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      themeColor: "violet",
      badge: "GCP"
    },
    {
      title: "Introduction to Responsible AI",
      issuer: "Google Cloud",
      url: "https://www.skills.google/public_profiles/eb50a643-6f3d-4bb1-a4b2-6dddd48ecc40/badges/9961415?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      themeColor: "violet",
      badge: "GCP"
    },
    {
      title: "Introduction to Large Language Models",
      issuer: "Google Cloud",
      url: "https://www.skills.google/public_profiles/eb50a643-6f3d-4bb1-a4b2-6dddd48ecc40/badges/9960562?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      themeColor: "copper",
      badge: "GCP"
    },
    {
      title: "Introduction to Generative AI",
      issuer: "Google Cloud",
      url: "https://www.skills.google/public_profiles/eb50a643-6f3d-4bb1-a4b2-6dddd48ecc40/badges/9888589?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
      themeColor: "violet",
      badge: "GCP"
    },
    {
      title: "Professional Certificate in Java Programming",
      issuer: "Udemy",
      url: "https://www.udemy.com/certificate/UC-f4808206-36a1-4432-b954-8bd8ed27f6eb/",
      themeColor: "copper",
      badge: "UD"
    }
  ];

  // Professional, clean Tailwind v4 explicit color mappings to prevent class purging
  const themeMap = {
    teal: {
      hoverBorder: "hover:border-teal-500/40 dark:hover:border-teal-400/40",
      bgGlow: "bg-teal-500/[0.01] hover:bg-teal-500/[0.03] dark:bg-teal-950/5 dark:hover:bg-teal-950/20",
      icon: "text-teal-600 dark:text-teal-400",
      borderLeft: "border-l-2 border-teal-500/60 dark:border-teal-400/60",
      accentGlow: "bg-teal-500/5 dark:bg-teal-400/5",
      logoBadge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
    },
    violet: {
      hoverBorder: "hover:border-violet-500/40 dark:hover:border-violet-400/40",
      bgGlow: "bg-violet-500/[0.01] hover:bg-violet-500/[0.03] dark:bg-violet-950/5 dark:hover:bg-violet-950/20",
      icon: "text-violet-600 dark:text-violet-400",
      borderLeft: "border-l-2 border-violet-500/60 dark:border-violet-400/60",
      accentGlow: "bg-violet-500/5 dark:bg-violet-400/5",
      logoBadge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
    },
    crimson: {
      hoverBorder: "hover:border-red-500/40 dark:hover:border-red-400/40",
      bgGlow: "bg-red-500/[0.01] hover:bg-red-500/[0.03] dark:bg-red-950/5 dark:hover:bg-red-950/20",
      icon: "text-red-600 dark:text-red-400",
      borderLeft: "border-l-2 border-red-500/60 dark:border-red-400/60",
      accentGlow: "bg-red-500/5 dark:bg-red-400/5",
      logoBadge: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
    },
    copper: {
      hoverBorder: "hover:border-orange-500/40 dark:hover:border-orange-400/40",
      bgGlow: "bg-orange-500/[0.01] hover:bg-orange-500/[0.03] dark:bg-orange-950/5 dark:hover:bg-orange-950/20",
      icon: "text-orange-600 dark:text-orange-400",
      borderLeft: "border-l-2 border-orange-500/60 dark:border-orange-400/60",
      accentGlow: "bg-orange-500/5 dark:bg-orange-400/5",
      logoBadge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
    }
  };

  return (
    <section id="certifications" className="relative py-12 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-[var(--accent-color)] mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Award size={13} /> VERIFIED CREDENTIALS
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Certifications & Training
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 font-medium">
            Click on any credential to view the official verified achievement.
          </p>
        </div>

        {/* 3D Interactive Hover Grid - Perfect 3x3 layout for 9 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {certs.map((c, idx) => {
            const theme = themeMap[c.themeColor] || themeMap.teal;
            return (
              <a
                key={idx}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card rounded-2xl border border-[var(--glass-border)] p-5 flex flex-col justify-between shadow-sm transition-all duration-300 relative overflow-hidden group cursor-pointer block hover:scale-[1.02] hover:-translate-y-0.5 ${theme.hoverBorder} ${theme.bgGlow} ${theme.borderLeft}`}
              >
                {/* Visual Glow Ornament */}
                <div className={`absolute -right-10 -bottom-10 w-28 h-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125 ${theme.accentGlow}`}></div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    {/* Issuer Logo Initials Badge */}
                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md mono-font ${theme.logoBadge}`}>
                      {c.badge}
                    </span>
                    <ShieldCheck size={16} className={`${theme.icon} shrink-0`} />
                  </div>

                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mono-font">
                      {c.issuer}
                    </span>
                    <h4 className="font-bold text-xs.5 leading-snug tracking-tight text-[var(--text-primary)] min-h-[40px] mt-1 group-hover:text-[var(--accent-color)] transition-colors duration-200">
                      {c.title}
                    </h4>
                  </div>
                </div>

                {/* Bottom tag block */}
                <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)] font-semibold mono-font relative z-10">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle size={10.5} className="text-violet-500" />
                    <span className="group-hover:text-[var(--text-primary)] transition-colors">Verified Credential</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-colors flex items-center gap-0.5">
                    View
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
