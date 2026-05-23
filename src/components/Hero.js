"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, FileDown, Sparkles, MessageSquare, Terminal } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import styles from "./Hero.module.css";

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
    <section id="home" className={styles.el_1}>
      {/* Mouse-reactive glow spotlight */}
      <div
        className={styles.el_3}
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Cinematic backlighting effects */}
      <div className={styles.el_2}></div>
      <div className="absolute bottom-10 left-[10%] w-96 h-96 bg-brand-secondary opacity-15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-40 left-[40%] w-80 h-80 bg-brand-primary opacity-10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Floating particles background simulation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 select-none">
        <div className={styles.el_4}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className={styles.el_5} style={{ animationDelay: "0.5s" }}></div>
      </div>

      <div className="w-full max-w-6xl z-10 px-4">
        {/* Available Pill */}
        <AnimatedSection delay={0}>
          <div className={styles.el_6}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </span>
            <span className={styles.el_7}>Available for SDE / AI Engineer Roles</span>
          </div>
        </AnimatedSection>

        {/* Desktop Split Layout */}
        <div className={styles.el_8}>
          {/* Left Column: Heading and description */}
          <div className={styles.el_9}>
            {/* Passport Circular Avatar */}
            <AnimatedSection delay={100}>
              <div className={styles.el_10}>
                <div className={styles.el_11}>
                  <Image
                    src="/vivek_avatar.png"
                    alt="Vivek Kumar"
                    width={64}
                    height={64}
                    priority
                    className={styles.el_12}
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-secondary)] shadow-sm"></span>
                </div>
                <div>
                  <p className={styles.el_13}>Developer Persona</p>
                  <h4 className="text-base font-bold tracking-tight">Vivek Kumar <span className={styles.el_14}>👋</span></h4>
                </div>
              </div>
            </AnimatedSection>

            {/* Core Titles */}
            <AnimatedSection delay={200}>
              <h1 className={styles.el_15}>
                Building Scalable <br className={styles.el_12} />
                <span className={styles.el_16}>AI Systems</span> & Modern <br />
                Software Products
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <h2 className={styles.el_18}>
                AI Engineer • Backend Developer • Full Stack Product Builder
              </h2>
            </AnimatedSection>

            {/* Animated Typing Segment */}
            <AnimatedSection delay={400}>
              <div className={styles.el_17}>
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mono-font flex items-center gap-2 mr-2">
                  <Terminal size={14} /> FOCUS:
                </span>
                <span className={styles.el_18}>
                  {typedText}
                </span>
              </div>
            </AnimatedSection>

            {/* Introduction paragraph */}
            <AnimatedSection delay={500}>
              <p className={styles.el_19}>
                I am an MCA student specialized in architecturing high-throughput backends, integrating advanced generative AI systems, and deploying real-world responsive products.
              </p>
            </AnimatedSection>

            {/* Call to Actions */}
            <AnimatedSection delay={600}>
              <div className={styles.el_20}>
                <button
                  onClick={() => handleScroll("projects")}
                  className={styles.el_23}
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={14} />
                </button>
                
                <a
                  href="https://github.com/AVPXM8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.el_24}
                >
                  <FileDown size={14} className={styles.el_21} />
                  <span>Resume</span>
                </a>

                <button
                  onClick={() => handleScroll("contact")}
                  className={styles.el_25}
                >
                  Contact
                </button>

                <button
                  onClick={onOpenAssistant}
                  className={styles.el_18}
                >
                  <MessageSquare size={14} />
                  <span>Talk to VK Assistant</span>
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Dynamic Workstation Image Rendering */}
          <div className={styles.el_26}>
            <div className={`animate-in fade-in zoom-in ${styles.el_22}`}>
              
              {/* Outer decorative neon frame rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-orange-400/5 to-brand-secondary/10 pointer-events-none rounded-3xl"></div>
              
              {/* Actual Image */}
              <Image
                src="/holographic_developer.png"
                alt="AI futuristic workstation"
                width={400}
                height={400}
                priority
                className={styles.el_23}
              />

              {/* Dynamic glowing HUD widget layers */}
              <div className={styles.el_24}>
                <Sparkles size={12} className="text-brand-primary animate-spin" />
                <span>VK.AI Model Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Highlights Grid */}
        <div className={styles.el_30}>
          {[
            { metric: "2+", label: "Years Coding" },
            { metric: "50+", label: "Projects Built" },
            { metric: "500+", label: "DSA Problems" },
            { metric: "10+", label: "Certifications" },
            { metric: "20+", label: "Technologies" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={styles.el_31}
            >
              <h3 className={styles.el_22}>
                {stat.metric}
              </h3>
              <p className={styles.el_32}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
