import React from 'react';
import { motion } from 'framer-motion';

const SkillSection = ({ skills }) => {
    return (
        <section id="skills" className="skills-section">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="section-title">Technical Skills</h2>
                <div className="skills-container">
                    {skills.map((skillGroup, idx) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="skill-group glass"
                        >
                            <h3>{skillGroup.category}</h3>
                            <div className="skill-list">
                                {skillGroup.items.map(skill => (
                                    <span key={skill} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <style jsx>{`
        .section-title {
          text-align: center;
          margin-bottom: 50px;
          color: var(--clr-primary);
          text-shadow: var(--glow-red);
        }
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }
        .skill-group {
          padding: 25px;
        }
        .skill-group h3 {
          font-size: 0.9rem;
          margin-bottom: 20px;
          color: var(--clr-accent);
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 10px;
        }
        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-item {
          font-size: 0.85rem;
          color: var(--clr-text-muted);
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 12px;
          border-radius: 4px;
          border: 1px solid transparent;
          transition: var(--transition);
        }
        .skill-item:hover {
          color: white;
          border-color: var(--clr-secondary);
          background: rgba(188, 19, 254, 0.1);
        }
      `}</style>
        </section>
    );
};

export default SkillSection;
