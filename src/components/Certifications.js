"use client";

import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";
import styles from "./Certifications.module.css";

export default function Certifications() {
  const certs = [
    {
      title: "Back-End Apps with Node.js & Express",
      issuer: "IBM Corporation",
      logoColor: "text-blue-500",
      accent: "border-l-2 border-brand-primary"
    },
    {
      title: "Google Attention Mechanism",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-brand-secondary"
    },
    {
      title: "Supervised Machine Learning",
      issuer: "Stanford University",
      logoColor: "text-red-800",
      accent: "border-l-2 border-brand-primary"
    },
    {
      title: "JavaScript Programming Essentials",
      issuer: "IBM Corporation",
      logoColor: "text-blue-500",
      accent: "border-l-2 border-brand-secondary"
    },
    {
      title: "Python for AI & Data Science",
      issuer: "IBM Corporation",
      logoColor: "text-blue-500",
      accent: "border-l-2 border-brand-primary"
    },
    {
      title: "Google Responsible AI",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-brand-secondary"
    },
    {
      title: "Google Generative AI Fundamental",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-brand-primary"
    },
    {
      title: "Google Introduction to LLMs",
      issuer: "Google Cloud",
      logoColor: "text-red-500",
      accent: "border-l-2 border-brand-secondary"
    }
  ];

  return (
    <section id="certifications" className={styles.el_1}>
      {/* Light highlights */}
      <div className={styles.el_2}></div>

      <div className="w-full max-w-6xl z-10 px-4">
        
        {/* Title */}
        <div className="flex flex-col mb-8 text-left">
          <p className={styles.el_3}>
            <Award size={13} /> VERIFIED CREDENTIALS
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Certifications & Training
          </h2>
        </div>

        {/* 3D Hover Wall Grid */}
        <div className={styles.el_4}>
          {certs.map((c, idx) => (
            <div
              key={idx}
              className={`glass-card glass-card-hover rounded-2xl border p-4.5 flex flex-col justify-between shadow-sm relative overflow-hidden group ${c.accent}`}
            >
              {/* Subtle background glow on card hover */}
              <div className={styles.el_5}></div>

              <div className={styles.el_6}>
                <div className={styles.el_7}>
                  <span className={styles.el_8}>
                    {c.issuer}
                  </span>
                  <ShieldCheck size={14} className={styles.el_9} />
                </div>

                <h4 className={styles.el_10}>
                  {c.title}
                </h4>
              </div>

              {/* Bottom tag block */}
              <div className={styles.el_11}>
                <span className="flex items-center gap-1">
                  <CheckCircle size={10} className="text-emerald-500" />
                  <span>Verified Credentials</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
