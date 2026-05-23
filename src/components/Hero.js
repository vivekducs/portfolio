"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, FileDown, Sparkles, MessageSquare, Terminal } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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

  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative py-8 md:py-16 overflow-hidden flex flex-col items-center">
      {/* Mouse-reactive glow spotlight */}
      <div
        className="mouse-glow hidden lg:block"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Cinematic backlighting effects */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-luxury-purple opacity-20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-[10%] w-96 h-96 bg-luxury-magenta opacity-15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-40 left-[40%] w-80 h-80 bg-luxury-orange opacity-10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Floating particles background simulation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 select-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-luxury-purple animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-luxury-magenta animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-luxury-orange animate-ping" style={{ animationDelay: "0.5s" }}></div>
      </div>

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
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-luxury-violet via-luxury-magenta to-luxury-orange p-[2px] shadow-lg shadow-luxury-purple/20">
                  <Image
                    src="/vivek_avatar.png"
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
                  <h4 className="text-base font-bold tracking-tight">Vivek Kumar <span className="text-luxury-magenta">👋</span></h4>
                </div>
              </div>
            </AnimatedSection>

            {/* Core Titles */}
            <AnimatedSection delay={200}>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-[var(--text-primary)]">
                Building Scalable <br className="hidden sm:inline" />
                <span className="gradient-text">AI Systems</span> & Modern <br />
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
                <span className="text-xs font-bold text-luxury-purple uppercase tracking-widest mono-font flex items-center gap-2 mr-2">
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
                  onClick={() => handleScroll("projects")}
                  className="px-6 py-3.5 bg-gradient-to-r from-luxury-violet to-luxury-purple hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md shadow-luxury-purple/15 flex items-center gap-2 transition-all cursor-pointer hover:translate-y-[-2px]"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={14} />
                </button>
                
                <a
                  href="https://github.com/AVPXM8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-luxury-purple/40 text-[var(--text-primary)] font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer hover:translate-y-[-2px]"
                >
                  <FileDown size={14} className="text-luxury-purple" />
                  <span>Resume</span>
                </a>

                <button
                  onClick={() => handleScroll("contact")}
                  className="px-6 py-3.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-luxury-purple/40 text-[var(--text-primary)] font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer hover:translate-y-[-2px]"
                >
                  Contact
                </button>

                <button
                  onClick={onOpenAssistant}
                  className="px-6 py-3.5 bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-luxury-purple/20 transition-all cursor-pointer hover:translate-y-[-2px]"
                >
                  <MessageSquare size={14} />
                  <span>Talk to VK Assistant</span>
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Dynamic Workstation Image Rendering */}
          <div className="lg:col-span-5 relative flex justify-center mt-8 lg:mt-0 select-none">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden glass-card border p-2 shadow-2xl flex items-center justify-center animate-in fade-in zoom-in duration-1000">
              
              {/* Outer decorative neon frame rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-luxury-purple/10 via-luxury-magenta/5 to-luxury-orange/10 pointer-events-none rounded-3xl"></div>
              
              {/* Actual Image */}
              <Image
                src="/holographic_developer.png"
                alt="AI futuristic workstation"
                width={400}
                height={400}
                priority
                className="w-full h-full rounded-2xl object-cover"
              />

              {/* Dynamic glowing HUD widget layers */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 text-white rounded-2xl p-3 text-[10px] font-semibold mono-font shadow-lg flex items-center gap-2">
                <Sparkles size={12} className="text-luxury-orange animate-spin" />
                <span>VK.AI Model Active</span>
              </div>
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
              className="glass-card rounded-2xl border border-[var(--glass-border)] p-4 text-center hover:border-luxury-purple/30 transition-all shadow-sm"
            >
              <h3 className="text-2xl sm:text-3xl font-black gradient-text tracking-tight mb-1">
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
