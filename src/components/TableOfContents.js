"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Select h2 and h3 inside the article
    const elements = Array.from(document.querySelectorAll("article h2, article h3"))
      .map((element) => {
        // Ensure element has an ID
        if (!element.id) {
          element.id = element.innerText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        }
        return {
          id: element.id,
          text: element.innerText,
          level: Number(element.tagName.charAt(1)),
        };
      });
    
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 p-5 glass-card rounded-2xl border border-[var(--glass-border)] hidden lg:block w-64 xl:w-72 max-h-[80vh] overflow-y-auto">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 flex items-center gap-2">
        <List size={14} /> On this page
      </h3>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            className="text-sm"
          >
            <a 
              href={`#${heading.id}`}
              className={`block transition-colors ${activeId === heading.id ? "text-[var(--accent-color)] font-bold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
