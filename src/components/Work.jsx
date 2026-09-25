const projects = [
  {
    tag: "Web App",
    title: "SIP Calculator",
    desc: "An interactive investment calculator with live sliders and projected returns.",
    stack: ["React", "JS", "Tailwind"],
    category: 'Fintech & Tools',
    meta: '10k+ calculations run'
  },
  {
    tag: "Dashboard",
    title: "Tech.Care Medical Dashboard",
    desc: "A clinic-style dashboard for tracking patient data, rebuilt for speed in vanilla JS.",
    stack: ["HTML/CSS", "JS"],
    category: 'Frontend & Apps',
    meta: 'Sub-50ms render latency'
  },
  {
    tag: "Full Stack",
    title: "Employee Management System",
    desc: "A full-stack system for managing employee records, attendance and workflows.",
    stack: ["React", "Node", "DB"],
    category: 'Fullstack & Cloud'
  },
  {
    tag: "Portfolio",
    title: "Personal Developer Portfolio",
    desc: "An animated portfolio site with a Three.js background and glassmorphism UI.",
    stack: ["React", "Three.js"],
    category: 'Frontend & Apps',
    url: 'https://portfolio-yash-93l6x1ke3-yash-baghele.vercel.app/'
  },
];

import { useCallback, useMemo, useRef, useState } from 'react';
import WorkBadge3D from "./WorkBadge3D.jsx";

export default function Work() {
  const [active, setActive] = useState('All Projects');
  const scrollRef = useRef(null);

  const categories = useMemo(() => ['All Projects', 'Frontend & Apps', 'Fullstack & Cloud', 'AI & Automation', 'Fintech & Tools'], []);
  const handleMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / rect.height) * 8; // rotateX
    const ry = ((x - rect.width / 2) / rect.width) * 10; // rotateY
    el.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    el.style.transition = 'transform 120ms linear';
  }, []);

  const handleLeave = useCallback((e) => {
    const el = e.currentTarget;
    el.style.transform = '';
    el.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)';
  }, []);

  const filtered = projects.filter(p => active === 'All Projects' ? true : (p.category === active));

  function scroll(dir = 1) {
    const el = scrollRef.current;
    if (!el) return;
    const offset = Math.round(el.clientWidth * 0.7) * dir;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }

  return (
    <section id="work" className="sd-wrap sd-section">
      <div className="sd-sec-head">
        <span className="sd-eyebrow">Recent builds</span>
        <h2 className="sd-serif">Work that's already shipped.</h2>
        <p>A few things built recently — real proof of what this studio can put together.</p>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:18}}>
        <div className="sd-filters">
          {categories.map(c => (
            <button key={c} className={`sd-filter-btn ${c === active ? 'sd-active' : ''}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className="sd-muted">Scroll to explore</span>
          <button className="sd-scroll-btn" onClick={() => scroll(-1)} aria-label="scroll left">‹</button>
          <button className="sd-scroll-btn" onClick={() => scroll(1)} aria-label="scroll right">›</button>
        </div>
      </div>
      <div className="sd-work-scroll">
        <div ref={scrollRef} className="sd-work-scroll-inner">
        {filtered.map((p) => (
          <div className="sd-work-card" key={p.title} tabIndex={0} onMouseMove={handleMove} onMouseLeave={handleLeave}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="sd-badge">
                <WorkBadge3D size={88} />
              </div>
              <div>
                <h3>{p.title}</h3>
                {p.meta && <div className="sd-meta-badge">{p.meta}</div>}
              </div>
            </div>
            <p>{p.desc}</p>
            <div className="sd-stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <a
              className="sd-view-link"
              href={p.url || '#'}
              onClick={p.url ? undefined : (e) => e.preventDefault()}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noopener noreferrer' : undefined}
            >
              View Project ↗
            </a>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
