import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { API_BASE_URL } from '../hooks/usePortfolioData';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (!API_BASE_URL) {
                setError('API address is not configured.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'admin', password })
            });

            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem('isAdmin', 'true');
                sessionStorage.setItem('token', data.token);
                navigate('/admin');
            } else {
                setError(data.error || 'ACCESS DENIED. INCORRECT CREDENTIALS.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('CONNECTION ERROR. SERVER MIGHT BE OFFLINE.');
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
