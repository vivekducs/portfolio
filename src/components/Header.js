"use client";

import { Sun, Moon, Sparkles, Home, Code2, BookOpen, Briefcase, Mail } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ activeSection, onOpenAssistant, isRecruiterMode, toggleRecruiterMode }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (item) => {
    if (item.type === "link") {
      router.push(item.path);
    } else if (pathname !== "/") {
      router.push(`/#${item.id}`);
    } else {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Native-style Top Action Bar */}
      <header className="lg:hidden w-full sticky top-0 bg-[var(--bg-secondary)]/95 backdrop-blur-md border-b border-[var(--border-color)] px-5 py-3 z-40 flex items-center justify-between shadow-sm">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation({ id: "home" })}>
          <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] p-[1px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full rounded-lg bg-[var(--text-primary)] flex items-center justify-center font-bold text-xs text-[var(--bg-primary)]">
              <span>VK</span>
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-xs leading-none text-[var(--text-primary)]">Vivek Kumar</h3>
            <p className="text-[9px] text-[var(--text-muted)] font-bold mono-font">AI Engineer</p>
          </div>
        </div>

        {/* Toggles on Right */}
        <div className="flex items-center gap-2.5">
          {/* Recruiter Toggle */}
          <button
            onClick={toggleRecruiterMode}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold mono-font tracking-wide transition-all cursor-pointer ${
              isRecruiterMode
                ? "border-[var(--accent-color)] bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                : "border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            }`}
            title="Toggle Recruiter Evaluation Mode"
          >
            {isRecruiterMode ? "Recruiter: ON" : "Recruiter: OFF"}
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] hover:border-[var(--text-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
          </button>
        </div>
      </header>

      {/* Native-style Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-[var(--bg-secondary)]/95 backdrop-blur-md border-t border-[var(--border-color)] px-2 py-2 z-40 flex items-center justify-around lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_16px_rgba(0,0,0,0.5)]">
        {/* Home */}
        <button
          onClick={() => handleNavigation({ id: "home" })}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeSection === "home" && pathname === "/" ? "text-[var(--accent-color)] scale-105" : "text-[var(--text-muted)]"
          }`}
        >
          <Home size={16} className={activeSection === "home" && pathname === "/" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[9px] font-bold tracking-tight">Home</span>
        </button>

        {/* Skills */}
        <button
          onClick={() => handleNavigation({ id: "skills" })}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeSection === "skills" && pathname === "/" ? "text-[var(--accent-color)] scale-105" : "text-[var(--text-muted)]"
          }`}
        >
          <Code2 size={16} className={activeSection === "skills" && pathname === "/" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[9px] font-bold tracking-tight">Skills</span>
        </button>

        {/* Blog */}
        <button
          onClick={() => handleNavigation({ type: "link", path: "/blog" })}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
            pathname.startsWith("/blog") ? "text-[var(--accent-color)] scale-105" : "text-[var(--text-muted)]"
          }`}
        >
          <BookOpen size={16} className={pathname.startsWith("/blog") ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[9px] font-bold tracking-tight">Blog</span>
        </button>

        {/* AI Bot Center Floating button */}
        <button
          onClick={onOpenAssistant}
          className="relative -mt-6 w-12 h-12 rounded-full bg-[var(--accent-color)] border-4 border-[var(--bg-secondary)] text-[var(--bg-primary)] shadow-lg flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 group z-50"
        >
          <Sparkles size={18} className="animate-pulse text-[var(--bg-primary)]" />
          <span className="absolute inset-0 rounded-full bg-[var(--accent-color)] opacity-20 pointer-events-none" />
        </button>

        {/* Projects */}
        <button
          onClick={() => handleNavigation({ id: "projects" })}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeSection === "projects" && pathname === "/" ? "text-[var(--accent-color)] scale-105" : "text-[var(--text-muted)]"
          }`}
        >
          <Briefcase size={16} className={activeSection === "projects" && pathname === "/" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[9px] font-bold tracking-tight">Work</span>
        </button>

        {/* Contact */}
        <button
          onClick={() => handleNavigation({ id: "contact" })}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
            activeSection === "contact" && pathname === "/" ? "text-[var(--accent-color)] scale-105" : "text-[var(--text-muted)]"
          }`}
        >
          <Mail size={16} className={activeSection === "contact" && pathname === "/" ? "stroke-[2.5px]" : "stroke-[2px]"} />
          <span className="text-[9px] font-bold tracking-tight">Contact</span>
        </button>
      </nav>
    </>
  );
}
