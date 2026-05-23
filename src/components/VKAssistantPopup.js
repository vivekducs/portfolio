"use client";

import { useState } from "react";
import { X, Sparkles, Cpu, Clock, Terminal, Zap } from "lucide-react";
import VKAssistant from "./VKAssistant";

export default function VKAssistantPopup({ isOpen, onClose }) {
  const [showDemo, setShowDemo] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay with dynamic backdrop blur */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
      ></div>

      {/* Glassmorphism Dialog container */}
      <div className="relative w-full max-w-lg glass-card rounded-3xl border border-[var(--glass-border)] shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col z-10 animate-in fade-in zoom-in duration-300">
        
        {/* Colorful dynamic background spots */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-luxury-magenta opacity-25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-luxury-orange opacity-20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {!showDemo ? (
          <div className="text-center py-6 flex flex-col items-center">
            {/* Holographic Glowing Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-luxury-violet via-luxury-magenta to-luxury-orange p-[2px] mb-4 shadow-lg shadow-luxury-purple/20 animate-bounce">
              <div className="w-full h-full rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center text-luxury-magenta">
                <Cpu size={28} />
              </div>
            </div>

            <h3 className="text-2xl font-bold tracking-tight mb-2">
              <span className="gradient-text">VK Assistant</span>
            </h3>
            <div className="inline-flex items-center gap-1.5 bg-luxury-purple/10 border border-luxury-purple/20 text-luxury-purple text-xs font-semibold px-3 py-1 rounded-full mb-6 mono-font">
              <Clock size={12} className="animate-spin" /> PHASE 1: DEVELOPMENT
            </div>

            {/* Placeholder Text */}
            <div className="glass-card rounded-2xl border p-5 mb-6 text-sm text-[var(--text-secondary)] leading-relaxed text-center max-w-sm">
              <p className="font-semibold text-[var(--text-primary)] text-base mb-2">AI Assistant Coming Soon</p>
              Integrating RAG pipelines, Gemini 1.5 Pro models, and vector stores to let you conduct voice and text interviews directly with Vivek's digital twin.
            </div>

            {/* Technical Spec Roadmap */}
            <div className="w-full text-left space-y-3 mb-8 px-4 text-xs font-medium text-[var(--text-muted)] mono-font">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-luxury-orange" />
                <span>Fine-tuned LLM with customized portfolio system prompt</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-luxury-gold" />
                <span>Vector embeddings via Pinecone for instant document search</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                onClick={() => setShowDemo(true)}
                className="bg-gradient-to-r from-luxury-violet to-luxury-magenta text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-95 shadow-md shadow-luxury-purple/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} /> Try Pre-release Simulation
              </button>
              <button
                onClick={onClose}
                className="border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Pre-release Sandbox</h3>
                <p className="text-xs text-[var(--text-muted)]">Testing simulated knowledge graphs</p>
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="text-xs text-luxury-purple font-semibold hover:underline mono-font cursor-pointer"
              >
                ← Back to Roadmap
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <VKAssistant isModal={true} onClose={onClose} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
