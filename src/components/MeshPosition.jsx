import { Canvas } from "@react-three/fiber";

function MeshPosition() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <mesh position={[-2, 2, -3]}>
        {/* <mesh position={[-2, 2, -3]} scale={[2, 0.5, 2]}> */}
        <torusKnotGeometry args={[1.7, 0.3, 256, 256]} />
        <meshToonMaterial color={0x00bfff} />
      </mesh>
      <directionalLight position={[4, 2, 3]} />
    </Canvas>
  );
}

export default MeshPosition;
