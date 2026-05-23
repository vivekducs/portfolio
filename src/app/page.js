"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import VKAssistant from "@/components/VKAssistant";
import VKAssistantPopup from "@/components/VKAssistantPopup";
import AchievementWall from "@/components/AchievementWall";
import AIBootLoader from "@/components/AIBootLoader";
import { MessageSquare, Sparkles, Bot } from "lucide-react";
import styles from "./page.module.css";

// Lazy load heavy 3D globe section
const GlobeSection = dynamic(() => import("@/components/GlobeSection"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
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

  // Monitor scroll to update active section in sidebar
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "experience", "certifications", "stats", "contact"];
    const handleScrollObserver = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollObserver);
    return () => window.removeEventListener("scroll", handleScrollObserver);
  }, []);

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
        className={styles.el_1}
        style={{ opacity: bootDone ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {/* Desktop Sidebar Panel */}
        <Sidebar
          activeSection={activeSection}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

        {/* Main Workspace Frame */}
        <div className={styles.el_2}>

          {/* Sticky Mobile/Tablet Header */}
          <Header
            activeSection={activeSection}
            onOpenAssistant={() => setIsAssistantOpen(true)}
          />

          {/* Dashboard Content Grid */}
          <div className={styles.el_3}>
            <div className={styles.el_2}>

              {/* Center Grid Column: Main Portfolio Sections */}
              <main className={styles.el_4}>
                <Hero onOpenAssistant={() => setIsAssistantOpen(true)} />
                <About />
                <GlobeSection />
                <Skills />
                <Projects />
                <Experience />
                <AchievementWall />
                <Certifications />
                <Stats />
                <Contact />
              </main>

              {/* Right Grid Column: Persistent Utilities Pane */}
              <aside className={styles.el_5}>

                {/* VK AI Chat Window (Taller & Persistent) */}
                <div className={styles.el_6}>
                  <div className="absolute -top-3 left-6 z-10 px-2.5 py-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-[9px] rounded-full uppercase tracking-wider mono-font shadow-sm">
                    <span className={styles.el_7}>●</span> AI Active
                  </div>
                  <div className={styles.el_8}>
                    <VKAssistant />
                  </div>
                </div>

                {/* Quick Stats / System Status Widget */}
                <div className={styles.el_9}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary opacity-5 rounded-full blur-2xl pointer-events-none" />
                  <h4 className={styles.el_10}>
                    <Bot size={11} className="text-brand-primary" /> Live System Status
                  </h4>
                  
                  <div className={styles.el_11}>
                    <div className={styles.el_12}>
                      <span className={styles.el_13}>LeetCode Global Rank</span>
                      <span className={styles.el_14}>Top 4%</span>
                    </div>
                    <div className={styles.el_15}>
                      <div className="bg-brand-primary h-full rounded-full" style={{ width: "96%" }}></div>
                    </div>
                    
                    <div className={styles.el_16}>
                      <span className={styles.el_17}>Backend Systems</span>
                      <span className={styles.el_18}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recruitment Pitch */}
                <div className={styles.el_19}>
                  <h4 className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Sparkles size={11} /> Quick Spec
                  </h4>
                  <p className={styles.el_20}>
                    Vivek Kumar has a clean SDE intern record working on Vercel architectures, maintains a 1664 LeetCode rating, and specializes in Express/Node backend APIs.
                  </p>
                </div>

              </aside>

            </div>
          </div>

        </div>

        {/* Full AI Assistant Bottom Sheet (Mobile) */}
        <VKAssistantPopup
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
        />

      </div>
    </>
  );
}
