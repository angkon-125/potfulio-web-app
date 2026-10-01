import React, { useEffect, useState } from 'react';
import { FolderKanban, Mail, MailOpen } from 'lucide-react';
import { API_BASE_URL } from '../../hooks/usePortfolioData';

const StatCard = ({ icon, title, value }) => (
    <div className="admin-card glass" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '20px' }}>
        <div style={{ padding: '12px', background: 'rgba(255, 31, 31, 0.1)', borderRadius: '12px', color: 'var(--clr-primary)' }}>
            {icon}
        </div>
        <div>
            <h4 style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>{value}</div>
        </div>
    </div>
);

const AdminOverview = () => {
    const [stats, setStats] = useState({ projectCount: 0, messageCount: 0, unreadMessages: 0 });

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!API_BASE_URL || !token) return;

        fetch(`${API_BASE_URL}/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success && result.data) setStats(result.data);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="admin-overview">
            <h2 className="admin-page-title">Dashboard Overview</h2>
            <div className="stats-grid">
                <StatCard icon={<FolderKanban size={24} />} title="Projects" value={stats.projectCount} />
                <StatCard icon={<Mail size={24} />} title="Messages" value={stats.messageCount} />
                <StatCard icon={<MailOpen size={24} />} title="Unread" value={stats.unreadMessages} />
            </div>
            <style>{`
                .admin-page-title { margin-bottom: 30px; font-size: 1.5rem; color: white; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
            `}</style>
        </div>
    );
};

export default AdminOverview;
