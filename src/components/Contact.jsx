import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact = ({ contact }) => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Message sent successfully!');
        setTimeout(() => setStatus(''), 3000);
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
                            <a href={`mailto:${contact.email}`} className="method glass">
                                <Mail size={20} />
                                <span>{contact.email}</span>
                            </a>
                            <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="method glass">
                                <Github size={20} />
                                <span>GitHub</span>
                            </a>
                            <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="method glass">
                                <Linkedin size={20} />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    <form className="contact-form glass" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            <span>Send Message</span>
                            <Send size={18} />
                        </button>
                        {status && <p className="form-status">{status}</p>}
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
