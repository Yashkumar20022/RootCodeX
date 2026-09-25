import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/**
 * ProjectsSection.jsx
 *
 * Tailwind + Framer Motion portfolio projects section
 * - Glassmorphic 3D cards with cursor tilt
 * - Horizontal scroll slider with left/right controls
 * - Entrance stagger + float/fade animations
 *
 * Usage: place <ProjectsSection /> where you want the projects block.
 *
 * NOTE: This component uses Tailwind utility classes. It injects a small <style>
 * block to hide native horizontal scrollbar and provide a few helper classes
 * for neon/glow outlines. If your project already contains equivalent CSS,
 * you can remove the style tag content.
 */

export default function ProjectsSection() {
  // Mocked projects as requested
  const projects = [
    {
      tag: "Web App",
      title: "SIP Calculator",
      desc: "An interactive investment calculator with live sliders and projected returns.",
      tech: ["React", "JS"],
    },
    {
      tag: "Dashboard",
      title: "Tech.Care Medical Dashboard",
      desc: "A clinic-style dashboard for tracking patient data, rebuilt for speed in vanilla JS.",
      tech: ["HTML/CSS", "JS"],
    },
    {
      tag: "Full Stack",
      title: "Employee Management System",
      desc: "A full-stack system for managing employee records, attendance and workflows.",
      tech: ["React", "Node", "DB"],
    },
    {
      tag: "Portfolio",
      title: "Personal Developer Portfolio",
      desc: "An animated portfolio site with a Three.js background and glassmorphic UI.",
      tech: ["React", "Three.js"],
    },
  ];

  const scrollerRef = useRef(null);

  // Scroll control
  function scrollBy(delta) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  // Motion parent variants for staggered entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 130, damping: 20 },
    },
  };

  // Color mapping for tech tag glow
  const tagStyle = (t) => {
    switch (t.toLowerCase()) {
      case "react":
        return {
          background: "rgba(67, 229, 212, 0.08)",
          color: "#9ef0e0",
          boxShadow: "0 6px 24px rgba(63,214,192,0.08)",
          border: "1px solid rgba(63,214,192,0.14)",
        };
      case "node":
      case "node.js":
      case "nodejs":
        return {
          background: "rgba(16,185,129,0.06)",
          color: "#7ef3b9",
          boxShadow: "0 6px 24px rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.12)",
        };
      case "js":
      case "db":
      case "html/css":
        return {
          background: "rgba(250,204,21,0.06)",
          color: "#ffea86",
          boxShadow: "0 6px 24px rgba(250,204,21,0.06)",
          border: "1px solid rgba(250,204,21,0.12)",
        };
      case "three.js":
      case "three":
        return {
          background: "rgba(139,108,255,0.06)",
          color: "#cdb7ff",
          boxShadow: "0 6px 24px rgba(139,108,255,0.06)",
          border: "1px solid rgba(139,108,255,0.12)",
        };
      default:
        return {
          background: "rgba(255,255,255,0.03)",
          color: "#ddd",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.06)",
        };
    }
  };

  // Card tilt hook factory for stable motion values per card
  function useCardTilt() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Rotate transforms based on mouse positions
    const rotateY = useTransform(mouseX, [-1, 1], [12, -12]);
    const rotateX = useTransform(mouseY, [-1, 1], [-10, 10]);

    // Smooth them with springs
    const rY = useSpring(rotateY, { stiffness: 200, damping: 18 });
    const rX = useSpring(rotateX, { stiffness: 200, damping: 18 });

    return { mouseX, mouseY, rY, rX };
  }

  return (
    <>
      {/* Small style block to hide scrollbar and provide overlay classes */}
      <style>{`
        /* hide horizontal scrollbar in modern browsers */
        .no-scrollbar::-webkit-scrollbar { height: 0.6rem; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: transparent; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        /* neon border overlay */
        .neon-outline { transition: opacity .28s ease, transform .28s ease; opacity: 0; }
        .card-hovered .neon-outline { opacity: 1; transform: scale(1.02); }
      `}</style>

      <section className="relative py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Work that's already shipped.
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            A few things built recently — real proof of what studio can put together.
          </p>
        </div>

        {/* Slider area */}
        <div className="mt-10 relative max-w-7xl mx-auto">
          {/* left arrow */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollBy(-520)}
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/6 hover:bg-white/9 transition focus:outline-none"
            title="Previous"
          >
            <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* right arrow */}
          <button
            aria-label="Scroll right"
            onClick={() => scrollBy(520)}
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/6 hover:bg-white/9 transition focus:outline-none"
            title="Next"
          >
            <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* cards row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={containerVariants}
            ref={scrollerRef}
            className="no-scrollbar scroll-smooth overflow-x-auto flex gap-6 py-6 px-4 md:px-6 md:py-8 items-stretch"
            style={{ WebkitOverflowScrolling: "touch", scrollPadding: "24px" }}
          >
            {projects.map((p, i) => {
              // per-card tilt motion values
              const { mouseX, mouseY, rY, rX } = useCardTilt();

              return (
                <motion.article
                  key={p.title}
                  className="relative flex-shrink-0"
                  variants={cardVariants}
                  initial="hidden"
                  whileHover="hover"
                  style={{
                    perspective: 1400,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* glass card container */}
                  <motion.div
                    className="card group card-hover-container relative rounded-2xl backdrop-blur-md bg-[rgba(10,12,20,0.5)] border border-white/10 min-w-[280px] md:min-w-[360px] max-w-sm p-6 md:p-8 shadow-[0_10px_40px_rgba(2,6,23,0.6)]"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width; // 0..1
                      const y = (e.clientY - rect.top) / rect.height; // 0..1
                      // normalize to -1..1
                      mouseX.set((x - 0.5) * 2);
                      mouseY.set((y - 0.5) * 2);
                    }}
                    onMouseLeave={() => {
                      mouseX.set(0);
                      mouseY.set(0);
                    }}
                    style={{
                      transformPerspective: 1400,
                      // apply rotation from motion springs
                      rotateY: rY,
                      rotateX: rX,
                      z: 0.1,
                      transition: "box-shadow .28s ease, transform .2s ease",
                    }}
                    whileHover={{
                      scale: 1.035,
                    }}
                  >
                    {/* neon outline overlay */}
                    <div
                      aria-hidden
                      className="neon-outline pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow:
                          "0 8px 40px rgba(139,108,255,0.08), inset 0 0 1px rgba(255,255,255,0.03)",
                      }}
                    />
                    {/* illuminated border on hover */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        border: "1px solid rgba(255,255,255,0.03)",
                        mixBlendMode: "screen",
                        transition: "box-shadow .28s ease, opacity .28s ease",
                        boxShadow:
                          "0 8px 40px -10px rgba(139,108,255,0.18), 0 16px 60px -30px rgba(63,214,192,0.06)",
                      }}
                    />

                    {/* content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/6 to-white/3 flex items-center justify-center border border-white/6">
                          <svg className="w-6 h-6 text-white/90" viewBox="0 0 24 24" fill="none">
                            <path d="M3 12h18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 6h18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="text-teal-300 text-sm font-semibold">{p.tag}</span>
                          <h3 className="mt-2 text-white text-lg md:text-xl font-semibold leading-tight">{p.title}</h3>
                        </div>
                      </div>

                      <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed flex-1">{p.desc}</p>

                      {/* bottom area: tags + CTA */}
                      <div className="mt-6 flex items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-3 items-center">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs md:text-sm px-3 py-1 rounded-full backdrop-blur-sm"
                              style={{
                                ...tagStyle(t),
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                paddingLeft: 10,
                                paddingRight: 10,
                                boxShadow: `${tagStyle(t).boxShadow}, 0 2px 8px rgba(0,0,0,0.25)`,
                              }}
                            >
                              <span className="font-medium" style={{ color: tagStyle(t).color }}>{t}</span>
                            </span>
                          ))}
                        </div>

                        <a
                          href="#contact"
                          className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/6 hover:bg-white/9 text-white/90 px-3 py-1.5 text-xs md:text-sm transition"
                        >
                          View
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M13 5l6 7-6 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* subtle floating badge / glow to emphasize depth */}
                  <motion.div
                    aria-hidden
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.03, type: "spring", stiffness: 90, damping: 16 }}
                    className="absolute -right-6 -bottom-6 w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-teal-300 blur-[28px] opacity-70 pointer-events-none"
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
