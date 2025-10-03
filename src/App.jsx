import { Canvas, useFrame } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import "./App.css";
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

function App() {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      {/* <mesh>
        <sphereGeometry args={[3, 80, 80]} />
        <meshBasicMaterial wireframe color="black" />
      </mesh> */}

      {/* <mesh>
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color={0x00bfff}/>
      </mesh>
      <directionalLight position={[2, 5, 1]}  /> */}

      {/* <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusKnotGeometry args={[1.7, 0.3, 256, 256]} />
        <meshToonMaterial color={0x00bfff} />
      </mesh>
      <directionalLight position={[4, 2, 3]} /> */}

      <AnimatedBox />
      <directionalLight position={[4, 2, 3]} />
    </Canvas>
  );
}

export default App;
