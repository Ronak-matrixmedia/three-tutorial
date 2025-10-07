import { Canvas, useFrame } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import "./App.css";
import { useRef } from "react";
import RotationMaterial from "./components/RotationMaterial";
import AxisHelper from "./components/AxisHelper";
import GizmosHelper from "./components/GizmosHelper";
import LightControl from "./components/LightControl";
import LightWithHelper from "./components/LightWithHelper";
import ShadowControl from "./components/ShadowControl";
import OceanSkills from "./components/oceanSkills";

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
    <>
      {/* <RotationMaterial /> */}
      {/* <AxisHelper /> */}
      {/* <GizmosHelper /> */}
      {/* <LightControl /> */}
      {/* <LightWithHelper /> */}
      {/* <ShadowControl /> */}
      <OceanSkills />
    </>
  );
}

export default App;
