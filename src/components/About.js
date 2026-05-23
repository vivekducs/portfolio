"use client";

import { BookOpen, Shield, Code, Cpu, Server, Layers, HelpCircle } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Delhi University",
      period: "2024 – 2026",
      details: "Focusing on Advanced Algorithms, Distributed Databases, Machine Learning, and Cloud Systems Architecture.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Maharshi Pratap Group",
      period: "2020 – 2023",
      details: "Graduated with honors. Developed foundational systems in OOPs, DBMS, Networking, and web technologies.",
    },
  ];

  const focusPoints = [
    {
      icon: Cpu,
      title: "AI Integration Specialist",
      desc: "Harnessing LLM APIs (Gemini, Claude), vector index stores (Pinecone), and neural structures to inject smart reasoning into modern products.",
    },
    {
      icon: Server,
      title: "Scalable Backend Architect",
      desc: "Crafting highly performant, containerized server microservices using Node.js, Express, Docker, and caching strategies.",
    },
    {
      icon: Layers,
      title: "Full Stack Product Builder",
      desc: "Engineering premium, fully responsive interfaces (React, Next.js, Tailwind) linked to robust databases (MongoDB, MySQL).",
    },
    {
      icon: HelpCircle,
      title: "Pragmatic Problem Solver",
      desc: "Applying rigorous DSA concepts and modular architecture patterns to address real-world business constraints.",
    },
  ];

  return (
    <section id="about" className={styles.el_1}>
      {/* Lights */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-primary opacity-[0.08] rounded-full blur-[80px] pointer-events-none"></div>

      <div className={styles.el_2}>
        {/* Section Title */}
        <div className={styles.el_3}>
          <p className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <BookOpen size={13} /> PROFILE OVERVIEW
          </p>
          <h2 className={styles.el_4}>
            About Me
          </h2>
        </div>

        {/* Desktop Split Grid */}
        <div className={styles.el_5}>
          
          {/* Left Column: Narrative description */}
          <div className={styles.el_6}>
            <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Bridging academic theory with premium software engineering
            </h3>
            
            <p className={styles.el_7}>
              I am a driven **Master of Computer Applications (MCA) student** and **AI Engineer** with a passion for designing high-performance distributed architectures and real-time backend systems.
            </p>

            <p className={styles.el_8}>
              My engineering philosophy revolves around simplicity, cinematic minimalism, and absolute functional premium aesthetics. I enjoy collaborating with product leaders and CTOs to translate raw design concepts into robust, production-ready modules deployed seamlessly on modern clouds.
            </p>

            {/* Core Values Badge Panel */}
            <div className={styles.el_9}>
              {["MCA Student", "AI Engineer", "Backend Expert", "Full Stack Developer", "Problem Solver", "Product Builder"].map((tag, idx) => (
                <div
                  key={idx}
                  className={styles.el_10}
                >
                  <span className={styles.el_11}></span>
                  <span>{tag}</span>
                </div>
              ))}
            </div>

            {/* Education Timeline */}
            <div className={styles.el_12}>
              <h4 className={styles.el_13}>
                <BookOpen size={14} /> Academic Journey
              </h4>
              <div className={styles.el_14}>
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className={styles.el_15}
                  >
                    <div className={styles.el_16}>
                      <h5 className={styles.el_17}>{edu.degree}</h5>
                      <span className={styles.el_18}>
                        {edu.period}
                      </span>
                    </div>
                    <p className={styles.el_19}>{edu.institution}</p>
                    <p className={styles.el_20}>{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Focus Areas cards grid */}
          <div className={styles.el_21}>
            {focusPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className={styles.el_22}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-[1.5px] mb-4 inline-flex shadow-md shadow-brand-primary/5">
                      <div className={styles.el_23}>
                        <Icon size={18} />
                      </div>
                    </div>
                    <h4 className={styles.el_24}>
                      {point.title}
                    </h4>
                    <p className={styles.el_25}>
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
