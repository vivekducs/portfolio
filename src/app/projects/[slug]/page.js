import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Layers, Server, Activity, ArrowRight, ShieldCheck, Zap, Target, Code, Scale, BrainCircuit, Cloud, Rocket } from "lucide-react";
import SystemDiagram from "@/components/SystemDiagram";

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

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectCaseStudy({ params }) {
  const { slug } = params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <nav className="mb-12">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
        </nav>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-full uppercase tracking-wider">{project.category}</span>
            {project.featured && <span className="text-xs font-bold px-3 py-1 bg-green-500/10 border border-green-500/30 text-[var(--accent-color)] rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(34,197,94,0.1)]">Featured</span>}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-[var(--text-primary)] leading-tight">{project.title}</h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed">{project.desc}</p>
          
          <div className="flex flex-wrap gap-4 mt-8">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold hover:border-[var(--text-primary)] transition-all">
                <Github size={18} /> View Source
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--accent-color)] bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold hover:bg-green-600 dark:hover:bg-green-400 hover:border-green-600 dark:hover:border-green-400 transition-all shadow-[0_4px_12px_rgba(22,163,74,0.15)]">
                <ExternalLink size={18} /> Live Project
              </a>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            {project.engineering ? (
              <>
                <section>
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                    <Target size={24} className="text-[var(--accent-color)]" /> The Problem
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{project.engineering.problem}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                    <Layers size={24} className="text-[var(--accent-color)]" /> System Architecture
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{project.engineering.architecture}</p>
                  
                  {/* React Flow System Diagram */}
                  <div className="mt-8 h-[400px] rounded-2xl overflow-hidden border border-[var(--border-color)]">
                    <SystemDiagram projectId={project.id} />
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                    <ShieldCheck size={24} className="text-[var(--accent-color)]" /> Key Engineering Decisions
                  </h2>
                  <div className="space-y-4">
                    {project.engineering.decisions.map((dec, idx) => (
                      <div key={idx} className="glass-card rounded-xl border border-[var(--glass-border)] p-5">
                        <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]"></span>
                          {dec.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed ml-3.5">{dec.content}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                    <Activity size={24} className="text-[var(--accent-color)]" /> Scaling Strategy
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{project.engineering.scaling}</p>
                </section>

                {project.engineering.tradeoffs && (
                  <section>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                      <Scale size={24} className="text-[var(--accent-color)]" /> Architecture Tradeoffs
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{project.engineering.tradeoffs}</p>
                  </section>
                )}

                {project.engineering.aiWorkflow && (
                  <section>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                      <BrainCircuit size={24} className="text-[var(--accent-color)]" /> AI Workflow
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{project.engineering.aiWorkflow}</p>
                  </section>
                )}

                {project.engineering.deploymentFlow && (
                  <section>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                      <Cloud size={24} className="text-[var(--accent-color)]" /> Deployment Flow
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{project.engineering.deploymentFlow}</p>
                  </section>
                )}

                {project.engineering.future && (
                  <section>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                      <Rocket size={24} className="text-[var(--accent-color)]" /> Future Improvements
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{project.engineering.future}</p>
                  </section>
                )}
                
                {project.engineering.apiSchema && (
                  <section>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--text-primary)] mb-6">
                      <Zap size={24} className="text-[var(--accent-color)]" /> Sample API Request
                    </h2>
                    <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-5 overflow-x-auto shadow-inner">
                      <div className="flex items-center justify-between border-b border-[#333] pb-3 mb-4">
                        <span className="text-xs font-mono text-neutral-400">{project.engineering.apiSchema.endpoint}</span>
                        <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">{project.engineering.apiSchema.method}</span>
                      </div>
                      <pre className="text-sm font-mono text-neutral-300 leading-relaxed">
                        {JSON.stringify(project.engineering.apiSchema.body, null, 2)}
                      </pre>
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div className="py-20 text-center glass-card border border-[var(--glass-border)] rounded-2xl">
                <p className="text-[var(--text-muted)] font-medium">Detailed engineering case study coming soon.</p>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <aside className="space-y-6">
            <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-5 flex items-center gap-2">
                <Code size={14} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[11px] font-bold px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg mono-font">{t}</span>
                ))}
              </div>
            </div>

            {project.highlights && (
              <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-5 flex items-center gap-2">
                  <Activity size={14} /> Key Metrics
                </h3>
                <ul className="space-y-3.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-3 font-medium">
                      <span className="text-[var(--accent-color)] mt-1"><ArrowRight size={14} /></span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
