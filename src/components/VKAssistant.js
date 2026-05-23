"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Sparkles, MessageSquare, X, Mic, MicOff, Volume2, VolumeX, ChevronDown } from "lucide-react";
import styles from "./VKAssistant.module.css";

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

function TypingIndicator() {
  return (
    <div className={styles.el_1}>
      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shrink-0">
        <Sparkles size={10} className={styles.el_2} />
      </div>
      <div className={styles.el_3}>
        <span className={styles.el_4} />
        <span className={styles.el_5} />
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </div>
  );
}

export default function VKAssistant({ isModal = false, onClose = null }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm VK Assistant — Vivek Kumar's AI representative. Ask me about his projects, skills, experience, or DSA stats. I'm here to help recruiters and collaborators learn about Vivek!",
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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;
    // Prefer a professional male voice
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

  const sendMessage = useCallback(async (textToSend) => {
    if (!textToSend.trim() || isStreaming) return;

    const userMsg = { role: "user", content: textToSend, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setTranscript("");
    setIsStreaming(true);

    // Placeholder for streaming assistant message
    const assistantMsgId = Date.now();
    setMessages((prev) => [...prev, { role: "assistant", content: "", timestamp: new Date(), id: assistantMsgId, streaming: true }]);

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
            // skip malformed
          }
        }
      }

      // Mark done
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantMsgId ? { ...m, streaming: false } : m))
      );

      // TTS
      if (fullText) speak(fullText);
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, content: "Sorry, I encountered an error. Please try again!", streaming: false }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming, messages, speak]);

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
        isModal ? "w-full" : "glass-card rounded-2xl border border-[var(--glass-border)] p-4 shadow-xl relative overflow-hidden"
      }`}
    >
      {/* Glow */}
      {!isModal && (
        <div className={styles.el_6} />
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-3 border-[var(--border-color)] shrink-0">
        <div className={styles.el_7}>
          <div className={styles.el_8}>
            <div className={styles.el_9}>
              <Sparkles size={14} className={isStreaming ? "animate-spin" : "animate-pulse"} />
            </div>
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-secondary)] ${
              isListening ? "bg-red-400 animate-pulse" : isSpeaking ? "bg-blue-400 animate-pulse" : "bg-emerald-500"
            }`} />
          </div>
          <div>
            <h4 className={styles.el_10}>VK Assistant</h4>
            <p className={styles.el_11}>
              {isListening ? "🎙 Listening..." : isSpeaking ? "🔊 Speaking..." : isStreaming ? "● Thinking..." : "● Online · AI Agent"}
            </p>
          </div>
        </div>

        <div className={styles.el_12}>
          {/* Voice TTS toggle */}
          <button
            suppressHydrationWarning
            onClick={() => { setVoiceEnabled((v) => !v); window.speechSynthesis?.cancel(); }}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              voiceEnabled
                ? "bg-brand-primary/15 text-brand-primary border border-brand-primary/30"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)]"
            }`}
            title={voiceEnabled ? "Disable voice responses" : "Enable voice responses"}
          >
            {voiceEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          {isModal && onClose && (
            <button
              suppressHydrationWarning
              onClick={onClose}
              className={styles.el_13}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className={styles.el_14}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-1`}>
            <div className={`flex items-end gap-2 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              {msg.role === "assistant" && (
                <div className={styles.el_15}>
                  <Sparkles size={9} className="text-white" />
                </div>
              )}

              <div
                className={`px-3.5 py-2.5 text-xs leading-relaxed rounded-2xl ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-tr-none shadow-md shadow-brand-primary/10"
                    : "bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-none"
                }`}
                style={{ whiteSpace: "pre-line" }}
              >
                {msg.content}
                {msg.streaming && (
                  <span className={styles.el_16} />
                )}
              </div>
            </div>

            <span className={styles.el_17}>
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
            : "border-brand-primary/20 bg-brand-primary/5 text-[var(--text-secondary)]"
        } mono-font`}>
          {micError || `🎙 ${transcript}...`}
        </div>
      )}

      {/* Suggested Prompts */}
      <div className={styles.el_18}>
        <p className={styles.el_19}>
          <MessageSquare size={9} /> Quick queries
        </p>
        <div className="flex flex-wrap gap-1">
          {SUGGESTED_PROMPTS.slice(0, isModal ? 8 : 4).map((q, idx) => (
            <button
              key={idx}
              suppressHydrationWarning
              onClick={() => sendMessage(q.text)}
              disabled={isStreaming}
              className={styles.el_20}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Row */}
      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(inputText); }}
        className={styles.el_21}
      >
        {/* Mic button */}
        <button
          suppressHydrationWarning
          type="button"
          onClick={isListening ? stopVoice : startVoice}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
            isListening
              ? "bg-red-500/10 border-red-500/40 text-red-400 animate-pulse"
              : "border-[var(--border-color)] text-[var(--text-muted)] hover:border-brand-primary/30 hover:text-brand-primary hover:bg-brand-primary/5"
          }`}
          title={isListening ? "Stop recording" : "Start voice input"}
        >
          {isListening ? <MicOff size={14} /> : <Mic size={14} />}
        </button>

        <div className={styles.el_22}>
          <input
            suppressHydrationWarning
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask anything about Vivek..."}
            disabled={isStreaming || isListening}
            className={styles.el_22}
          />
          <button
            suppressHydrationWarning
            type="submit"
            disabled={!inputText.trim() || isStreaming}
            className={styles.el_21}
          >
            <Send size={12} />
          </button>
        </div>
      </form>
    </div>
  );
}
