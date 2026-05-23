"use client";

import { History, Briefcase, Calendar, Building2, MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      id: 1,
      role: "SDE Intern",
      company: "SafeQbit Technologies Pvt Ltd",
      period: "Feb 2026 – May 2026",
      location: "Remote / Hybrid",
      highlights: [
        "Collaborated closely with company founders and the CTO to architect and deploy highly responsive client-facing modules.",
        "Built and optimized modular frontend systems, securing lightning-fast page loading speeds.",
        "Streamlined automated production build and release deployment scripts on Vercel.",
        "Engineered scalable, cross-browser compatible UI elements following rigorous design guidelines."
      ],
      tech: ["React.js", "Tailwind CSS", "Vercel", "UI Engineering"]
    },
    {
      id: 2,
      role: "Trainee Engineer",
      company: "Tech Mahindra",
      period: "Jul 2023 – Jan 2024",
      location: "Noida, India",
      highlights: [
        "Acquired deep industry alignment in enterprise software product engineering cycles.",
        "Formulated functional unit tests and conducted code validation checks across diverse test scopes.",
        "Engaged in agile scrum discussions, daily status standups, and codebase refactoring reviews."
      ],
      tech: ["Enterprise Software", "Agile Testing", "JavaScript", "C++"]
    }
  ];

  return (
    <section id="experience" className="relative py-12 border-t border-[var(--border-color)]">
      {/* Dynamic backlighting spot */}
      <div className="absolute top-10 right-[15%] w-72 h-72 bg-luxury-magenta opacity-[0.06] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <History size={13} /> PROFESSIONAL MILESTONES
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Work Experience
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-3xl mx-auto pl-6 md:pl-8 text-left border-l-2 border-[var(--border-color)] space-y-8 py-2">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline marker node dot */}
              <span className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-secondary)] border-4 border-luxury-purple group-hover:scale-125 group-hover:border-luxury-magenta transition-all duration-300 shadow-md"></span>

              <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-5 md:p-6 shadow-sm hover:border-luxury-purple/35 transition-all">
                
                {/* Header elements */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Briefcase size={16} className="text-luxury-purple" />
                      <span>{exp.role}</span>
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs font-semibold text-luxury-orange mono-font">
                      <Building2 size={12} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-left sm:text-right gap-1 shrink-0">
                    <span className="inline-flex items-center gap-1 bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-[10px] font-bold px-2.5 py-0.5 rounded-full mono-font w-fit">
                      <Calendar size={10} />
                      <span>{exp.period}</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold mono-font flex items-center gap-1">
                      <MapPin size={10} />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2.5 mb-4">
                  {exp.highlights.map((bullet, index) => (
                    <li key={index} className="text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-magenta mt-1.5 shrink-0"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies tag group */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-color)]">
                  {exp.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-bold px-2.5 py-1 rounded-md mono-font"
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
