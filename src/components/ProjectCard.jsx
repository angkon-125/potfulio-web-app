import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="project-card glass"
        >
            <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                    <div className="project-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                    {project.tech.map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .project-card {
          overflow: hidden;
          transition: var(--transition);
        }
        .project-card:hover {
          transform: translateY(-10px);
          border-color: var(--clr-primary);
          box-shadow: 0 10px 30px rgba(255, 31, 31, 0.1);
        }
        .project-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: crop;
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-image img {
          transform: scale(1.1);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        .project-links {
          display: flex;
          gap: 20px;
        }
        .project-links a {
          width: 40px;
          height: 40px;
          background: var(--clr-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .project-links a:hover {
          background: var(--clr-primary);
        }
        .project-info {
          padding: 20px;
        }
        .project-info h3 {
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: var(--clr-text);
        }
        .project-info p {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
          margin-bottom: 20px;
          height: 3.6em;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tech-tag {
          font-size: 0.7rem;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          color: var(--clr-accent);
          font-family: var(--font-display);
        }
      `}</style>
        </motion.div>
    );
};

export default ProjectCard;
