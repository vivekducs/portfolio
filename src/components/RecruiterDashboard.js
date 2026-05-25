"use client";

import { X, Download, ShieldCheck, Database, Award, Code2, ExternalLink, History, Briefcase, CheckCircle, FileText, ChevronRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { trackDownload } from "@/lib/analytics";
import { motion } from "framer-motion";

export default function RecruiterDashboard({ onClose }) {
  const experiences = [
    {
      role: "SDE Intern",
      company: "SafeQbit Technologies Pvt Ltd",
      period: "Feb 2026 – May 2026",
    },
    {
      role: "Trainee Engineer",
      company: "Tech Mahindra",
      period: "Jul 2023 – Jan 2024",
    }
  ];

  const certs = [
    { title: "Back-End Apps with Node.js & Express", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/verify/0YG3Z7CCMHOS" },
    { title: "Java Programming (Professional)", issuer: "Udemy", url: "https://www.udemy.com/certificate/UC-f4808206-36a1-4432-b954-8bd8ed27f6eb/" },
    { title: "Python for Data Science and AI", issuer: "IBM", url: "https://www.credly.com/badges/2f5144fb-cef8-404d-b828-528bed14ca82/linked_in_profile" },
    { title: "JavaScript Essentials", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/verify/Z7YY3ZUEVQLG" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="w-full mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="glass-card rounded-3xl border-2 border-[var(--border-color)] p-6 md:p-10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] max-h-[85vh] overflow-y-auto custom-scrollbar">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--text-muted)]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--text-primary)]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 relative z-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest mono-font">
                Resume / Recruiter View Active
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Vivek Kumar
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium flex items-center gap-2">
              <Code2 size={14} className="text-[var(--text-primary)]" />
              Full-Stack & AI Engineer
            </p>
          </div>
          <div className="flex items-center gap-3 self-start">
            <a
              href="https://drive.google.com/drive/folders/17Jgpo84jUw77VX0JZ6AZZ4IGqIZ_u6f4?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDownload("Resume.pdf")}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] text-[var(--bg-primary)] text-xs font-bold rounded-xl shadow-md transition-all duration-200 hover:scale-105"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-colors text-[var(--text-secondary)]"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Column 1: Core Strengths & Tech */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="bg-[var(--bg-primary)]/60 backdrop-blur-md border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--text-muted)] transition-colors">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-violet-500" />
                Why Hire Vivek?
              </h3>
              <ul className="space-y-3">
                {[
                  "Proven ability to build scalable full-stack products from zero to production.",
                  "Deep expertise in Node.js backend architectures and RESTful API design.",
                  "Hands-on experience integrating modern AI (Gemini, Pinecone) into real apps.",
                  "Strong CS fundamentals (Top 16% globally on LeetCode, 500+ problems)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-[var(--text-secondary)] font-medium leading-relaxed group">
                    <span className="text-[var(--text-primary)] mt-0.5 group-hover:text-violet-500 transition-colors">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-[var(--bg-primary)]/60 backdrop-blur-md border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--text-muted)] transition-colors">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Database size={16} className="text-orange-500" />
                Technical Arsenal
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {["Node.js", "Express", "React", "Next.js", "MongoDB", "SQL", "Docker", "AWS", "Python", "C++"].map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[var(--bg-tertiary)] border border-[var(--glass-border)] rounded-md text-[10px] font-bold text-[var(--text-primary)] mono-font hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-[var(--bg-primary)]/60 backdrop-blur-md border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--text-muted)] transition-colors">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Award size={16} className="text-teal-500" />
                Fast Facts
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--glass-border)] hover:border-violet-500/30 transition-colors">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase mono-font mb-1">Education</div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">MCA (24-26)</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Delhi University</div>
                </div>
                <div className="bg-[var(--bg-tertiary)] p-3 rounded-xl border border-[var(--glass-border)] hover:border-orange-500/30 transition-colors">
                  <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase mono-font mb-1">LeetCode</div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">Max: 1664</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Top 16% Global</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Experience & Certifications */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="bg-[var(--bg-primary)]/60 backdrop-blur-md border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--text-muted)] transition-colors h-full">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <History size={16} className="text-blue-500" />
                Experience
              </h3>
              <div className="space-y-5">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[var(--text-primary)] before:rounded-full before:z-10 after:content-[''] after:absolute after:left-[2.5px] after:top-2 after:bottom-[-20px] after:w-px after:bg-[var(--border-color)] last:after:hidden">
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{exp.role}</h4>
                    <p className="text-[10px] text-[var(--text-secondary)] font-medium mt-0.5 flex items-center gap-1">
                      <Briefcase size={10} /> {exp.company}
                    </p>
                    <p className="text-[9px] text-[var(--text-muted)] mono-font mt-1">{exp.period}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 mt-8 flex items-center gap-2">
                <FileText size={16} className="text-rose-500" />
                Certifications
              </h3>
              <div className="space-y-3">
                {certs.map((cert, i) => (
                  <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="block p-3 bg-[var(--bg-tertiary)] border border-[var(--glass-border)] rounded-xl hover:border-[var(--text-primary)] transition-all duration-300 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[11px] font-bold text-[var(--text-primary)] group-hover:text-violet-400 transition-colors flex items-start gap-1.5">
                          {cert.title}
                        </h4>
                        <p className="text-[9px] text-[var(--text-secondary)] uppercase mono-font mt-1.5 flex items-center gap-1">
                          <CheckCircle size={9} className="text-green-500" /> {cert.issuer}
                        </p>
                      </div>
                      <ExternalLink size={12} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Column 3: Top Projects */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="bg-[var(--bg-primary)]/60 backdrop-blur-md border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--text-muted)] transition-colors h-full flex flex-col">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Code2 size={16} className="text-green-500" />
                Flagship Projects
              </h3>
              <div className="space-y-4 flex-1">
                {projectsData.slice(0, 3).map((p) => (
                  <div key={p.id} className="group relative bg-[var(--bg-tertiary)] p-3.5 rounded-xl border border-[var(--glass-border)] hover:border-green-500/40 transition-colors">
                    <div className="flex items-start justify-between mb-1.5">
                      <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-green-400 transition-colors flex items-center gap-1.5">
                        {p.title}
                      </h4>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] uppercase mono-font">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[8px] text-[var(--text-muted)] border border-[var(--border-color)] px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 3 && <span className="text-[8px] text-[var(--text-muted)] px-1 py-0.5">+{p.tech.length - 3}</span>}
                    </div>
                    
                    {/* Action Links */}
                    <div className="flex gap-3 mt-3 pt-2 border-t border-[var(--border-color)]">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-[var(--text-primary)] hover:text-green-400 transition-colors flex items-center gap-1">
                          <ExternalLink size={10} /> Live App
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-[var(--text-primary)] hover:text-violet-400 transition-colors flex items-center gap-1">
                          <Code2 size={10} /> Source
                        </a>
                      )}
                      <a href={`/projects/${p.id}`} className="text-[9px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 ml-auto">
                        Details <ChevronRight size={10} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
