'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Building2, 
  Compass, 
  ShieldAlert, 
  FileCheck,
  RefreshCw
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface AiCitizenAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiCitizenAssistantModal: React.FC<AiCitizenAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const counterRef = useRef(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Mabanglo at Marayang Araw! I am Lingkod-Umingan AI, your virtual assistant for the Municipality of Umingan, Pangasinan. How can I assist you today with municipal permits, real property taxes, barangay contacts, or local tourism spots like Mount Amor and Barat River?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    "Requirements for Business Permit (BPLO)?",
    "Where to go hiking in Umingan?",
    "Real Property Tax discount dates?",
    "Emergency hotlines for MDRRMO & PNP",
    "What is the Kanen Festival?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    counterRef.current += 1;
    const userMsgId = `user-msg-${counterRef.current}`;

    const userMsg: Message = {
      id: userMsgId,
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      counterRef.current += 1;
      const aiMsgId = `ai-msg-${counterRef.current}`;

      const aiMsg: Message = {
        id: aiMsgId,
        role: 'assistant',
        content: data.reply || "Thank you for reaching out to LGU Umingan. How else can I assist you?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I am having trouble connecting to the server. For urgent municipal concerns, please call our hotline at (075) 574-1234 or visit the Municipal Hall in Poblacion West.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white text-slate-900 max-w-2xl w-full h-[85vh] sm:h-[700px] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden border border-slate-200">
        
        {/* Assistant Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white leading-tight">Lingkod-Umingan AI</h3>
                <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase">
                  Gemini 3.6
                </span>
              </div>
              <p className="text-[11px] text-emerald-300">Official Municipal Citizen Assistant • LGU Umingan</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((m) => {
            const isAi = m.role === 'assistant';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[88%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isAi ? 'bg-emerald-800 text-amber-300' : 'bg-slate-800 text-white'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`space-y-1 ${isAi ? 'text-left' : 'text-right'}`}>
                  <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isAi 
                      ? 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-none whitespace-pre-wrap' 
                      : 'bg-emerald-800 text-white rounded-tr-none shadow-xs font-medium'
                  }`}>
                    {m.content}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono px-1 block">
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none text-xs text-slate-500 font-medium animate-pulse">
                Consulting Umingan LGU database & ordinances...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompt Chips */}
        <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1" />
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              disabled={isLoading}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0 cursor-pointer border border-slate-200"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about permits, taxes, Mount Amor, or hotlines..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:border-emerald-700"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4 text-amber-300" />
          </button>
        </form>

      </div>
    </div>
  );
};
