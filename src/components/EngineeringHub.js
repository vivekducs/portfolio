"use client";

import { useState, useEffect } from "react";
import { Terminal, Activity, Server, Database, Code, ShieldCheck, Box, GitCommit, Trophy } from "lucide-react";
import dynamic from "next/dynamic";
const SystemDiagram = dynamic(() => import("./SystemDiagram"), { ssr: false });

// Dynamically import Recharts because it's a heavy client-side dependency
const LineChart = dynamic(() => import("recharts").then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });

const mockMetrics = [
  { time: "00:00", req: 120 }, { time: "04:00", req: 180 }, { time: "08:00", req: 450 },
  { time: "12:00", req: 800 }, { time: "16:00", req: 950 }, { time: "20:00", req: 600 },
  { time: "24:00", req: 300 }
];

export default function EngineeringHub() {
  const [activeTab, setActiveTab] = useState("system-design");
  const [activeProject, setActiveProject] = useState("mathem-solvex");
  const [apiResponse, setApiResponse] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState({ github: null, leetcode: null });

  useEffect(() => {
    Promise.all([
      fetch('/api/github-stats').then(r => r.json()).catch(() => null),
      fetch('/api/leetcode-stats').then(r => r.json()).catch(() => null)
    ]).then(([github, leetcode]) => {
      setLiveMetrics({ github, leetcode });
    });
  }, []);

  const handleSimulateApi = () => {
    setIsFetching(true);
    setApiResponse("");
    setTimeout(() => {
      setApiResponse(JSON.stringify({
        status: "success",
        latency_ms: 42,
        data: {
          query: "Integrate x^2 * sin(x)",
          vector_match: 0.94,
          source: "pinecone_index_v2",
          resolution_steps: ["Step 1...", "Step 2..."]
        }
      }, null, 2));
      setIsFetching(false);
    }, 800);
  };

  return (
    <section id="engineering-hub" className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[var(--accent-color)] to-violet-500 text-transparent bg-clip-text">
            Engineering Ecosystem
          </h2>
          <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
            A deep dive into the production architecture, scaling strategies, and backend telemetry that power my projects.
          </p>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
          <button 
            onClick={() => setActiveTab("system-design")}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${activeTab === "system-design" ? "bg-[var(--accent-color)]/10 border-[var(--accent-color)] text-[var(--accent-color)]" : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"}`}
          >
            <Server size={16} /> System Design Lab
          </button>
          <button 
            onClick={() => setActiveTab("api-playground")}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${activeTab === "api-playground" ? "bg-[var(--accent-color)]/10 border-[var(--accent-color)] text-[var(--accent-color)]" : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"}`}
          >
            <Terminal size={16} /> Live API Playground
          </button>
          <button 
            onClick={() => setActiveTab("devops")}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all border ${activeTab === "devops" ? "bg-[var(--accent-color)]/10 border-[var(--accent-color)] text-[var(--accent-color)]" : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"}`}
          >
            <Activity size={16} /> DevOps Telemetry
          </button>
        </div>

        {/* Content Area */}
        <div className="glass-card rounded-2xl border border-[var(--glass-border)] p-4 md:p-8 shadow-sm">
          
          {/* TAB 1: System Design */}
          {activeTab === "system-design" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                {["mathem-solvex", "observeflow", "palora"].map((proj) => (
                  <button
                    key={proj}
                    onClick={() => setActiveProject(proj)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors ${
                      activeProject === proj ? "bg-[var(--accent-color)]/10 border-[var(--accent-color)] text-[var(--accent-color)]" : "bg-transparent border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {proj.replace("-", " ")}
                  </button>
                ))}
              </div>
              <div className="p-1 rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-2xl">
                <SystemDiagram projectId={activeProject} />
              </div>
            </div>
          )}

          {/* TAB 2: API Playground */}
          {activeTab === "api-playground" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-4">
                    <Database size={16} className="text-[var(--accent-color)]" /> Request Configuration
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1 block">Endpoint</label>
                      <div className="flex bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
                        <span className="bg-neutral-800 px-3 py-2 text-xs font-bold text-violet-400">POST</span>
                        <input type="text" value="https://api.maarula.in/v1/search/semantic" readOnly className="bg-transparent text-xs text-neutral-300 w-full px-3 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1 block">JSON Payload</label>
                      <textarea 
                        readOnly 
                        className="w-full h-24 bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs font-mono text-neutral-300 outline-none resize-none"
                        value={'{\n  "query": "Integrate x^2 * sin(x)",\n  "include_steps": true\n}'}
                      />
                    </div>
                    <button 
                      onClick={handleSimulateApi}
                      className="w-full py-2.5 rounded-lg bg-[var(--accent-color)] text-white text-xs font-bold hover:bg-violet-600 transition-colors"
                    >
                      {isFetching ? "Sending Request..." : "Send Request ->"}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl flex flex-col">
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-4">
                  <Code size={16} className="text-[var(--accent-color)]" /> Response Output
                </h3>
                <div className="flex-1 bg-neutral-900 rounded-lg border border-neutral-800 p-4 relative overflow-y-auto">
                  {apiResponse ? (
                    <pre className="text-xs font-mono text-violet-400 animate-in fade-in zoom-in-95 duration-300">{apiResponse}</pre>
                  ) : (
                    <p className="text-xs text-neutral-600 font-mono flex items-center justify-center h-full">Waiting for request...</p>
                  )}
                  {apiResponse && (
                    <span className="absolute top-2 right-2 flex items-center gap-1.5 text-[9px] text-neutral-400 bg-neutral-800 px-2 py-1 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> 200 OK (42ms)
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DevOps */}
          {activeTab === "devops" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="md:col-span-2 p-6 bg-[#0a0a0a] border border-neutral-800 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Activity size={16} className="text-[var(--accent-color)]" /> Global Request Traffic (24h)
                  </h3>
                  <span className="px-2 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded text-[9px] font-bold">ALL SYSTEMS NORMAL</span>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockMetrics}>
                      <XAxis dataKey="time" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#22c55e' }}
                      />
                      <Line type="monotone" dataKey="req" stroke="#22c55e" strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#0a0a0a] border border-neutral-800 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400">
                    <GitCommit size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">Live GitHub Commits (2024)</p>
                    <p className="text-xl font-bold text-[var(--text-primary)]">
                      {liveMetrics.github ? liveMetrics.github.contributions : "Loading..."}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-[#0a0a0a] border border-neutral-800 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-[var(--accent-color)]">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-500">LeetCode Solved</p>
                    <p className="text-xl font-bold text-[var(--text-primary)]">
                      {liveMetrics.leetcode ? liveMetrics.leetcode.totalSolved : "Loading..."}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-[#0a0a0a] border border-neutral-800 rounded-2xl">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-2">System Status</p>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300">API Gateway v2</span>
                      <span className="text-violet-400">Online</span>
                    </li>
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300">Pinecone Vector DB</span>
                      <span className="text-violet-400">Syncing</span>
                    </li>
                    <li className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300">Gemini Pro API</span>
                      <span className="text-violet-400">Operational</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
