// module
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "/Brick_Wall_009_COLOR.jpg",
      (texture) => {
        console.log("텍스쳐 로드 완료");
        console.log(texture);

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

        // append
        rendererRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.CylinderGeometry(5, 5, 30, 32);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const cylinder = new THREE.Mesh(geometry, material);

        scene.add(cylinder);

        camera.position.z = 30;

        // 애니메이션 루프
        const animate = function () {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };

        // 애니메이션 시작
        animate();
      },
      () => {
        console.log("텍스쳐 로드 중");
      },
      () => {
        console.log("텍스쳐 로드 에러");
      }
    );
  }, []);

  return (
    <div
      className="fixed border border-solid border-black"
      ref={rendererRef}
    ></div>
  );
}
