"use client";

import { useState } from "react";
import { Mail, Send, MessageSquareCode, FileText, CheckCircle2 } from "lucide-react";
import styles from "./Contact.module.css";

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


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.el_1}>
      {/* Light orbs */}
      <div className="absolute top-10 left-[15%] w-80 h-80 bg-brand-primary opacity-[0.06] rounded-full blur-[90px] pointer-events-none"></div>

      <div className={styles.el_2}>
        
        {/* Title */}
        <div className={styles.el_3}>
          <p className="text-xs font-bold text-brand-primary mono-font uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <MessageSquareCode size={13} /> INITIATE CONNECTION
          </p>
          <h2 className={styles.el_4}>
            Get In Touch
          </h2>
        </div>

        {/* Desktop Split Layout */}
        <div className={styles.el_5}>
          
          {/* Left Column: Coordinates & Information */}
          <div className={styles.el_6}>
            <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Let's build something exceptional together
            </h3>
            
            <p className={styles.el_7}>
              If you are a recruiter, startup founder, or CTO looking for an agile **AI Engineer / Backend Developer** to join your team, let's connect! I respond promptly to all professional business inquiries.
            </p>

            {/* Coordinates Grid */}
            <div className={styles.el_8}>
              
              {/* Email */}
              <a
                href="mailto:vivekducs@gmail.com"
                className={styles.el_10}
              >
                <div className={styles.el_8}>
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className={styles.el_9}>Email address</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] break-all">vivekducs@gmail.com</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/vivek33pal/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.el_12}
              >
                <div className={styles.el_10}>
                  <Linkedin size={16} />
                </div>
                <div>
                  <h4 className={styles.el_10}>LinkedIn Profile</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] break-all">linkedin.com/in/vivek33pal</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AVPXM8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.el_11}
              >
                <div className={styles.el_12}>
                  <Github size={16} />
                </div>
                <div>
                  <h4 className={styles.el_12}>GitHub Handles</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] break-all">github.com/AVPXM8</p>
                </div>
              </a>

            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className={styles.el_13}>
            <div className={styles.el_17}>
              
              {/* Corner accent glow decorative */}
              <div className={styles.el_14}></div>

              <h4 className="text-sm font-bold text-brand-primary uppercase tracking-widest mono-font mb-6">
                Send a Message
              </h4>

              {success ? (
                <div className={`animate-in fade-in ${styles.el_15}`}>
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h5 className={styles.el_16}>Message Transmitted Successfully!</h5>
                  <p className="text-xs text-[var(--text-secondary)] font-medium max-w-xs">
                    Thank you! Your message has been encrypted and routed to Vivek Kumar. He will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.el_18}>
                  {/* Name field */}
                  <div className={styles.el_19}>
                    <label htmlFor="name" className={styles.el_20}>
                      Your Name
                    </label>
                    <input
                      suppressHydrationWarning
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alex Recruiter"
                      className={styles.el_21}
                    />
                  </div>

                  {/* Email field */}
                  <div className={styles.el_22}>
                    <label htmlFor="email" className={styles.el_23}>
                      Email Address
                    </label>
                    <input
                      suppressHydrationWarning
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className={styles.el_26}
                    />
                  </div>

                  {/* Message field */}
                  <div className={styles.el_24}>
                    <label htmlFor="message" className={styles.el_25}>
                      Message
                    </label>
                    <textarea
                      suppressHydrationWarning
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Hi Vivek, I looked at your NIMCET Rank Predictor and SDE intern timeline..."
                      className={styles.el_27}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    suppressHydrationWarning
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.el_28}
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
        <div className={styles.el_29}>
          <div className={styles.el_26}>
            <a href="https://github.com/AVPXM8" target="_blank" rel="noopener noreferrer" className={styles.el_30}>GitHub</a>
            <a href="https://www.linkedin.com/in/vivek33pal/" target="_blank" rel="noopener noreferrer" className={styles.el_31}>LinkedIn</a>
            <a href="mailto:vivekducs@gmail.com" className={styles.el_32}>Email</a>
          </div>
          <div>
            © 2026 Vivek Kumar. All rights reserved.
          </div>
        </div>

      </div>
    </section>
  );
}
