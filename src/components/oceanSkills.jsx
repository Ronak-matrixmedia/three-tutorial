import * as THREE from "three";
import React, { Suspense, useRef, useMemo, useState, useEffect } from "react";
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

const skillColors = [
  "#61DBFB", // React - cyan
  "#4DB33D", // MongoDB - green
  "#F0DB4F", // ES6+ - yellow
  "#68A063", // Node.js - green
  "#764ABC", // Redux - purple
  "#F1502F", // Git - orange/red
];

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
    ref.current.rotation.x = delta;
  });
  return (
    <mesh ref={ref} scale={20}>
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
          <Text3D
            key={idx}
            position={positions[idx]}
            letterSpacing={-0.06}
            size={0.3}
            font="/Inter_Bold.json"
          >
            {skill}
            <meshStandardMaterial color={skillColors[idx % skillColors.length]} />
            {/* <meshNormalMaterial /> */}
          </Text3D>

        // <Text3D
        //   key={idx}
        //   position={positions[idx]}
        //   letterSpacing={-0.06}
        //   size={0.3}
        //   font="/Inter_Bold.json"
        // >
        //   {skill}
        //   <meshStandardMaterial color="white" />
        // </Text3D>

        // <Html
        //   key={idx}
        //   position={positions[idx]}
        //   center
        //   style={{
        //     fontSize: "14px",
        //     fontWeight: "600",
        //     color: "#1e293b",
        //     background: "rgba(255,255,255,0.85)",
        //     padding: "4px 8px",
        //     borderRadius: "6px",
        //     whiteSpace: "nowrap",
        //   }}
        // >
        //   {skill}
        // </Html>
      ))}
    </mesh>
  );
}

function TypewriterOverlay() {
  const text = "Hello, I am Ronak.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <Html
      position={[10, 100, -100]} // Doesn't affect fixed positioning
      transform={false}
      fullscreen // makes it fixed overlay in the canvas
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        fontFamily: "monospace",
        color: "white",
        fontSize: "18px",
        letterSpacing: "0.5px",
        background: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        width: "max-content",
      }}
    >
      {displayed}
      <span className="cursor">|</span>
      <style>{`
        .cursor {
          display: inline-block;
          width: 10px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </Html>
  );
}

export default function OceanSkills() {
  return (
    <Canvas camera={{ position: [10, 5, 100], fov: 55, near: 1, far: 20000 }}>
      <TypewriterOverlay />
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
