import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const AdminProjects = ({ projects, updateProjects }) => {
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', tech: '', image: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        const newProject = {
            ...form,
            id: Date.now(),
            tech: form.tech.split(',').map(t => t.trim()),
            github: '#',
            demo: '#'
        };
        updateProjects([...projects, newProject]);
        setForm({ title: '', description: '', tech: '', image: '' });
    };

    const handleDelete = (id) => {
        updateProjects(projects.filter(p => p.id !== id));
    };

    return (
        <div className="admin-projects">
            <h2>Manage Projects</h2>

            <form className="admin-form glass" onSubmit={handleAdd}>
                <h3>Add New Project</h3>
                <div className="form-row">
                    <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                    <input placeholder="Tech (comma separated)" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} />
                </div>
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                <button type="submit" className="add-btn"><Plus size={18} /> Add Project</button>
            </form>

            <div className="project-list">
                {projects.map(project => (
                    <div key={project.id} className="project-item glass">
                        <div className="item-info">
                            <h4>{project.title}</h4>
                            <p>{project.tech.join(', ')}</p>
                        </div>
                        <button onClick={() => handleDelete(project.id)} className="delete-btn"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>

            <style jsx>{`
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
        .project-item { padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; }
        .item-info h4 { font-size: 1rem; color: white; margin-bottom: 5px; }
        .item-info p { font-size: 0.8rem; color: var(--clr-text-muted); }
        .delete-btn { background: none; border: none; color: #ff4444; cursor: pointer; }
      `}</style>
        </div>
    );
};

export default AdminProjects;
