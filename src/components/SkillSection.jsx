import React from 'react';
import { motion } from 'framer-motion';

const SkillSection = ({ skills = [] }) => {
  // Determine if skills is an array of strings or an array of objects
  const isStructured = skills.length > 0 && typeof skills[0] === 'object' && skills[0].category;

  return (
    <section id="skills" className="skills-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Technical Skills</h2>
        {skills.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--clr-text-muted)' }}>No skills added yet.</p>
        ) : (
        <div className="skills-container">
          {isStructured ? (
            skills.map((skillGroup, idx) => (
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
                  {(skillGroup.items || []).map(skill => (
                    <span key={skill} className="skill-item">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="skill-list-flat">
              {skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  className="skill-item glass"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          )}
        </div>
        )}
      </motion.div>

      <style>{`
        .section-title {
          text-align: center;
          margin-bottom: 50px;
          color: var(--clr-primary);
          text-shadow: var(--glow-red);
        }
        .skills-container {
          display: flex;
          justify-content: center;
        }
        .skill-list-flat {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          max-width: 800px;
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
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid var(--glass-border);
          transition: var(--transition);
        }
        .skill-item:hover {
          color: white;
          border-color: var(--clr-secondary);
          background: rgba(188, 19, 254, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default SkillSection;
