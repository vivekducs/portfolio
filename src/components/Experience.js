"use client";

import { History, Briefcase, Calendar, Building2, MapPin } from "lucide-react";
import styles from "./Experience.module.css";

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
    <section id="experience" className={styles.el_1}>
      {/* Dynamic backlighting spot */}
      <div className={styles.el_2}></div>

      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className={styles.el_3}>
            <History size={13} /> PROFESSIONAL MILESTONES
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Work Experience
          </h2>
        </div>

        {/* Timeline container */}
        <div className={styles.el_4}>
          {experiences.map((exp) => (
            <div key={exp.id} className={`group ${styles.el_4}`}>
              
              {/* Timeline marker node dot */}
              <span className={styles.el_5}></span>

              <div className={styles.el_5}>
                
                {/* Header elements */}
                <div className={styles.el_5}>
                  <div>
                    <h3 className={styles.el_6}>
                      <Briefcase size={16} className="text-brand-primary" />
                      <span>{exp.role}</span>
                    </h3>
                    <div className={styles.el_7}>
                      <Building2 size={12} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className={styles.el_8}>
                    <span className={styles.el_9}>
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
                <ul className={styles.el_10}>
                  {exp.highlights.map((bullet, index) => (
                    <li key={index} className={styles.el_11}>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-1.5 shrink-0"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies tag group */}
                <div className={styles.el_12}>
                  {exp.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className={styles.el_13}
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
