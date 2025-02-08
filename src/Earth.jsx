import * as THREE from "three";
import React from "react";
import { useFrame } from "@react-three/fiber";
import EarthMaterial from "./EarthMaterial";
import AtmosphereMesh from "./AtmosphereMesh";

const sunDirection = new THREE.Vector3(-2, 0.5, 1.5);

export default function Earth() {
  const ref = React.useRef();
  
  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });
  const axialTilt = 23.4 * Math.PI / 180;
  return (
    <group rotation-z={axialTilt}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[2, 64]} />
        <EarthMaterial sunDirection={sunDirection}/>
        <AtmosphereMesh />
      </mesh>
    </group>
  );
}