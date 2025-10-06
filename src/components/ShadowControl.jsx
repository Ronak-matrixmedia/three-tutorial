import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  useHelper,
} from "@react-three/drei";
import { SpotLightHelper } from "three";

function AnimatedBox() {
  const boxRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.005;
      boxRef.current.rotation.y += 0.005;
      boxRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={boxRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={0x00bfff} />
    </mesh>
  );
}

function LightWithHelperFunc() {
  const light = useRef();

  useHelper(light, SpotLightHelper, "orange");

  return (
    <spotLight
      ref={light} // shows the graph
      intensity={50}
      position={[-5, 8, 0]}
      angle={Math.PI / 8}
      castShadow
    />
  );
}

function ShadowControl() {
  return (
    <Canvas shadows>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
      <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
      <OrbitControls />
      <AnimatedBox />
      <ambientLight color={0xfcfcfc} intensity={0.2} />
      <LightWithHelperFunc />
    </Canvas>
  );
}

export default ShadowControl;
