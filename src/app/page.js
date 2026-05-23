"use client";

import { useState, useEffect } from "react";
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
import { MessageSquare, Sparkles } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Monitor scroll progress to trigger highlight changes in the sidebar
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg-primary)] transition-colors duration-400 select-none">
      
      {/* Desktop Sidebar Panel */}
      <Sidebar 
        activeSection={activeSection} 
        onOpenAssistant={() => setIsAssistantOpen(true)} 
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen">
        
        {/* Sticky Mobile/Tablet Header Header */}
        <Header 
          activeSection={activeSection} 
          onOpenAssistant={() => setIsAssistantOpen(true)} 
        />

        {/* Dashboard Split Content grid */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Center Grid Column: Central Portfolio Sections (Hero, Projects, Skills) */}
            <main className="lg:col-span-8 space-y-4">
              <Hero onOpenAssistant={() => setIsAssistantOpen(true)} />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Certifications />
              <Stats />
              <Contact />
            </main>

            {/* Right Grid Column: Sticky Widget sidebar (VK Assistant chat client) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-6 space-y-6 pt-16">
              
              {/* Dedicated VK AI Chat Window */}
              <div className="relative">
                <div className="absolute -top-3 left-6 z-10 px-2 py-0.5 bg-gradient-to-r from-luxury-violet to-luxury-magenta text-white font-bold text-[9px] rounded-full uppercase tracking-wider mono-font shadow-sm animate-pulse">
                  Active Sandbox
                </div>
                <VKAssistant />
              </div>

              {/* Recruitment Pitch Glass panel */}
              <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-5 shadow-sm text-left relative overflow-hidden">
                {/* Glowing light spot */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-orange opacity-5 rounded-full blur-xl pointer-events-none"></div>

                <h4 className="text-xs font-bold text-luxury-orange mono-font uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Sparkles size={11} /> Quick Recruitment Spec
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-semibold">
                  Vivek Kumar has a clean SDE intern record working on Vercel architectures, maintains a 1664 LeetCode rating, and specializes in Express/Node backend APIs. Request his full transcripts inside the Contact section!
                </p>
              </div>

            </aside>

          </div>
        </div>

      </div>

      {/* Floating Action Button (FAB) for Mobile AI Assistant */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-luxury-violet via-luxury-magenta to-luxury-orange text-white shadow-xl shadow-luxury-purple/20 hover:opacity-95 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center animate-bounce"
        title="Open VK Assistant AI"
      >
        <MessageSquare size={20} />
      </button>

      {/* Full AI Assistant Modal Dialog Drawer */}
      <VKAssistantPopup 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />

    </div>
  );
}
