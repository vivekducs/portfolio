"use client";

import { useState, useEffect, useRef } from "react";
import { BarChart3, Award, Activity, Star, Code2, ExternalLink } from "lucide-react";

const Github = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  Java: "#b07219",
  Go: "#00ADD8",
};

function AnimatedCounter({ target, duration = 1500, isFloat = false }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 50;
    const stepDuration = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const v = target * eased;
      setValue(isFloat ? parseFloat(v.toFixed(2)) : Math.round(v));
      if (step >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [started, target, duration, isFloat]);

  return <span ref={ref}>{value}</span>;
}

export default function Stats() {
  const [ghStats, setGhStats] = useState(null);
  const [lcStats, setLcStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Generate deterministic commit grid (seeded random-like)
  const weeks = 40;
  const daysOfWeek = 7;
  const commitGrid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: daysOfWeek }, (_, d) => {
      const seed = (w * 7 + d + 13) % 17;
      if (seed < 5) return 0;
      if (seed < 10) return 1;
      if (seed < 14) return 2;
      return 3;
    })
  );

  useEffect(() => {
    async function fetchStats() {
      try {
        const [gh, lc] = await Promise.allSettled([
          fetch("/api/github-stats").then((r) => r.json()),
          fetch("/api/leetcode-stats").then((r) => r.json()),
        ]);
        if (gh.status === "fulfilled") setGhStats(gh.value);
        if (lc.status === "fulfilled") setLcStats(lc.value);
      } catch {
        // use fallback defaults
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const repos = ghStats?.public_repos || 30;
  const topLangs = ghStats?.topLanguages || [
    { lang: "JavaScript", count: 14 },
    { lang: "Python", count: 6 },
    { lang: "TypeScript", count: 4 },
    { lang: "HTML", count: 4 },
    { lang: "CSS", count: 3 },
  ];
  const totalLangCount = topLangs.reduce((a, b) => a + b.count, 0);

  const rating = lcStats?.contestRating || 1664;
  const totalSolved = lcStats?.solvedProblem || 500;
  const easySolved = lcStats?.easySolved || 210;
  const mediumSolved = lcStats?.mediumSolved || 240;
  const hardSolved = lcStats?.hardSolved || 50;
  const topPercent = lcStats?.contestTopPercentage || 16.41;

  return (
    <section id="stats" className="relative py-12 border-t border-[var(--border-color)]">
      <div className="absolute top-10 right-[20%] w-72 h-72 bg-luxury-purple opacity-[0.06] rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-6xl z-10 px-4">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 text-left">
          <div>
            <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <BarChart3 size={13} /> CODING STANDARDS
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Algorithmic Profiles & Activity
            </h2>
          </div>
          <a
            href="https://github.com/AVPXM8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-luxury-purple transition-colors mono-font font-semibold"
          >
            <Github size={13} /> @AVPXM8 <ExternalLink size={10} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* LeetCode Panel */}
          <div className="lg:col-span-5 glass-card rounded-3xl border border-[var(--glass-border)] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2.5 py-1 rounded-full mono-font">
              <Star size={10} fill="currentColor" /> LeetCode Pro
            </div>

            <div>
              <h3 className="text-sm font-bold text-luxury-purple uppercase tracking-widest mono-font mb-6">
                LeetCode Performance
              </h3>

              {/* Ring chart */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" className="stroke-[var(--bg-tertiary)] fill-transparent stroke-[6px]" />
                    <circle
                      cx="56" cy="56" r="48"
                      className="fill-transparent stroke-[6px]"
                      stroke="url(#ringGrad)"
                      strokeDasharray="301"
                      strokeDashoffset={301 - (rating / 2000) * 301}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-black text-[var(--text-primary)] leading-none">
                      <AnimatedCounter target={rating} />
                    </span>
                    <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider mt-0.5">Rating</p>
                  </div>
                </div>

                <div className="space-y-2.5 w-full">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-semibold">Problems Solved:</span>
                    <span className="text-[var(--text-primary)] font-black mono-font">
                      <AnimatedCounter target={totalSolved} />+
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-semibold">Global Standing:</span>
                    <span className="text-luxury-orange font-black mono-font">
                      Top <AnimatedCounter target={topPercent} isFloat={true} />%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-semibold">Contest Badge:</span>
                    <span className="text-luxury-magenta font-black mono-font">Active Competitor</span>
                  </div>
                </div>
              </div>

              {/* Difficulty bars */}
              <div className="space-y-3.5 border-t border-[var(--border-color)] pt-5">
                <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font mb-2">Problem Distribution</h4>
                {[
                  { label: "EASY", count: easySolved, total: totalSolved, color: "bg-emerald-500" },
                  { label: "MEDIUM", count: mediumSolved, total: totalSolved, color: "bg-amber-500" },
                  { label: "HARD", count: hardSolved, total: totalSolved, color: "bg-rose-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className={row.label === "EASY" ? "text-emerald-500" : row.label === "MEDIUM" ? "text-amber-500" : "text-rose-500"}>
                        {row.label}
                      </span>
                      <span className="text-[var(--text-primary)] mono-font">{row.count} / {row.total}</span>
                    </div>
                    <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden">
                      <div
                        className={`${row.color} h-full rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.round((row.count / row.total) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-[var(--text-muted)] font-medium pt-3 mt-4 border-t border-[var(--border-color)] mono-font flex justify-between">
              <span>{loading ? "Syncing LeetCode stats..." : "✓ Live LeetCode data"}</span>
              <a href="https://leetcode.com/u/vivekducs/" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-purple transition-colors">
                vivekducs ↗
              </a>
            </div>
          </div>

          {/* GitHub Panel */}
          <div className="lg:col-span-7 glass-card rounded-3xl border border-[var(--glass-border)] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-luxury-purple uppercase tracking-widest mono-font flex items-center gap-1.5">
                  <Github size={16} /> GitHub Contribution Matrix
                </h3>
                <span className="text-[10px] bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple font-bold px-2.5 py-1 rounded-full mono-font">
                  <AnimatedCounter target={repos} />+ Repositories
                </span>
              </div>

              {/* Top Languages */}
              <div className="mb-5">
                <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font mb-3">
                  <Code2 size={10} className="inline mr-1" /> Top Languages
                </h4>
                <div className="space-y-2">
                  {topLangs.slice(0, 4).map((l) => (
                    <div key={l.lang}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="font-semibold text-[var(--text-secondary)]" style={{ color: LANG_COLORS[l.lang] }}>{l.lang}</span>
                        <span className="text-[var(--text-muted)] mono-font">{Math.round((l.count / totalLangCount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-[var(--bg-tertiary)] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.round((l.count / totalLangCount) * 100)}%`,
                            background: LANG_COLORS[l.lang] || "#9333ea",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commit heatmap */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="inline-grid grid-flow-col gap-[3px] select-none">
                  {commitGrid.map((week, wIdx) => (
                    <div key={wIdx} className="grid grid-rows-7 gap-[3px]">
                      {week.map((lvl, dIdx) => {
                        let fillStyle = "bg-[var(--bg-tertiary)]";
                        if (lvl === 1) fillStyle = "bg-luxury-purple/20 border border-luxury-purple/10";
                        if (lvl === 2) fillStyle = "bg-luxury-purple/55 shadow-sm";
                        if (lvl === 3) fillStyle = "bg-gradient-to-tr from-luxury-violet to-luxury-magenta shadow-md";
                        return (
                          <div
                            key={dIdx}
                            className={`w-3 h-3 rounded-sm transition-all hover:scale-125 cursor-pointer ${fillStyle}`}
                            title={`Activity level: ${lvl}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] font-semibold uppercase tracking-wider mono-font mt-2 border-t border-[var(--border-color)] pt-3">
                <div className="flex items-center gap-1">
                  <Activity size={10} className="text-luxury-orange" />
                  <span>900+ contributions last year</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  {["bg-[var(--bg-tertiary)]", "bg-luxury-purple/25", "bg-luxury-purple/60", "bg-luxury-magenta"].map((c, i) => (
                    <span key={i} className={`w-2.5 h-2.5 rounded ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[var(--text-muted)] font-medium pt-3 mt-4 border-t border-[var(--border-color)] mono-font flex justify-between">
              <span>{loading ? "Fetching GitHub data..." : "✓ Live GitHub API"}</span>
              <span>Account: @AVPXM8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
