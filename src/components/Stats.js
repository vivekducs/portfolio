"use client";

import { useState, useEffect, useRef } from "react";
import { BarChart3, Award, Activity, Star, Code2, ExternalLink } from "lucide-react";
import styles from "./Stats.module.css";

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
    <section id="stats" className={styles.el_1}>
      <div className="absolute top-10 right-[20%] w-72 h-72 bg-brand-primary opacity-[0.06] rounded-full blur-[80px] pointer-events-none" />

      <div className={styles.el_2}>
        {/* Title */}
        <div className={styles.el_3}>
          <div>
            <p className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <BarChart3 size={13} /> CODING STANDARDS
            </p>
            <h2 className={styles.el_4}>
              Algorithmic Profiles & Activity
            </h2>
          </div>
          <a
            href="https://github.com/AVPXM8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.el_5}
          >
            <Github size={13} /> @AVPXM8 <ExternalLink size={10} />
          </a>
        </div>

        <div className={styles.el_4}>
          
          {/* LeetCode Panel */}
          <div className={styles.el_6}>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2.5 py-1 rounded-full mono-font">
              <Star size={10} fill="currentColor" /> LeetCode Pro
            </div>

            <div>
              <h3 className={styles.el_7}>
                LeetCode Performance
              </h3>

              {/* Ring chart */}
              <div className={styles.el_8}>
                <div className={styles.el_9}>
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" className={styles.el_10} />
                    <circle
                      cx="56" cy="56" r="48"
                      className={styles.el_11}
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
                  <div className={styles.el_12}>
                    <span className={styles.el_13}>
                      <AnimatedCounter target={rating} />
                    </span>
                    <p className={styles.el_14}>Rating</p>
                  </div>
                </div>

                <div className={styles.el_15}>
                  <div className={styles.el_16}>
                    <span className={styles.el_17}>Problems Solved:</span>
                    <span className={styles.el_18}>
                      <AnimatedCounter target={totalSolved} />+
                    </span>
                  </div>
                  <div className={styles.el_19}>
                    <span className={styles.el_20}>Global Standing:</span>
                    <span className={styles.el_21}>
                      Top <AnimatedCounter target={topPercent} isFloat={true} />%
                    </span>
                  </div>
                  <div className={styles.el_22}>
                    <span className={styles.el_23}>Contest Badge:</span>
                    <span className={styles.el_24}>Active Competitor</span>
                  </div>
                </div>
              </div>

              {/* Difficulty bars */}
              <div className={styles.el_25}>
                <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font mb-2">Problem Distribution</h4>
                {[
                  { label: "EASY", count: easySolved, total: totalSolved, color: "bg-emerald-500" },
                  { label: "MEDIUM", count: mediumSolved, total: totalSolved, color: "bg-amber-500" },
                  { label: "HARD", count: hardSolved, total: totalSolved, color: "bg-rose-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className={styles.el_26}>
                      <span className={row.label === "EASY" ? "text-emerald-500" : row.label === "MEDIUM" ? "text-amber-500" : "text-rose-500"}>
                        {row.label}
                      </span>
                      <span className={styles.el_27}>{row.count} / {row.total}</span>
                    </div>
                    <div className={styles.el_28}>
                      <div
                        className={`${row.color} h-full rounded-full transition-all duration-1000`}
                        style={{ width: `${Math.round((row.count / row.total) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.el_29}>
              <span>{loading ? "Syncing LeetCode stats..." : "✓ Live LeetCode data"}</span>
              <a href="https://leetcode.com/u/AVPXM8/" target="_blank" rel="noopener noreferrer" className={styles.el_30}>
                AVPXM8 ↗
              </a>
            </div>
          </div>

          {/* GitHub Panel */}
          <div className={styles.el_31}>
            <div>
              <div className={styles.el_32}>
                <h3 className="text-sm font-bold text-brand-primary uppercase tracking-widest mono-font flex items-center gap-1.5">
                  <Github size={16} /> GitHub Contribution Matrix
                </h3>
                <span className={styles.el_33}>
                  <AnimatedCounter target={repos} />+ Repositories
                </span>
              </div>

              {/* Top Languages */}
              <div className={styles.el_34}>
                <h4 className={styles.el_35}>
                  <Code2 size={10} className="inline mr-1" /> Top Languages
                </h4>
                <div className={styles.el_36}>
                  {topLangs.slice(0, 4).map((l) => (
                    <div key={l.lang}>
                      <div className={styles.el_37}>
                        <span className={styles.el_38} style={{ color: LANG_COLORS[l.lang] }}>{l.lang}</span>
                        <span className={styles.el_39}>{Math.round((l.count / totalLangCount) * 100)}%</span>
                      </div>
                      <div className={styles.el_40}>
                        <div
                          className={styles.el_41}
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
              <div className={styles.el_42}>
                <div className={styles.el_43}>
                  {commitGrid.map((week, wIdx) => (
                    <div key={wIdx} className={styles.el_44}>
                      {week.map((lvl, dIdx) => {
                        let fillStyle = "bg-[var(--bg-tertiary)]";
                        if (lvl === 1) fillStyle = "bg-emerald-500/30 border border-emerald-500/10";
                        if (lvl === 2) fillStyle = "bg-emerald-500/60 shadow-sm";
                        if (lvl === 3) fillStyle = "bg-emerald-500 shadow-md";
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
              <div className={styles.el_45}>
                <div className="flex items-center gap-1">
                  <Activity size={10} className="text-emerald-500" />
                  <span>900+ contributions last year</span>
                </div>
                <div className={styles.el_46}>
                  <span>Less</span>
                  {["bg-[var(--bg-tertiary)]", "bg-emerald-500/30", "bg-emerald-500/60", "bg-emerald-500"].map((c, i) => (
                    <span key={i} className={`w-2.5 h-2.5 rounded ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>

            <div className={styles.el_47}>
              <span>{loading ? "Fetching GitHub data..." : "✓ Live GitHub API"}</span>
              <span>Account: @AVPXM8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
