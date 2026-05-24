import { useState, useRef, useEffect, useCallback, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import {assets} from "../assets/assets.js"
import { toast } from "react-toastify";


const BRAND = "#596DF7";
const BRAND_DARK = "#4557E8";
const BRAND_LIGHT = "#EEF0FE";


function Avatar() {
  return (
    <div
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-2"
      style={{ background: BRAND }}
    >
      <img src={assets.medibot} className="bg-gray-300 rounded-2xl" alt="" />
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start items-end gap-2">
      <Avatar />
      <div className="bg-white shadow-sm rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="block w-2 h-2 rounded-full"
            style={{
              background: BRAND,
              animation: `medBounce 1s ease-in-out ${delay}ms infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <Avatar />}
      <div
        className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-2xl rounded-br-none text-white"
            : "rounded-2xl rounded-bl-none bg-white shadow-sm text-gray-700"
        }`}
        style={isUser ? { background: BRAND } : {}}
      >
        {msg.text}
      </div>
    </div>
  );
}


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm your MediBot. Ask me general medical questions like symptoms or treatments, or ask about your past consultations - \"What did my doctor recommend?\" or \"What was my diagnosis?\" How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);


  const { token } = useContext(AppContext);
  const API_URL =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
      ? import.meta.env.VITE_API_URL
      : import.meta.env.VITE_BACKEND_URL + "/api/chat";

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Auto-resize textarea
  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 96) + "px";
    }
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      if (!token){
        toast.error("Login First");
        return;
      }
      const res = await fetch(`${API_URL}/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);

      if (!isOpen) setHasUnread(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't reach the server. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, isOpen, API_URL]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = input.trim().length > 0 && !loading;

  return (
    <>
      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes medBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes medSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes medPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(89,109,247,0.5); }
          50%      { box-shadow: 0 0 0 8px rgba(89,109,247,0); }
        }
        .med-chatbox { animation: medSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1) both; }
        .med-fab-pulse { animation: medPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* ──────────────── Chat Panel ──────────────── */}
        {isOpen && (
          <div
            className="med-chatbox bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              width: "370px",
              height: "540px",
              border: "1px solid #e5e7eb",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #7661F5 100%)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300"
                  // style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <img className="mt-1 " src={assets.medibot} alt="" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">MediBot</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 block" />
                    <p className="text-white/70 text-xs">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors rounded-lg p-1"
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Message list */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ background: "#F5F6FF" }}
            >
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {loading && <TypingDots />}
              <div ref={messagesEndRef} />
            </div>

            {/* Disclaimer strip */}
            <div
              className="px-4 py-1.5 text-center flex-shrink-0"
              style={{ background: BRAND_LIGHT, borderTop: `1px solid #dde1fc` }}
            >
              <p className="text-xs" style={{ color: BRAND }}>
                For informational purposes only
              </p>
            </div>

            {/* Input area */}
            <div className="p-3 bg-white flex-shrink-0" style={{ borderTop: "1px solid #f0f0f0" }}>
              <div
                className="flex items-end gap-2 rounded-xl px-3 py-2"
                style={{ border: `1.5px solid ${input ? BRAND : "#e5e7eb"}`, transition: "border-color 0.2s" }}
              >
                <textarea
                  ref={(el) => {
                    inputRef.current = el;
                    textareaRef.current = el;
                  }}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); autoResize(); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a medical question…"
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  style={{ maxHeight: "96px", lineHeight: "1.5" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!canSend}
                  className="flex-shrink-0 w-6 h-6  rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: canSend ? BRAND : "#e5e7eb",
                    cursor: canSend ? "pointer" : "not-allowed",
                    transform: canSend ? "scale(1)" : "scale(0.95)",
                  }}
                  aria-label="Send message"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={canSend ? "white" : "#9ca3af"} strokeWidth="2.2">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ──────────────── FAB Toggle Button ──────────────── */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 ${!isOpen ? "med-fab-pulse" : ""}`}
          style={{ background: isOpen ? BRAND_DARK : BRAND }}
          aria-label={isOpen ? "Close medical assistant" : "Open medical assistant"}
        >
          {/* Unread dot */}
          {hasUnread && !isOpen && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
              style={{ fontSize: "9px" }}
            >
              1
            </span>
          )}

          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
