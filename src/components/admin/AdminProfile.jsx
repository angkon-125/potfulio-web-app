import React, { useState } from 'react';

const AdminProfile = ({ profile, skills, updateProfile, updateSkills }) => {
    const [localProfile, setLocalProfile] = useState(profile);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        updateProfile(localProfile);
        alert('Profile updated locally!');
    };

    return (
        <div className="admin-profile">
            <h2>Edit Profile</h2>
            <form className="admin-form glass" onSubmit={handleSaveProfile}>
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={localProfile.name} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label>Tagline</label>
                    <input name="tagline" value={localProfile.tagline} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <textarea name="bio" rows="5" value={localProfile.bio} onChange={handleProfileChange} />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
            </form>

            <style jsx>{`
        .admin-profile h2 { margin-bottom: 20px; color: var(--clr-primary); }
        .admin-form { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        label { font-size: 0.8rem; color: var(--clr-text-muted); text-transform: uppercase; }
        input, textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 10px;
          color: white;
          border-radius: 4px;
        }
        .save-btn {
          background: var(--clr-primary);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
        </div>
    );
};

export default AdminProfile;
