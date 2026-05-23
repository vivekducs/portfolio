"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon, Sparkles, Home, User, Code2, Briefcase, Award, History, BarChart3, Mail } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import styles from "./Header.module.css";

export default function Header({ activeSection, onOpenAssistant }) {
  const { theme, toggleTheme } = useTheme();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "ai", label: "AI Bot", icon: Sparkles, isAction: true },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.el_1}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll("home")}>
            <div className={styles.el_2}>
              <div className="w-full h-full rounded-[6.5px] bg-[var(--bg-secondary)] flex items-center justify-center font-bold text-xs">
                <span className={styles.el_3}>VK</span>
              </div>
            </div>
            <div>
              <h3 className={styles.el_4}>Vivek Kumar</h3>
              <p className={styles.el_5}>SDE Intern</p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={styles.el_6}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </header>

      <nav className={styles.mobileNav}>
        <div className={styles.el_7}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.isAction ? false : activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => item.isAction ? onOpenAssistant() : handleScroll(item.id)}
                className={`${styles.navBtn} ${item.isAction ? styles.navBtnAction : isActive ? styles.navBtnActive : styles.navBtnInactive}`}
              >
                <div className={`${styles.iconWrapper} ${item.isAction ? styles.iconWrapperAction : styles.iconWrapperStandard}`}>
                  <Icon size={item.isAction ? 16 : 20} className={item.isAction ? styles.iconAnimate : ""} />
                  {item.isAction && <span className={styles.el_8} />}
                </div>
                <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : styles.navLabelInactive}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
