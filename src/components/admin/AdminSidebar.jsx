import React from 'react';
import { LayoutDashboard, User, FolderKanban, MessageSquare, Settings, LogOut, Activity } from 'lucide-react';

const AdminSidebar = ({ activeTab, onTabChange }) => {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
        { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
        { id: 'logs', label: 'System Logs', icon: <Activity size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        window.location.href = '/';
    };

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo">
                <Activity size={24} color="var(--clr-primary)" />
                <span>NEXUS<span>PORT</span></span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <button onClick={handleLogout} className="logout-btn">
                <LogOut size={20} />
                <span>Logout</span>
            </button>

            <style jsx>{`
                .admin-sidebar {
                    background: rgba(10, 10, 10, 0.95);
                    border-right: 1px solid var(--glass-border);
                    display: flex;
                    flex-direction: column;
                    padding: 30px 20px;
                    height: 100vh;
                }
                .sidebar-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: var(--font-display);
                    font-size: 1.2rem;
                    margin-bottom: 50px;
                    letter-spacing: 1px;
                }
                .sidebar-logo span span { color: var(--clr-primary); }
                .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 10px; }
                .nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 15px;
                    background: none;
                    border: none;
                    color: var(--clr-text-muted);
                    cursor: pointer;
                    border-radius: 8px;
                    transition: var(--transition);
                    font-size: 0.9rem;
                    width: 100%;
                }
                .nav-btn:hover { background: rgba(255, 255, 255, 0.05); color: white; }
                .nav-btn.active { background: var(--clr-primary); color: white; box-shadow: var(--glow-red); }
                .logout-btn {
                    margin-top: auto;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px 15px;
                    background: none;
                    border: 1px solid rgba(255, 68, 68, 0.2);
                    color: #ff4444;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: var(--transition);
                }
                .logout-btn:hover { background: rgba(255, 68, 68, 0.1); }
            `}</style>
        </aside>
    );
};

export default AdminSidebar;
