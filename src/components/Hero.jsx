import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ profile }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-glow"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-container"
      >
        <motion.div
          className="hero-avatar-wrapper"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="hero-avatar-glow"></div>
          <img
            src={profile.avatar}
            alt={profile.name}
            className="hero-avatar"
          />
        </motion.div>

        <div className="hero-content">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hero-greeting"
          >
            Hello, I am
          </motion.span>

          <h1 className="hero-name">
            {profile.name}
            <span className="dot">.</span>
          </h1>

          <div className="hero-tagline-container">
            <p className="hero-tagline">{profile.tagline}</p>
          </div>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
          padding: 80px 20px;
          overflow: hidden;
        }
        .hero-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 31, 31, 0.1) 0%, rgba(188, 19, 254, 0.05) 50%, transparent 70%);
          filter: blur(60px);
          z-index: -1;
        }
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          max-width: 1000px;
          width: 100%;
        }
        .hero-avatar-wrapper {
          position: relative;
          width: 180px;
          height: 180px;
          margin-bottom: 10px;
        }
        .hero-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid var(--clr-primary);
          position: relative;
          z-index: 1;
          background: var(--clr-bg-alt);
        }
        .hero-avatar-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: var(--grad-main);
          border-radius: 50%;
          filter: blur(15px);
          opacity: 0.4;
          z-index: 0;
        }
        .hero-greeting {
          color: var(--clr-accent);
          font-family: var(--font-display);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          display: block;
          margin-bottom: 10px;
        }
        .hero-name {
          font-size: clamp(3rem, 10vw, 5rem);
          margin-bottom: 20px;
          line-height: 1;
        }
        .hero-name .dot {
          color: var(--clr-primary);
        }
        .hero-tagline {
          font-size: clamp(1rem, 3vw, 1.4rem);
          color: var(--clr-text-muted);
          max-width: 600px;
          margin: 0 auto 40px;
        }
        .hero-ctas {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        .btn {
          padding: 12px 30px;
          border-radius: 5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.8rem;
          cursor: pointer;
          display: inline-block;
          transition: all 0.3s ease;
        }
        .btn-primary {
          background: var(--grad-main);
          color: white;
          border: none;
          box-shadow: var(--glow-red);
        }
        .btn-primary:hover {
          filter: brightness(1.2);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 31, 31, 0.3);
        }
        .btn-outline {
          background: transparent;
          color: white;
          border: 1px solid var(--clr-secondary);
        }
        .btn-outline:hover {
          background: rgba(188, 19, 254, 0.1);
          transform: translateY(-2px);
          border-color: var(--clr-primary);
        }

        @media (min-width: 992px) {
          .hero-container {
            flex-direction: row;
            text-align: left;
            align-items: center;
            justify-content: center;
            gap: 60px;
          }
          .hero-avatar-wrapper {
            width: 250px;
            height: 250px;
          }
          .hero-ctas {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .hero-ctas {
            flex-direction: column;
            width: 100%;
            max-width: 250px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
