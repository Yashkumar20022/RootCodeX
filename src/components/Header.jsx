

import { useState } from "react";
// import svg as URL to ensure bundler returns a usable path
import codeverseIcon from "../codeverse-icon-v2.svg?url";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sd-header">
      <nav className="sd-nav">
        <div className="sd-brand">
          <svg role="img" aria-label="RootCode Technology logo" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="18" r="2.4" fill="#3FD6C0" />
            <circle cx="18" cy="6" r="2.4" fill="#FF7A59" />
            <circle cx="18" cy="18" r="2.4" fill="#8B6CFF" />
            <path d="M8 17 L16 7" stroke="#332C57" strokeWidth="1.4" />
            <path d="M8.5 18 L16 18" stroke="#332C57" strokeWidth="1.4" />
          </svg>
          RootCode Technology
          <img src={codeverseIcon} alt="codeverse" className="sd-codeverse-icon" />
        </div>
        <div className={`sd-nav-links ${menuOpen ? "sd-open" : ""}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#contact" className="sd-nav-cta" onClick={() => setMenuOpen(false)}>
            Get a quote
          </a>
        </div>
        <button className="sd-menu-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          ☰
        </button>
      </nav>
    </header>
  );
}
