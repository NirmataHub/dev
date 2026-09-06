import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./../App.css"; 

export default function TopMenu({ activeMembers = 1420 }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar-container">
      {/* Left Section: Brand Logo & Title */}
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        <svg 
          className="brand-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span>NH-LIB</span>
      </Link>

      {/* Hamburger Toggle Button (Mobile Only) */}
      <button 
        className={`hamburger-btn ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Right Section / Dropdown Menu */}
      <nav className={`nav-wrapper ${isOpen ? 'open' : ''}`}>
        <ul className="nav-menu">
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/docs" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Docs
            </NavLink>
          </li>
          <li>
            <a 
              href="https://discord.gg" 
              target="_blank"
              rel="noopener noreferrer"
              className="discord-btn" 
              aria-label="Discord Community"
              onClick={closeMenu}
            >
              <svg 
                className="discord-icon" 
                viewBox="0 0 127.14 96.36" 
                fill="currentColor"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c3-27.38-5-51.17-19.66-72.13ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.87,53,48.8,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.1,53,91,65.69,84.69,65.69Z"/>
              </svg>
              <span className="status-dot" />
              <span>{activeMembers.toLocaleString()}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}