import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useGLTF, Stars } from '@react-three/drei';
import { useConfiguratorStore } from '../store/configuratorStore';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { carModels } from '../config/carModels';

// Loading component
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#444" wireframe />
    </mesh>
  );
}

// GLB Model Loader
function GLBCarModel({ modelPath, scale, position, rotation, color }) {
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Apply color to car body (skip glass/lights/wheels)
          if (!child.name.toLowerCase().includes('glass') &&
              !child.name.toLowerCase().includes('light') &&
              !child.name.toLowerCase().includes('wheel')) {
            child.material = child.material.clone();
            child.material.color = new THREE.Color(color);
            child.material.metalness = 0.8;
            child.material.roughness = 0.2;
            child.material.envMapIntensity = 1.5;
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene, color]);

  return (
    <primitive 
      object={scene} 
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// OBJ Model Loader (for legacy models)
function OBJCarModel({ modelPath, mtlPath, scale, position, rotation, color }) {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    if (mtlPath) {
      // Load materials first
      mtlLoader.load(
        mtlPath,
        (materials) => {
          materials.preload();
          objLoader.setMaterials(materials);
          objLoader.load(modelPath, (obj) => {
            obj.traverse((child) => {
              if (child.isMesh) {
                if (!child.name.toLowerCase().includes('glass') &&
                    !child.name.toLowerCase().includes('light')) {
                  child.material.color = new THREE.Color(color);
                  child.material.metalness = 0.6;
                  child.material.roughness = 0.4;
                }
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            setModel(obj);
          });
        },
        undefined,
        (error) => {
          console.error('Error loading MTL:', error);
          // Fallback to loading OBJ without materials
          objLoader.load(modelPath, setModel);
        }
      );
    } else {
      objLoader.load(modelPath, setModel);
    }
  }, [modelPath, mtlPath, color]);

  if (!model) return <LoadingFallback />;

  return (
    <primitive 
      object={model} 
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// Main Car Model Component
function CarModel() {
  const { selectedCarId, selectedColor } = useConfiguratorStore();
  const currentCar = carModels.find(car => car.id === selectedCarId);

  if (!currentCar) return <LoadingFallback />;

  const { modelPath, mtlPath, format, scale, position, rotation } = currentCar;

  if (format === 'glb' || format === 'gltf') {
    return (
      <GLBCarModel
        modelPath={modelPath}
        scale={scale}
        position={position}
        rotation={rotation}
        color={selectedColor}
      />
    );
  } else if (format === 'obj') {
    return (
      <OBJCarModel
        modelPath={modelPath}
        mtlPath={mtlPath}
        scale={scale}
        position={position}
        rotation={rotation}
        color={selectedColor}
      />
    );
  }

  return <LoadingFallback />;
}

// Main Component
export default function MultiModelVehicleConfigurator() {
  const { autoRotate } = useConfiguratorStore();

  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#0a0a0a']} />
        
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight
          position={[-10, 10, -5]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        <pointLight position={[0, 5, 0]} intensity={0.5} />
        
        {/* Environment */}
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Car Model */}
        <Suspense fallback={<LoadingFallback />}>
          <CarModel />
        </Suspense>
        
        {/* Ground Shadow */}
        <ContactShadows
          opacity={0.5}
          scale={20}
          blur={2}
          far={10}
          resolution={256}
          color="#000000"
        />
        
        {/* Grid Floor (Optional) */}
        <gridHelper args={[50, 50, '#333333', '#1a1a1a']} position={[0, -0.01, 0]} />
        
        {/* Controls */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
