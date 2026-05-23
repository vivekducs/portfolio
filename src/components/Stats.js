"use client";

import { BarChart3, Award, CheckCircle, Activity, Star } from "lucide-react";

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


export default function Stats() {
  // Generate mock GitHub commitment data (53 columns x 7 rows)
  const daysOfWeek = 7;
  const weeks = 40; // slightly smaller grid for desktop layout fitting
  const commitGrid = Array.from({ length: weeks }, () =>
    Array.from({ length: daysOfWeek }, () => {
      const rand = Math.random();
      if (rand < 0.3) return 0; // empty
      if (rand < 0.6) return 1; // light purple
      if (rand < 0.8) return 2; // medium purple
      return 3; // deep magenta/orange
    })
  );

  return (
    <section id="stats" className="relative py-12 border-t border-[var(--border-color)]">
      {/* Light spots */}
      <div className="absolute top-10 right-[20%] w-72 h-72 bg-luxury-purple opacity-[0.06] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-luxury-purple mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <BarChart3 size={13} /> CODING STANDARDS
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Algorithmic Profiles & Activity
          </h2>
        </div>

        {/* Desktop Split Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column: LeetCode Ratings (40%) */}
          <div className="lg:col-span-5 glass-card rounded-3xl border border-[var(--glass-border)] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            
            {/* Corner LeetCode label */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[10px] font-bold px-2.5 py-1 rounded-full mono-font">
              <Star size={10} fill="currentColor" /> LeetCode Pro
            </div>

            <div>
              <h3 className="text-sm font-bold text-luxury-purple uppercase tracking-widest mono-font mb-6 flex items-center gap-1.5">
                LeetCode Performance
              </h3>

              {/* Contest Circle & Progress */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                
                {/* Circular ring chart */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* SVG background circle & glow track */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-[var(--bg-tertiary)] fill-transparent stroke-[6px]"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-luxury-purple fill-transparent stroke-[6px] stroke-linecap-round"
                      strokeDasharray="301"
                      strokeDashoffset="75" // ~75% full
                    />
                  </svg>
                  {/* Text index inside circle */}
                  <div className="absolute text-center">
                    <span className="text-xl font-black text-[var(--text-primary)] leading-none">1664</span>
                    <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider mt-0.5">Rating</p>
                  </div>
                </div>

                {/* Rating specifications details */}
                <div className="space-y-2.5 w-full">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-semibold">Problems Solved:</span>
                    <span className="text-[var(--text-primary)] font-black mono-font">500+ solved</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-semibold">Global Standing:</span>
                    <span className="text-luxury-orange font-black mono-font">Top 16.41%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-semibold">Contest Badge:</span>
                    <span className="text-luxury-magenta font-black mono-font">Active Competitor</span>
                  </div>
                </div>

              </div>

              {/* Split Bar stats */}
              <div className="space-y-3.5 border-t border-[var(--border-color)] pt-5">
                <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font mb-2">Problem Distribution Profile</h4>
                
                {/* Easy bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-emerald-500">EASY</span>
                    <span className="text-[var(--text-primary)] mono-font">210 / 500</span>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                {/* Medium bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-amber-500">MEDIUM</span>
                    <span className="text-[var(--text-primary)] mono-font">240 / 500</span>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "48%" }}></div>
                  </div>
                </div>

                {/* Hard bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span className="text-rose-500">HARD</span>
                    <span className="text-[var(--text-primary)] mono-font">50 / 500</span>
                  </div>
                  <div className="w-full bg-[var(--bg-tertiary)] h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>

              </div>

            </div>

            <div className="text-[10px] text-[var(--text-muted)] font-medium pt-3 mt-6 border-t border-[var(--border-color)] mono-font">
              Updated: Leetcode API sync active
            </div>
          </div>

          {/* Right Column: GitHub simulated commits (60%) */}
          <div className="lg:col-span-7 glass-card rounded-3xl border border-[var(--glass-border)] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-luxury-purple uppercase tracking-widest mono-font flex items-center gap-1.5">
                  <Github size={16} /> GitHub Contribution Matrix
                </h3>
                
                <span className="text-[10px] bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple font-bold px-2.5 py-1 rounded-full mono-font">
                  30+ Repositories
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
                Below represents Vivek's persistent commit activity and deployment releases mapping full-stack and systems backend development.
              </p>

              {/* Commit Grid Scrollable box */}
              <div className="w-full overflow-x-auto pb-4">
                <div className="inline-grid grid-flow-col gap-[3px] select-none">
                  {commitGrid.map((week, wIdx) => (
                    <div key={wIdx} className="grid grid-rows-7 gap-[3px]">
                      {week.map((lvl, dIdx) => {
                        let fillStyle = "bg-[var(--bg-tertiary)]"; // 0
                        if (lvl === 1) fillStyle = "bg-luxury-purple/20 border border-luxury-purple/10";
                        if (lvl === 2) fillStyle = "bg-luxury-purple/55 shadow-sm";
                        if (lvl === 3) fillStyle = "bg-gradient-to-tr from-luxury-violet to-luxury-magenta shadow-md";

                        return (
                          <div
                            key={dIdx}
                            className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 hover:rotate-6 cursor-pointer ${fillStyle}`}
                            title={`Contribution activity level: ${lvl}`}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Legend indicators */}
              <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] font-semibold uppercase tracking-wider mono-font mt-2 border-t border-[var(--border-color)] pt-3">
                <div className="flex items-center gap-1">
                  <Activity size={10} className="text-luxury-orange" />
                  <span>900+ contributions last year</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded bg-[var(--bg-tertiary)]"></span>
                  <span className="w-2.5 h-2.5 rounded bg-luxury-purple/25"></span>
                  <span className="w-2.5 h-2.5 rounded bg-luxury-purple/60"></span>
                  <span className="w-2.5 h-2.5 rounded bg-luxury-magenta"></span>
                  <span>More</span>
                </div>
              </div>

            </div>

            <div className="text-[10px] text-[var(--text-muted)] font-medium pt-3 mt-6 border-t border-[var(--border-color)] mono-font flex justify-between">
              <span>Active GitHub commits</span>
              <span>Account: @AVPXM8</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
