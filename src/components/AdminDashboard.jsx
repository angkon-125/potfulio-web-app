import React, { useState } from 'react';
import AdminSidebar from './admin/AdminSidebar';
import AdminOverview from './admin/AdminOverview';
import AdminProfile from './admin/AdminProfile';
import AdminProjects from './admin/AdminProjects';
import AdminMessages from './admin/AdminMessages';
import AdminSettings from './admin/AdminSettings';
// Logs can be part of Overview or separate, let's keep it separate or reuse Overview if simple
import { Activity } from 'lucide-react';
import { systemLogs } from '../data'; // Using this if we want a separate logs view, or reuse Overview logic

const AdminDashboard = ({ portfolioData }) => {
    const { data, updateProfile, updateSkills, updateProjects, updateExperience } = portfolioData;
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <AdminOverview data={data} />;
            case 'profile': return <AdminProfile profile={data.profile} skills={data.skills} updateProfile={updateProfile} updateSkills={updateSkills} />;
            case 'projects': return <AdminProjects projects={data.projects} updateProjects={updateProjects} />;
            case 'messages': return <AdminMessages />;
            case 'logs': return <AdminLogsView />;
            case 'settings': return <AdminSettings />;
            default: return <AdminOverview data={data} />;
        }
    };

    return (
        <div className="admin-container">
            <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="admin-content">
                {renderContent()}
            </main>
            <style jsx>{`
                .admin-container {
                    display: grid;
                    grid-template-columns: 250px 1fr;
                    min-height: 100vh;
                    background: #000;
                    color: white;
                }
                .admin-content {
                    padding: 40px;
                    overflow-y: auto;
                }
                @media (max-width: 768px) {
                    .admin-container {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

// Simple internal component for Logs view if selected specifically
const AdminLogsView = () => (
    <div className="animate-fade-in">
        <h2 className="page-title">System Logs</h2>
        <div className="admin-card">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Message</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {systemLogs.map((log) => (
                        <tr key={log.id}>
                            <td style={{
                                color: log.type === 'ERROR' ? 'var(--admin-danger)' :
                                    log.type === 'WARN' ? 'var(--admin-warning)' : 'var(--admin-primary)',
                                fontWeight: 'bold'
                            }}>
                                {log.type}
                            </td>
                            <td>{log.message}</td>
                            <td style={{ color: '#888' }}>{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default AdminDashboard;
