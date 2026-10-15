"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/lib/hooks/useAuth";
import { api } from "@/lib/api-client";
import { KiboLogo } from "@/components/ui/KiboLogo";
import { PageLoader } from "@/components/ui/PageLoader";
import {
  Send,
  Sparkles,
  User,
  Trash2,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "kibo";
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    href: string;
  };
}

const DEFAULT_SUGGESTED_CHIPS = [
  "Apa itu Loop / Perulangan? 🔄",
  "Kenapa koding bisa ada Bug? 🐛",
  "Bagaimana komputer membuat keputusan If-Else? ⚡",
  "Apa itu Algoritma? 🧭",
  "Bikin Game koding itu gimana? 🎮",
];

function buildWelcome(name: string, id: string): ChatMessage {
  return {
    id,
    sender: "kibo",
    text: `Halo ${name}! 🤖✨ Aku Robot Kibo, sahabat kodingmu! Kalau ada materi koding yang bikin kamu penasaran, bingung dengan tugas, atau ingin tahu cara kerja komputer, tanyakan saja padaku ya!`,
    timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    suggestedAction: {
      label: "Jelajahi Modul Belajar",
      href: "/kurikulum",
    },
  };
}

export default function AITutorPage() {
  const { student, isLoading: authLoading } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedChips, setSuggestedChips] = useState<string[]>(DEFAULT_SUGGESTED_CHIPS);

  // Ref to the scrollable messages container — NOT the page
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message
  useEffect(() => {
    const studentName = (student?.name ?? "").split(" ")[0] || "Teman";
    setMessages([buildWelcome(studentName, "welcome-1")]);
  }, [student?.name]);

  // Scroll only inside the chat container, not the window
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current && scrollContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await api.students.askTutor({ message: query });
      const kiboMessage: ChatMessage = {
        id: `kibo-${Date.now()}`,
        sender: "kibo",
        text: res.reply,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        suggestedAction: res.suggestedAction,
      };

      setMessages((prev) => [...prev, kiboMessage]);
      if (res.suggestedChips && res.suggestedChips.length > 0) {
        setSuggestedChips(res.suggestedChips);
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `kibo-${Date.now()}`,
        sender: "kibo",
        text: "Kibo mendengarmu dengan baik! Ingat bahwa koding itu seperti menyusun balok‑balok logika. Teruslah penasaran dan mencoba! 🤖💡",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    // Delete session in DB (fire and forget — don't block UI)
    try {
      await api.students.clearTutorSession();
    } catch {
      // Silently ignore; UI still resets
    }

    const studentName = (student?.name ?? "").split(" ")[0] || "Teman";
    setMessages([buildWelcome(studentName, `welcome-${Date.now()}`)]);
    setSuggestedChips(DEFAULT_SUGGESTED_CHIPS);
    setInputText("");
  };

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-[#1E293B]">
      <DashboardNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col gap-6">
        {/* Tutor Hero Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none blur-xl" />

          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row z-10">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center shrink-0 border border-slate-100">
              <KiboLogo size={46} />
            </div>

            <div className="space-y-1">
              <h1 className="font-heading font-black text-2xl sm:text-3xl">
                Tutor AI Robot Kibo
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                Tanyakan apa saja tentang koding, logika, atau tugas belajarmu dengan bahasa yang santai dan seru!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearChat}
            className="z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-heading text-xs font-bold border border-white/20 transition-all cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Mulai Obrolan Baru</span>
          </button>
        </section>

        {/* Chat Feed Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-[0_12px_32px_-6px_rgba(30,41,59,0.08)] flex flex-col h-[560px] overflow-hidden">
          {/* Messages Scroll Area — this is the ONLY thing that scrolls */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                      isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 p-1"
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <KiboLogo size={24} />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 shadow-xs space-y-2.5 ${
                      isUser
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none"
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {msg.text}
                    </p>

                    {/* Suggested Action Link */}
                    {msg.suggestedAction && (
                      <div className="pt-1">
                        <Link
                          href={msg.suggestedAction.href}
                          className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading font-black text-xs px-3.5 py-1.5 rounded-full shadow-xs active:scale-95 transition-all"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}

                    <span
                      className={`text-[10px] block text-right ${
                        isUser ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator — no spinning bot */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                  <KiboLogo size={24} />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-3.5 text-slate-600 flex items-center gap-2 text-xs font-bold shadow-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Robot Kibo sedang mengetik jawaban...</span>
                </div>
              </div>
            )}

            {/* Scroll anchor — inside the container */}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Topic Chips */}
          <div className="px-4 sm:px-6 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Saran:
            </span>
            {suggestedChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs font-semibold whitespace-nowrap active:scale-95 transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2 sm:gap-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanyakan konsep koding pada Robot Kibo..."
              disabled={isLoading}
              className="flex-1 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm px-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading font-bold text-xs sm:text-sm shadow-[0_3px_0_#1D4ED8] active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <span>Kirim</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
