import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  OrbitControls,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
} from "@react-three/drei";

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
function GizmosHelper() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      {/* // Gizmo Wrapper : - 
      <GizmoHelper>, which serves as a wrapper for the gizmo.
       This component allows us to specify the gizmo's placement using
        the alignment and margin props.
         The alignment prop determines the corner of the screen where the gizmo will be positioned,
      
      */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        {/* // Gizmo Types : - 
        There are two types of gizmos available: <GizmoViewport /> and <GizmoViewcube />.
         The <GizmoViewport /> provides a simple representation of the 3D axes,
          while the <GizmoViewcube /> offers a more detailed cube representation.
           In this example, we will use the <GizmoViewport /> for its simplicity and clarity.
        */}
        <GizmoViewport />
        {/* <GizmoViewcube /> */}
      </GizmoHelper>
      <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
      <OrbitControls />
      <AnimatedBox />
      <directionalLight position={[4, 2, 3]} color={0xffea00} intensity={6.8} />
    </Canvas>
  );
}

export default GizmosHelper;
