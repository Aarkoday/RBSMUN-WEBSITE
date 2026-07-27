import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function GlowingOrb({ position, color, speed, offset, size = 3 }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    // If animations are toggled off via window settings, freeze/skip updates
    if (window.disableCanvasAnimations) return;

    const t = clock.getElapsedTime() * speed + offset;
    meshRef.current.position.x = position[0] + Math.sin(t) * 2;
    meshRef.current.position.y = position[1] + Math.cos(t * 0.8) * 2;
  });

  return (
    <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.15} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Sphere>
  );
}

export default function WebGLBackground() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const handleToggle = () => {
      setDisabled(!!window.disableCanvasAnimations);
    };

    window.addEventListener('perf-animations-toggle', handleToggle);
    // Initial check
    handleToggle();

    return () => {
      window.removeEventListener('perf-animations-toggle', handleToggle);
    };
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none', background: '#0a0a0a' }}>
        {!disabled && (
          <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 2]}>
            <GlowingOrb position={[-5, 4, 0]} color="#4a90e2" speed={0.2} offset={0} size={5} />
            <GlowingOrb position={[6, -3, -2]} color="#9013fe" speed={0.15} offset={Math.PI} size={4} />
            <GlowingOrb position={[-4, -5, -4]} color="#00bcd4" speed={0.1} offset={Math.PI / 2} size={6} />
            <GlowingOrb position={[5, 5, -1]} color="#50e3c2" speed={0.25} offset={Math.PI * 1.5} size={3} />
          </Canvas>
        )}
      </div>
      <div className="noise-overlay" aria-hidden="true" style={{ zIndex: -1 }}></div>
    </>
  );
}
