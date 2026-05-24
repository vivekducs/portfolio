"use client";

import { Home, User, Code2, Briefcase, Award, History, BarChart3, Mail, FileText, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";

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

const Linkedin = ({ size = 24, ...props }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export default function Sidebar({ activeSection, onOpenAssistant }) {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: History },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "stats", label: "Stats & DSA", icon: BarChart3 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] p-6 justify-between select-none z-40">
      {/* Top Section - Brand Logo */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll("home")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-luxury-violet via-luxury-magenta to-luxury-orange p-[1.5px] shadow-lg shadow-luxury-purple/10">
              <div className="w-full h-full rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center font-bold text-lg tracking-wider">
                <span className="gradient-text">VK</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight leading-tight">Vivek Kumar</h3>
              <p className="text-[10px] text-[var(--text-muted)] mono-font tracking-wide">AI Engineer</p>
            </div>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-luxury-purple/10 to-luxury-magenta/5 border-l-2 border-luxury-purple text-luxury-purple"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                }`}
              >
                <Icon size={16} className={isActive ? "text-luxury-purple" : ""} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - Controls and Social Profiles */}
      <div className="space-y-5">
        {/* Floating VK Assistant Control */}
        <div 
          onClick={onOpenAssistant}
          className="glass-card rounded-xl border p-3 hover:border-luxury-purple/40 shadow-sm cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-luxury-purple mono-font tracking-widest flex items-center gap-1.5">
              <Sparkles size={10} className="animate-pulse" /> VK ASSISTANT
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px] items-center">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] group-hover:text-luxury-purple transition-all font-semibold mono-font">
              Ask AI about VK
            </span>
          </div>
        </div>

        {/* Resume Download CTA */}
        <a
          href="https://github.com/AVPXM8"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-luxury-purple hover:bg-luxury-purple/5 text-[var(--text-primary)] font-semibold text-sm rounded-xl shadow-sm transition-all group"
        >
          <FileText size={15} className="text-luxury-purple group-hover:scale-110 transition-transform" />
          <span>View GitHub CV</span>
        </a>

        {/* Social Icons row */}
        <div className="flex items-center justify-between px-2 text-[var(--text-muted)]">
          <a
            href="https://github.com/AVPXM8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-luxury-purple transition-colors p-1 hover:bg-[var(--bg-tertiary)] rounded-lg"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/vivek33pal/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-luxury-purple transition-colors p-1 hover:bg-[var(--bg-tertiary)] rounded-lg"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:vivekducs@gmail.com"
            className="hover:text-luxury-purple transition-colors p-1 hover:bg-[var(--bg-tertiary)] rounded-lg"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Footer legal text */}
        <div className="text-[10px] text-[var(--text-muted)] text-center font-medium mono-font pt-2 border-t border-[var(--border-color)]">
          © 2026 Vivek Kumar. All rights reserved.
        </div>
      </div>
    </aside>
  );
}
