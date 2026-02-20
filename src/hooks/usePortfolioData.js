import { useState, useEffect } from 'react';

const INITIAL_DATA = {
    profile: {
        name: "Alex Dev",
        tagline: "Developer | AI Enthusiast | Creative Technologist",
        bio: "I am a results-driven developer specializing in Frontend, Backend, and AI systems. I focus on building real-world projects like AI assistants, experimental UIs, and system-level tools. My approach balances technical precision with creative problem-solving.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    skills: [
        { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
        { category: "Backend", items: ["Node.js", "REST APIs"] },
        { category: "AI / ML", items: ["AI Assistants", "Voice AI", "RAG Basics"] },
        { category: "Tools", items: ["Git", "GitHub", "SQL", "VS Code"] },
    ],
    projects: [
        {
            id: 1,
            title: "Metal Machine",
            description: "A high-impact, heavy metal inspired UI project with aggressive aesthetics.",
            tech: ["React", "CSS", "Framer Motion"],
            demo: "https://metal-machine.vercel.app/",
            github: "https://github.com/angkon-125",
            image: "https://images.unsplash.com/photo-1551033541-2075d603463b?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "Idea Cyan",
            description: "A creative ideation and brainstorming platform with a sleek, cyan-themed interface.",
            tech: ["React", "Tailwind", "Firebase"],
            demo: "https://idea-cyan.vercel.app/",
            github: "https://github.com/angkon-125",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "Weather API App",
            description: "Real-time weather forecasting application using advanced API integrations.",
            tech: ["JavaScript", "Weather API", "CSS"],
            demo: "https://weather-api-six-livid.vercel.app/",
            github: "https://github.com/angkon-125",
            image: "https://images.unsplash.com/photo-1504608512844-5a0dc780ed93?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            title: "AI Voice Assistant",
            description: "A real-time voice recognition and response system powered by Gemini API.",
            tech: ["React", "Node.js", "AI"],
            demo: "#",
            github: "https://github.com/angkon-125",
            image: "https://images.unsplash.com/photo-1589254065675-d0581bb3327d?auto=format&fit=crop&w=800&q=80"
        }
    ],
    experience: [
        {
            id: 1,
            title: "Self-Driven Learning & Projects",
            period: "2023 - Present",
            description: "Building production-ready applications, focusing on full-stack development and AI integration. Developed several open-source tools and experimental UIs."
        },
        {
            id: 2,
            title: "Freelance Developer",
            period: "2022 - 2023",
            description: "Worked with clients to deliver responsive web applications and custom automation scripts using Node.js."
        }
    ],
    contact: {
        email: "armaanjamaan@gmail.com",
        github: "https://github.com/angkon-125",
        linkedin: "https://www.linkedin.com/in/armaan-jamaan-2034762b6/"
    }
};

export const usePortfolioData = () => {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('portfolio_data');
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem('portfolio_data', JSON.stringify(data));
    }, [data]);

    const updateProfile = (profile) => setData(prev => ({ ...prev, profile }));
    const updateSkills = (skills) => setData(prev => ({ ...prev, skills }));
    const updateProjects = (projects) => setData(prev => ({ ...prev, projects }));
    const updateExperience = (experience) => setData(prev => ({ ...prev, experience }));

    return {
        data,
        updateProfile,
        updateSkills,
        updateProjects,
        updateExperience
    };
};
