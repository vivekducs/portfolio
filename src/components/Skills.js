"use client";

import { Code2, Monitor, Cpu, Server, Database, Hammer, CheckCircle2 } from "lucide-react";

export default function Skills() {
  const skillGroups = [
    {
      title: "Frontend Engineering",
      icon: Monitor,
      themeColor: "teal",
      skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      title: "Backend Engineering",
      icon: Server,
      themeColor: "emerald",
      skills: ["Node.js", "Express.js", "REST APIs", "Microservices"],
    },
    {
      title: "Databases & Indexing",
      icon: Database,
      themeColor: "copper",
      skills: ["MongoDB", "MySQL", "Vector Stores"],
    },
    {
      title: "Programming Languages",
      icon: Code2,
      themeColor: "amber",
      skills: ["C++", "Python", "JavaScript (ES6+)"],
    },
    {
      title: "Artificial Intelligence",
      icon: Cpu,
      themeColor: "emerald",
      skills: ["Gemini API", "Pinecone DB", "TensorFlow", "CNNs"],
    },
    {
      title: "Tools & Ecosystem",
      icon: Hammer,
      themeColor: "copper",
      skills: ["Docker", "Git / GitHub", "Vercel", "Postman", "VS Code", "Claude / Codex"],
    },
  ];

  // Professional Tailwind v4 explicit color mappings to prevent class purging
  const themeMap = {
    teal: {
      borderHover: "hover:border-teal-500/40 dark:hover:border-teal-400/40",
      bgGlow: "bg-teal-500/[0.01] hover:bg-teal-500/[0.03] dark:bg-teal-950/5 dark:hover:bg-teal-950/20",
      accentGlow: "bg-teal-500/5 dark:bg-teal-400/5",
      badgeBg: "bg-teal-50/50 dark:bg-teal-950/20 group-hover:bg-teal-500/10",
      badgeText: "text-teal-700 dark:text-teal-300 group-hover:text-teal-600 dark:group-hover:text-teal-400",
      badgeBorder: "border-teal-100/60 dark:border-teal-900/30 group-hover:border-teal-500/20",
      icon: "text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-50 dark:bg-teal-950/30"
    },
    emerald: {
      borderHover: "hover:border-emerald-500/40 dark:hover:border-emerald-400/40",
      bgGlow: "bg-emerald-500/[0.01] hover:bg-emerald-500/[0.03] dark:bg-emerald-950/5 dark:hover:bg-emerald-950/20",
      accentGlow: "bg-emerald-500/5 dark:bg-emerald-400/5",
      badgeBg: "bg-emerald-50/50 dark:bg-emerald-950/20 group-hover:bg-emerald-500/10",
      badgeText: "text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      badgeBorder: "border-emerald-100/60 dark:border-emerald-900/30 group-hover:border-emerald-500/20",
      icon: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    amber: {
      borderHover: "hover:border-amber-500/40 dark:hover:border-amber-400/40",
      bgGlow: "bg-amber-500/[0.01] hover:bg-amber-500/[0.03] dark:bg-amber-950/5 dark:hover:bg-amber-950/20",
      accentGlow: "bg-amber-500/5 dark:bg-amber-400/5",
      badgeBg: "bg-amber-50/50 dark:bg-amber-950/20 group-hover:bg-amber-500/10",
      badgeText: "text-amber-700 dark:text-amber-300 group-hover:text-amber-600 dark:group-hover:text-amber-400",
      badgeBorder: "border-amber-100/60 dark:border-amber-900/30 group-hover:border-amber-500/20",
      icon: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-950/30"
    },
    copper: {
      borderHover: "hover:border-orange-500/40 dark:hover:border-orange-400/40",
      bgGlow: "bg-orange-500/[0.01] hover:bg-orange-500/[0.03] dark:bg-orange-950/5 dark:hover:bg-orange-950/20",
      accentGlow: "bg-orange-500/5 dark:bg-orange-400/5",
      badgeBg: "bg-orange-50/50 dark:bg-orange-950/20 group-hover:bg-orange-500/10",
      badgeText: "text-orange-700 dark:text-orange-300 group-hover:text-orange-600 dark:group-hover:text-orange-400",
      badgeBorder: "border-orange-100/60 dark:border-orange-900/30 group-hover:border-orange-500/20",
      icon: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-50 dark:bg-orange-950/30"
    }
  };

  return (
    <section id="skills" className="relative py-12 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-[var(--accent-color)] mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Cpu size={13} /> TECHNICAL STACK
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Core Competencies
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 font-medium">
            Solid foundations in full-stack architecture, database design, and algorithmic problem-solving.
          </p>
        </div>

        {/* Modular floating categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            const theme = themeMap[group.themeColor] || themeMap.teal;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl border border-[var(--border-color)] p-5 text-left relative overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-0.5 ${theme.borderHover} ${theme.bgGlow}`}
              >
                {/* Background decorative spot */}
                <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-125 ${theme.accentGlow}`}></div>

                <div className="space-y-4 relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg p-[1px] shadow-sm flex items-center justify-center ${theme.iconBg}`}>
                      <Icon size={16} className={theme.icon} />
                    </div>
                    <h4 className="font-bold text-sm tracking-tight text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {group.title}
                    </h4>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold mono-font transition-all duration-200 select-none ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
                      >
                        <CheckCircle2 size={11} className={`${theme.icon} shrink-0`} />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
