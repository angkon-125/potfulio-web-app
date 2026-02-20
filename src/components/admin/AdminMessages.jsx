import React, { useState } from 'react';
import { Mail, Star, Trash2 } from 'lucide-react';
import { initialMessages } from '../../data';
import '../../styles/admin.css';

const AdminMessages = () => {
    const [messages, setMessages] = useState(initialMessages);

    const handleDelete = (id) => {
        setMessages(messages.filter(m => m.id !== id));
    };

    const toggleRead = (id) => {
        setMessages(messages.map(m => m.id === id ? { ...m, read: !m.read } : m));
    };

    return (
        <div className="animate-fade-in">
            <h2 className="page-title">Messages Inbox</h2>

            <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                {messages.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                        No messages found.
                    </div>
                ) : (
                    <div style={{ display: 'grid' }}>
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto 1fr auto auto',
                                    gap: '1rem',
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--admin-border)',
                                    alignItems: 'center',
                                    background: msg.read ? 'transparent' : 'rgba(0,255,157,0.02)',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                className="message-item"
                                onClick={() => toggleRead(msg.id)}
                            >
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Star size={16} color={msg.read ? "#444" : "var(--admin-warning)"} />
                                    <Mail size={16} color={msg.read ? "#444" : "var(--admin-primary)"} />
                                </div>

                                <div>
                                    <div style={{ fontWeight: msg.read ? 'normal' : 'bold', color: msg.read ? '#aaa' : '#fff' }}>
                                        {msg.from}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{msg.subject}</div>
                                </div>

                                <div style={{ fontSize: '0.8rem', color: '#444' }}>
                                    {msg.date}
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                    className="btn-outline"
                                    style={{ border: 'none', color: '#666' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminMessages;
