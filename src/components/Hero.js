"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, FileDown, Sparkles, MessageSquare, Terminal } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

import { trackCTA, trackDownload } from "@/lib/analytics";

// Stable constant outside component — avoids stale closure & ESLint dep warnings
const TYPING_PHRASES = [
  "AI Integrated Systems",
  "Scalable Backend Architectures",
  "Real-Time Applications",
  "Full Stack Products",
];

export default function Hero({ onOpenAssistant }) {
  const [typedText, setTypedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    let timer;
    const currentPhrase = TYPING_PHRASES[phraseIdx];
    const typingSpeed = 100;
    const deletingSpeed = 60;
    const pauseDuration = 2000;

    if (!isDeleting) {
      if (typedText !== currentPhrase) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (typedText !== "") {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, typedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % TYPING_PHRASES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx]);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative py-8 md:py-16 overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-6xl z-10 px-4">
        {/* Available Pill */}
        <AnimatedSection delay={0}>
          <div className="inline-flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </span>
            <span className="mono-font">Available for SDE / AI Engineer Roles</span>
          </div>
        </AnimatedSection>

        {/* Desktop Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Passport Circular Avatar */}
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-[var(--border-color)] p-0.5 shadow-sm">
                  <Image
                    src="/Photovivek.jpeg"
                    alt="Vivek Kumar"
                    width={64}
                    height={64}
                    priority
                    className="w-full h-full rounded-full object-cover bg-[var(--bg-secondary)]"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-secondary)] shadow-sm"></span>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] font-bold tracking-widest uppercase mono-font">Developer Persona</p>
                  <h4 className="text-base font-bold tracking-tight">Vivek Kumar <span className="text-[var(--text-primary)]">👋</span></h4>
                </div>
              </div>
            </AnimatedSection>

            {/* Core Titles */}
            <AnimatedSection delay={200}>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[var(--text-primary)]">
                Building Scalable <br className="hidden sm:inline" />
                <span className="text-[var(--text-primary)] underline decoration-4 decoration-[var(--border-color)] underline-offset-4">AI Systems</span> & Modern <br />
                Software Products
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <h2 className="text-sm sm:text-base font-bold text-[var(--text-secondary)] mono-font tracking-wide">
                AI Engineer • Backend Developer • Full Stack Product Builder
              </h2>
            </AnimatedSection>

            {/* Animated Typing Segment */}
            <AnimatedSection delay={400}>
              <div className="h-10 flex items-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-4 py-2 w-fit">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest mono-font flex items-center gap-2 mr-2">
                  <Terminal size={14} /> FOCUS:
                </span>
                <span className="text-sm font-semibold mono-font text-[var(--text-primary)] typing-cursor">
                  {typedText}
                </span>
              </div>
            </AnimatedSection>

            {/* Introduction paragraph */}
            <AnimatedSection delay={500}>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-medium">
                I am an MCA student specialized in architecturing high-throughput backends, integrating advanced generative AI systems, and deploying real-world responsive products.
              </p>
            </AnimatedSection>

            {/* Call to Actions */}
            <AnimatedSection delay={600}>
              <div className="flex flex-wrap gap-3.5 pt-2">
                <button
                  onClick={() => {
                    trackCTA("Explore Projects", "Hero Section");
                    handleScroll("projects");
                  }}
                  className="px-6 py-3.5 bg-[var(--text-primary)] hover:bg-[var(--text-secondary)] text-[var(--bg-primary)] font-bold text-sm rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer hover:translate-y-[-2px]"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={14} />
                </button>

                <a
                  href="https://drive.google.com/drive/folders/17Jgpo84jUw77VX0JZ6AZZ4IGqIZ_u6f4?usp=drive_link"
                  onClick={() => trackDownload("Resume.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer hover:translate-y-[-2px]"
                >
                  <FileDown size={14} className="text-[var(--text-primary)]" />
                  <span>Resume</span>
                </a>

                <button
                  onClick={() => {
                    trackCTA("Contact Click", "Hero Section");
                    handleScroll("contact");
                  }}
                  className="px-6 py-3.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer hover:translate-y-[-2px]"
                >
                  Contact
                </button>

                <button
                  onClick={onOpenAssistant}
                  className="px-6 py-3.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer hover:translate-y-[-2px] group"
                >
                  <MessageSquare size={14} className="group-hover:text-[var(--bg-primary)]" />
                  <span>Talk to VK Assistant</span>
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Dynamic Workstation Image Rendering */}
          <div className="lg:col-span-5 relative flex justify-center mt-8 lg:mt-0 select-none">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden glass-card border border-[var(--border-color)] p-2 shadow-sm flex items-center justify-center animate-in fade-in zoom-in duration-1000">

              {/* Actual Image */}
              <Image
                src="/Photovivek.jpeg"
                alt="Vivek Kumar"
                width={400}
                height={400}
                priority
                className="w-full h-full rounded-2xl object-cover opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { metric: "2+", label: "Years Coding" },
            { metric: "50+", label: "Projects Built" },
            { metric: "500+", label: "DSA Problems" },
            { metric: "10+", label: "Certifications" },
            { metric: "20+", label: "Technologies" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-[var(--border-color)] p-4 text-center hover:border-[var(--text-primary)] transition-all shadow-sm"
            >
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-1">
                {stat.metric}
              </h3>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider mono-font">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
