import React, { useEffect, useRef, useState } from 'react';

export default function WorkBadge3D({ size = 140 }) {
  const [r3f, setR3F] = useState(null);

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
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  if (!r3f) return <div style={{ width: size, height: size }} />;

  const { fiber, drei } = r3f;
  const { Canvas, useFrame } = fiber;
  const { Float } = drei;

  function Badge() {
    const ref = useRef();
    useFrame((state, delta) => {
      if (ref.current) ref.current.rotation.z += delta * 0.35;
    });
    return (
      <Float speed={0.9} floatIntensity={0.7} rotationIntensity={0.6}>
        <group ref={ref}>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[0.6, 0.88, 40]} />
            <meshStandardMaterial color={'#3FD6C0'} emissive={'#3FD6C0'} emissiveIntensity={0.05} roughness={0.6} metalness={0.2} side={2} />
          </mesh>
          <mesh position={[0, 0, 0.1]}>
            <circleGeometry args={[0.45, 20]} />
            <meshStandardMaterial color={'#0E0B1A'} roughness={0.45} metalness={0.2} />
          </mesh>
        </group>
      </Float>
    );
  }

  return (
    <div style={{ width: size, height: size }} aria-hidden>
      <Canvas camera={{ position: [0, 0, 3.6], fov: 50 }} style={{ width: '100%', height: '100%' }} dpr={[1, 1.4]}>
        <ambientLight intensity={0.45} />
        <pointLight intensity={0.5} position={[2, 2, 4]} />
        <Badge />
      </Canvas>
    </div>
  );
}
