import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="navigation">
            <h1 className="app-title">LLM Testing Platform</h1>
            <ul className="nav-links">
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/">Home</Link>
                </li>
                <li className={location.pathname === '/questions' ? 'active' : ''}>
                    <Link to="/questions">Questions Management</Link>
                </li>
                <li className={location.pathname === '/models' ? 'active' : ''}>
                    <Link to="/models">Model Management</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;