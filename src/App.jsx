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
import ThreeDText from "./components/ThreeDText";
import ScrollingDeep from "./components/YogaWebGel/scrollingDeep";

function App() {
  return (
    <>
      {/* <RotationMaterial /> */}
      {/* <AxisHelper /> */}
      {/* <GizmosHelper /> */}
      {/* <LightControl /> */}
      {/* <LightWithHelper /> */}
      {/* <ShadowControl /> */}
      {/* <OceanSkills /> */}
      {/* <ThreeDText /> */}
      <ScrollingDeep />
    </>
  );
}

export default App;
