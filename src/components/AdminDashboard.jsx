import React, { useState } from 'react';
import AdminSidebar from './admin/AdminSidebar';
import AdminOverview from './admin/AdminOverview';
import AdminProfile from './admin/AdminProfile';
import AdminProjects from './admin/AdminProjects';
import AdminMessages from './admin/AdminMessages';
import AdminSettings from './admin/AdminSettings';

const AdminDashboard = ({ portfolioData }) => {
    const { data, updateProfile, addProject, updateProject, deleteProject, refresh } = portfolioData;
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <AdminOverview />;
            case 'profile': return <AdminProfile profile={data.profile} updateProfile={updateProfile} refresh={refresh} />;
            case 'projects': return <AdminProjects projects={data.projects} addProject={addProject} updateProject={updateProject} deleteProject={deleteProject} />;
            case 'messages': return <AdminMessages />;
            case 'logs': return <AdminLogsView />;
            case 'settings': return <AdminSettings />;
            default: return <AdminOverview />;
        }
    };

    return (
        <div className="admin-container">
            <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="admin-content">
                {renderContent()}
            </main>
            <style>{`
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
            <p style={{ color: 'var(--clr-text-muted)' }}>No logs are stored.</p>
        </div>
    </div>
);

export default AdminDashboard;
