"use client";

import { Code2, Monitor, Cpu, Server, Database, Hammer, CheckCircle2 } from "lucide-react";
import styles from "./Skills.module.css";

export default function Skills() {
  const skillGroups = [
    {
      title: "Frontend Engineering",
      icon: Monitor,
      color: "from-brand-primary to-brand-secondary",
      skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      title: "Backend Engineering",
      icon: Server,
      color: "from-brand-primary to-brand-secondary",
      skills: ["Node.js", "Express.js", "REST APIs", "Microservices"],
    },
    {
      title: "Databases & Indexing",
      icon: Database,
      color: "from-brand-secondary to-brand-primary",
      skills: ["MongoDB", "MySQL", "Vector Stores"],
    },
    {
      title: "Programming Languages",
      icon: Code2,
      color: "from-brand-primary to-brand-secondary",
      skills: ["C++", "Python", "JavaScript (ES6+)"],
    },
    {
      title: "Artificial Intelligence",
      icon: Cpu,
      color: "from-brand-secondary to-brand-primary",
      skills: ["Gemini API", "Pinecone DB", "TensorFlow", "CNNs"],
    },
    {
      title: "Tools & Ecosystem",
      icon: Hammer,
      color: "from-brand-primary to-brand-primary",
      skills: ["Docker", "Git / GitHub", "Vercel", "Postman", "VS Code", "Claude / Codex"],
    },
  ];

  return (
    <section id="skills" className={styles.el_1}>
      {/* Light spots */}
      <div className="absolute top-20 left-[20%] w-72 h-72 bg-brand-primary opacity-[0.06] rounded-full blur-[80px] pointer-events-none"></div>

      <div className={styles.el_2}>
        
        {/* Title */}
        <div className={styles.el_3}>
          <p className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Cpu size={13} /> TECHNICAL STACK
          </p>
          <h2 className={styles.el_4}>
            Core Competencies
          </h2>
        </div>

        {/* Modular floating categories grid */}
        <div className={styles.el_5}>
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className={styles.el_6}
              >
                {/* Background decorative spot */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-primary opacity-5 rounded-full blur-xl pointer-events-none"></div>

                <div className={styles.el_7}>
                  {/* Category Header */}
                  <div className={styles.el_8}>
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${group.color} p-[1px] shadow-sm`}>
                      <div className={styles.el_9}>
                        <Icon size={16} />
                      </div>
                    </div>
                    <h4 className={styles.el_10}>
                      {group.title}
                    </h4>
                  </div>

                  {/* Skills Grid */}
                  <div className={styles.el_11}>
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={styles.el_12}
                      >
                        <CheckCircle2 size={11} className={styles.el_13} />
                        <span className={styles.el_14}>{skill}</span>
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
