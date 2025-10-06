import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  useHelper,
} from "@react-three/drei";
import { SpotLightHelper } from "three";
// import { useControls } from "leva";

function AnimatedBox() {
  const boxRef = useRef();

//   const { color, speed } = useControls({
//     color: "#00bfff",
//     speed: { value: 0.005, min: 0.0, max: 0.03, step: 0.001 },
//   });

  useFrame(() => {
    if (boxRef.current) {
    //   boxRef.current.rotation.x += speed;
    //   boxRef.current.rotation.y += speed;
    //   boxRef.current.rotation.z += speed;
    }
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      {/* <meshStandardMaterial color={color} /> */}
      <meshStandardMaterial color={0X00bfff} />
    </mesh>
  );
}

function LightWithHelperFunc() {
  const light = useRef();

  useHelper(light, SpotLightHelper, "orange");

//   const { angle, penumbra } = useControls({
//     angle: { value: Math.PI / 8, min: 0, max: Math.PI / 2, step: 0.01 },
//     penumbra: { value: 0.0, min: 0.0, max: 1.0, step: 0.1 },
//   });

  return (
    <spotLight
      ref={light}
      intensity={50}
      position={[4, 2, 3]}
      angle={Math.PI / 8}
    //   penumbra={penumbra}
    //   castShadow
    />
  );
}

function LightWithHelper() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <axesHelper args={[10]} />
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

export default LightWithHelper;
