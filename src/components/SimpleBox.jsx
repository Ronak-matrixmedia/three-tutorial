import { Canvas } from "@react-three/fiber";

function SimpleBox() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={0x00bfff} />
      </mesh>
      <directionalLight position={[2, 5, 1]} />
    </Canvas>
  );
}

export default SimpleBox;
