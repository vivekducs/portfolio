import { Code2, Monitor, Cpu, Server, Database, Hammer, CheckCircle2 } from "lucide-react";

export default function Skills() {
  const skillGroups = [
    {
      title: "Frontend Engineering",
      icon: Monitor,
      themeColor: "teal",
      skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Next.js (App Router)", "Framer Motion"],
      bentoClass: "md:col-span-2 lg:col-span-2"
    },
    {
      title: "Backend Architecture",
      icon: Server,
      themeColor: "violet",
      skills: ["Node.js", "Express.js", "REST APIs", "Microservices", "GraphQL"],
      bentoClass: "md:row-span-2 lg:row-span-2"
    },
    {
      title: "Databases & Indexing",
      icon: Database,
      themeColor: "copper",
      skills: ["MongoDB", "MySQL", "Vector Stores (Pinecone)", "PostgreSQL", "Redis"],
      bentoClass: "md:col-span-1 lg:col-span-1"
    },
    {
      title: "Programming Languages",
      icon: Code2,
      themeColor: "violet",
      skills: ["C++", "Python", "JavaScript (ES6+)", "TypeScript"],
      bentoClass: "md:col-span-1 lg:col-span-1"
    },
    {
      title: "Artificial Intelligence",
      icon: Cpu,
      themeColor: "violet",
      skills: ["Gemini API", "Pinecone DB", "TensorFlow", "CNNs", "LLM Integration", "RAG Systems"],
      bentoClass: "md:col-span-2 lg:col-span-2"
    },
    {
      title: "Tools & Ecosystem",
      icon: Hammer,
      themeColor: "copper",
      skills: ["Docker", "Git / GitHub", "Vercel", "Postman", "VS Code", "Linux", "AWS Basics"],
      bentoClass: "md:col-span-1 lg:col-span-3"
    },
  ];

  // Professional Tailwind v4 explicit color mappings to prevent class purging
  const themeMap = {
    teal: {
      borderHover: "hover:border-teal-500/40 dark:hover:border-teal-400/40",
      bgGlow: "bg-teal-500/[0.01] hover:bg-teal-500/[0.03] dark:bg-teal-950/5 dark:hover:bg-teal-950/20",
      accentGlow: "bg-teal-500/5 dark:bg-teal-400/5",
      badgeBg: "bg-teal-50/50 dark:bg-teal-500/10 group-hover:bg-teal-500/20",
      badgeText: "text-teal-700 dark:text-teal-200 group-hover:text-teal-800 dark:group-hover:text-teal-100",
      badgeBorder: "border-teal-100/60 dark:border-teal-500/30 group-hover:border-teal-500/40",
      icon: "text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-50 dark:bg-teal-950/30"
    },
    violet: {
      borderHover: "hover:border-violet-500/40 dark:hover:border-violet-400/40",
      bgGlow: "bg-violet-500/[0.01] hover:bg-violet-500/[0.03] dark:bg-violet-950/5 dark:hover:bg-violet-950/20",
      accentGlow: "bg-violet-500/5 dark:bg-violet-400/5",
      badgeBg: "bg-violet-50/50 dark:bg-violet-500/10 group-hover:bg-violet-500/20",
      badgeText: "text-violet-700 dark:text-violet-200 group-hover:text-violet-800 dark:group-hover:text-violet-100",
      badgeBorder: "border-violet-100/60 dark:border-violet-500/30 group-hover:border-violet-500/40",
      icon: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-50 dark:bg-violet-950/30"
    },
    copper: {
      borderHover: "hover:border-orange-500/40 dark:hover:border-orange-400/40",
      bgGlow: "bg-orange-500/[0.01] hover:bg-orange-500/[0.03] dark:bg-orange-950/5 dark:hover:bg-orange-950/20",
      accentGlow: "bg-orange-500/5 dark:bg-orange-400/5",
      badgeBg: "bg-orange-50/50 dark:bg-orange-500/10 group-hover:bg-orange-500/20",
      badgeText: "text-orange-700 dark:text-orange-200 group-hover:text-orange-800 dark:group-hover:text-orange-100",
      badgeBorder: "border-orange-100/60 dark:border-orange-500/30 group-hover:border-orange-500/40",
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
                className={`glass-card rounded-3xl border border-[var(--glass-border)] p-6 text-left relative overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-500 group hover:-translate-y-1 ${theme.borderHover} ${theme.bgGlow} ${group.bentoClass}`}
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
                  <div className="flex flex-wrap gap-2 pt-2">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold mono-font transition-all duration-200 select-none ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
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
