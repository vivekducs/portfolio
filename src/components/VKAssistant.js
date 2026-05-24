"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Sparkles, MessageSquare, X, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

const SUGGESTED_PROMPTS = [
  { label: "Tell me about Mathem Solvex", text: "Tell me about the Mathem Solvex project." },
  { label: "Vivek's core skills?", text: "What technologies does Vivek specialize in?" },
  { label: "Internship experience", text: "Tell me about Vivek's work experience and internships." },
  { label: "LeetCode & DSA stats", text: "What are his coding achievements on LeetCode and DSA?" },
  { label: "ObserveFlow architecture", text: "Explain the ObserveFlow project architecture." },
  { label: "Open GitHub", text: "Show me Vivek's GitHub profile." },
  { label: "AI integrations", text: "How does Vivek integrate AI into his projects?" },
  { label: "Contact Vivek", text: "How can I contact Vivek Kumar?" },
];

const PREDEFINED_ANSWERS = [
  {
    keywords: ["mathem", "solvex", "maarula"],
    response: `**Mathem Solvex** is Vivek's flagship AI-powered educational platform.

• **Interactive Question Bank**: Houses over **4,500+ premium math questions**.
• **AI Semantic Search**: Integrates **Gemini embeddings** and a **Pinecone vector database** for semantic similarity search, achieving a **98.4% match accuracy**.
• **Tech Stack**: Built with **React.js**, **Node.js & Express**, **MongoDB** for persistence, and Pinecone. Active at [question.maarula.in](https://question.maarula.in/).
• **Track Record**: Reached over **3,000+ active users** and drove over **330K+ search impressions** on Google!`
  },
  {
    keywords: ["observeflow", "log", "aggregator", "telemetry"],
    response: `**ObserveFlow** is a containerized **Real-Time Log Aggregator** platform designed for system monitoring.

• **Live Event Logs**: Aggregates, parses, and persists logs in real-time across multiple distributed services.
• **DevOps & Containers**: Multi-service configuration orchestrated using **Docker containers** and container networks.
• **Alerting**: Trigger engines configured to dispatch real-time alerts upon exceeding critical thresholds, with CI/CD automated via **GitHub Actions**.
• **Tech Stack**: Built using **React.js**, **Node.js**, **Express**, and **MongoDB** with time-series log indexing.`
  },
  {
    keywords: ["palora", "wellness", "sentiment", "journal"],
    response: `**Palora** is an **AI-powered emotional wellness journaling** application.

• **Sentiment & Emotion Analysis**: Performs real-time sentiment mining and multi-class emotion mapping on user diary entries.
• **AI Recommendations**: Leverages generative language models to provide positive wellness tips, growth tracking, and progress metrics.
• **Tech Stack**: Engineered using **Next.js (App Router)**, **Express.js**, **MongoDB**, and integrated with the **Gemini API** for text analysis.`
  },
  {
    keywords: ["skill", "tech", "speciali", "languages", "tools", "competenc", "framework"],
    response: `Vivek Kumar is a Full Stack Engineer and AI Product Builder. His core skills include:

• **Frontend Engineering**: Next.js (App Router), React.js, Tailwind CSS, HTML5/CSS3, Framer Motion, Three.js.
• **Backend Engineering**: Node.js, Express.js, RESTful API design, Microservices.
• **Databases & Indexing**: MongoDB, MySQL, Pinecone Vector Database.
• **Artificial Intelligence**: Gemini API, TensorFlow, CNNs, Semantic Search.
• **Languages**: C++ (Strong DSA, 500+ problems), JavaScript (ES6+), Python.
• **DevOps & Tools**: Docker, Git/GitHub, Vercel, Postman.`
  },
  {
    keywords: ["leetcode", "dsa", "rank", "rating", "solved", "coding", "contest"],
    response: `Vivek is an active competitive coder and mathematical problem solver:

• **LeetCode contest rating**: Achieved a peak rating of **1664** (placing him in the **Top 16.4% globally**).
• **DSA Solved**: Solved **500+ algorithmic problems** across LeetCode, GeeksforGeeks, and HackerRank.
• **Key Specialties**: Expert in Advanced Graph Algorithms, Dynamic Programming, Tree operations, and time/space complexity optimization.`
  },
  {
    keywords: ["experience", "work", "intern", "job", "mca", "education", "college"],
    response: `Here is Vivek's academic and professional background:

• **Current Education**: Pursuing his **Master of Computer Applications (MCA)** at **Delhi University** (Batch 2024-2026), studying advanced algorithms, database engines, and software engineering.
• **Work Experience**: Currently serving as a **Backend Engineering Intern**, architecting Next.js applications, building high-throughput Express gateways, and designing AI integrations.`
  },
  {
    keywords: ["contact", "hire", "email", "phone", "linkedin", "resume", "cv", "social"],
    response: `You can reach out to Vivek Kumar directly to discuss hiring, SDE internships, or collaborations:

• **Email**: [vivekducs@gmail.com](mailto:vivekducs@gmail.com)
• **LinkedIn**: [linkedin.com/in/vivek33pal](https://www.linkedin.com/in/vivek33pal)
• **GitHub**: [github.com/AVPXM8](https://github.com/AVPXM8)
• **Resume / CV**: The official resume is fully viewable and downloadable via the Google Drive buttons in the Sidebar or Hero sections!`
  },
  {
    keywords: ["project", "portfolio", "build", "flagship", "apps"],
    response: `Vivek has built three flagship software applications detailed on this page:

1. **Mathem Solvex**: AI-powered math question engine featuring semantic vector search (3K+ users) live at [question.maarula.in](https://question.maarula.in/).
2. **ObserveFlow**: Dockerized real-time log ingestion and dashboard telemetry screen.
3. **Palora**: Emotional wellness diary with Gemini-powered sentiment insights.

All codebases are open-source and hosted on his GitHub (@AVPXM8)!`
  }
];

function TypingIndicator() {
  return (
    <div className="flex justify-start items-end gap-2">
      <div className="w-6 h-6 rounded-full bg-[var(--text-primary)] flex items-center justify-center shrink-0">
        <Sparkles size={10} className="text-[var(--bg-primary)]" />
      </div>
      <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
        <span className="bar bg-[var(--text-secondary)]" />
        <span className="bar bg-[var(--text-secondary)]" />
        <span className="bar bg-[var(--text-secondary)]" />
        <span className="bar bg-[var(--text-secondary)]" />
        <span className="bar bg-[var(--text-secondary)]" />
      </div>
    </div>
  );
}

export default function VKAssistant({ isModal = false, onClose = null }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm VK Assistant — Vivek Kumar's AI representative. Ask me about his projects, skills, experience, or LeetCode stats. I'm here to help recruiters and collaborators learn about Vivek!",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [micError, setMicError] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const abortRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (abortRef.current) abortRef.current.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const speak = useCallback((text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#•-]/g, ""); // Clean markdown formatting for clean speech
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes("Google UK English Male") || v.name.includes("Microsoft Guy") || v.name.includes("Daniel")
    );
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  // Robust Regex-based markdown formatter for chat bubble styling
  const renderFormattedMessage = useCallback((text) => {
    if (!text) return "";
    
    // A robust regex-based split that captures inline bold (**text**) and markdown links ([label](url))
    const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    const parts = text.split(regex);
    
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-extrabold text-[var(--text-primary)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("[") && part.includes("](")) {
        const closeBracketIdx = part.indexOf("]");
        const label = part.slice(1, closeBracketIdx);
        const url = part.slice(closeBracketIdx + 2, -1);
        return (
          <a 
            key={idx} 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[var(--accent-color)] hover:underline font-extrabold border-b border-green-500/20"
          >
            {label}
          </a>
        );
      }
      return part;
    });
  }, []);

  const sendMessage = useCallback(async (textToSend) => {
    if (!textToSend.trim() || isStreaming) return;

    const userMsg = { role: "user", content: textToSend, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setTranscript("");
    setIsStreaming(true);

    const assistantMsgId = Date.now();
    setMessages((prev) => [...prev, { role: "assistant", content: "", timestamp: new Date(), id: assistantMsgId, streaming: true }]);

    // SMART CLIENT-SIDE Q&A ROUTER (Offline first, no API key required)
    const promptLower = textToSend.toLowerCase();
    const matched = PREDEFINED_ANSWERS.find(ans => 
      ans.keywords.some(kw => promptLower.includes(kw))
    );

    if (matched) {
      // Simulate real-time word-by-word streaming locally
      const words = matched.response.split(" ");
      let currentIdx = 0;
      let currentText = "";

      const interval = setInterval(() => {
        if (currentIdx < words.length) {
          currentText += (currentIdx === 0 ? "" : " ") + words[currentIdx];
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: currentText } : m
            )
          );
          currentIdx++;
        } else {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMsgId ? { ...m, streaming: false } : m))
          );
          setIsStreaming(false);
          if (voiceEnabled) speak(matched.response);
        }
      }, 35); // Fluid typing speed
      return;
    }

    // Fallback to Server LLM if not matched
    try {
      abortRef.current = new AbortController();

      const allMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("API failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            fullText += parsed.text || "";
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId ? { ...m, content: fullText } : m
              )
            );
          } catch {
            // skip
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMsgId ? { ...m, streaming: false } : m))
      );

      if (fullText) speak(fullText);
    } catch (err) {
      if (err.name !== "AbortError") {
        // Generous static helper response on server LLM errors
        const fallbackText = "I'm having trouble connecting to my cloud model right now, but I can definitely tell you that Vivek Kumar is a Full Stack & AI developer specializing in Node.js backends and Gemini AI platforms, holding a 1664 rating on LeetCode. Ask me about Mathem Solvex, his skills, or contact info, and I will happily answer locally!";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, content: fallbackText, streaming: false }
              : m
          )
        );
        if (voiceEnabled) speak(fallbackText);
      }
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming, messages, speak, voiceEnabled]);

  const startVoice = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError("Voice not supported in this browser. Try Chrome.");
      return;
    }

    window.speechSynthesis?.cancel();
    setMicError(null);

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    recognitionRef.current = rec;

    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onerror = (e) => {
      setIsListening(false);
      if (e.error === "not-allowed") setMicError("Microphone access denied.");
      else if (e.error === "no-speech") setMicError("No speech detected. Try again.");
    };
    rec.onresult = (e) => {
      const t = Array.from(e.results).map((r) => r[0].transcript).join("");
      setTranscript(t);
      if (e.results[0].isFinal && t.trim()) {
        sendMessage(t.trim());
      }
    };

    rec.start();
  }, [sendMessage]);

  const stopVoice = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const formatTime = (date) =>
    date?.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={`flex flex-col h-full ${
        isModal ? "w-full" : "glass-card rounded-2xl border border-[var(--glass-border)] p-4 shadow-sm relative overflow-hidden bg-[var(--bg-secondary)]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-3 border-[var(--border-color)] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[var(--text-primary)] flex items-center justify-center text-[var(--bg-primary)] shadow-sm">
              <Sparkles size={14} className={isStreaming ? "animate-spin" : "animate-pulse"} />
            </div>
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-secondary)] ${
              isListening ? "bg-red-400 animate-pulse" : isSpeaking ? "bg-[var(--accent-color)] animate-pulse" : "bg-emerald-500"
            }`} />
          </div>
          <div>
            <h4 className="text-sm font-semibold mono-font leading-none text-[var(--text-primary)]">VK Assistant</h4>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
              {isListening ? "🎙 Listening..." : isSpeaking ? "🔊 Speaking..." : isStreaming ? "● Thinking..." : "● Online · AI Agent"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            suppressHydrationWarning
            onClick={() => { setVoiceEnabled((v) => !v); window.speechSynthesis?.cancel(); }}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              voiceEnabled
                ? "bg-[var(--accent-color)] text-[var(--bg-primary)] border border-[var(--accent-color)]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)]"
            }`}
            title={voiceEnabled ? "Disable voice responses" : "Enable voice responses"}
            aria-label="Toggle voice responses"
          >
            {voiceEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          {isModal && onClose && (
            <button
              suppressHydrationWarning
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              aria-label="Close assistant"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3 min-h-[200px] max-h-[380px]">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-1`}>
            <div className={`flex items-end gap-2 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.role === "assistant" && (
                <div className="w-5 h-5 rounded-full bg-[var(--text-primary)] flex items-center justify-center shrink-0 mb-0.5">
                  <Sparkles size={9} className="text-[var(--bg-primary)]" />
                </div>
              )}

              <div
                className={`px-3.5 py-2.5 text-xs leading-relaxed rounded-2xl ${
                  msg.role === "user"
                    ? "bg-[var(--accent-color)] text-[var(--bg-primary)] rounded-tr-none shadow-sm font-semibold"
                    : "bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-none font-medium"
                }`}
                style={{ whiteSpace: "pre-line" }}
              >
                {renderFormattedMessage(msg.content)}
                {msg.streaming && (
                  <span className="inline-block w-1.5 h-3 bg-[var(--accent-color)] animate-pulse rounded-sm ml-1 align-middle" />
                )}
              </div>
            </div>

            <span className="text-[9px] text-[var(--text-muted)] px-7 mono-font">
              {formatTime(msg.timestamp)}
            </span>
          </div>
        ))}

        {isStreaming && messages[messages.length - 1]?.content === "" && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      {/* Voice transcript display */}
      {(transcript || micError) && (
        <div className={`mb-2 px-3 py-2 rounded-xl text-xs border ${
          micError
            ? "border-red-500/30 bg-red-500/5 text-red-400"
            : "border-[var(--accent-color)]/20 bg-[var(--accent-color)]/5 text-[var(--text-secondary)]"
        } mono-font`}>
          {micError || `🎙 ${transcript}...`}
        </div>
      )}

      {/* Suggested Prompts */}
      <div className="mb-3 shrink-0">
        <p className="text-[9px] text-[var(--text-muted)] font-bold mb-1.5 mono-font flex items-center gap-1 uppercase tracking-wider">
          <MessageSquare size={9} /> Quick queries
        </p>
        <div className="flex flex-wrap gap-1">
          {SUGGESTED_PROMPTS.slice(0, isModal ? 8 : 4).map((q, idx) => (
            <button
              key={idx}
              suppressHydrationWarning
              onClick={() => sendMessage(q.text)}
              disabled={isStreaming}
              className="text-[10px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--bg-primary)] hover:border-[var(--accent-color)] hover:bg-[var(--accent-color)] transition-all px-2.5 py-1 rounded-full mono-font cursor-pointer disabled:opacity-50"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Row */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(inputText); }}
        className="flex gap-2 shrink-0"
      >
        <button
          type="button"
          suppressHydrationWarning
          onClick={isListening ? stopVoice : startVoice}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
            isListening
              ? "bg-red-500/10 border-red-500/40 text-red-400 animate-pulse"
              : "border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-color)]/5"
          }`}
          title={isListening ? "Stop recording" : "Start voice input"}
          aria-label={isListening ? "Stop voice recording" : "Start voice recording"}
        >
          {isListening ? <MicOff size={14} /> : <Mic size={14} />}
        </button>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            suppressHydrationWarning
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask anything about Vivek..."}
            disabled={isStreaming || isListening}
            className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[var(--accent-color)]/40 focus:ring-1 focus:ring-[var(--accent-color)]/20 transition-all pr-10 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
          <button
            type="submit"
            suppressHydrationWarning
            disabled={!inputText.trim() || isStreaming}
            className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[var(--accent-color)] text-[var(--bg-primary)] hover:bg-green-600 disabled:opacity-40 transition-all cursor-pointer"
            aria-label="Send message"
          >
            <Send size={12} />
          </button>
        </div>
      </form>
    </div>
  );
}
