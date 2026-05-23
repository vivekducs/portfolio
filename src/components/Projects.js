"use client";

import { useState } from "react";
import { ExternalLink, Sparkles, BookOpen, Layers, Target, Shield } from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import styles from "./Projects.module.css";

const Github = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: "mathem-solvex",
      title: "Mathem Solvex",
      category: "ai-ml",
      featured: true,
      desc: "AI-powered educational platform designed to resolve mathematical doubts dynamically. Integrates dense vector lookup, natural language queries, and complete student tracking dashboards.",
      highlights: [
        "3,000+ active student users",
        "330K+ organic Google Search Impressions",
        "AI-powered semantic search via Pinecone & Gemini API",
        "Comprehensive CRUD administrator dashboard"
      ],
      tech: ["Node.js", "Express.js", "MongoDB", "Gemini API", "Pinecone", "React.js"],
      live: "https://question.maarula.in/",
      github: "https://github.com/AVPXM8/mathem-solvex-updated"
    },
    {
      id: "palora",
      title: "Palora",
      category: "ai-ml",
      featured: false,
      desc: "AI-powered emotional wellness and mental health counseling platform. Features sentiment-aware journaling prompts, real-time stress analysis, and supportive wellness guidance.",
      tech: ["Node.js", "Express.js", "MongoDB", "Gemini API"],
      github: "https://github.com/AVPXM8/Palora-backend" // Placeholder since no specific github was specified
    },
    {
      id: "observeflow",
      title: "ObserveFlow",
      category: "systems",
      featured: false,
      desc: "Real-time high-throughput log aggregation and cluster monitoring dashboard. Collects distributed system logs, parses errors, and fires alerts based on traffic thresholds.",
      tech: ["Node.js", "Docker", "MongoDB", "React", "GitHub Actions"],
      github: "https://github.com/AVPXM8/ObserveFlow"
    },
    {
      id: "rank-predictor",
      title: "Rank Predictor",
      category: "fullstack",
      featured: false,
      desc: "Predictive ranking calculator and college matching system tailored for national NIMCET and CUET Computer Science aspirants across India.",
      tech: ["HTML", "CSS", "JavaScript", "React.js"],
      live: "https://rankpredictor.maarula.in/",
      github: "https://github.com/AVPXM8/Rank-Predictor"
    },
    {
      id: "garbage-classification",
      title: "Garbage Classification",
      category: "ai-ml",
      featured: false,
      desc: "Deep learning waste categorization system leveraging Convolutional Neural Networks (CNN) to automatically sort recyclables from general waste.",
      tech: ["Python", "TensorFlow", "CNN", "OpenCV"],
      github: "https://github.com/AVPXM8/garbage-classification"
    }
  ];

  const filteredProjects = filter === "all"
    ? projects.filter(p => !p.featured)
    : projects.filter(p => p.category === filter && !p.featured);

  const featuredProject = projects.find(p => p.featured);

  return (
    <section id="projects" className={styles.el_1}>
      {/* Glow Orbs */}
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-secondary opacity-[0.07] rounded-full blur-[90px] pointer-events-none"></div>

      <div className={styles.el_2}>

        {/* Title */}
        <div className={styles.el_3}>
          <div>
            <p className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Layers size={13} /> PORTFOLIO PROJECTS
            </p>
            <h2 className={styles.el_4}>
              Featured Innovations
            </h2>
          </div>

          {/* Filtering buttons */}
          <div className={styles.el_5}>
            {[
              { id: "all", label: "Other Projects" },
              { id: "ai-ml", label: "AI / ML" },
              { id: "fullstack", label: "Full Stack" },
              { id: "systems", label: "Systems" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer mono-font ${filter === btn.id
                  ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project Showcase */}
        {featuredProject && (
          <div className={styles.el_6}>
            
            {/* Corner glowing badge */}
            <div className={styles.el_7}>
              <Sparkles size={11} /> FEATURED CASE STUDY
            </div>

            <div className={styles.el_11}>

              {/* Left Column: Details */}
              <div className={styles.el_8}>
                <div>
                  <h3 className={styles.el_9}>
                    {featuredProject.title}
                  </h3>
                  <p className={styles.el_10}>
                    AI-powered Educational Doubts solver
                  </p>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {featuredProject.desc}
                </p>

                {/* Highlights List */}
                <div className={styles.el_12}>
                  <h4 className={styles.el_13}>
                    Performance Metrics & Highlights
                  </h4>
                  <div className={styles.el_14}>
                    {featuredProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] font-medium">
                        <Target size={12} className={styles.el_15} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className={styles.el_16}>
                  <h4 className={styles.el_17}>
                    Infrastructure Stack
                  </h4>
                  <div className={styles.el_18}>
                    {featuredProject.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className={styles.el_19}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.el_20}>
                  {featuredProject.live && (
                    <a
                      href={featuredProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.el_21}
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {featuredProject.github && (
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.el_22}
                    >
                      <Github size={12} className={styles.el_23} />
                      <span>GitHub Spec</span>
                    </a>
                  )}
                  <ArchitectureDiagram projectId={featuredProject.id} />
                </div>
              </div>

              {/* Right Column: Dynamic Terminal Mockup */}
              <div className={styles.el_24}>
                <div className="w-full bg-neutral-900 text-neutral-300 rounded-2xl border border-neutral-800 p-4 shadow-xl font-mono text-[10px] space-y-2 relative overflow-hidden h-64 flex flex-col justify-between">
                  <div className={styles.el_25}></div>

                  {/* Terminal Header */}
                  <div className={styles.el_26}>
                    <div className="flex items-center gap-1.5">
                      <span className={styles.el_27}></span>
                      <span className={styles.el_28}></span>
                      <span className={styles.el_29}></span>
                    </div>
                    <span className={styles.el_30}>vk-terminal@mathem</span>
                  </div>

                  {/* Terminal Body */}
                  <div className={styles.el_31}>
                    <p className={styles.el_34}># Initializing vector space index</p>
                    <p className={styles.el_32}>$ pinecone.init_index("math-doubts")</p>
                    <p className={styles.el_33}>✓ Index linked: 4,500 dimensions loaded</p>
                    <p className={styles.el_37}># Invoking Gemini semantic search inference</p>
                    <p className={styles.el_35}>$ gemini.embed_query("linear equations graph")</p>
                    <p className={styles.el_36}>↳ Embeddings: [0.124, -0.984, 0.443, ...]</p>
                    <p className="text-neutral-500"># Query response complete (98.4% match)</p>
                    <p className={styles.el_38}>✓ Doubts resolved for user session 3,104</p>
                  </div>

                  {/* Terminal Footer */}
                  <div className={styles.el_39}>
                    <span>Active connections: 104</span>
                    <span>Lat: 42ms</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Secondary Projects Grid */}
        <div className={styles.el_40}>
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className={styles.el_40}
            >
              <div className={styles.el_41}>
                <div className={styles.el_42}>
                  <div>
                    <h4 className={styles.el_43}>
                      {p.title}
                    </h4>
                    <span className={styles.el_44}>
                      {p.category}
                    </span>
                  </div>

                  {/* Icon indicators */}
                  <div className={styles.el_45}>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.el_43}
                        title="GitHub Code"
                      >
                        <Github size={13} />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.el_44}
                        title="Live Site"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.el_46}>
                  {p.desc}
                </p>
              </div>

              {/* Technologies used */}
              <div className={styles.el_47}>
                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className={styles.el_48}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ArchitectureDiagram projectId={p.id} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
