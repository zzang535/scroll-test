// module
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// assets
import mountain from "../assets/mountain.png";
import brick from "../assets/Brick_Wall_009_COLOR.jpg";

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [texture, setTexture] = useState(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      console.log("position", position);
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // scene init
    const scene = new THREE.Scene();

    // camera init
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // renderer init
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
  });

  return <div ref={rendererRef}>test</div>;
}
