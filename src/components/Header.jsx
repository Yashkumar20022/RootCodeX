

import { useState } from "react";
// codeverse icon imported as URL (keeps existing behavior)
import codeverseIcon from "../codeverse-icon-v2.svg?url";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sd-header sd-header-fancy">
      <nav className="sd-nav sd-nav-fancy">
        <div className="sd-brand sd-brand-fancy">
          <a className="sd-brand-link" href="https://www.rootcodetechnology.com" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            <span className="sd-logo-badge" aria-hidden>
              <img src="/RootCodex-logo.png" alt="" className="sd-brand-logo" />
            </span>
            <div className="sd-brand-text">
              <span className="sd-brand-title">Root<span className="sd-brand-accent">CodeX</span></span>
              <span className="sd-brand-sub">rootcodetechnology.com</span>
            </div>
          </a>
        </div>

        <div className={`sd-nav-links ${menuOpen ? "sd-open" : ""} sd-nav-links-fancy`}>
          <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#contact" className="sd-nav-cta sd-nav-cta-large" onClick={() => setMenuOpen(false)}>
            Contact Now
          </a>
        </div>

        <button className="sd-menu-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          ☰
        </button>
      </nav>
    </header>
  );
}
