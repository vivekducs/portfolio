"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Code2, ExternalLink, GitMerge, CircleDot, Star } from "lucide-react";

const GithubIcon = ({ size = 24, ...props }) => (
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
    if (!started || target === 0) return;
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

function Heatmap({ data, tooltipPrefix = "contributions" }) {
  if (!data || data.length === 0) return <div className="h-[120px] flex items-center justify-center text-sm text-[var(--text-muted)]">Loading data...</div>;

  const getLevel = (count) => {
    if (count === 0 || count === null || count === undefined) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const getStyle = (lvl) => {
    if (lvl === 0) return "bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/60"; 
    if (lvl === 1) return "bg-emerald-500/20 dark:bg-emerald-400/15 border border-emerald-500/10";
    if (lvl === 2) return "bg-emerald-500/45 dark:bg-emerald-400/35 border border-emerald-500/10";
    if (lvl === 3) return "bg-emerald-500/75 dark:bg-emerald-400/65 border border-emerald-500/10";
    return "bg-emerald-500 dark:bg-emerald-400 border border-emerald-400/60 shadow-[0_0_8px_rgba(16,185,129,0.4)] dark:shadow-[0_0_8px_rgba(52,211,153,0.4)]"; 
  };

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="inline-grid grid-flow-col gap-1 select-none min-w-max p-1">
        {data.map((week, wIdx) => (
          <div key={wIdx} className="grid grid-rows-7 gap-1">
            {week.map((count, dIdx) => {
              if (count === null || count === undefined) {
                 return <div key={dIdx} className="w-3.5 h-3.5 bg-transparent" />;
              }
              const lvl = getLevel(count);
              return (
                <div
                  key={dIdx}
                  className={`w-3.5 h-3.5 rounded-[3px] transition-all duration-200 ${getStyle(lvl)} hover:scale-130 hover:z-10 hover:shadow-[0_0_10px_var(--accent-color)] hover:border-[var(--accent-color)] hover:ring-1 hover:ring-[var(--accent-color)]/30 cursor-pointer`}
                  title={count ? `${count} ${tooltipPrefix}` : `No ${tooltipPrefix}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-end text-[10px] text-[var(--text-muted)] mt-3 gap-2 font-semibold mono-font">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <span key={lvl} className={`w-3.5 h-3.5 rounded-[3px] ${getStyle(lvl)}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

export default function Stats() {
  const [ghStats, setGhStats] = useState(null);
  const [lcStats, setLcStats] = useState(null);
  const [lcGrid, setLcGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [gh, lc] = await Promise.allSettled([
          fetch("/api/github-stats").then((r) => r.json()),
          fetch("/api/leetcode-stats").then((r) => r.json()),
        ]);
        if (gh.status === "fulfilled" && !gh.value.error) {
          setGhStats(gh.value);
        }
        if (lc.status === "fulfilled" && !lc.value.error) {
          setLcStats(lc.value);
          if (lc.value.calendar) {
            const grid = formatLeetcodeCalendar(lc.value.calendar);
            setLcGrid(grid);
          }
        }
      } catch {
        // Handle errors silently
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatLeetcodeCalendar = (calendarData) => {
    if (!calendarData || Object.keys(calendarData).length === 0) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const grid = Array.from({ length: 52 }, () => Array(7).fill(0));
    
    Object.entries(calendarData).forEach(([ts, count]) => {
      const date = new Date(parseInt(ts) * 1000);
      date.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(today - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 364) {
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() - diffDays);
        const dayIdx = targetDate.getDay();
        const weekIdx = 51 - Math.floor((diffDays + (7 - today.getDay() - 1)) / 7);
        if (weekIdx >= 0 && weekIdx < 52) {
          grid[weekIdx][dayIdx] = count;
        }
      }
    });
    
    return grid;
  };

  const repos = ghStats?.public_repos || 0;
  const topLangs = ghStats?.topLanguages || [];
  const totalLangCount = topLangs.reduce((a, b) => a + b.count, 0);
  const contributions = ghStats?.contributions || [];
  const githubDetails = ghStats?.githubDetails;

  const rating = lcStats?.contestRating || 0;
  const totalSolved = lcStats?.solvedProblem || 0;
  const easySolved = lcStats?.easySolved || 0;
  const mediumSolved = lcStats?.mediumSolved || 0;
  const hardSolved = lcStats?.hardSolved || 0;
  const topPercent = lcStats?.contestTopPercentage || 0;

  return (
    <section id="stats" className="relative py-16 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="w-full max-w-6xl z-10 px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest mb-2 flex items-center gap-2">
              <Activity size={16} /> Activity & Statistics
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Developer Profile
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
          {/* GitHub Panel */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow duration-300">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <GithubIcon size={20} /> GitHub Activity
                </h3>
                <a
                  href="https://github.com/AVPXM8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-medium"
                >
                  @AVPXM8 <ExternalLink size={14} />
                </a>
              </div>

              <div className="mb-6">
                <Heatmap data={contributions} tooltipPrefix="contributions" />
              </div>
              
              {githubDetails && (
                <div className="mt-6 mb-6 pb-6 border-b border-[var(--border-color)]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-3 text-center transition-all hover:-translate-y-1 hover:shadow-sm hover:border-[var(--text-primary)]">
                      <Star size={16} className="text-[var(--text-primary)] mx-auto mb-1" />
                      <p className="text-xs text-[var(--text-muted)] font-medium">Stars</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]"><AnimatedCounter target={githubDetails.totalStars} /></p>
                    </div>
                    <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-3 text-center transition-all hover:-translate-y-1 hover:shadow-sm hover:border-[var(--text-primary)]">
                      <GitMerge size={16} className="text-[var(--text-primary)] mx-auto mb-1" />
                      <p className="text-xs text-[var(--text-muted)] font-medium">PRs</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]"><AnimatedCounter target={githubDetails.totalPRs} /></p>
                    </div>
                    <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-3 text-center transition-all hover:-translate-y-1 hover:shadow-sm hover:border-[var(--text-primary)]">
                      <CircleDot size={16} className="text-[var(--text-primary)] mx-auto mb-1" />
                      <p className="text-xs text-[var(--text-muted)] font-medium">Issues</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]"><AnimatedCounter target={githubDetails.totalIssues} /></p>
                    </div>
                    <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-3 text-center transition-all hover:-translate-y-1 hover:shadow-sm hover:border-[var(--text-primary)]">
                      <Activity size={16} className="text-[var(--text-primary)] mx-auto mb-1" />
                      <p className="text-xs text-[var(--text-muted)] font-medium">Commits</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]"><AnimatedCounter target={githubDetails.totalContributions} /></p>
                    </div>
                  </div>
                </div>
              )}

              {topLangs.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center justify-between">
                    <span>Top Languages</span>
                    <span className="text-[var(--text-secondary)] normal-case text-xs font-medium">{githubDetails?.totalRepos || repos} Total Repos</span>
                  </h4>
                  <div className="space-y-4">
                    {topLangs.map((l) => (
                      <div key={l.lang}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-[var(--text-primary)]" style={{ color: LANG_COLORS[l.lang] || "var(--text-primary)" }}>{l.lang}</span>
                          <span className="text-[var(--text-muted)] text-xs font-medium">{Math.round((l.count / totalLangCount) * 100)}%</span>
                        </div>
                        <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden">
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
              )}
            </div>
          </div>

          {/* LeetCode Panel */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow duration-300">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Code2 size={20} className="text-[var(--text-primary)]" /> LeetCode Progress
                </h3>
                <a
                  href="https://leetcode.com/u/avpxm8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-medium"
                >
                  avpxm8 <ExternalLink size={14} />
                </a>
              </div>

              <div className="mb-6">
                <Heatmap data={lcGrid} tooltipPrefix="submissions" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-color)]">
                  <p className="text-xs text-[var(--text-muted)] font-medium mb-1">Problems Solved</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]"><AnimatedCounter target={totalSolved} /></p>
                  <div className="flex items-center gap-2 mt-2 text-xs font-medium">
                    <span className="text-emerald-500">E:{easySolved}</span>
                    <span className="text-amber-500">M:{mediumSolved}</span>
                    <span className="text-rose-500">H:{hardSolved}</span>
                  </div>
                </div>
                
                <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-color)] flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-medium mb-1">Contest Rating</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)]"><AnimatedCounter target={rating} /></p>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-[var(--text-secondary)] text-xs font-medium">Top <AnimatedCounter target={topPercent} isFloat />% Global</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-color)]">
                  <p className="text-xs text-[var(--text-muted)] font-medium mb-1">Global Rank</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]"><AnimatedCounter target={lcStats?.ranking || 0} /></p>
                </div>

                <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-color)]">
                  <p className="text-xs text-[var(--text-muted)] font-medium mb-1">Reputation</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]"><AnimatedCounter target={lcStats?.reputation || 0} /></p>
                </div>
              </div>

              {(lcStats?.badges && lcStats.badges.length > 0) && (
                <div className="mt-6 pt-6 border-t border-[var(--border-color)] relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">Acquired Badges</p>
                    <span className="text-xs font-semibold bg-[var(--bg-tertiary)] text-[var(--text-primary)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
                      {lcStats.badges.length} Badges
                    </span>
                  </div>
                  
                  {/* Badge Scroll Container */}
                  <div className="w-full overflow-visible pb-4">
                    <div className="flex flex-wrap gap-4 min-w-min">
                      {lcStats.badges.map(b => (
                        <div key={b.id} className="relative group cursor-pointer bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl p-2.5 flex items-center justify-center transition-all hover:border-[var(--text-primary)] hover:shadow-sm shrink-0 z-10 hover:z-50">
                          <img 
                            src={b.icon.startsWith('/') ? `https://leetcode.com${b.icon}` : b.icon} 
                            alt={b.displayName} 
                            className="w-11 h-11 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-[2.2]"
                          />
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-xs whitespace-nowrap px-3 py-2 rounded shadow-2xl pointer-events-none z-50">
                            {b.displayName}
                            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[var(--border-color)]"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
