export default function Hero() {

  return (
    <div className="sd-wrap sd-hero">
      <div className="sd-glow" />
      <div>
        <span className="sd-eyebrow">Grow Your Digital Roots</span>
        <h1 className="sd-serif">
          Serious <span>online presence</span> for growing businesses.
        </h1>
        <p style={{ marginTop: 20 }}>
          RootCode Technology is a small studio building websites, apps and digital marketing
          for small and growing businesses — direct communication, honest pricing, and
          work you can actually launch with.
        </p>
        <div className="sd-hero-actions">
          <a href="#contact" className="sd-btn-primary">Start your project</a>
          <a href="#work" className="sd-btn-ghost">See the work</a>
        </div>
      </div>

      <div className="sd-hero-art">
        <div className="rc-3d-wrap" aria-hidden={false}>
          <svg className="rc-3d" viewBox="0 0 520 420" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Animated RootCode network illustration">
            <defs>
              <radialGradient id="g-orange" cx="30%" cy="20%" r="60%">
                <stop offset="0%" stopColor="#FFD9CC" />
                <stop offset="45%" stopColor="#FF9A73" />
                <stop offset="100%" stopColor="#FF7A59" />
              </radialGradient>
              <radialGradient id="g-teal" cx="20%" cy="80%" r="60%">
                <stop offset="0%" stopColor="#DFFCF6" />
                <stop offset="45%" stopColor="#58E6CF" />
                <stop offset="100%" stopColor="#3FD6C0" />
              </radialGradient>
              <radialGradient id="g-purple" cx="80%" cy="80%" r="60%">
                <stop offset="0%" stopColor="#F0E9FF" />
                <stop offset="45%" stopColor="#B89CFF" />
                <stop offset="100%" stopColor="#8B6CFF" />
              </radialGradient>

              <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="12" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" result="soft" />
                <feMerge><feMergeNode in="soft"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>

              <linearGradient id="rod-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3FD6C0" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#B89CFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FF8B6A" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="rod-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* soft backdrop glow */}
            <g className="rc-backdrop">
              <ellipse cx="260" cy="300" rx="160" ry="46" fill="rgba(12,10,28,0.6)" filter="url(#soft)" />
              <ellipse cx="260" cy="305" rx="120" ry="34" fill="rgba(63,214,192,0.035)" />
            </g>

            {/* circular platform */}
            <g className="rc-platform" opacity="0.9">
              <ellipse className="rc-platform-shadow" cx="260" cy="320" rx="140" ry="34" fill="#060512" opacity="0.6" filter="url(#soft)" />
              <ellipse className="rc-platform-top" cx="260" cy="318" rx="88" ry="20" fill="url(#g-purple)" opacity="0.06" />
            </g>

            {/* connectors (glowing rods) */}
            <g className="rc-rods" strokeLinecap="round" strokeLinejoin="round">
              <path className="rc-rod" d="M260 80 C 320 110, 360 160, 360 260" stroke="url(#rod-grad)" strokeWidth="18" fill="none" filter="url(#glow)" />
              <path className="rc-rod-light" d="M260 80 C 320 110, 360 160, 360 260" stroke="url(#rod-highlight)" strokeWidth="4" fill="none" opacity="0.9" style={{mixBlendMode: 'screen'}} />

              <path className="rc-rod" d="M260 80 C 200 110, 160 180, 180 260" stroke="url(#rod-grad)" strokeWidth="18" fill="none" filter="url(#glow)" />
              <path className="rc-rod-light" d="M260 80 C 200 110, 160 180, 180 260" stroke="url(#rod-highlight)" strokeWidth="4" fill="none" opacity="0.9" style={{mixBlendMode: 'screen'}} />

              <path className="rc-rod" d="M180 260 C 220 280, 300 300, 360 260" stroke="url(#rod-grad)" strokeWidth="14" fill="none" opacity="0.95" filter="url(#glow)" />
              <path className="rc-rod-light" d="M180 260 C 220 280, 300 300, 360 260" stroke="url(#rod-highlight)" strokeWidth="3" fill="none" opacity="0.9" style={{mixBlendMode: 'screen'}} />
            </g>

            {/* orbital rings */}
            <g className="rc-orbits" stroke="#6F56D6" strokeWidth="1" fill="none" opacity="0.12">
              <ellipse className="rc-orbit rc-orbit-1" cx="260" cy="120" rx="128" ry="86" />
              <ellipse className="rc-orbit rc-orbit-2" cx="260" cy="220" rx="170" ry="110" />
            </g>

            {/* glossy spheres */}
            <g className="rc-nodes">
              <g className="rc-node rc-node-top" transform="translate(260,80)">
                <circle className="rc-aura" r="68" fill="url(#g-orange)" opacity="0.12" filter="url(#soft)" />
                <circle className="rc-sphere" r="34" fill="url(#g-orange)" />
                <ellipse className="rc-spec" rx="14" ry="6" cx="-8" cy="-12" fill="#ffffff" opacity="0.12" />
              </g>

              <g className="rc-node rc-node-left" transform="translate(180,260)">
                <circle className="rc-aura" r="64" fill="url(#g-teal)" opacity="0.12" filter="url(#soft)" />
                <circle className="rc-sphere" r="34" fill="url(#g-teal)" />
                <ellipse className="rc-spec" rx="14" ry="6" cx="-8" cy="-12" fill="#ffffff" opacity="0.09" />
              </g>

              <g className="rc-node rc-node-right" transform="translate(360,260)">
                <circle className="rc-aura" r="64" fill="url(#g-purple)" opacity="0.12" filter="url(#soft)" />
                <circle className="rc-sphere" r="34" fill="url(#g-purple)" />
                <ellipse className="rc-spec" rx="14" ry="6" cx="-8" cy="-12" fill="#ffffff" opacity="0.09" />
              </g>
            </g>

            {/* light sweep overlay */}
            <rect className="rc-sweep" x="0" y="0" width="520" height="420" fill="url(#sweep)" style={{mixBlendMode: 'overlay'}} />
          </svg>

          <div className="rc-particles">
            <span className="rc-dot rc-dot-1" />
            <span className="rc-dot rc-dot-2" />
            <span className="rc-dot rc-dot-3" />
            <span className="rc-dot rc-dot-4" />
            <span className="rc-dot rc-dot-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
