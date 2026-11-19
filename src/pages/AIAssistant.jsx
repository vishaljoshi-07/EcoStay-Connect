import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Sparkles, Copy, Trash2, Key, Check, ShieldCheck, Leaf } from 'lucide-react';
import { aiApi } from '../services/api';
import Toast from '../components/ui/Toast';
import ConfirmModal from '../components/ui/ConfirmModal';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

function AIAssistant() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('ecostay_ai_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', variant: 'success' });
  const [showClearModal, setShowClearModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('ecostay_gemini_key') || '');
  const [savedKey, setSavedKey] = useState(() => localStorage.getItem('ecostay_gemini_key') || '');

  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('ecostay_ai_chat', JSON.stringify(messages));
  }, [messages]);

  const presetPrompts = [
    { label: '🌿 3-Day Coorg Itinerary', text: 'I am planning a 3-day eco-friendly trip to Coorg for 2 adults with a focus on solar-powered homestays and zero plastic waste.' },
    { label: '🏡 Top Eco Homestays', text: 'Recommend top certified eco-friendly homestays in South India with high sustainability scores.' },
    { label: '♻️ Zero-Waste Travel Tips', text: 'What are essential zero-waste travel packing tips for eco-conscious mountain trekking?' },
    { label: '🚗 Low-Carbon Transport', text: 'How can I minimize my carbon footprint when traveling across Himachal Pradesh?' },
    { label: '🏔️ Plan Manali Trip', text: 'Plan a sustainable 3-day alpine holiday to Manali with minimal environmental impact.' },
  ];

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    const cleanKey = apiKeyInput.trim();
    if (cleanKey) {
      localStorage.setItem('ecostay_gemini_key', cleanKey);
      setSavedKey(cleanKey);
      setToast({ isOpen: true, message: 'Google Gemini API key saved! Live Gemini AI is now active.', variant: 'success' });
    } else {
      localStorage.removeItem('ecostay_gemini_key');
      setSavedKey('');
      setToast({ isOpen: true, message: 'API key removed. Running on EcoStay Knowledge Engine.', variant: 'info' });
    }
    setShowKeyModal(false);
  };

  const handleSendPrompt = async (e, customPrompt) => {
    if (e) e.preventDefault();
    
    const inputPrompt = customPrompt || prompt;

    // Error handling: Empty prompt
    if (!inputPrompt || !inputPrompt.trim()) {
      setToast({ isOpen: true, message: 'Please enter a travel question or prompt.', variant: 'warning' });
      return;
    }

    const userMsg = { sender: 'user', text: inputPrompt.trim(), timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMsg]);
    
    if (!customPrompt) setPrompt('');
    setLoading(true);

    try {
      const response = await aiApi.chat(inputPrompt.trim(), savedKey);

      if (response && (response.success || response.data)) {
        const rawText = response.data?.response || response.data?.reply || response.data?.message || (typeof response.data === 'string' ? response.data : 'I am here to assist with your sustainable travel plans!');
        const source = response.data?.source || (savedKey ? 'Google Gemini 1.5 Flash' : 'EcoStay AI Engine');

        const aiMsg = {
          sender: 'ai',
          text: rawText,
          source: source,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(response?.message || 'AI request failed');
      }
    } catch (err) {
      console.error('AI Error:', err);
      setToast({
        isOpen: true,
        message: err.message || 'Failed to connect to AI Assistant. Please check your connection.',
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ isOpen: true, message: 'AI response copied to clipboard!', variant: 'success' });
  };

  const handleConfirmClear = () => {
    setMessages([]);
    localStorage.removeItem('ecostay_ai_chat');
    setShowClearModal(false);
    setToast({ isOpen: true, message: 'Conversation history cleared.', variant: 'success' });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 px-4 transition-colors duration-300 flex flex-col items-center">
      <div className="max-w-4xl w-full flex-grow flex flex-col space-y-6">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-emerald-800/40 relative overflow-hidden">
          <div className="space-y-1.5 text-left relative z-10">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              <span>{savedKey ? 'Google Gemini AI (Live Key Active)' : 'EcoStay AI Knowledge Engine'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
              Eco Travel Assistant
            </h1>
            <p className="text-emerald-100/70 text-sm">
              Personalized green itineraries, sustainable homestay picks, and zero-waste travel advice.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto z-10">
            <button
              onClick={() => setShowKeyModal(true)}
              className={`border px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                savedKey
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              title="Configure Gemini API Key"
            >
              <Key className="h-3.5 w-3.5" />
              <span>{savedKey ? 'API Key Set' : 'Set Gemini Key'}</span>
            </button>

            {messages.length > 0 && (
              <button
                onClick={() => setShowClearModal(true)}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Preset Prompt Chips */}
        <div className="space-y-2 text-left">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block px-1">
            Suggested Prompts
          </span>
          <div className="flex flex-wrap gap-2">
            {presetPrompts.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(null, chip.text)}
                disabled={loading}
                className="bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold py-2 px-3.5 rounded-xl transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Container */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 border border-slate-100 dark:border-slate-700/60 shadow-lg min-h-[400px] flex-grow flex flex-col justify-between space-y-4">
          
          {messages.length === 0 ? (
            <EmptyState
              type="ai"
              title="Welcome to Eco Travel AI"
              description="Ask any question about sustainable travel, green homestay options, or zero-waste itineraries to get started!"
            />
          ) : (
            <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 text-left ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 shrink-0 mt-1">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-sm space-y-2 relative group ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-750 text-slate-800 dark:text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] opacity-75 font-semibold border-b border-white/10 dark:border-slate-800 pb-1.5">
                      <span>{msg.sender === 'user' ? 'You' : msg.source || 'Eco AI Assistant'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="text-sm leading-relaxed font-sans prose dark:prose-invert max-w-none">
                      {msg.sender === 'ai' ? (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>

                    {msg.sender === 'ai' && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleCopyText(msg.text)}
                          className="text-xs font-bold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center space-x-1 cursor-pointer bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="p-2.5 rounded-2xl bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 shrink-0 mt-1">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-start space-x-3 text-left">
                  <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 shrink-0 mt-1">
                    <Bot className="h-5 w-5 animate-pulse" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-750 p-4 rounded-3xl rounded-tl-none flex items-center space-x-3 text-sm font-semibold text-slate-500">
                    <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <span>AI is crafting your eco-response...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}

          {/* Prompt Input Bar */}
          <form onSubmit={(e) => handleSendPrompt(e)} className="pt-2 flex items-center gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask for itineraries, homestays, zero-waste tips, or destinations..."
              disabled={loading}
              className="flex-grow bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 py-3.5 px-5 rounded-2xl text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold p-3.5 rounded-2xl shadow-md transition-all cursor-pointer shrink-0"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

        </div>

      </div>

      {/* API Key Modal */}
      <Modal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        title="Configure Google Gemini API Key"
      >
        <form onSubmit={handleSaveApiKey} className="space-y-4 text-left">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Paste your Google Gemini API key to activate live Gemini 1.5 Flash responses. If left blank, the built-in EcoStay Knowledge Engine will answer all travel and sustainability questions with 100% reliability.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 py-2.5 px-4 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none"
            />
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
              Get a free API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline font-medium">Google AI Studio</a>.
            </span>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            {savedKey && (
              <button
                type="button"
                onClick={() => {
                  setApiKeyInput('');
                  localStorage.removeItem('ecostay_gemini_key');
                  setSavedKey('');
                  setShowKeyModal(false);
                  setToast({ isOpen: true, message: 'API key removed. Using EcoStay Engine.', variant: 'info' });
                }}
                className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 px-4 rounded-xl cursor-pointer"
              >
                Clear Key
              </button>
            )}
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer flex items-center space-x-1.5 shadow-sm"
            >
              <Check className="h-4 w-4" />
              <span>Save Key</span>
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={showClearModal}
        title="Clear AI Chat History?"
        message="Are you sure you want to delete all saved AI conversations? This action cannot be undone."
        confirmText="Clear Conversation"
        onConfirm={handleConfirmClear}
        onCancel={() => setShowClearModal(false)}
      />

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        variant={toast.variant}
        onDismiss={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
}

export default AIAssistant;
