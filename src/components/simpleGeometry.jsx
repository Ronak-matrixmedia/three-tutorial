import React from "react";
import { Canvas } from "@react-three/fiber";

function SimpleGeometry() {
  return (
    <Canvas camera={{ position: [4, 4, 4] }}>
      <mesh>
        <sphereGeometry args={[3, 80, 80]} />
        <meshBasicMaterial wireframe color="black" />
      </mesh>
    </Canvas>
  );
}

export default SimpleGeometry;
