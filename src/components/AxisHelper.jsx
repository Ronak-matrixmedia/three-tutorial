import { OrbitControls } from "@react-three/drei";
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

function AxisHelper() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      {/* // displays the axes of the scene's coordinate system. */}
      <axesHelper args={[10]} />

      {/* <gridHelper />, which is incredibly useful for guiding the placement of planes.
      FIRST TWO PARAMETERS: size and divisions, and the last two are the colors of the grid lines.
      */}
      <gridHelper args={[40, 40, 0xff22aa, 0x55ccff]} />
      {/* <OrbitControls />, which is The OrbitControls, as its name suggests,
       allows you to orbit the camera around a certain point.
        It is actually one of the most commonly used camera controls.
        You can zoom in and out with the mouse wheel and pan the camera by right-clicking and dragging.
         */}
      <OrbitControls />
      <AnimatedBox />
      <directionalLight position={[4, 2, 3]} />
    </Canvas>
  );
}

export default AxisHelper;
