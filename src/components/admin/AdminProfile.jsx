import React, { useState, useRef } from 'react';
import { Camera, Save, X, Plus, Trash2 } from 'lucide-react';
import { API_BASE_URL, assetUrl, toStoredAsset } from '../../hooks/usePortfolioData';

const emptyExperience = { title: '', period: '', description: '' };

const AdminProfile = ({ profile, updateProfile, refresh }) => {
    const [localProfile, setLocalProfile] = useState(profile);
    const [skillText, setSkillText] = useState((profile.skills || []).join(', '));
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(null);
    const [imageBroken, setImageBroken] = useState(false);
    const fileInputRef = useRef(null);

    React.useEffect(() => {
        setLocalProfile(profile);
        setSkillText((profile.skills || []).join(', '));
        setImageBroken(false);
    }, [profile]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setLocalProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (key, value) => {
        setLocalProfile(prev => ({
            ...prev,
            socials: { ...(prev.socials || {}), [key]: value }
        }));
    };

    const updateExperienceItem = (index, key, value) => {
        setLocalProfile(prev => {
            const experience = [...(prev.experience || [])];
            experience[index] = { ...experience[index], [key]: value };
            return { ...prev, experience };
        });
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!fileInputRef.current.files[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', fileInputRef.current.files[0]);

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/profile/upload`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                setLocalProfile(prev => ({ ...prev, avatar: assetUrl(result.data) }));
                setPreview(null);
                if (refresh) await refresh();
            } else {
                alert('Upload failed: ' + (result.error || 'Unknown error'));
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('Error connecting to upload server');
        } finally {
            setUploading(false);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        const skills = skillText.split(',').map((item) => item.trim()).filter(Boolean);
        const experience = (localProfile.experience || []).filter(
            (item) => item.title || item.period || item.description
        );
        const success = await updateProfile({
            ...localProfile,
            avatar: toStoredAsset(localProfile.avatar) ? localProfile.avatar : '',
            skills,
            experience
        });
        setSaving(false);
        alert(success ? 'Profile updated.' : 'Profile could not be saved.');
    };

    const avatarSrc = preview || localProfile.avatar || '';

    return (
        <div className="admin-profile">
            <h2>Edit Profile</h2>

            <div className="profile-image-section admin-card glass">
                <h3>Profile Media</h3>
                <div className="image-edit-container">
                    <div className="preview-circle">
                        {avatarSrc && !imageBroken ? (
                            <img src={avatarSrc} alt="Profile" onError={() => setImageBroken(true)} />
                        ) : null}
                        <button type="button" className="edit-overlay" onClick={() => fileInputRef.current.click()}>
                            <Camera size={20} />
                        </button>
                    </div>

                    <div className="upload-controls">
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                        />
                        {preview ? (
                            <div className="preview-actions">
                                <button type="button" className="btn-primary" onClick={handleUpload} disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Confirm Upload'}
                                </button>
                                <button type="button" className="btn-outline" onClick={() => setPreview(null)} disabled={uploading}>
                                    <X size={16} /> Cancel
                                </button>
                            </div>
                        ) : (
                            <p className="hint">Click the camera icon to select a new profile image</p>
                        )}
                    </div>
                </div>
            </div>

            <form className="admin-form glass" onSubmit={handleSaveProfile}>
                <h3>General Info</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={localProfile.name || ''} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label>Headline</label>
                    <input name="headline" value={localProfile.headline || ''} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <textarea name="bio" rows="3" value={localProfile.bio || ''} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label>About</label>
                    <textarea name="about" rows="5" value={localProfile.about || ''} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" value={localProfile.email || ''} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                    <label>GitHub</label>
                    <input value={localProfile.socials?.github || ''} onChange={(e) => handleSocialChange('github', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>LinkedIn</label>
                    <input value={localProfile.socials?.linkedin || ''} onChange={(e) => handleSocialChange('linkedin', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input value={skillText} onChange={(e) => setSkillText(e.target.value)} />
                </div>

                <h3>Experience</h3>
                {(localProfile.experience || []).map((item, index) => (
                    <div key={index} className="experience-row">
                        <input placeholder="Title" value={item.title || ''} onChange={(e) => updateExperienceItem(index, 'title', e.target.value)} />
                        <input placeholder="Period" value={item.period || ''} onChange={(e) => updateExperienceItem(index, 'period', e.target.value)} />
                        <textarea placeholder="Description" rows="2" value={item.description || ''} onChange={(e) => updateExperienceItem(index, 'description', e.target.value)} />
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => setLocalProfile(prev => ({
                                ...prev,
                                experience: prev.experience.filter((_, itemIndex) => itemIndex !== index)
                            }))}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setLocalProfile(prev => ({
                        ...prev,
                        experience: [...(prev.experience || []), { ...emptyExperience }]
                    }))}
                >
                    <Plus size={16} /> Add experience
                </button>

                <button type="submit" className="save-btn" disabled={saving}>
                    <Save size={16} /> {saving ? 'Saving...' : 'Save Content Changes'}
                </button>
            </form>

            <style>{`
        .admin-profile h2 { margin-bottom: 20px; color: var(--clr-primary); }
        .profile-image-section { margin-bottom: 25px; padding: 25px; }
        .image-edit-container { display: flex; align-items: center; gap: 30px; }
        .preview-circle { 
            position: relative; 
            width: 120px; 
            height: 120px; 
            border-radius: 50%; 
            overflow: hidden; 
            border: 3px solid var(--clr-primary);
            background: #111;
        }
        .preview-circle img { width: 100%; height: 100%; object-fit: cover; }
        .edit-overlay { 
            position: absolute; 
            inset: 0; 
            background: rgba(0,0,0,0.5); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            opacity: 0; 
            transition: 0.3s; 
            border: none; 
            color: white; 
            cursor: pointer; 
        }
        .preview-circle:hover .edit-overlay { opacity: 1; }
        .preview-actions { display: flex; gap: 10px; }
        .hint { font-size: 0.8rem; color: var(--clr-text-dim); }
        
        .admin-form { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .form-group, .experience-row { display: flex; flex-direction: column; gap: 8px; }
        label { font-size: 0.8rem; color: var(--clr-text-muted); text-transform: uppercase; }
        input, textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 10px;
          color: white;
          border-radius: 4px;
        }
        .save-btn, .btn-primary, .btn-outline, .remove-btn {
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .save-btn, .btn-primary {
          background: var(--clr-primary);
          color: white;
          border: none;
          padding: 12px;
          font-weight: 600;
          justify-content: center;
        }
        .btn-outline, .remove-btn {
          background: none;
          color: white;
          border: 1px solid var(--glass-border);
          padding: 8px 12px;
        }
        .remove-btn { color: #ff6b6b; align-self: flex-start; }
      `}</style>
        </div>
    );
};

export default AdminProfile;
