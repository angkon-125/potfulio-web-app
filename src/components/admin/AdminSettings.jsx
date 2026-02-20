import React, { useState, useEffect } from 'react';
import { Save, Bell, Globe, Shield } from 'lucide-react';
import { getSettings, saveSettings } from '../../data';
import '../../styles/admin.css';

const AdminSettings = () => {
    const [settings, setSettings] = useState({ notifications: true, publicProfile: true, maintenanceMode: false });

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const handleChange = (key) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings);
        saveSettings(newSettings);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="page-title">System Settings</h2>

            <div className="admin-card">
                <h3 className="card-title">General Preferences</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div className="flex-between">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Bell color="var(--admin-primary)" />
                            <div>
                                <div style={{ fontWeight: 600 }}>Notifications</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Receive email alerts for new messages</div>
                            </div>
                        </div>
                        <Toggle checked={settings.notifications} onChange={() => handleChange('notifications')} />
                    </div>

                    <div style={{ height: '1px', background: 'var(--admin-border)' }}></div>

                    <div className="flex-between">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Globe color="var(--admin-secondary)" />
                            <div>
                                <div style={{ fontWeight: 600 }}>Public Profile</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Visible to search engines and visitors</div>
                            </div>
                        </div>
                        <Toggle checked={settings.publicProfile} onChange={() => handleChange('publicProfile')} />
                    </div>

                    <div style={{ height: '1px', background: 'var(--admin-border)' }}></div>

                    <div className="flex-between">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Shield color="var(--admin-danger)" />
                            <div>
                                <div style={{ fontWeight: 600 }}>Maintenance Mode</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Disable public access temporarily</div>
                            </div>
                        </div>
                        <Toggle checked={settings.maintenanceMode} onChange={() => handleChange('maintenanceMode')} />
                    </div>

                </div>
            </div>

            <div className="admin-card" style={{ border: '1px solid var(--admin-danger)' }}>
                <h3 className="card-title" style={{ color: 'var(--admin-danger)' }}>Danger Zone</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--admin-text-muted)' }}>Irreversible actions involving your account data.</p>
                <button className="btn btn-danger">Delete Account Data</button>
            </div>
        </div>
    );
};

// Simple Toggle Component
const Toggle = ({ checked, onChange }) => (
    <div
        onClick={onChange}
        style={{
            width: '50px',
            height: '26px',
            background: checked ? 'var(--admin-primary)' : '#333',
            borderRadius: '13px',
            padding: '2px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative'
        }}
    >
        <div style={{
            width: '22px',
            height: '22px',
            background: '#fff',
            borderRadius: '50%',
            transform: checked ? 'translateX(24px)' : 'translateX(0)',
            transition: 'transform 0.3s ease'
        }}></div>
    </div>
);

export default AdminSettings;
