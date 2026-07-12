"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

const CLUSTER_COUNT = 8;
const POINTS_PER_CLUSTER = 80;

interface Cluster {
  center: THREE.Vector3;
  label: string;
  color: string;
  explodedCenter: THREE.Vector3;
}

const clusterDefs = [
  { label: "Sales", color: "#7c3aed" },
  { label: "Churn", color: "#06b6d4" },
  { label: "Supply", color: "#10b981" },
  { label: "Finance", color: "#f59e0b" },
  { label: "Users", color: "#ef4444" },
  { label: "NLP", color: "#8b5cf6" },
  { label: "Vision", color: "#22d3ee" },
  { label: "Ops", color: "#34d399" },
];

function DataCluster({
  cluster,
  index,
  explodeProgress,
  isHovered,
  onHover,
}: {
  cluster: Cluster;
  index: number;
  explodeProgress: number;
  isHovered: boolean;
  onHover: (i: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  const points = useMemo(() => {
    const pts = new Float32Array(POINTS_PER_CLUSTER * 3);
    for (let i = 0; i < POINTS_PER_CLUSTER; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.3 + Math.random() * 0.25;
      pts[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pts[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pts[i * 3 + 2] = r * Math.cos(phi);
    }
    return pts;
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    const cx = cluster.center.x + (cluster.explodedCenter.x - cluster.center.x) * explodeProgress;
    const cy = cluster.center.y + (cluster.explodedCenter.y - cluster.center.y) * explodeProgress;
    const cz = cluster.center.z + (cluster.explodedCenter.z - cluster.center.z) * explodeProgress;

    groupRef.current.position.set(cx, cy, cz);
    groupRef.current.rotation.y = t * 0.2 + index * 0.8;

    const hoverScale = isHovered ? 1.3 : 1.0;
    const targetScale = hoverScale * (1 + explodeProgress * 0.3);
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  const color = new THREE.Color(cluster.color);

  return (
    <group ref={groupRef}>
      <points geometry={geo}>
        <pointsMaterial
          size={0.03}
          color={color}
          transparent
          opacity={0.7 + explodeProgress * 0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {}
      <mesh
        onPointerOver={() => onHover(index)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15 + explodeProgress * 0.25}
        />
      </mesh>

      {}
      {explodeProgress > 0.3 && (
        <Float speed={2} floatIntensity={0.2}>
          <Text
            fontSize={0.12}
            color={cluster.color}
            anchorX="center"
            anchorY="middle"
            position={[0, 0.35, 0]}
            font={undefined}
          >
            {cluster.label}
          </Text>
        </Float>
      )}
    </group>
  );
}


function CentralOrb({ explodeProgress }: { explodeProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    const s = 1 - explodeProgress * 0.5;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.8, 4]} />
      <MeshDistortMaterial
        color="#4f46e5"
        distort={0.3 + explodeProgress * 0.2}
        speed={2}
        transparent
        opacity={0.5 - explodeProgress * 0.3}
        wireframe={false}
      />
    </mesh>
  );
}


function WireframeCage({ explodeProgress }: { explodeProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * -0.07;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.08 + explodeProgress * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}


function CameraRig({ mouseRef }: { mouseRef: React.MutableRefObject<{ normalX: number; normalY: number }> }) {
  useFrame(({ camera }) => {
    camera.position.x += (mouseRef.current.normalX * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseRef.current.normalY * 1.0 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface DataSphereProps {
  explodeProgress: number;
}

export function DataSphere({ explodeProgress }: DataSphereProps) {
  const mouse = useMousePosition();
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);

  const clusters: Cluster[] = useMemo(() => {
    return clusterDefs.map((def, i) => {
      const theta = (i / CLUSTER_COUNT) * Math.PI * 2;
      const phi = Math.PI * 0.25 + (i % 2) * Math.PI * 0.5;
      const r = 0.8;

      const ex = Math.sin(phi) * Math.cos(theta) * 3.2;
      const ey = Math.sin(phi) * Math.sin(theta) * 2.5;
      const ez = Math.cos(phi) * 2.0;

      return {
        label: def.label,
        color: def.color,
        center: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ),
        explodedCenter: new THREE.Vector3(ex, ey, ez),
      };
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />

      <CameraRig mouseRef={mouse} />

      <CentralOrb explodeProgress={explodeProgress} />
      <WireframeCage explodeProgress={explodeProgress} />

      {clusters.map((cluster, i) => (
        <DataCluster
          key={i}
          cluster={cluster}
          index={i}
          explodeProgress={explodeProgress}
          isHovered={hoveredCluster === i}
          onHover={setHoveredCluster}
        />
      ))}
    </Canvas>
  );
}
