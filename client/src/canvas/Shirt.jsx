import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const stateString = JSON.stringify(snap);

  const [decalPosition, setDecalPosition] = useState([0, 0.04, 0.15]);
  const [isDragging, setIsDragging] = useState(false);

  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const meshRef = useRef();

  const handleMouseDown = () => {
    if (state.activeEditorTab === 'locationmover') {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging || state.activeEditorTab !== 'locationmover') return;

    const { clientX, clientY } = event;
    mouse.current.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObject(meshRef.current);

    if (intersects.length > 0) {
      const intersection = intersects[0].point;
      setDecalPosition([intersection.x, intersection.y, intersection.z]);
    }
  };

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  return (
    <group key={stateString}>
      <mesh
        ref={meshRef}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
        onPointerMove={handleMouseMove}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={decalPosition}
            rotation={[0, 0, 0]}
            scale={state.decalScale}
            map={logoTexture}
            mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;