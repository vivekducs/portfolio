"use client";

import { Code2, Monitor, Cpu, Server, Database, Hammer, CheckCircle2 } from "lucide-react";

export default function Skills() {
  const skillGroups = [
    {
      title: "Frontend Engineering",
      icon: Monitor,
      skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      title: "Backend Engineering",
      icon: Server,
      skills: ["Node.js", "Express.js", "REST APIs", "Microservices"],
    },
    {
      title: "Databases & Indexing",
      icon: Database,
      skills: ["MongoDB", "MySQL", "Vector Stores"],
    },
    {
      title: "Programming Languages",
      icon: Code2,
      skills: ["C++", "Python", "JavaScript (ES6+)"],
    },
    {
      title: "Artificial Intelligence",
      icon: Cpu,
      skills: ["Gemini API", "Pinecone DB", "TensorFlow", "CNNs"],
    },
    {
      title: "Tools & Ecosystem",
      icon: Hammer,
      skills: ["Docker", "Git / GitHub", "Vercel", "Postman", "VS Code", "Claude / Codex"],
    },
  ];

  return (
    <section id="skills" className="relative py-12 border-t border-[var(--border-color)]">
      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-[var(--text-primary)] mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Cpu size={13} /> TECHNICAL STACK
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Core Competencies
          </h2>
        </div>

        {/* Modular floating categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-[var(--border-color)] p-5 text-left relative overflow-hidden flex flex-col justify-between hover:border-[var(--text-primary)] transition-all shadow-sm"
              >
                {/* Background decorative spot */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--text-primary)] opacity-5 rounded-full blur-xl pointer-events-none"></div>

                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-[var(--text-primary)] p-[1px] shadow-sm`}>
                      <div className="w-full h-full rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-primary)]">
                        <Icon size={16} />
                      </div>
                    </div>
                    <h4 className="font-bold text-sm tracking-tight text-[var(--text-primary)]">
                      {group.title}
                    </h4>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold text-xs mono-font hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all select-none"
                      >
                        <CheckCircle2 size={11} className="text-[var(--text-primary)] shrink-0" />
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
