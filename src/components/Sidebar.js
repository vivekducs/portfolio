"use client";

import { Home, User, Code2, Briefcase, Award, History, BarChart3, Mail, FileText, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import styles from "./Sidebar.module.css";

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
    <aside className={styles.el_1}>
      {/* Top Section - Brand Logo */}
      <div className={styles.el_2}>
        <div className={styles.el_3}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll("home")}>
            <div className={styles.el_4}>
              <div className="w-full h-full rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center font-bold text-lg tracking-wider">
                <span className={styles.el_5}>VK</span>
              </div>
            </div>
            <div>
              <h3 className={styles.el_6}>Vivek Kumar</h3>
              <p className={styles.el_7}>AI Engineer</p>
            </div>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className={styles.el_8}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className={styles.el_9}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-brand-primary/10 to-brand-secondary/5 border-l-2 border-brand-primary text-brand-primary"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                }`}
              >
                <Icon size={16} className={isActive ? "text-brand-primary" : ""} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - Controls and Social Profiles */}
      <div className={styles.el_10}>
        {/* Floating VK Assistant Control */}
        <div 
          onClick={onOpenAssistant}
          className={styles.el_11}
        >
          <div className={styles.el_12}>
            <span className="text-[10px] font-bold text-brand-primary mono-font tracking-widest flex items-center gap-1.5">
              <Sparkles size={10} className={styles.el_13} /> VK ASSISTANT
            </span>
            <span className={styles.el_14}></span>
          </div>
          <div className={styles.el_15}>
            <div className={styles.el_16}>
              <span className={styles.el_17}></span>
              <span className={styles.el_18}></span>
              <span className={styles.el_19}></span>
              <span className={styles.el_20}></span>
              <span className={styles.el_21}></span>
            </div>
            <span className={styles.el_22}>
              Ask AI about VK
            </span>
          </div>
        </div>

        {/* Resume Download CTA */}
        <a
          href="https://github.com/AVPXM8"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.el_23}
        >
          <FileText size={15} className={styles.el_19} />
          <span>View GitHub CV</span>
        </a>

        {/* Social Icons row */}
        <div className={styles.el_24}>
          <a
            href="https://github.com/AVPXM8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.el_22}
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/vivek33pal/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.el_23}
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:vivekducs@gmail.com"
            className={styles.el_24}
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Footer legal text */}
        <div className={styles.el_25}>
          © 2026 Vivek Kumar. All rights reserved.
        </div>
      </div>
    </aside>
  );
}
