"use client";

import { BookOpen, Shield, Code, Cpu, Server, Layers, HelpCircle } from "lucide-react";

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
      institution: "Maharana Pratap College of Professional Studies",
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
    <section id="about" className="relative py-12 border-t border-[var(--border-color)]">
      {/* Lights */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-luxury-purple opacity-[0.08] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-6xl z-10 px-4">
        {/* Section Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <BookOpen size={13} /> PROFILE OVERVIEW
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            About Me
          </h2>
        </div>

        {/* Desktop Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Narrative description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Bridging academic theory with premium software engineering
            </h3>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              I am a driven **Master of Computer Applications (MCA) student** and **AI Engineer** with a passion for designing high-performance distributed architectures and real-time backend systems.
            </p>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              My engineering philosophy revolves around simplicity, cinematic minimalism, and absolute functional premium aesthetics. I enjoy collaborating with product leaders and CTOs to translate raw design concepts into robust, production-ready modules deployed seamlessly on modern clouds.
            </p>

            {/* Core Values Badge Panel */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              {["MCA Student", "AI Engineer", "Backend Expert", "Full Stack Developer", "Problem Solver", "Product Builder"].map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] px-4 py-2.5 rounded-xl text-xs font-semibold mono-font text-[var(--text-secondary)] shadow-sm hover:border-luxury-purple/20 transition-all hover:translate-x-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-luxury-purple to-luxury-magenta"></span>
                  <span>{tag}</span>
                </div>
              ))}
            </div>

            {/* Education Timeline */}
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-bold text-luxury-purple uppercase tracking-widest mono-font flex items-center gap-1.5">
                <BookOpen size={14} /> Academic Journey
              </h4>
              <div className="space-y-3.5">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="glass-card rounded-2xl border p-4 shadow-sm relative overflow-hidden group hover:border-luxury-purple/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h5 className="font-bold text-sm text-[var(--text-primary)]">{edu.degree}</h5>
                      <span className="text-[10px] bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple font-bold px-2 py-0.5 rounded-full mono-font">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-luxury-orange mb-2 mono-font">{edu.institution}</p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Focus Areas cards grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-2xl border border-[var(--glass-border)] p-5 text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-luxury-violet to-luxury-magenta p-[1.5px] mb-4 inline-flex shadow-md shadow-luxury-purple/5">
                      <div className="w-full h-full rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-luxury-purple">
                        <Icon size={18} />
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)] tracking-tight mb-2">
                      {point.title}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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
