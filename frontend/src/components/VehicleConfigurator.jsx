import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { useConfiguratorStore } from '../store/configuratorStore';
import * as THREE from 'three';

// 3D Car Model Component
function CarModel({ color }) {
  const meshRef = useRef();
  const autoRotate = useConfiguratorStore((state) => state.autoRotate);
  
  useFrame((state) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  // Create a simplified car model using basic geometries
  return (
    <group ref={meshRef}>
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Car Cabin */}
      <mesh position={[0, 1.3, -0.1]} castShadow>
        <boxGeometry args={[2.5, 0.8, 1.6]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Windshield */}
      <mesh position={[0.8, 1.3, -0.1]} castShadow>
        <boxGeometry args={[0.7, 0.7, 1.5]} />
        <meshPhysicalMaterial 
          color="#111111"
          metalness={0.1}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      
      {/* Rear Window */}
      <mesh position={[-0.8, 1.3, -0.1]} castShadow>
        <boxGeometry args={[0.7, 0.7, 1.5]} />
        <meshPhysicalMaterial 
          color="#111111"
          metalness={0.1}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      
      {/* Wheels */}
      {[[-1.3, 0, 1], [1.3, 0, 1], [-1.3, 0, -1], [1.3, 0, -1]].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.31, 32]} />
            <meshStandardMaterial color="#666666" metalness={1} roughness={0.1} />
          </mesh>
        </group>
      ))}
      
      {/* Headlights */}
      <mesh position={[2.1, 0.6, 0.7]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#4444ff"
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[2.1, 0.6, -0.7]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#4444ff"
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Taillights */}
      <mesh position={[-2.1, 0.5, 0.7]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial 
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[-2.1, 0.5, -0.7]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial 
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={1.5}
        />
      </mesh>
      
      {/* Spoiler */}
      <mesh position={[-1.8, 1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 2]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Loading Component
function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8">
        <div className="text-white text-xl font-light">Loading 3D Model...</div>
      </div>
    </div>
  );
}

// Main Scene Component
function Scene() {
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const autoRotate = useConfiguratorStore((state) => state.autoRotate);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight 
        position={[-10, 10, -10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5}
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} />
      
      {/* Car Model */}
      <Suspense fallback={null}>
        <CarModel color={selectedColor} />
      </Suspense>
      
      {/* Ground Shadow */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.5}
        scale={15}
        blur={2}
        far={4}
      />
      
      {/* Environment */}
      <Environment preset="sunset" />
      
      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
      
      <PerspectiveCamera makeDefault position={[6, 3, 6]} fov={50} />
    </>
  );
}

// Main Configurator Component
export default function VehicleConfigurator() {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
      
      <Suspense fallback={<Loader />} />
    </div>
  );
}
