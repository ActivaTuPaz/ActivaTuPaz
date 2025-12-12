import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  // Logic lifted to parent (Navbar)

  // Just a button that calls the prop function

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      <style jsx="true">{`
        .theme-toggle {
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: var(--primary);
          color: var(--text-on-primary);
        }
      `}</style>
    </button>
  );
};

export default ThemeToggle;
