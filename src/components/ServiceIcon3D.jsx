import React, { useEffect, useRef, useState } from 'react';

export default function ServiceIcon3D({ size = 120, type = 'box' }) {
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

  const { fiber, drei, THREE } = r3f;
  const { Canvas, useFrame } = fiber;
  const { Float } = drei;

  function Icon() {
    const ref = useRef();
    useFrame((state, delta) => {
      if (ref.current) {
        ref.current.rotation.y += delta * 0.6;
        ref.current.rotation.x += delta * 0.18;
      }
    });

    return (
      <Float speed={1} floatIntensity={0.9} rotationIntensity={0.4}>
        <mesh ref={ref}>
          {type === 'torus' ? (
            <torusGeometry args={[0.55, 0.14, 8, 64]} />
          ) : (
            <icosahedronGeometry args={[0.7, 0]} />
          )}
          <meshStandardMaterial color={'#B89CFF'} emissive={'#3FD6C0'} emissiveIntensity={0.08} metalness={0.4} roughness={0.25} />
        </mesh>
      </Float>
    );
  }

  return (
    <div style={{ width: size, height: size }} aria-hidden>
      <Canvas camera={{ position: [0, 0, 3.6], fov: 50 }} style={{ width: '100%', height: '100%' }} dpr={[1, 1.4]}>
        <ambientLight intensity={0.45} />
        <pointLight intensity={0.5} position={[2, 2, 4]} />
        <Icon />
      </Canvas>
    </div>
  );
}
