import React from 'react';
import { Users, Eye, Code, Cpu, Activity } from 'lucide-react';

const StatCard = ({ icon, title, value, change }) => (
    <div className="admin-card glass" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '20px' }}>
        <div style={{ padding: '12px', background: 'rgba(255, 31, 31, 0.1)', borderRadius: '12px', color: 'var(--clr-primary)' }}>
            {icon}
        </div>
        <div>
            <h4 style={{ color: 'var(--clr-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h4>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>{value}</div>
            <div style={{ fontSize: '0.75rem', color: parseInt(change) > 0 ? 'var(--clr-accent)' : '#ff4444' }}>
                {change > 0 ? '+' : ''}{change}% from last week
            </div>
        </div>
    </div>
);

const AdminOverview = ({ data }) => {
    return (
        <div className="admin-overview">
            <h2 className="admin-page-title">Dashboard Overview</h2>

            <div className="stats-grid">
                <StatCard icon={<Eye size={24} />} title="Total Views" value="12,450" change="12" />
                <StatCard icon={<Users size={24} />} title="Profile Visits" value="3,200" change="8" />
                <StatCard icon={<Code size={24} />} title="Projects Viewed" value={data.projects.length * 210} change="5" />
                <StatCard icon={<Cpu size={24} />} title="System Status" value="Online" change="1" />
            </div>

            <div className="overview-main-grid">
                <div className="admin-card glass activity-card">
                    <div className="card-header">
                        <h3>Recent Activity</h3>
                        <Activity size={18} color="var(--clr-primary)" />
                    </div>
                    <div className="mock-activity">
                        <div className="activity-item">
                            <span className="dot success"></span>
                            <div className="activity-text">
                                <p>System initialized successfully</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <span className="dot primary"></span>
                            <div className="activity-text">
                                <p>Profile updated by Admin</p>
                                <span>5 hours ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <span className="dot accent"></span>
                            <div className="activity-text">
                                <p>New project "AI Assistant" added</p>
                                <span>1 day ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-card glass status-card">
                    <div className="card-header">
                        <h3>Resources</h3>
                    </div>
                    <div className="resource-list">
                        <StatusItem label="CPU Usage" value={34} color="var(--clr-primary)" />
                        <StatusItem label="Memory" value={56} color="var(--clr-secondary)" />
                        <StatusItem label="Storage" value={12} color="var(--clr-accent)" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-page-title { margin-bottom: 30px; font-size: 1.5rem; color: white; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
                .overview-main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
                .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid var(--glass-border); }
                .card-header h3 { font-size: 1rem; color: var(--clr-text-muted); }
                .activity-card, .status-card { padding: 30px; }
                .mock-activity { display: flex; flex-direction: column; gap: 20px; }
                .activity-item { display: flex; gap: 15px; align-items: center; }
                .dot { width: 8px; height: 8px; border-radius: 50%; }
                .dot.success { background: #00ff9d; box-shadow: 0 0 10px #00ff9d; }
                .dot.primary { background: var(--clr-primary); box-shadow: 0 0 10px var(--clr-primary); }
                .dot.accent { background: var(--clr-accent); box-shadow: 0 0 10px var(--clr-accent); }
                .activity-text p { font-size: 0.9rem; color: var(--clr-text); }
                .activity-text span { font-size: 0.75rem; color: var(--clr-text-dim); }
                .resource-list { display: flex; flex-direction: column; gap: 20px; }

                @media (max-width: 992px) {
                    .overview-main-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

const StatusItem = ({ label, value, color }) => (
    <div className="status-item">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--clr-text-muted)' }}>{label}</span>
            <span style={{ color: 'white' }}>{value}%</span>
        </div>
        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, height: '100%', background: color, boxShadow: `0 0 10px ${color}` }}></div>
        </div>
    </div>
);

export default AdminOverview;
