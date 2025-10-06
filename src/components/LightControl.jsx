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

function LightControl() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
      <gridHelper args={[20, 20, 0xff22aa, 0x55ccff]} />
      <OrbitControls />
      <AnimatedBox />
      {/* Directional light is a light source that emits a broad stream of light,
        similar to sunlight or the illumination in a room on a sunny day where 
        the onlylight source is a window.
            It is characterized by parallel rays of light that travel in a specific direction,
        illuminating all objects in its path uniformly, regardless of their distance from the light source.
            This type of light is often used in 3D graphics to simulate sunlight or other distant light sources.
            The position prop sets the location of the light in 3D space.
            The color prop defines the color of the light emitted. The intensity prop controls the brightness of the light.
            
         */}
      <directionalLight position={[4, 2, 3]} color={0xffea00} intensity={6.8} />
      {/* To add a spotlight, simply use the <spotLight /> component.
       Note that the intensity prop is essential; without it, the spotlight won’t be visible!
         The position prop determines where the spotlight is located in the 3D space.
        The angle prop defines the cone angle of the spotlight, controlling how wide or narrow the light beam is.
            The penumbra prop adds softness to the edges of the spotlight, making the transition from light to dark more gradual.
       */}
      {/* <spotLight intensity={50} position={[4, 2, 3]} /> */}
      {/* <ambientLight color={0xfcfcfc} intensity={0.2} /> */}
    </Canvas>
  );
}

export default LightControl;
