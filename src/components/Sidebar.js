"use client";

import { FileText, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ activeSection, onOpenAssistant, isRecruiterMode, toggleRecruiterMode }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { id: "home", label: "Home", type: "anchor" },
    { id: "about", label: "About", type: "anchor" },
    { id: "projects", label: "Work", type: "anchor" },
    { id: "experience", label: "Experience", type: "anchor" },
    { id: "skills", label: "Skills", type: "anchor" },
    { id: "contact", label: "Contact", type: "anchor" },
    { id: "blog", label: "Blog", type: "link", path: "/blog" },
  ];

  const handleNavigation = (item) => {
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

  return (
    <nav className="hidden lg:flex fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-6xl z-50 transition-all duration-300">
      <div className="w-full glass-card bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-2xl shadow-xl flex items-center justify-between px-4 py-2.5">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => handleNavigation({ id: "home", type: "anchor" })}
        >
          <div className="w-9 h-9 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] p-[1px] shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-xl bg-[var(--text-primary)] flex items-center justify-center font-black text-sm tracking-widest text-[var(--bg-primary)]">
              VK
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-extrabold text-sm tracking-tight leading-none">Vivek Kumar</h3>
            <p className="text-[10px] text-[var(--text-muted)] mono-font tracking-wide mt-0.5 font-bold uppercase">Software Eng.</p>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-1 bg-[var(--bg-tertiary)] p-1 rounded-xl border border-[var(--glass-border)]">
          {menuItems.map((item) => {
            const isActive = item.type === "link" ? pathname.startsWith(item.path) : (pathname === "/" && activeSection === item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm scale-105"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={toggleRecruiterMode}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold mono-font tracking-wide uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              isRecruiterMode
                ? "bg-[var(--accent-color)] border-[var(--accent-color)] text-[var(--bg-primary)] shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isRecruiterMode ? "bg-[var(--bg-primary)] animate-pulse" : "bg-[var(--text-muted)]"}`} />
            Recruiter Mode
          </button>

          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white transition-all text-xs font-bold shadow-sm group cursor-pointer"
          >
            <Sparkles size={13} className="text-[var(--accent-color)] group-hover:text-white group-hover:animate-pulse" />
            <span className="group-hover:text-white">Ask AI</span>
          </button>

          <a
            href="https://drive.google.com/drive/folders/17Jgpo84jUw77VX0JZ6AZZ4IGqIZ_u6f4?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all"
            title="Resume"
          >
            <FileText size={14} />
          </a>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--text-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer shadow-sm"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
