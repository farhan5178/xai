"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

const PARTICLE_COUNT = 2000;

function ParticleMesh({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null!);
  const mouse = useMousePosition();
  const { size } = useThree();

  // Generate random positions for "raw data" state
  const { positions, targets, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const tgt = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    const spread = 6;
    const gridSize = Math.ceil(Math.sqrt(PARTICLE_COUNT));
    const gridSpacing = spread / gridSize;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Random scatter (raw data)
      pos[i3] = (Math.random() - 0.5) * spread * 2;
      pos[i3 + 1] = (Math.random() - 0.5) * spread * 2;
      pos[i3 + 2] = (Math.random() - 0.5) * spread;

      // Grid organization (intelligence)
      const gx = (i % gridSize) - gridSize / 2;
      const gy = Math.floor(i / gridSize) - gridSize / 2;
      tgt[i3] = gx * gridSpacing;
      tgt[i3 + 1] = gy * gridSpacing;
      tgt[i3 + 2] = 0;

      // Color — mix violet and cyan
      const t = Math.random();
      if (t < 0.5) {
        col[i3] = 0.49; col[i3 + 1] = 0.23; col[i3 + 2] = 0.93; // violet
      } else {
        col[i3] = 0.02; col[i3 + 1] = 0.71; col[i3 + 2] = 0.83; // cyan
      }
    }
    return { positions: pos, targets: tgt, colors: col };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const mx = mouse.current.normalX * 0.3;
    const my = mouse.current.normalY * 0.3;
    const progress = scrollProgress;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const baseX = positions[i3];
      const baseY = positions[i3 + 1];
      const baseZ = positions[i3 + 2];
      const tX = targets[i3];
      const tY = targets[i3 + 1];
      const tZ = targets[i3 + 2];

      const noiseX = Math.sin(time * 0.3 + i * 0.01) * 0.04 * (1 - progress);
      const noiseY = Math.cos(time * 0.25 + i * 0.02) * 0.04 * (1 - progress);

      arr[i3] = baseX + (tX - baseX) * progress + mx * (1 - progress * 0.5) + noiseX;
      arr[i3 + 1] = baseY + (tY - baseY) * progress + my * (1 - progress * 0.5) + noiseY;
      arr[i3 + 2] = baseZ + (tZ - baseZ) * progress;
    }

    posAttr.needsUpdate = true;

    // Rotate slowly when not fully organized
    meshRef.current.rotation.y = time * 0.04 * (1 - progress * 0.8);
    meshRef.current.rotation.x = time * 0.02 * (1 - progress * 0.8);
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

// Connection lines overlay
function ConnectionLines({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = clock.getElapsedTime() * 0.03;
    groupRef.current.children.forEach((line, i) => {
      const mat = (line as THREE.Line).material as THREE.LineBasicMaterial;
      mat.opacity = scrollProgress * 0.25 * (0.5 + 0.5 * Math.sin(clock.getElapsedTime() + i));
    });
  });

  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const r1 = 1.2 + Math.random() * 0.8;
      const r2 = 1.5 + Math.random() * 1.5;
      arr.push({
        points: [
          new THREE.Vector3(Math.cos(angle) * r1, Math.sin(angle) * r1, 0),
          new THREE.Vector3(Math.cos(angle + 0.3) * r2, Math.sin(angle + 0.3) * r2, 0),
        ],
      });
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <primitive
          key={i}
          object={
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(line.points),
              new THREE.LineBasicMaterial({
                color: i % 2 === 0 ? "#7c3aed" : "#06b6d4",
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
              })
            )
          }
        />
      ))}
    </group>
  );
}

interface ParticleCanvasProps {
  scrollProgress: number;
}

export function ParticleCanvas({ scrollProgress }: ParticleCanvasProps) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <ParticleMesh scrollProgress={scrollProgress} />
        <ConnectionLines scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
