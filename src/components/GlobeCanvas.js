"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Noida coordinates: 28.5355°N, 77.3910°E
// Convert to 3D sphere coordinates
function latLonToVec3(lat, lon, radius = 1.02) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function LocationMarker() {
  const markerRef = useRef();
  const ringRef = useRef();
  const noidaPos = latLonToVec3(28.5355, 77.391);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + 0.3 * Math.sin(t * 2));
      ringRef.current.material.opacity = 0.6 + 0.4 * Math.sin(t * 2);
    }
    if (markerRef.current) {
      markerRef.current.position.copy(noidaPos);
    }
  });

  return (
    <group position={noidaPos}>
      {/* Core dot */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.055, 32]} />
        <meshStandardMaterial
          color="#f97316"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function GlobeMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main globe sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#1a0533"
          emissive="#2d1052"
          specular="#9333ea"
          shininess={40}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Wire frame overlay */}
      <mesh>
        <sphereGeometry args={[1.001, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.08, 32, 32]} />
        <meshPhongMaterial
          color="#9333ea"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Location marker */}
      <LocationMarker />
    </group>
  );
}

function MouseLight() {
  const lightRef = useRef();
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    if (lightRef.current) {
      lightRef.current.position.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        3
      );
    }
  });

  return <pointLight ref={lightRef} color="#d946ef" intensity={1.5} distance={8} />;
}

export default function GlobeCanvas() {
  return (
    <div className="w-full h-[420px]">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, -3, -3]} color="#7c3aed" intensity={0.5} />
        <MouseLight />

        {/* Globe */}
        <GlobeMesh />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.4}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
