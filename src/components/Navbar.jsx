import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

import logoWhite from '../assets/logo/white.png';
import logoDark from '../assets/logo/dark.png';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Theme state moved to App.jsx

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // toggleTheme moved to App.jsx

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Talleres', href: '#services' },
    { name: 'Contacto', href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo-container">
          <img
            src={theme === 'light' ? logoWhite : logoDark}
            alt="Constelaciones Logo"
            className="navbar-logo"
          />
        </div>

        <div className="desktop-menu">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        <div className="mobile-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="mobile-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx="true">{`
        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 64px; /* Explicit height to match body padding */
          z-index: 1000;
          padding: 0; /* Use flex align instead of padding */
          transition: all 0.3s ease;
          background-color: var(--bg-main);
          box-shadow: 0 2px 10px rgba(var(--shadow-color), 0.1);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
        }

        .navbar.scrolled {
          /* Scrolled state can just reinforce shadow if needed, or arguably be same */
          box-shadow: 0 4px 15px rgba(var(--shadow-color), 0.15);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%; /* Ensure it takes full available width in the flex parent */
        }

        .navbar-logo {
          height: 40px; /* Fits nicely in 64px navbar */
          width: auto;
          display: block;
          transition: opacity 0.3s ease;
          border-radius: 0; /* Override global img border-radius */
        }

        .desktop-menu {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-main);
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }
        
        .mobile-actions {
          display: none;
          gap: 15px;
          align-items: center;
        }

        .mobile-toggle {
          cursor: pointer;
          color: var(--primary);
          background: transparent;
          border: 1px solid var(--primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .mobile-toggle:hover {
          background: var(--primary);
          color: var(--text-on-primary);
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: var(--bg-main);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          box-shadow: 0 4px 20px rgba(var(--shadow-color),0.1);
          border-bottom: 1px solid var(--border);
        }

        .mobile-link {
          font-size: 1.1rem;
          font-weight: 500;
          padding: 15px;
          color: var(--text-main);
          border-bottom: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
          .mobile-actions {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
