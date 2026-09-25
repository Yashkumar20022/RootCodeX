const projects = [
  {
    tag: "Web App",
    title: "SIP Calculator",
    desc: "An interactive investment calculator with live sliders and projected returns.",
    stack: ["React", "JS"],
  },
  {
    tag: "Dashboard",
    title: "Tech.Care Medical Dashboard",
    desc: "A clinic-style dashboard for tracking patient data, rebuilt for speed in vanilla JS.",
    stack: ["HTML/CSS", "JS"],
  },
  {
    tag: "Full Stack",
    title: "Employee Management System",
    desc: "A full-stack system for managing employee records, attendance and workflows.",
    stack: ["React", "Node", "DB"],
  },
  {
    tag: "Portfolio",
    title: "Personal Developer Portfolio",
    desc: "An animated portfolio site with a Three.js background and glassmorphism UI.",
    stack: ["React", "Three.js"],
  },
];

import { useCallback } from 'react';
import WorkBadge3D from "./WorkBadge3D.jsx";

export default function Work() {
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

  return (
    <section id="work" className="sd-wrap sd-section">
      <div className="sd-sec-head">
        <span className="sd-eyebrow">Recent builds</span>
        <h2 className="sd-serif">Work that's already shipped.</h2>
        <p>A few things built recently — real proof of what this studio can put together.</p>
      </div>
      <div className="sd-work-scroll">
        {projects.map((p) => (
          <div className="sd-work-card" key={p.title} tabIndex={0} onMouseMove={handleMove} onMouseLeave={handleLeave}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="sd-badge">
                <WorkBadge3D size={88} />
              </div>
              <div>
                <h3>{p.title}</h3>
              </div>
            </div>
            <p>{p.desc}</p>
            <div className="sd-stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
