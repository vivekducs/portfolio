"use client";

import { useEffect, useRef } from "react";
import { X, Sparkles, Cpu } from "lucide-react";
import VKAssistant from "./VKAssistant";

export default function VKAssistantPopup({ isOpen, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vk-assistant-title"
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      {/* Dialog — bottom sheet on mobile, centered on desktop */}
      <div
        className="relative w-full sm:max-w-lg glass-card sm:rounded-3xl rounded-t-3xl border border-[var(--glass-border)] shadow-2xl overflow-hidden flex flex-col z-10 max-h-[92vh] sm:max-h-[85vh]"
        style={{ animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Header bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)] shrink-0 relative">
          {/* Drag handle on mobile */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-[var(--border-color)] sm:hidden" />

          <div className="w-9 h-9 rounded-xl bg-[var(--text-primary)] p-[1.5px] shadow-sm">
            <div className="w-full h-full rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <Sparkles size={16} className="text-[var(--text-primary)] animate-pulse" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 id="vk-assistant-title" className="font-bold text-sm text-[var(--text-primary)] leading-tight">
              VK <span className="text-[var(--text-primary)]">Assistant</span>
            </h3>
            <p className="text-[10px] text-[var(--text-muted)] mono-font">
              AI · Voice · Recruiter Mode
            </p>
          </div>

          {/* Waveform decoration */}
          <div className="hidden sm:flex items-center gap-0.5 mr-2">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="inline-block w-[3px] rounded-full bg-[var(--text-primary)]"
                style={{
                  height: `${8 + (i % 3) * 6}px`,
                  animation: `soundwave 1.4s infinite ease-in-out alternate`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Chat body */}
        <div className="flex-1 overflow-hidden p-4 sm:p-5">
          <VKAssistant isModal={true} onClose={onClose} />
        </div>

        {/* Footer */}
        <div className="hidden sm:flex items-center justify-between px-5 py-2 border-t border-[var(--border-color)] shrink-0">
          <span className="text-[9px] text-[var(--text-muted)] mono-font flex items-center gap-1">
            <Cpu size={9} />
            Powered by VK AI
          </span>
          <span className="text-[9px] text-[var(--text-primary)] font-semibold mono-font">● Online</span>
        </div>
      </div>
    </div>
  );
}
