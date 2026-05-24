"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon, Sparkles, Home, User, Code2, Briefcase, Award, History, BarChart3, Mail, FileText, Link as LinkIcon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Header({ activeSection, onOpenAssistant, isRecruiterMode, toggleRecruiterMode }) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  return (
    <header className="lg:hidden w-full sticky top-0 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-5 py-4 z-40">
      <div className="flex items-center justify-between">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll("home")}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-luxury-violet via-luxury-magenta to-luxury-orange p-[1.5px]">
            <div className="w-full h-full rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center font-bold text-base">
              <span className="gradient-text">VK</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xs leading-none">Vivek Kumar</h3>
            <p className="text-[9px] text-[var(--text-muted)] mono-font">AI Engineer</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Recruiter Toggle */}
          <button
            onClick={toggleRecruiterMode}
            className={`p-2 rounded-lg border transition-all ${
              isRecruiterMode
                ? "border-luxury-orange/30 bg-luxury-orange/10 text-luxury-orange"
                : "border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${isRecruiterMode ? "bg-luxury-orange animate-pulse" : "bg-[var(--text-muted)]"}`} />
          </button>

          {/* AI Assistant Quick Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1 bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide mono-font cursor-pointer hover:bg-luxury-purple/20 transition-all"
          >
            <Sparkles size={11} className="animate-pulse" />
            <span>AI Bot</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] cursor-pointer"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] cursor-pointer"
          >
            {isOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Hamburger Drawer Menu Overlay */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-[var(--bg-secondary)] border-b border-[var(--border-color)] py-4 shadow-xl z-50 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col px-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-luxury-purple/10 border-l-2 border-luxury-purple text-luxury-purple"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
