"use client";

import { useState, useRef, useEffect } from "react";
import { Trophy, Star, Code2, Users, TrendingUp, Zap, Award } from "lucide-react";
import { GithubIcon as Github } from "./icons";

const ACHIEVEMENTS = [
  {
    id: "dsa",
    icon: Code2,
    value: 500,
    suffix: "+",
    label: "DSA Problems Solved",
    sub: "LeetCode, GFG, HackerRank",
    color: "from-violet-600 to-violet-500",
    glowColor: "rgba(34,197,94,0.15)",
    delay: 0,
  },
  {
    id: "users",
    icon: Users,
    value: 3000,
    suffix: "+",
    label: "Active Platform Users",
    sub: "Mathem Solvex",
    color: "from-violet-600 to-violet-500",
    glowColor: "rgba(16,185,129,0.15)",
    delay: 100,
  },
  {
    id: "impressions",
    icon: TrendingUp,
    value: 330,
    suffix: "K+",
    label: "Search Impressions",
    sub: "Google Search Console",
    color: "from-violet-600 to-violet-500",
    glowColor: "rgba(34,197,94,0.15)",
    delay: 200,
  },
  {
    id: "repos",
    icon: Github,
    value: 30,
    suffix: "+",
    label: "GitHub Repositories",
    sub: "@vivekducs",
    color: "from-violet-600 to-violet-600",
    glowColor: "rgba(16,185,129,0.15)",
    delay: 300,
  },
  {
    id: "leetcode",
    icon: Trophy,
    value: 16.41,
    suffix: "%",
    label: "Top LeetCode Ranking",
    sub: "Rating: 1664",
    color: "from-violet-600 to-yellow-500",
    glowColor: "rgba(217,119,6,0.15)",
    delay: 0,
  },
  {
    id: "ai",
    icon: Zap,
    value: 4,
    suffix: "+",
    label: "AI Products Built",
    sub: "Gemini · Pinecone · TensorFlow",
    color: "from-violet-600 to-violet-500",
    glowColor: "rgba(34,197,94,0.15)",
    delay: 100,
  },
  {
    id: "fullstack",
    icon: Star,
    value: 2,
    suffix: "+",
    label: "Years Engineering",
    sub: "Full Stack + AI",
    color: "from-violet-600 to-violet-500",
    glowColor: "rgba(16,185,129,0.15)",
    delay: 200,
  },
  {
    id: "deploy",
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Production Deployments",
    sub: "Vercel · Docker · CI/CD",
    color: "from-violet-600 to-violet-500",
    glowColor: "rgba(34,197,94,0.15)",
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
      className="relative glass-card rounded-2xl border border-[var(--glass-border)] p-5 flex flex-col items-start gap-3 cursor-default overflow-hidden transition-all duration-300 group"
      style={{
        transitionDelay: `${ach.delay}ms`,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        opacity: inView ? 1 : 0,
        boxShadow: hovered ? `0 0 30px ${ach.glowColor}` : undefined,
        borderColor: hovered ? `var(--accent-color)` : undefined,
      }}
    >
      {/* Background gradient glow */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ach.color}`}
        style={{ transform: "translate(30%, -30%)" }}
      />

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ach.color} p-[1.5px] shadow-md`}>
        <div className="w-full h-full rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
          <Icon size={18} className="text-[var(--accent-color)]" />
        </div>
      </div>

      {/* Value */}
      <div>
        <div className={`text-2xl font-black mono-font text-[var(--text-primary)] tracking-tight leading-none`}>
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
        <p className="text-sm font-bold text-[var(--text-primary)] mt-1 leading-tight">{ach.label}</p>
        <p className="text-[10px] text-[var(--text-muted)] mono-font mt-0.5">{ach.sub}</p>
      </div>
    </div>
  );
}

export default function AchievementWall() {
  return (
    <section className="relative py-12 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      {/* Glow - Professional violet */}
      <div className="absolute top-20 left-[30%] w-80 h-80 bg-violet-500 opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl z-10 px-4">
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-[var(--accent-color)] mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Trophy size={13} /> MILESTONES
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Achievement Wall
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Real metrics. Real impact. Built with code, deployed in production.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((ach, i) => (
            <AchievementCard key={ach.id} ach={ach} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
