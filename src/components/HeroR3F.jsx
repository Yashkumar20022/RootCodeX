 //  Sirf yeh ek line rakhein
import React, { Suspense, useEffect, useRef, useState } from 'react';


// Dynamic loader: only import r3f/drei at runtime to avoid build-time missing dependency errors.
function FallbackIllustration() {
  return (
    <div className="rc-3d-wrap" aria-hidden>
      <svg className="rc-3d" viewBox="0 0 520 420" preserveAspectRatio="xMidYMid meet" role="img" aria-label="RootCode network illustration">
        <defs>
          <radialGradient id="g-orange" cx="30%" cy="20%" r="60%"><stop offset="0%" stopColor="#FFD9CC"/><stop offset="45%" stopColor="#FF9A73"/><stop offset="100%" stopColor="#FF7A59"/></radialGradient>
          <radialGradient id="g-teal" cx="20%" cy="80%" r="60%"><stop offset="0%" stopColor="#DFFCF6"/><stop offset="45%" stopColor="#58E6CF"/><stop offset="100%" stopColor="#3FD6C0"/></radialGradient>
          <radialGradient id="g-purple" cx="80%" cy="80%" r="60%"><stop offset="0%" stopColor="#F0E9FF"/><stop offset="45%" stopColor="#B89CFF"/><stop offset="100%" stopColor="#8B6CFF"/></radialGradient>
        </defs>
        <g className="rc-backdrop">
          <ellipse cx="260" cy="300" rx="160" ry="46" fill="rgba(12,10,28,0.6)" />
        </g>
        <g className="rc-rods">
          <path d="M260 80 C 320 110, 360 160, 360 260" stroke="#63E6D6" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M260 80 C 200 110, 160 180, 180 260" stroke="#FFB08A" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M180 260 C 220 280, 300 300, 360 260" stroke="#C9B3FF" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="rc-nodes">
          <g transform="translate(260,80)"><circle r="34" fill="url(#g-orange)"/></g>
          <g transform="translate(180,260)"><circle r="34" fill="url(#g-teal)"/></g>
          <g transform="translate(360,260)"><circle r="34" fill="url(#g-purple)"/></g>
        </g>
      </svg>
    </div>
  );
}

export default function HeroR3F({ maxHeight = 520, nodeScale = 1, rotationSpeed = 0.08, nodeRotationY = 0.24, nodeRotationX = 0.06, sparklesCount = 40, sparklesSize = 4 }) {
  const [r3f, setR3F] = useState(null);
  const [error, setError] = useState(false);
  const containerRef = useRef();
  const [cameraProps, setCameraProps] = useState({ position: [0, 0.85, 5.2], fov: 36 });
  const [dpr, setDpr] = useState([1, 1.4]);
  // nodes state will hold positions and radii so Scene can re-render on resize/regen
  const [nodesState, setNodesState] = useState({
    pTop: [0, 1.2, 0.6],
    pLeft: [-1.6, -0.1, 0.9],
    pRight: [1.6, -0.1, 0.9],
    rTop: 1.05,
    rLeft: 1.15,
    rRight: 1.15,
    sparkles: 60
  });
  const [seed, setSeed] = useState(0);
  const mouse = useRef([0, 0]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
      import('three')
    ]).then(([fiber, drei, THREE]) => {
      if (mounted) setR3F({ fiber, drei, THREE });
    }).catch((e) => { console.warn('r3f not available', e); setError(true); });
    return () => { mounted = false; };
  }, []);

  // Responsive camera adjustments based on container width
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        // responsive camera (more cinematic framing)
        if (w <= 420) {
          // mobile: keep camera further back to ensure full object visibility
          setCameraProps({ position: [0, 0.9, 7.2], fov: 52 });
        } else if (w <= 768) {
          // tablet: moderately back
          setCameraProps({ position: [0, 0.9, 6.2], fov: 46 });
        } else {
          // desktop: keep camera at comfortable distance so orb fits inside the column
          setCameraProps({ position: [0, 0.85, 5.2], fov: 36 });
        }

        // device pixel ratio clamped to avoid excessive GPU usage on very high dpi screens
        const deviceRatio = typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio || 1) : 1.4;
        setDpr([1, deviceRatio]);

        // regenerate node layout slightly based on width to better fit composition
        const scale = Math.max(0.6, Math.min(1.25, w / 900));
        const jitter = (Math.random() - 0.5) * 0.12; // small random offset
        setNodesState({
          pTop: [0 + jitter, 1.2 * scale, 0.8 * Math.max(0.9, scale)],
          pLeft: [-1.9 * scale, -0.1 * scale, 1.05 * Math.max(0.9, scale)],
          pRight: [1.9 * scale, -0.1 * scale, 1.05 * Math.max(0.9, scale)],
          rTop: 1.15 * (0.9 + scale * 0.6),
          rLeft: 1.25 * (0.9 + scale * 0.6),
          rRight: 1.25 * (0.9 + scale * 0.6),
          sparkles: Math.max(12, Math.round(sparklesCount * Math.min(1.25, scale * 1.1)))
        });
        // bump seed so Scene can use regenerated values
        setSeed((s) => s + 1);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef.current]);

  // graceful periodic subtle regeneration (every 8-12s) to keep visual feeling dynamic
  useEffect(() => {
    const id = setInterval(() => setSeed((s) => s + 1), 9000 + Math.round(Math.random() * 3000));
    return () => clearInterval(id);
  }, []);

  // pointer / mouse parallax handling attached to the hero art container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onPointerMove(e) {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1..1
      // limit influence
      mouse.current = [x * 0.35, -y * 0.25];
    }
    function onLeave() { mouse.current = [0, 0]; }
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('touchmove', (ev) => { if (ev.touches && ev.touches[0]) onPointerMove(ev.touches[0]); }, { passive: true });
    return () => {
      try { el.removeEventListener('pointermove', onPointerMove); el.removeEventListener('pointerleave', onLeave); } catch (e) {}
    };
  }, [containerRef.current]);

  const heroText = (
    <div>
      <span className="sd-eyebrow">Grow Your Digital Roots</span>
      <h1 className="sd-serif">Serious <span>online presence</span> for growing businesses.</h1>
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
  );

  if (!r3f || error) {
    return (
      <div className="sd-wrap sd-hero">
        <div className="sd-glow" />
        {heroText}
        <div className="sd-hero-art">
          <FallbackIllustration />
        </div>
      </div>
    );
  }

  const { fiber, drei, THREE } = r3f;
  const { Canvas, useFrame } = fiber;
  const { Float, OrbitControls, Environment, ContactShadows, Sparkles } = drei;

  function Rod({ start, end, radius = 0.18, color = '#3FD6C0' }) {
    const ref = useRef();
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return (
      <mesh ref={ref} position={mid.toArray()} quaternion={quaternion}>
        <cylinderGeometry args={[radius, radius, len, 24]} />
        <meshStandardMaterial emissive={new THREE.Color(color)} emissiveIntensity={0.7} color={color} metalness={0.6} roughness={0.2} />
      </mesh>
    );
  }

  function Node({ position, color = '#FF7A59', radius = 0.8, speed = 0.6 }) {
    const ref = useRef();
    useFrame((state, delta) => {
      if (!ref.current) return;
      ref.current.rotation.y += delta * 0.24;
      ref.current.rotation.x += delta * 0.06;
    });
    return (
      <Float floatIntensity={0.8} rotationIntensity={0.6} speed={speed}>
        <mesh ref={ref} position={position}>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.12} clearcoat={0.6} clearcoatRoughness={0.05} emissive={color} emissiveIntensity={0.02} />
        </mesh>
      </Float>
    );
  }

  function Scene() {
    // compact single orb scene: centered, responsive and interactive
    const groupRef = useRef();
    const orbRef = useRef();
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useFrame((state, delta) => {
      if (!groupRef.current || !orbRef.current) return;
      // smooth parallax towards mouse
      const [mx, my] = mouse.current || [0, 0];
      // lerp target rotations
      groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.06;

      if (!prefersReduced) {
        // continuous slow rotation of the orb itself
        orbRef.current.rotation.y += delta * 0.32;
        orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.06;
      }
    });

    // The group is centered and scaled to fit inside the hero area with padding
    return (
      <group ref={groupRef} position={[0, 0, 0]}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 6]} intensity={0.6} />
        <pointLight color={'#3FD6C0'} intensity={0.6} position={[-2, 1.5, 2]} distance={8} decay={2} />
        <pointLight color={'#8B6CFF'} intensity={0.45} position={[2, 1.2, 2]} distance={8} decay={2} />

        <group ref={orbRef} position={[0, -0.05, 0]} scale={[1.0, 1.0, 1.0]}>
          {/* Outer glossy shell */}
          <mesh>
            <sphereGeometry args={[1.0, 64, 64]} />
            <meshPhysicalMaterial color="#0e0820" metalness={0.28} roughness={0.12} clearcoat={0.9} clearcoatRoughness={0.05} reflectivity={0.6} emissive={'#2b1b5f'} emissiveIntensity={0.02} />
          </mesh>

          {/* inner luminous layer */}
          <mesh scale={[0.92, 0.92, 0.92]}>
            <sphereGeometry args={[0.82, 48, 48]} />
            <meshStandardMaterial color={'#0ff2e0'} emissive={'#3FD6C0'} emissiveIntensity={0.06} roughness={0.18} metalness={0.3} transparent opacity={0.95} />
          </mesh>

          {/* small core */}
          <mesh position={[0, 0.12, 0]} scale={[0.55, 0.55, 0.55]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhysicalMaterial color={'#FF7A59'} emissive={'#FF7A59'} emissiveIntensity={0.12} metalness={0.6} roughness={0.08} />
          </mesh>

          {/* thin torus ring for futuristic accent */}
          <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.25, 1.25, 1.25]}>
            <torusGeometry args={[1.25, 0.03, 16, 120]} />
            <meshStandardMaterial color={'#B89CFF'} emissive={'#8B6CFF'} emissiveIntensity={0.06} metalness={0.5} roughness={0.2} transparent opacity={0.95} />
          </mesh>
        </group>

        {/* subtle shadow and particles */}
        <ContactShadows position={[0, -1.1, 0]} opacity={0.6} width={3.5} blur={2} far={2.2} />
        {!prefersReduced && <Sparkles size={0.9} scale={[3, 1.6, 3]} count={18} speed={0.18} color={'#B89CFF'} />}
        <Environment preset="city" background={false} />
      </group>
    );
  }

  return (
    <div className="sd-wrap sd-hero">
      <div className="sd-glow" />
      {heroText}
      <div
        ref={containerRef}
        className="sd-hero-art sd-hero-r3f"
        style={{ width: '100%', height: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight, overflow: 'visible' }}
      >
        <Canvas camera={cameraProps} dpr={dpr} shadows={false} gl={{ antialias: true }} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <Suspense fallback={null}>
            <Scene key={seed} />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
