"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon, Sparkles, Home, User, Code2, Briefcase, Award, History, BarChart3, Mail, FileText, Link as LinkIcon, BookOpen } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ activeSection, onOpenAssistant, isRecruiterMode, toggleRecruiterMode }) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (item) => {
    setIsOpen(false);
    if (item.type === "link") {
      router.push(item.path);
    } else {
      if (pathname !== "/") {
        router.push(`/#${item.id}`);
      } else {
        const el = document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: Home, type: "anchor" },
    { id: "about", label: "About", icon: User, type: "anchor" },
    { id: "skills", label: "Skills", icon: Code2, type: "anchor" },
    { id: "projects", label: "Projects", icon: Briefcase, type: "anchor" },
    { id: "experience", label: "Experience", icon: History, type: "anchor" },
    { id: "certifications", label: "Certifications", icon: Award, type: "anchor" },
    { id: "stats", label: "Stats & DSA", icon: BarChart3, type: "anchor" },
    { id: "contact", label: "Contact", icon: Mail, type: "anchor" },
    { id: "blog", label: "Blog & Articles", icon: BookOpen, type: "link", path: "/blog" },
  ];

  return (
    <header className="lg:hidden w-full sticky top-0 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-5 py-4 z-40">
      <div className="flex items-center justify-between">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation({ id: "home", type: "anchor" })}>
          <div className="w-9 h-9 rounded-lg bg-[var(--text-primary)] p-[1px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-lg bg-[var(--text-primary)] flex items-center justify-center font-bold text-base text-[var(--bg-primary)]">
              <span>VK</span>
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
                ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                : "border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${isRecruiterMode ? "bg-[var(--bg-primary)] animate-pulse" : "bg-[var(--text-muted)]"}`} />
          </button>

          {/* AI Assistant Quick Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide mono-font cursor-pointer hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all group"
          >
            <Sparkles size={11} className="animate-pulse group-hover:text-[var(--bg-primary)] text-[var(--text-primary)]" />
            <span>AI Bot</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--text-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-all cursor-pointer"
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
              const isActive = item.type === "link" ? pathname.startsWith(item.path) : (pathname === "/" && activeSection === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-[var(--bg-primary)]" : ""} />
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
