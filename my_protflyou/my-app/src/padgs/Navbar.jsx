import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Yassin Ahmad
                </Link>
                
                <div className="navbar-menu">
                    <Link 
                        to="/" 
                        className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        About Me
                    </Link>
                    <Link 
                        to="/skills" 
                        className={`navbar-link ${location.pathname === '/skills' ? 'active' : ''}`}
                    >
                        Skills
                    </Link>
                    <Link 
                        to="/projects" 
                        className={`navbar-link ${location.pathname === '/projects' ? 'active' : ''}`}
                    >
                        Projects
                    </Link>
                    <Link 
                        to="/contact" 
                        className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
