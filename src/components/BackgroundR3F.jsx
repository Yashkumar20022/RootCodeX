import React, { useEffect, useRef, useState } from 'react';



export default function BackgroundR3F() {
  const [r3f, setR3F] = useState(null);
  const containerRef = useRef();
  const mouse = useRef([0, 0]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      import('@react-three/fiber'),
      import('@react-three/drei'),
      import('three')
    ])
      .then(([fiber, drei, THREE]) => {
        if (mounted) setR3F({ fiber, drei, THREE });
      })
      .catch(() => {
        // silent fail: background is decorative
      });

    return () => { mounted = false; };
  }, []);

  // global pointer listener for subtle parallax (must run on every render, keep hook order stable)
  useEffect(() => {
    function onPointer(e) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      // reduce magnitude for subtle effect
      mouse.current = [x * 0.18, -y * 0.12];
    }
    function onLeave() { mouse.current = [0, 0]; }
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('touchmove', (ev) => { if (ev.touches && ev.touches[0]) onPointer(ev.touches[0]); }, { passive: true });
    return () => { window.removeEventListener('pointermove', onPointer); window.removeEventListener('pointerleave', onLeave); };
  }, []);

  if (!r3f) {
    return <div ref={containerRef} className="sd-bg-placeholder" aria-hidden />;
  }

  const { fiber, drei, THREE } = r3f;
  const { Canvas, useFrame } = fiber;
  const { Stars } = drei;

  function Particles() {
    const ref = useRef();
    const dummy = new THREE.Object3D();
    const count = Math.max(20, Math.floor((typeof window !== 'undefined' ? window.innerWidth : 1200) / 40));

    // initialize positions in ref.userData
    const positions = useRef(Array.from({ length: count }).map(() => [
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 40
    ]));

    useFrame(({ clock }) => {
      if (!ref.current) return;
      const t = clock.getElapsedTime() * 0.08;
      // subtle global parallax based on mouse
      const mx = (mouse.current && mouse.current[0]) || 0;
      const my = (mouse.current && mouse.current[1]) || 0;
      for (let i = 0; i < count; i++) {
        const p = positions.current[i];
        const rx = Math.sin(t + i) * 0.05;
        const ry = Math.cos(t * 0.6 + i) * 0.05;
        // apply very subtle parallax offset scaled by index
        const px = p[0] + Math.sin(t * (0.2 + i * 0.01)) * 0.25 + mx * (0.6 + (i / count) * 0.8);
        const py = p[1] + Math.cos(t * (0.15 + i * 0.01)) * 0.25 + my * (0.35 + (i / count) * 0.5);
        dummy.position.set(px, py, p[2]);
        dummy.scale.setScalar(0.14 + (Math.sin(t * (0.6 + i * 0.01)) + 1) * 0.06);
        dummy.rotation.set(rx, ry, rx + ry);
        dummy.updateMatrix();
        ref.current.setMatrixAt(i, dummy.matrix);
      }
      ref.current.instanceMatrix.needsUpdate = true;
    });

    return (
      <instancedMesh ref={ref} args={[null, null, count]} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color={'#8B6CFF'} emissive={'#63E6D6'} emissiveIntensity={0.06} roughness={0.6} metalness={0.2} />
      </instancedMesh>
    );
  }



  // Parallax wrapper to slightly rotate/position the particle group
  function ParallaxedGroup({ children }) {
    const ref = useRef();
    useFrame(() => {
      if (!ref.current) return;
      const mx = mouse.current[0] || 0;
      const my = mouse.current[1] || 0;
      // smooth lerp
      ref.current.rotation.y += (mx * 0.25 - ref.current.rotation.y) * 0.06;
      ref.current.rotation.x += (my * 0.18 - ref.current.rotation.x) * 0.06;
      ref.current.position.x += (mx * 6 - ref.current.position.x) * 0.06;
      ref.current.position.y += (my * 4 - ref.current.position.y) * 0.06;
    });
    return <group ref={ref}>{children}</group>;
  }

  return (
    <div ref={containerRef} className="sd-bg-canvas" aria-hidden>
      <Canvas camera={{ position: [0, 0, 28], fov: 50 }} gl={{ antialias: true }} dpr={[1, Math.min(1.6, typeof window !== 'undefined' ? window.devicePixelRatio : 1.2)]} style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
        <ambientLight intensity={0.25} />
        <directionalLight intensity={0.4} position={[8, 10, 4]} />
        <directionalLight intensity={0.2} position={[-8, -2, -4]} />
        <ParallaxedGroup>
          <Particles />
        </ParallaxedGroup>
        {/* subtle stars for depth */}
        <Stars radius={80} depth={30} count={120} factor={4} saturation={0} fade speed={0.3} />
      </Canvas>
    </div>
  );
}
