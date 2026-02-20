import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} DEVHUB. All rights reserved.</p>
                <p className="footer-credit">Built with React & Passion</p>
            </div>

            <style jsx>{`
        .footer {
          padding: 40px 0;
          border-top: 1px solid var(--glass-border);
          text-align: center;
          background: var(--clr-bg);
        }
        .footer-content {
          color: var(--clr-text-dim);
          font-size: 0.9rem;
        }
        .footer-credit {
          margin-top: 10px;
          font-size: 0.8rem;
          color: var(--clr-text-dim);
          opacity: 0.6;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
