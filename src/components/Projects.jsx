import React from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const Projects = ({ projects }) => {
    return (
        <section id="projects" className="projects-section">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </motion.div>

            <style jsx>{`
        .section-title {
          text-align: center;
          margin-bottom: 50px;
          color: var(--clr-accent);
          text-shadow: var(--glow-blue);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
      `}</style>
        </section>
    );
};

export default Projects;
