"use client";

import { History, Briefcase, Calendar, Building2, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col mb-10 text-left"
        >
          <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <History size={13} /> PROFESSIONAL MILESTONES
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Experience Journey
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative max-w-3xl mx-auto pl-6 md:pl-8 text-left space-y-12 py-2">
          {/* Timeline continuous line animation */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-luxury-purple via-luxury-magenta to-transparent"
          />

          {experiences.map((exp, i) => (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative group"
            >
              
              {/* Timeline marker node dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-secondary)] border-4 border-luxury-purple group-hover:scale-125 group-hover:border-luxury-orange transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.3)] z-10" />

              <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-6 shadow-md hover:border-luxury-purple/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                
                {/* Glow behind card on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-luxury-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Header elements */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 group-hover:text-luxury-orange transition-colors">
                      <Briefcase size={18} className="text-luxury-purple" />
                      <span>{exp.role}</span>
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 text-xs font-bold text-luxury-orange mono-font">
                      <Building2 size={14} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-left sm:text-right gap-1.5 shrink-0">
                    <span className="inline-flex items-center gap-1.5 bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-[11px] font-bold px-3 py-1 rounded-full mono-font w-fit">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-bold mono-font flex items-center gap-1.5">
                      <MapPin size={12} />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-3 mb-5 relative z-10">
                  {exp.highlights.map((bullet, index) => (
                    <li key={index} className="text-[13px] text-[var(--text-secondary)] leading-relaxed flex items-start gap-2.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-luxury-magenta mt-1.5 shrink-0 shadow-[0_0_5px_rgba(217,70,239,0.5)]"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies tag group */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)] relative z-10">
                  {exp.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[var(--bg-tertiary)] border border-[var(--glass-border)] text-[var(--text-primary)] font-bold px-3 py-1.5 rounded-lg mono-font hover:bg-luxury-purple/10 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
