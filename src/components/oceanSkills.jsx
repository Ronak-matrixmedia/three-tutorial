"use client";
import * as THREE from "three";
import React, { Suspense, useRef, useMemo } from "react";
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Sky,
  Text3D,
  Center,
  Sky as SkyImpl,
} from "@react-three/drei";

import { Water } from "three-stdlib";

extend({ Water });

const skills = ["React", "MongoDB", "ES6+", "Node.js", "Redux", "Git"];

function TextJs() {
  
  return (
    <>
      <Center rotation={[-0.2, -0.25, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font="/Inter_Bold.json"
        >
          {`JS`}
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </>
  );
}

function Ocean() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta)
  );
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

function Box() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20;
    ref.current.rotation.x =
        delta;
  });
  return (
    <mesh ref={ref} scale={20}>
      {/* <boxGeometry />
      <meshStandardMaterial /> */}
      <Center rotation={[-0.2, -0.25, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font="/Inter_Bold.json"
        >
          {`JS`}
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </mesh>
  );
}

function SkillLabels({ scale = 20 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20;
    ref.current.rotation.x =
      ref.current.rotation.y =
      ref.current.rotation.z +=
        delta;
  });
  // Scale affects where labels appear relative to cube
  const offset = 0.1 * scale; // slightly outside cube faces
  const positions = [
    [0, 0, offset], // front
    [0, 0, -offset], // back
    [0, offset, 0], // top
    [0, -offset, 0], // bottom
    [offset, 0, 0], // right
    [-offset, 0, 0], // left
  ];

  return (
    <mesh ref={ref} scale={20}>
      {skills.map((skill, idx) => (
        <Html
          key={idx}
          position={positions[idx]}
          center
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#1e293b",
            background: "rgba(255,255,255,0.85)",
            padding: "4px 8px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
          }}
        >
          {skill}
        </Html>
      ))}
    </mesh>
  );
}

export default function OceanSkills() {
  return (
      <Canvas camera={{ position: [10, 5, 100], fov: 55, near: 1, far: 20000 }}>
        <pointLight decay={0} position={[100, 100, 100]} />
        <pointLight decay={0.5} position={[-100, -100, -100]} />
        <Suspense fallback={null}>
          <Ocean />
          <Box />
          <SkillLabels />
        </Suspense>
        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
  );
}
