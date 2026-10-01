import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { API_BASE_URL } from '../hooks/usePortfolioData';

const toUrl = (value) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value.replace(/^\/\//, '')}`;
};

const Contact = ({ profile = {} }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const socials = profile.socials || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');

    if (!API_BASE_URL) {
      setError('Contact service is not configured.');
      return;
    }

    setSending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error || 'Message could not be sent.');
        return;
      }
      setForm({ name: '', email: '', subject: '', message: '' });
      setStatus('Message sent successfully.');
    } catch {
      setError('Message could not be sent.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <p className="contact-desc">
              Have a question or want to work together? Feel free to reach out through the form or my social channels.
            </p>

            <div className="contact-methods">
              {profile.email ? (
                <a href={`mailto:${profile.email}`} className="method glass">
                  <Mail size={20} />
                  <span>{profile.email}</span>
                </a>
              ) : null}
              {socials.github ? (
                <a href={toUrl(socials.github)} target="_blank" rel="noopener noreferrer" className="method glass">
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
              ) : null}
              {socials.linkedin ? (
                <a href={toUrl(socials.linkedin)} target="_blank" rel="noopener noreferrer" className="method glass">
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              ) : null}
              {!profile.email && !socials.github && !socials.linkedin ? (
                <p className="contact-desc">No contact links added yet.</p>
              ) : null}
            </div>
          </div>

          <form className="contact-form glass" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="5" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={sending}>
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
              <Send size={18} />
            </button>
            {status && <p className="form-status">{status}</p>}
            {error && <p className="form-status" style={{ color: '#ff6b6b' }}>{error}</p>}
          </form>
        </div>
      </motion.div>

      <style jsx>{`
        .section-title {
          text-align: center;
          margin-bottom: 50px;
          color: var(--clr-secondary);
          text-shadow: var(--glow-purple);
        }
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 50px;
          align-items: start;
        }
        .contact-desc {
          font-size: 1.1rem;
          color: var(--clr-text-muted);
          margin-bottom: 40px;
        }
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .method {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 20px;
          color: var(--clr-text);
          transition: var(--transition);
        }
        .method:hover {
          border-color: var(--clr-accent);
          color: var(--clr-accent);
          transform: translateX(10px);
        }
        .contact-form {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: 5px;
          padding: 12px 15px;
          color: white;
          font-family: var(--font-main);
          outline: none;
          transition: var(--transition);
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--clr-primary);
          background: rgba(255, 255, 255, 0.08);
        }
        .submit-btn {
          background: var(--grad-main);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: var(--transition);
        }
        .submit-btn:hover {
          filter: brightness(1.2);
          transform: translateY(-2px);
        }
        .form-status {
          text-align: center;
          color: var(--clr-accent);
          font-size: 0.9rem;
          margin-top: 10px;
        }

        @media (max-width: 992px) {
          .contact-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
