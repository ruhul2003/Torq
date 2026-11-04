"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User, ChevronRight } from "lucide-react";

const SUGGESTIONS = [
  "Which hypercar has the quickest 0-60 sprint?",
  "What are the hire requirements for Monaco?",
  "How are OEM parts authenticated?",
  "Can I schedule an Atelier bespoke consultation?",
];

const KNOWLEDGE_RESPONSES = {
  "Which hypercar has the quickest 0-60 sprint?": "The TORQ Apex GT Monocoque leads our stable with a blistering 0-60 mph launch in 1.88 seconds powered by 4 independent axial-flux electric motors generating 1,250 HP.",
  "What are the hire requirements for Monaco?": "For Monaco hire, clients must possess a valid driver's license held for 2+ years, passport, and be 25 years of age. All hires include white-glove delivery to Monte Carlo hotels, private helipads, or Port Hercule.",
  "How are OEM parts authenticated?": "Every original component is serialized with an etched cryptographic QR code matching factory assembly records. All parts come sealed in nitrogen crates with a physical Certificate of Provenance.",
  "Can I schedule an Atelier bespoke consultation?": "Certainly. Our Atelier designers can host you in our Stuttgart Studio, London Mayfair Salon, or via private encrypted 4K VR session. Select 'Bespoke Studio' or request a call from our VIP concierge.",
};

export default function ConciergeChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to TORQ Client Concierge. I am your personal automotive advisor. How may I assist your acquisition or hire today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (textToSend) => {
    const userText = textToSend || input;
    if (!userText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const matched = KNOWLEDGE_RESPONSES[userText] ||
        `Thank you for your inquiry regarding "${userText}". A dedicated TORQ Client Principal has been notified and will review your request. In the meantime, feel free to explore our 360° Studio or Hire Fleet.`;
      setMessages((prev) => [...prev, { sender: "bot", text: matched }]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="relative w-full max-w-lg h-[620px] max-h-[90vh] rounded-t-3xl sm:rounded-3xl bg-neutral-900 border border-white/10 text-white shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>TORQ Private Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400">
                  AI Automotive Advisor • Available 24/7
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-sky-500 text-black font-medium rounded-tr-sm"
                      : "bg-white/[0.05] border border-white/10 text-neutral-200 rounded-tl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-neutral-400 pl-9">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>Concierge is drafting advice...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="p-3 border-t border-white/5 bg-black/30 overflow-x-auto flex gap-2 no-scrollbar">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(s)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 sm:p-4 border-t border-white/10 flex items-center gap-2 bg-neutral-900"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about vehicle specs, delivery, hire terms..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black transition-colors cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
