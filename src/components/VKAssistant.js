"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, MessageSquare, X } from "lucide-react";


export default function VKAssistant({ isModal = false, onClose = null }) {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hi! I'm your AI assistant. Ask me anything about Vivek's engineering skills, projects, or work experience!",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const presetQuestions = [
    { label: "Tell me about Mathem Solvex", text: "Tell me about Mathem Solvex project." },
    { label: "What are Vivek's skills?", text: "What are your core technical skills?" },
    { label: "Show internship experience", text: "Where has Vivek worked?" },
    { label: "How is he in DSA?", text: "What are his LeetCode and DSA stats?" },
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim() || isTyping) return;

    // Add user message
    const userMsg = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate futuristic AI thinking and typing response
    setTimeout(() => {
      let replyText = "";
      const query = textToSend.toLowerCase();

      if (query.includes("mathem solvex") || query.includes("mathem")) {
        replyText = "Mathem Solvex is an AI-powered educational web app. It handles 4,500+ math questions, 90+ developer blogs, and semantic search (using Pinecone & Gemini API) which achieved 330K+ Google Search Impressions and supports 3,000+ active student users. Built with Node.js, Express, MongoDB, and React.";
      } else if (query.includes("skill") || query.includes("technologies") || query.includes("stack")) {
        replyText = "Vivek's core technical stack includes:\n• Backend: Node.js, Express.js, MongoDB, MySQL, C++, Python\n• Frontend: React.js, Next.js, Tailwind CSS\n• AI/ML: Gemini API, Pinecone, TensorFlow, CNNs\n• Tools: Docker, Git, VS Code, Postman, Vercel.";
      } else if (query.includes("intern") || query.includes("experience") || query.includes("work")) {
        replyText = "Vivek worked as a Software Development Engineer (SDE) Intern at SafeQbit Technologies Pvt Ltd (Feb 2026 – May 2026) building scalable UI architectures and deploying products on Vercel. He also trained at Tech Mahindra (Jul 2023 – Jan 2024) learning enterprise software workflows.";
      } else if (query.includes("dsa") || query.includes("leetcode") || query.includes("coding")) {
        replyText = "Vivek is highly proficient in algorithms! He has a LeetCode Rating of 1664, has solved over 500+ DSA problems (placing in the top 16.41% globally), and maintains 30+ GitHub repositories representing clean real-world software design.";
      } else if (query.includes("observeflow")) {
        replyText = "ObserveFlow is Vivek's real-time log aggregation and monitoring platform built using Node.js, Docker, MongoDB, React, and GitHub Actions, supporting scalable alert structures and containerized microservices.";
      } else if (query.includes("palora")) {
        replyText = "Palora is Vivek's emotional wellness startup project. It is an AI-driven counseling and journaling platform that analyzes emotion and provides real-time mental health guidance using the Gemini API, Node.js, Express, and MongoDB.";
      } else if (query.includes("rank") || query.includes("predictor")) {
        replyText = "Rank Predictor is Vivek's highly popular calculator for NIMCET and CUET computer science aspirants, predicting college eligibility based on entrance ranks. Live at rankpredictor.maarula.in!";
      } else {
        replyText = "I'm Vivek Kumar's dedicated digital assistant. Vivek is an MCA student, AI Engineer, and full-stack backend architect who builds high-end products. You can reach out directly via vivekducs@gmail.com, or explore his Projects and Experience sections on this dashboard!";
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "assistant", text: replyText }]);
    }, 1200);
  };

  return (
    <div className={`flex flex-col h-full ${isModal ? "w-full" : "glass-card rounded-2xl border p-4 shadow-xl relative overflow-hidden"}`}>
      {/* Glow highlight */}
      {!isModal && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-purple opacity-10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-3 border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-luxury-violet to-luxury-magenta flex items-center justify-center text-white">
              <Sparkles size={14} className="animate-pulse" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[var(--bg-secondary)]"></span>
          </div>
          <div>
            <h4 className="text-sm font-semibold mono-font">VK Assistant</h4>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
              <span>●</span> Online • AI Agent
            </p>
          </div>
        </div>
        
        {isModal && onClose && (
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg hover:bg-[var(--border-color)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto min-h-[260px] max-h-[360px] space-y-3 pr-1 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-luxury-violet to-luxury-purple text-white rounded-tr-none shadow-md"
                  : "bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-none"
              }`}
              style={{ whiteSpace: "pre-line" }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start items-center gap-3">
            <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="mb-4">
        <p className="text-xs text-[var(--text-muted)] font-medium mb-2 mono-font flex items-center gap-1">
          <MessageSquare size={10} /> Quick queries:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              disabled={isTyping}
              className="text-xs bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-luxury-purple hover:border-luxury-purple hover:bg-luxury-purple/5 transition-all px-2.5 py-1.5 rounded-full mono-font text-left cursor-pointer"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex gap-2 relative"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything..."
          disabled={isTyping}
          className="flex-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-luxury-purple focus:ring-1 focus:ring-luxury-purple transition-all pr-10 text-[var(--text-primary)]"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-gradient-to-r from-luxury-violet to-luxury-purple hover:opacity-90 disabled:opacity-50 text-white transition-all cursor-pointer"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
