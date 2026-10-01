import React, { useEffect, useState } from 'react';
import { Mail, Star, Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../../hooks/usePortfolioData';
import '../../styles/admin.css';

const authHeaders = () => {
    const token = sessionStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(API_BASE_URL ? '' : 'API address is not configured.');

    useEffect(() => {
        if (!API_BASE_URL) return undefined;

        let cancelled = false;
        fetch(`${API_BASE_URL}/contact/messages`, { headers: authHeaders() })
            .then((response) => response.json())
            .then((result) => {
                if (cancelled) return;
                if (result.success) setMessages(result.data || []);
                else setError(result.error || 'Could not load messages.');
            })
            .catch(() => {
                if (!cancelled) setError('Could not load messages.');
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact/messages/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });
            const result = await response.json();
            if (result.success) {
                setMessages((current) => current.filter((message) => message.id !== id));
            }
        } catch {
            setError('Could not delete the message.');
        }
    };

    const toggleRead = async (message) => {
        try {
            const response = await fetch(`${API_BASE_URL}/contact/messages/${message.id}/read`, {
                method: 'PUT',
                headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: !message.read })
            });
            const result = await response.json();
            if (result.success) {
                setMessages((current) => current.map((item) => (
                    item.id === message.id ? { ...item, read: !message.read } : item
                )));
            }
        } catch {
            setError('Could not update the message.');
        }
    };

    return (
        <div className="animate-fade-in">
            <h2 className="page-title">Messages Inbox</h2>
            {error ? <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p> : null}

            <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                {messages.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                        No messages yet.
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
                                onClick={() => toggleRead(msg)}
                            >
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Star size={16} color={msg.read ? "#444" : "var(--admin-warning)"} />
                                    <Mail size={16} color={msg.read ? "#444" : "var(--admin-primary)"} />
                                </div>

                                <div>
                                    <div style={{ fontWeight: msg.read ? 'normal' : 'bold', color: msg.read ? '#aaa' : '#fff' }}>
                                        {msg.name} {msg.email ? `· ${msg.email}` : ''}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#888' }}>{msg.subject}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{msg.message}</div>
                                </div>

                                <div style={{ fontSize: '0.8rem', color: '#444' }}>
                                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
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
