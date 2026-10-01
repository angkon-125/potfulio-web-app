import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { API_BASE_URL } from '../hooks/usePortfolioData';

const AIAssistant = ({ profile }) => {
  const owner = profile?.name?.trim() || '';
  const greeting = owner
    ? `Hi! Ask me about ${owner}'s skills, projects, or how to get in touch.`
    : `Hi! Ask me about the skills, projects, or contact details on this portfolio.`;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const visibleMessages = [{ id: 'greeting', type: 'bot', text: greeting }, ...messages];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages.length]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (!API_BASE_URL) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: 'The assistant is not configured.' }]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();

      if (data.success) {
        const botMsg = {
          id: Date.now() + 1,
          type: 'bot',
          text: data.data
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      console.error('AI Error:', err);
      const errorMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: "Sorry, I'm having trouble connecting to my brain right now."
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <div className="ai-assistant">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="chat-window glass"
          >
            <div className="chat-header">
              <div className="header-info">
                <Bot size={20} className="bot-icon" />
                <span>AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn"><X size={18} /></button>
            </div>

            <div className="chat-messages">
              {visibleMessages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                  <div className="message-icon">
                    {msg.type === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className="message-bubble">{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="send-btn"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="assistant-toggle"
      >
        <MessageSquare size={24} />
      </motion.button>

      <style jsx>{`
        .ai-assistant {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
        }
        .assistant-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--grad-main);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: var(--glow-purple);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 320px;
          height: 450px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(10, 10, 10, 0.95);
        }
        .chat-header {
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
        }
        .header-info {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 0.8rem;
          color: var(--clr-primary);
        }
        .close-btn {
          background: none;
          border: none;
          color: var(--clr-text-dim);
          cursor: pointer;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .message-wrapper {
          display: flex;
          gap: 10px;
          max-width: 85%;
        }
        .message-wrapper.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .message-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--clr-surface-brighter);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--clr-text-muted);
          flex-shrink: 0;
        }
        .user .message-icon {
          background: var(--clr-secondary);
          color: white;
        }
        .message-bubble {
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          font-size: 0.9rem;
          color: var(--clr-text-muted);
        }
        .user .message-bubble {
          background: var(--clr-secondary);
          color: white;
          border-bottom-right-radius: 2px;
        }
        .bot .message-bubble {
          border-bottom-left-radius: 2px;
        }
        .chat-input-area {
          padding: 15px;
          display: flex;
          gap: 10px;
          background: rgba(255, 255, 255, 0.02);
        }
        .chat-input-area input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 8px 15px;
          color: white;
          font-size: 0.9rem;
        }
        .send-btn {
          background: none;
          border: none;
          color: var(--clr-primary);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
