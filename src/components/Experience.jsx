import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ experience }) => {
    return (
        <section id="experience" className="experience-section">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="section-title">Learning Journey</h2>
                <div className="timeline">
                    {experience.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="timeline-item glass"
                        >
                            <div className="timeline-dot"></div>
                            <div className="timeline-header">
                                <h3>{item.title}</h3>
                                <span className="period">{item.period}</span>
                            </div>
                            <p className="timeline-desc">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <style jsx>{`
        .section-title {
          text-align: center;
          margin-bottom: 50px;
          color: var(--clr-secondary);
          text-shadow: var(--glow-purple);
        }
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, var(--clr-primary) 0%, var(--clr-secondary) 100%);
          opacity: 0.3;
        }
        .timeline-item {
          width: calc(50% - 30px);
          padding: 25px;
          position: relative;
        }
        .timeline-item:nth-child(odd) {
          align-self: flex-start;
        }
        .timeline-item:nth-child(even) {
          align-self: flex-end;
        }
        .timeline-dot {
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          background: var(--clr-accent);
          border-radius: 50%;
          box-shadow: var(--glow-blue);
          transform: translateY(-50%);
        }
        .timeline-item:nth-child(odd) .timeline-dot {
          right: -37px;
        }
        .timeline-item:nth-child(even) .timeline-dot {
          left: -37px;
        }
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .timeline-header h3 {
          font-size: 1rem;
          color: var(--clr-text);
        }
        .period {
          font-size: 0.8rem;
          color: var(--clr-accent);
          font-family: var(--font-display);
        }
        .timeline-desc {
          font-size: 0.9rem;
          color: var(--clr-text-muted);
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 20px;
          }
          .timeline-item {
            width: calc(100% - 50px);
            align-self: flex-end !important;
          }
          .timeline-dot {
            left: -37px !important;
          }
        }
      `}</style>
        </section>
    );
};

export default Experience;
