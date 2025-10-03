import { FirstPersonControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function AnimatedBox() {
  const boxRef = useRef();

  useFrame(() => {
    // Animation code
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.005;
    boxRef.current.rotation.z += 0.005;
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={0x00bfff} />
    </mesh>
  );
}

function RotationMaterial() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <FirstPersonControls movementSpeed={0.3} autoForward={true} />
      <gridHelper args={[20, 20]} />
      <axesHelper args={[10]} />
      {/* {/* <OrbitControls /> */}
      <AnimatedBox />
      <directionalLight position={[4, 2, 3]} />
    </Canvas>
  );
}

export default RotationMaterial;
