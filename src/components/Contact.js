"use client";

import { useState } from "react";
import { Mail, Send, MessageSquareCode, FileText, CheckCircle2, CalendarDays } from "lucide-react";
import { trackEvent, trackCTA } from "@/lib/analytics";

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

const Linkedin = ({ size = 24, ...props }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = ({ size = 24, ...props }) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    trackEvent("Contact_Form_Submit", { name: form.name });
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-12 border-t border-[var(--border-color)]">
      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className="text-xs font-bold text-[var(--text-primary)] mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <MessageSquareCode size={13} /> INITIATE CONNECTION
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Get In Touch
          </h2>
        </div>

        {/* Desktop Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left Column: Coordinates & Information */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Let's build something exceptional together
            </h3>
            
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              If you are a recruiter, startup founder, or CTO looking for an agile **AI Engineer / Backend Developer** to join your team, let's connect! I respond promptly to all professional business inquiries.
            </p>

            {/* Coordinates Grid */}
            <div className="space-y-4 pt-2">
              
              {/* Email */}
              <a
                href="mailto:vivekducs@gmail.com"
                className="flex items-center gap-4 p-4 glass-card rounded-2xl border border-[var(--glass-border)] hover:border-[var(--text-primary)] shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font">Email address</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] break-all">vivekducs@gmail.com</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/vivekducs/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card rounded-2xl border border-[var(--glass-border)] hover:border-[var(--text-primary)] shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Linkedin size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font">LinkedIn Profile</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] break-all">linkedin.com/in/vivekducs</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ashish._.pal3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card rounded-2xl border border-[var(--glass-border)] hover:border-[var(--text-primary)] shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font">Instagram</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] break-all">@ashish._.pal3</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/vivekducs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card rounded-2xl border border-[var(--glass-border)] hover:border-[var(--text-primary)] shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Github size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mono-font">GitHub Handles</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] break-all">github.com/vivekducs</p>
                </div>
              </a>

              {/* Scheduling */}
              <a
                href="https://cal.com/"
                onClick={() => trackCTA("Schedule Meeting", "Contact Section")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--text-primary)] shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CalendarDays size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mono-font">Priority Review</h4>
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">Schedule a 15-min chat</p>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl border border-[var(--border-color)] p-6 md:p-8 shadow-sm relative overflow-hidden transition-all hover:border-[var(--text-primary)]">
              
              {/* Corner accent glow decorative */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--text-primary)] opacity-5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

              <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest mono-font mb-6">
                Send a Message
              </h4>

              {success ? (
                <div className="py-10 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h5 className="font-bold text-lg text-[var(--text-primary)]">Message Transmitted Successfully!</h5>
                  <p className="text-xs text-[var(--text-secondary)] font-medium max-w-xs">
                    Thank you! Your message has been encrypted and routed to Vivek Kumar. He will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field */}
                  <div className="text-left">
                    <label htmlFor="name" className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mono-font mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alex Recruiter"
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] transition-all text-[var(--text-primary)]"
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Email field */}
                  <div className="text-left">
                    <label htmlFor="email" className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mono-font mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] transition-all text-[var(--text-primary)]"
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Message field */}
                  <div className="text-left">
                    <label htmlFor="message" className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mono-font mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Hi Vivek, I looked at your NIMCET Rank Predictor and SDE intern timeline..."
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] transition-all text-[var(--text-primary)]"
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    suppressHydrationWarning
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--text-secondary)] font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 hover:translate-y-[-1px]"
                    aria-label="Send secure message"
                  >
                    <span>{isSubmitting ? "Transmitting..." : "Send Secure Message"}</span>
                    <Send size={13} className={isSubmitting ? "animate-ping" : ""} />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Mobile footer credits */}
        <div className="lg:hidden text-[10px] text-[var(--text-muted)] font-semibold mono-font text-center border-t border-[var(--border-color)] mt-12 pt-6 pb-2 space-y-4">
          <div className="flex justify-center gap-6">
            <a href="https://github.com/vivekducs" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">GitHub</a>
            <a href="https://www.linkedin.com/in/vivekducs/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">LinkedIn</a>
            <a href="https://www.instagram.com/ashish._.pal3" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">Instagram</a>
            <a href="mailto:vivekducs@gmail.com" className="hover:text-[var(--text-primary)]">Email</a>
          </div>
          <div>
            © 2026 Vivek Kumar. All rights reserved.
          </div>
        </div>

      </div>
    </section>
  );
}
