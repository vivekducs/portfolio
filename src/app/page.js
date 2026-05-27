"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import VKAssistant from "@/components/VKAssistant";
import AIBootLoader from "@/components/AIBootLoader";
import { Sparkles } from "lucide-react";

// Lazy load heavy below-the-fold components
const EngineeringHub = dynamic(() => import("@/components/EngineeringHub"), {
  ssr: false,
  loading: () => null,
});
const Certifications = dynamic(() => import("@/components/Certifications"), {
  loading: () => null,
});
const Stats = dynamic(() => import("@/components/Stats"), {
  loading: () => null,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => null,
});
const RecruiterDashboard = dynamic(() => import("@/components/RecruiterDashboard"), {
  loading: () => null,
});
const AchievementWall = dynamic(() => import("@/components/AchievementWall"), {
  loading: () => null,
});
const VKAssistantPopup = dynamic(() => import("@/components/VKAssistantPopup"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [bootDone, setBootDone] = useState(false);

  // Only show boot loader on first visit (per session)
  const [showBoot, setShowBoot] = useState(false);
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("vk-boot-seen");
    if (!hasSeen) {
      setShowBoot(true);
      sessionStorage.setItem("vk-boot-seen", "1");
    } else {
      setBootDone(true);
    }
  }, []);

  // Scroll to top after boot completes (prevents "already scrolled" bug)
  useEffect(() => {
    if (bootDone) {
      window.scrollTo(0, 0);
    }
  }, [bootDone]);

  // Monitor scroll via IntersectionObserver (replaces janky scroll event listener)
  const sectionRefs = useRef({});
  const registerSection = useCallback((id, el) => {
    if (el) sectionRefs.current[id] = el;
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "experience", "certifications", "stats", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    // Observe all section elements by ID
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [bootDone]);

  return (
    <>
      {/* AI Boot Loader — cinematic first-visit experience */}
      {showBoot && (
        <AIBootLoader
          onComplete={() => {
            setShowBoot(false);
            setBootDone(true);
          }}
        />
      )}

      <div
        className="min-h-screen flex flex-col bg-[var(--bg-primary)] transition-colors duration-400 relative"
        style={{ opacity: bootDone ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {/* Global Navigation */}
        <Sidebar
          activeSection={activeSection}
          onOpenAssistant={() => setIsAssistantOpen(true)}
          isRecruiterMode={isRecruiterMode}
          toggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
        />

        {/* Main Workspace Frame */}
        <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen w-full">

          {/* Sticky Mobile/Tablet Header */}
          <Header
            activeSection={activeSection}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            isRecruiterMode={isRecruiterMode}
            toggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
          />

          {/* Dashboard Content Grid */}
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative mt-6 lg:mt-16">

              <main className="lg:col-span-8 space-y-24 pb-20 lg:pb-0">
                {isRecruiterMode && (
                  <RecruiterDashboard onClose={() => setIsRecruiterMode(false)} />
                )}
                <Hero onOpenAssistant={() => setIsAssistantOpen(true)} />
                <About />
                <Projects />
                <Skills />
                <EngineeringHub />
                <Experience />
                <AchievementWall />
                <Certifications />
                <Stats />
                <Contact />
              </main>

              {/* Right Grid Column: Sticky VK AI Chat Widget */}
              <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6 pt-16">

                {/* Dedicated VK AI Chat Window */}
                <div className="relative">
                  <div className="absolute -top-3 left-6 z-10 px-2 py-0.5 bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold text-[9px] rounded-full uppercase tracking-wider mono-font shadow-sm animate-pulse">
                    AI Active
                  </div>
                  <VKAssistant />
                </div>

                {/* Recruitment Pitch Glass panel */}
                <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-5 shadow-sm text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500 opacity-5 rounded-full blur-xl pointer-events-none" />
                  <h4 className="text-xs font-bold text-[var(--accent-color)] mono-font uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Sparkles size={11} /> Quick Recruitment Spec
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-semibold">
                    Vivek Kumar is a recent MCA graduate actively looking for engineering roles. He maintains a 1664 LeetCode rating, specializes in Express/Node backend APIs, and builds premium Full Stack apps. Request his full transcripts inside the Contact section!
                  </p>
                </div>

              </aside>

            </div>
          </div>

        </div>



        {/* Full AI Assistant Modal */}
        <VKAssistantPopup
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
        />

      </div>
    </>
  );
}
