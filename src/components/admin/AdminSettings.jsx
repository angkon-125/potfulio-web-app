import React from 'react';
import '../../styles/admin.css';

const AdminSettings = () => {
    return (
        <div className="animate-fade-in">
            <h2 className="page-title">System Settings</h2>
            <div className="admin-card">
                <h3 className="card-title">Browser only</h3>
                <p style={{ color: 'var(--admin-text-muted)' }}>
                    There are no site-wide settings. Changes to the public portfolio are saved from Profile and Projects.
                </p>
            </div>
        </div>
    );
};

export default AdminSettings;
