"use client";

import { useState, useRef, useEffect } from "react";
import { Trophy, Star, Code2, Users, TrendingUp, Zap, Award } from "lucide-react";
import styles from "./AchievementWall.module.css";

const Github = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ACHIEVEMENTS = [
  {
    id: "dsa",
    icon: Code2,
    value: 500,
    suffix: "+",
    label: "DSA Problems Solved",
    sub: "LeetCode, GFG, HackerRank",
    color: "from-brand-primary to-brand-secondary",
    glowColor: "rgba(124,58,237,0.25)",
    delay: 0,
  },
  {
    id: "users",
    icon: Users,
    value: 3000,
    suffix: "+",
    label: "Active Platform Users",
    sub: "Mathem Solvex",
    color: "from-brand-secondary to-pink-500",
    glowColor: "rgba(217,70,239,0.25)",
    delay: 100,
  },
  {
    id: "impressions",
    icon: TrendingUp,
    value: 330,
    suffix: "K+",
    label: "Search Impressions",
    sub: "Google Search Console",
    color: "from-brand-primary to-yellow-500",
    glowColor: "rgba(249,115,22,0.25)",
    delay: 200,
  },
  {
    id: "repos",
    icon: Github,
    value: 30,
    suffix: "+",
    label: "GitHub Repositories",
    sub: "@AVPXM8",
    color: "from-sky-500 to-blue-600",
    glowColor: "rgba(14,165,233,0.25)",
    delay: 300,
  },
  {
    id: "leetcode",
    icon: Trophy,
    value: 16.41,
    suffix: "%",
    label: "Top LeetCode Ranking",
    sub: "Rating: 1664",
    color: "from-yellow-500 to-amber-400",
    glowColor: "rgba(234,179,8,0.25)",
    delay: 0,
  },
  {
    id: "ai",
    icon: Zap,
    value: 4,
    suffix: "+",
    label: "AI Products Built",
    sub: "Gemini · Pinecone · TensorFlow",
    color: "from-brand-primary to-brand-secondary",
    glowColor: "rgba(124,58,237,0.25)",
    delay: 100,
  },
  {
    id: "fullstack",
    icon: Star,
    value: 2,
    suffix: "+",
    label: "Years Engineering",
    sub: "Full Stack + AI",
    color: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16,185,129,0.25)",
    delay: 200,
  },
  {
    id: "deploy",
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Production Deployments",
    sub: "Vercel · Docker · CI/CD",
    color: "from-brand-primary to-brand-secondary",
    glowColor: "rgba(249,115,22,0.25)",
    delay: 300,
  },
];

function CountUp({ target, suffix, isFloat, start }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      setCurrent(isFloat ? value.toFixed(2) : Math.round(value));
      if (step >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [start, target, isFloat]);

  return (
    <span>
      {current}{suffix}
    </span>
  );
}

function AchievementCard({ ach, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const Icon = ach.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isFloat = String(ach.value).includes(".");

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group ${styles.el_1}`}
      style={{
        transitionDelay: `${ach.delay}ms`,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        opacity: inView ? 1 : 0,
        boxShadow: hovered ? `0 0 30px ${ach.glowColor}` : undefined,
        borderColor: hovered ? `rgba(124,58,237,0.3)` : undefined,
      }}
    >
      {/* Background gradient glow */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ach.color}`}
        style={{ transform: "translate(30%, -30%)" }}
      />

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ach.color} p-[1.5px] shadow-md`}>
        <div className={styles.el_1}>
          <Icon size={18} className="text-brand-primary" />
        </div>
      </div>

      {/* Value */}
      <div>
        <div className={`text-2xl font-black mono-font gradient-text tracking-tight leading-none`}>
          {inView ? (
            <CountUp
              target={ach.value}
              suffix={ach.suffix}
              isFloat={isFloat}
              start={inView}
            />
          ) : (
            <span>0{ach.suffix}</span>
          )}
        </div>
        <p className={styles.el_2}>{ach.label}</p>
        <p className="text-[10px] text-[var(--text-muted)] mono-font mt-0.5">{ach.sub}</p>
      </div>
    </div>
  );
}

export default function AchievementWall() {
  return (
    <section className={styles.el_3}>
      {/* Glow */}
      <div className="absolute top-20 left-[30%] w-80 h-80 bg-brand-primary opacity-[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className={styles.el_4}>
        <div className={styles.el_5}>
          <p className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Trophy size={13} /> MILESTONES
          </p>
          <h2 className={styles.el_6}>
            Achievement Wall
          </h2>
          <p className={styles.el_7}>
            Real metrics. Real impact. Built with code, deployed in production.
          </p>
        </div>

        <div className={styles.el_9}>
          {ACHIEVEMENTS.map((ach, i) => (
            <AchievementCard key={ach.id} ach={ach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
