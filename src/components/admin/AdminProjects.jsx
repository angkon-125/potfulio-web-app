import React, { useRef, useState } from 'react';
import { Plus, Trash2, Pencil, ImagePlus } from 'lucide-react';
import { API_BASE_URL, assetUrl, toStoredAsset } from '../../hooks/usePortfolioData';

const withProtocol = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
};

const emptyForm = {
    title: '',
    description: '',
    techStack: '',
    image: '',
    githubLink: '',
    liveLink: ''
};

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_IMAGE_BYTES = 5 * 1000 * 1000;

const AdminProjects = ({ projects = [], addProject, updateProject, deleteProject }) => {
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [preview, setPreview] = useState('');
    const [imageBroken, setImageBroken] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const projectPayload = () => ({
        title: form.title,
        description: form.description,
        techStack: form.techStack.split(',').map((item) => item.trim()).filter(Boolean),
        image: form.image.trim() ? (toStoredAsset(form.image.trim()) || form.image.trim()) : null,
        githubLink: form.githubLink.trim() ? withProtocol(form.githubLink) : null,
        liveLink: form.liveLink.trim() ? withProtocol(form.liveLink) : null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = projectPayload();
        const success = editingId
            ? await updateProject(editingId, payload)
            : await addProject(payload);

        if (success) {
            const wasEditing = Boolean(editingId);
            resetForm();
            alert(wasEditing ? 'Project updated.' : 'Project added successfully!');
        } else {
            alert(editingId ? 'Failed to update project' : 'Failed to add project');
        }
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setPreview('');
        setImageBroken(false);
    };

    const handleImageFile = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;

        if (!ACCEPTED_TYPES.includes(file.type)) {
            alert('Use a JPG, PNG, or GIF image.');
            return;
        }
        if (file.size > MAX_IMAGE_BYTES) {
            alert('Image must be 5MB or smaller.');
            return;
        }

        setPreview(URL.createObjectURL(file));
        setImageBroken(false);
        setUploading(true);
        const body = new FormData();
        body.append('image', file);

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/projects/upload`, {
                method: 'POST',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body
            });
            const result = await response.json();
            if (!result.success) {
                setPreview('');
                alert(result.error || 'Image upload failed.');
                return;
            }
            setForm((current) => ({ ...current, image: assetUrl(result.data) }));
            setPreview('');
        } catch {
            setPreview('');
            alert('Image upload failed.');
        } finally {
            setUploading(false);
        }
    };

    const startEdit = (project) => {
        setEditingId(project.id);
        setPreview('');
        setImageBroken(false);
        setForm({
            title: project.title || '',
            description: project.description || '',
            techStack: (project.techStack || []).join(', '),
            image: project.image || '',
            githubLink: project.githubLink || '',
            liveLink: project.liveLink || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const success = await deleteProject(id);
            if (!success) alert('Failed to delete project');
        }
    };

    return (
        <div className="admin-projects">
            <h2>Manage Projects</h2>

            <form className="admin-form glass" onSubmit={handleSubmit}>
                <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                <div className="form-row">
                    <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                    <input placeholder="Tech stack (comma separated)" value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} />
                </div>
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                <div className="image-field">
                    <div className="image-preview">
                        {(preview || form.image) && !imageBroken ? (
                            <img
                                src={preview || form.image}
                                alt=""
                                onError={() => setImageBroken(true)}
                            />
                        ) : (
                            <span>No image</span>
                        )}
                    </div>
                    <div className="image-actions">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            hidden
                            onChange={handleImageFile}
                        />
                        <button type="button" className="add-btn" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                            <ImagePlus size={16} /> {form.image || preview ? 'Change image' : 'Choose image'}
                        </button>
                        {(form.image || preview) ? (
                            <button
                                type="button"
                                className="delete-btn"
                                onClick={() => { setForm({ ...form, image: '' }); setPreview(''); setImageBroken(false); }}
                            >
                                Remove image
                            </button>
                        ) : null}
                        {uploading ? <span className="hint">Uploading...</span> : null}
                    </div>
                </div>
                <div className="form-row">
                    <input placeholder="GitHub link" value={form.githubLink} onChange={e => setForm({ ...form, githubLink: e.target.value })} />
                    <input placeholder="Live link" value={form.liveLink} onChange={e => setForm({ ...form, liveLink: e.target.value })} />
                </div>
                <button type="submit" className="add-btn">
                    <Plus size={18} /> {editingId ? 'Save Project' : 'Add Project'}
                </button>
                {editingId ? (
                    <button type="button" className="delete-btn" onClick={resetForm}>
                        Cancel edit
                    </button>
                ) : null}
            </form>

            {projects.length === 0 ? (
                <p style={{ color: 'var(--clr-text-muted)' }}>No projects yet.</p>
            ) : (
                <div className="project-list">
                    {projects.map(project => (
                        <div key={project.id} className="project-item glass">
                            <div className="thumb">
                                {project.image ? <img src={project.image} alt="" /> : <span>No image</span>}
                            </div>
                            <div className="item-info">
                                <h4>{project.title}</h4>
                                <p>{(project.techStack || []).join(', ') || 'No tech stack'}</p>
                                <div className="item-links">
                                    {project.githubLink ? <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a> : null}
                                    {project.liveLink ? <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live</a> : null}
                                </div>
                            </div>
                            <div className="item-actions">
                                <button type="button" onClick={() => startEdit(project)} className="edit-btn"><Pencil size={16} /> Edit</button>
                                <button type="button" onClick={() => handleDelete(project.id)} className="delete-btn"><Trash2 size={16} /> Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        .admin-projects h2 { margin-bottom: 30px; color: var(--clr-accent); }
        .admin-form { padding: 25px; margin-bottom: 40px; display: flex; flex-direction: column; gap: 15px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        input, textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 12px;
          color: white;
          border-radius: 4px;
        }
        .add-btn { background: var(--clr-accent); color: black; border: none; padding: 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 600; }
        .project-list { display: flex; flex-direction: column; gap: 15px; }
        .image-field { display: flex; gap: 16px; align-items: center; }
        .image-preview { width: 120px; height: 80px; border-radius: 8px; border: 1px solid var(--glass-border); background: #111; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; color: var(--clr-text-dim); font-size: 0.75rem; }
        .image-preview img { width: 100%; height: 100%; object-fit: cover; }
        .image-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
        .hint { font-size: 0.75rem; color: var(--clr-text-dim); }
        .project-item { padding: 15px; display: flex; gap: 16px; align-items: center; }
        .thumb { width: 72px; height: 52px; border-radius: 6px; overflow: hidden; background: #111; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--clr-text-dim); font-size: 0.65rem; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }
        .item-info { flex: 1; min-width: 0; }
        .item-info h4 { font-size: 1rem; color: white; margin-bottom: 5px; }
        .item-info p { font-size: 0.8rem; color: var(--clr-text-muted); }
        .item-links { display: flex; gap: 12px; margin-top: 6px; }
        .item-links a { color: var(--clr-accent); font-size: 0.8rem; }
        .item-actions { display: flex; gap: 8px; }
        .edit-btn, .delete-btn { background: none; border: 1px solid var(--glass-border); color: var(--clr-accent); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 8px 10px; border-radius: 4px; }
        .delete-btn { color: #ff6b6b; }
      `}</style>
        </div>
    );
};

export default AdminProjects;
