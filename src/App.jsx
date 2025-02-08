import * as THREE from "three";
import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Nebula from "./Nebula";
import Starfield from "./Starfield";
import Earth from "./Earth";

const sunDirection = new THREE.Vector3(-2, 0.5, 1.5);

function App() {
  const { x, y, z } = sunDirection;
  return (
    <Canvas 
      camera={{ position: [0, 0.1, 5]}}
      gl={{ toneMapping: THREE.NoToneMapping 
    }}>
      <Earth />
      <hemisphereLight args={[0xffffff, 0x000000, 3.0]} />
      <directionalLight position={[x, y, z]} />
      <Nebula />
      <Starfield />
      <OrbitControls />
    </Canvas>
  );
}

export default App;