export const initialProjects = [
    {
        id: 1,
        title: "Metal Machine",
        description: "A high-impact, heavy metal inspired UI project with aggressive aesthetics.",
        tags: ["React", "CSS", "Framer Motion"],
        image: "https://placehold.co/600x400/111/ff0000?text=Metal+Machine",
        demo: "https://metal-machine.vercel.app/"
    },
    {
        id: 2,
        title: "Idea Cyan",
        description: "A creative ideation and brainstorming platform with a sleek, cyan-themed interface.",
        tags: ["React", "Tailwind", "Design"],
        image: "https://placehold.co/600x400/111/00ffff?text=Idea+Cyan",
        demo: "https://idea-cyan.vercel.app/"
    },
    {
        id: 3,
        title: "Weather API App",
        description: "Real-time weather forecasting application using advanced API integrations.",
        tags: ["JavaScript", "Weather API", "CSS"],
        image: "https://placehold.co/600x400/111/00b8ff?text=Weather+App",
        demo: "https://weather-api-six-livid.vercel.app/"
    },
    {
        id: 4,
        title: "Voice Clone Assistant",
        description: "AI-powered voice assistant capable of cloning voices from short samples.",
        tags: ["Python", "PyTorch", "React"],
        image: "https://placehold.co/600x400/111/00ff9d?text=Voice+AI",
        demo: "#"
    }
];

export const skills = [
    { category: "Frontend", items: ["React", "Three.js", "TypeScript", "Tailwind/CSS", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "GraphQL", "Redis"] },
    { category: "AI / ML", items: ["PyTorch", "LangChain", "RAG Systems", "Voice Cloning", "Computer Vision"] },
    { category: "Creative", items: ["Web Audio API", "GLSL Shaders", "UI/UX Design", "Sound Design"] }
];

// Helper to get projects (localStorage or default)
export const getProjects = () => {
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
        return JSON.parse(stored);
    }
    return initialProjects;
};

// Helper to save projects
export const saveProjects = (projects) => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    // Dispatch a custom event so components can listen for updates
    window.dispatchEvent(new Event('projectsUpdated'));
};

const initialProfile = {
    name: "Alex 'AntiGravity' Code",
    role: "Full Stack Cyberpunk Developer",
    bio: "Building the future, one line of code at a time. Specialized in React, AI systems, and heavy metal UIs.",
    avatar: "https://placehold.co/400x400/111/00ff9d?text=AC",
    email: "alex@antigravity.dev",
    socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
    },
    skills: ["React", "Node.js", "AI/ML", "Three.js", "Cybersecurity"]
};

export const getProfile = () => {
    const stored = localStorage.getItem('portfolio_profile');
    return stored ? JSON.parse(stored) : initialProfile;
};

export const saveProfile = (profile) => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
    window.dispatchEvent(new Event('profileUpdated'));
};

export const initialMessages = [
    { id: 1, from: "Recruiter Corp", subject: "Job Opportunity", date: "2025-12-10", read: false },
    { id: 2, from: "Fan Base", subject: "Love the OS concept!", date: "2025-12-09", read: true },
    { id: 3, from: "System", subject: "Server Alert", date: "2025-12-08", read: true }
];

export const systemLogs = [
    { id: 1, type: "INFO", message: "System boot sequence initiated", timestamp: "10:00 AM" },
    { id: 2, type: "WARN", message: "High memory usage detected", timestamp: "11:30 AM" },
    { id: 3, type: "ERROR", message: "Failed to load external font resource", timestamp: "02:15 PM" },
    { id: 4, type: "SUCCESS", message: "Deployment to production successful", timestamp: "04:45 PM" }
];

export const getSettings = () => {
    const stored = localStorage.getItem('portfolio_settings');
    return stored ? JSON.parse(stored) : { notifications: true, publicProfile: true, maintenanceMode: false };
};

export const saveSettings = (settings) => {
    localStorage.setItem('portfolio_settings', JSON.stringify(settings));
};

