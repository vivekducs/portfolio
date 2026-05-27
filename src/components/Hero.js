"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, FileDown, MessageSquare } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useDashboard } from "./DashboardLayout";
import { trackCTA, trackDownload } from "@/lib/analytics";

export default function Hero() {
  const { setIsAssistantOpen } = useDashboard();
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden flex flex-col items-center border-b border-[var(--border-color)]">
      <div className="w-full max-w-5xl z-10 px-4 flex flex-col items-center text-center">

        {/* Minimal Availability Badge */}
        <AnimatedSection delay={0}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-xs font-semibold text-[var(--text-secondary)] shadow-sm mb-10 transition-all hover:border-[var(--border-hover)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_rgba(214,197,165,0.6)] animate-pulse" />
            <span className="tracking-wide">Recent MCA Grad • Available for Backend & AI Roles</span>
          </div>
        </AnimatedSection>

        {/* Core Headline */}
        <AnimatedSection delay={100}>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.05] text-[var(--text-primary)] mb-6 max-w-4xl mx-auto">
            Designing <span className="italic text-[var(--text-secondary)] font-serif font-medium">high-performance</span> software that drives business impact.
          </h1>
        </AnimatedSection>

        {/* Subtitle / Positioning Statement */}
        <AnimatedSection delay={200}>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto font-medium mb-10">
            I am a recent MCA graduate specializing in AI-integrated architectures and scalable backend systems. I bridge the gap between technical complexity and elegant user experiences.
          </p>
        </AnimatedSection>

        {/* Call to Actions */}
        <AnimatedSection delay={300}>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => {
                trackCTA("View Case Studies", "Hero Section");
                handleScroll("projects");
              }}
              className="px-7 py-3.5 bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] text-[var(--bg-primary)] font-bold text-sm rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5"
            >
              <span>View Case Studies</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="https://drive.google.com/drive/folders/17Jgpo84jUw77VX0JZ6AZZ4IGqIZ_u6f4?usp=drive_link"
              onClick={() => trackDownload("Resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-transparent border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-bold text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5"
            >
              <FileDown size={16} />
              <span>Resume</span>
            </a>

            <button
              onClick={() => setIsAssistantOpen(true)}
              className="px-7 py-3.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer hover:-translate-y-0.5 group"
            >
              <MessageSquare size={16} className="group-hover:text-[var(--bg-primary)]" />
              <span>Ask AI Assistant</span>
            </button>
          </div>
        </AnimatedSection>

        {/* Minimalist Profile Element (Bottom Center) */}
        <AnimatedSection delay={400}>
          <div className="mt-20 flex flex-col items-center gap-3">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[var(--border-color)] shadow-sm">
              <Image
                src="/Photovivek.jpeg"
                alt="Vivek Kumar"
                width={112}
                height={112}
                priority
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[var(--text-primary)] tracking-wide">Vivek Kumar</p>
              <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mono-font mt-0.5">Software Engineer</p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
