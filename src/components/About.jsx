import React from 'react';
import { motion } from 'framer-motion';

const About = ({ profile }) => {
    return (
        <section id="about" className="about-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="about-container"
            >
                <h2 className="section-title">About Me</h2>
                <div className="about-content glass">
                    <div className="about-text">
                        {profile.bio || profile.about ? (
                            <>
                                {profile.bio ? <p className="bio-highlight">{profile.bio}</p> : null}
                                {profile.about ? <p className="bio-highlight">{profile.about}</p> : null}
                            </>
                        ) : (
                            <p className="bio-highlight">No about information yet.</p>
                        )}
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .about-section {
          position: relative;
        }
        .section-title {
          text-align: center;
          margin-bottom: 50px;
          color: var(--clr-primary);
          text-shadow: var(--glow-red);
        }
        .about-content {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .bio-highlight {
          font-size: 1.1rem;
          color: var(--clr-text-muted);
          line-height: 1.8;
          margin-bottom: 30px;
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid var(--clr-secondary);
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--clr-text-dim);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .stat-value {
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--clr-text);
        }
      `}</style>
        </section>
    );
};

export default About;
