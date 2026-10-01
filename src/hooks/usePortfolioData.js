import { useState, useEffect, useCallback } from 'react';

export const API_SERVER_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const API_BASE_URL = API_SERVER_URL ? `${API_SERVER_URL}/api` : '';

const emptyProfile = {
    name: '',
    headline: '',
    bio: '',
    about: '',
    avatar: '',
    email: '',
    socials: {},
    skills: [],
    experience: []
};

export const assetUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (!API_SERVER_URL) return '';
    return `${API_SERVER_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

export const toStoredAsset = (url) => {
    if (!url || url.startsWith('blob:') || url.startsWith('data:')) return '';
    if (API_SERVER_URL && url.startsWith(API_SERVER_URL)) {
        return url.slice(API_SERVER_URL.length) || '';
    }
    return url;
};

const asArray = (value) => (Array.isArray(value) ? value : []);

export const normalizeProfile = (raw = {}) => ({
    name: raw.name || '',
    headline: raw.headline || raw.title || '',
    bio: raw.bio || '',
    about: raw.about || '',
    avatar: assetUrl(raw.avatar || raw.image || ''),
    email: raw.email || '',
    socials: raw.socials && typeof raw.socials === 'object' ? raw.socials : {},
    skills: asArray(raw.skills),
    experience: asArray(raw.experience)
});

export const normalizeProject = (raw = {}) => {
    let techStack = raw.techStack;
    if (typeof techStack === 'string') {
        try {
            techStack = JSON.parse(techStack);
        } catch {
            techStack = techStack.split(',').map((item) => item.trim()).filter(Boolean);
        }
    }
    return {
        ...raw,
        title: raw.title || '',
        description: raw.description || '',
        image: assetUrl(raw.image || ''),
        techStack: asArray(techStack),
        githubLink: raw.githubLink || '',
        liveLink: raw.liveLink || ''
    };
};

const profilePayload = (profile) => ({
    name: profile.name || '',
    headline: profile.headline || '',
    bio: profile.bio || '',
    about: profile.about || '',
    avatar: toStoredAsset(profile.avatar),
    email: profile.email || '',
    socials: profile.socials && typeof profile.socials === 'object' ? profile.socials : {},
    skills: asArray(profile.skills),
    experience: asArray(profile.experience)
});

export const usePortfolioData = () => {
    const [data, setData] = useState({ profile: emptyProfile, projects: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!API_BASE_URL) {
            setError('VITE_API_URL is not set.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const [profileRes, projectsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/profile/public`),
                fetch(`${API_BASE_URL}/projects`)
            ]);

            const profileData = await profileRes.json();
            const projectsData = await projectsRes.json();

            setData({
                profile: profileData.success ? normalizeProfile(profileData.data) : emptyProfile,
                projects: projectsData.success ? asArray(projectsData.data).map(normalizeProject) : []
            });
            setError(profileData.success || projectsData.success ? null : 'Could not load portfolio data.');
        } catch (err) {
            console.error('Error fetching portfolio data:', err);
            setError('Failed to connect to API.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const authHeaders = () => {
        const token = sessionStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    };

    const updateProfile = async (updatedProfile) => {
        try {
            const response = await fetch(`${API_BASE_URL}/profile/admin`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(profilePayload(updatedProfile))
            });

            const result = await response.json();
            if (result.success) {
                setData((prev) => ({
                    ...prev,
                    profile: normalizeProfile(result.data)
                }));
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error updating profile:', err);
            return false;
        }
    };

    const addProject = async (project) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify(project)
            });

            const result = await response.json();
            if (result.success) {
                setData((prev) => ({
                    ...prev,
                    projects: [normalizeProject(result.data), ...prev.projects]
                }));
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error adding project:', err);
            return false;
        }
    };

    const updateProject = async (id, project) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(project)
            });

            const result = await response.json();
            if (result.success) {
                setData((prev) => ({
                    ...prev,
                    projects: prev.projects.map((item) => (
                        item.id === id ? normalizeProject(result.data) : item
                    ))
                }));
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error updating project:', err);
            return false;
        }
    };

    const deleteProject = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'DELETE',
                headers: authHeaders()
            });

            const result = await response.json();
            if (result.success) {
                setData((prev) => ({
                    ...prev,
                    projects: prev.projects.filter((project) => project.id !== id)
                }));
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error deleting project:', err);
            return false;
        }
    };

    return {
        data,
        loading,
        error,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        refresh: fetchData
    };
};
