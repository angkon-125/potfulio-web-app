import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Hardcoded demo password
            sessionStorage.setItem('isAdmin', 'true');
            navigate('/admin');
        } else {
            setError('ACCESS DENIED. INCORRECT CREDENTIALS.');
        }
    };

    return (
        <div className="login-page">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card glass"
            >
                <div className="login-header">
                    <Lock size={40} className="lock-icon" />
                    <h2>Secure Access</h2>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="password"
                        placeholder="ENTER PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="error-msg">{error}</p>}

                    <button type="submit" className="login-btn">Authenticate</button>
                    <p className="hint">Demo pass: admin123</p>
                </form>
            </motion.div>

            <style jsx>{`
                .login-page {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--clr-bg);
                }
                .login-card {
                    padding: 40px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                }
                .login-header {
                    margin-bottom: 30px;
                }
                .lock-icon {
                    color: var(--clr-primary);
                    margin-bottom: 20px;
                }
                .login-header h2 {
                    font-size: 1.2rem;
                    color: white;
                    letter-spacing: 2px;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                input {
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    border-radius: 5px;
                    color: white;
                    text-align: center;
                    font-family: monospace;
                    font-size: 1.1rem;
                    outline: none;
                }
                input:focus { border-color: var(--clr-primary); }
                .error-msg { color: #ff4444; font-size: 0.8rem; }
                .login-btn {
                    padding: 15px;
                    background: var(--grad-main);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                }
                .hint { font-size: 0.7rem; color: var(--clr-text-dim); margin-top: 10px; }
            `}</style>
        </div>
    );
};

export default Login;
