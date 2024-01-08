// module
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rendererRef = useRef(null); // 랜더러 참조
  const cylinderRef = useRef(null); // 실린더 참조

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
    // texture load
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/Brick_Wall_009_COLOR.jpg",
      (texture) => {
        console.log("텍스쳐 로드 완료");

        // scene init
        const scene = new THREE.Scene();

        // camera init
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, 40);
        scene.add(camera);

        // renderer init
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        // append
        rendererRef.current.appendChild(renderer.domElement);

        // axis helper init
        const axesHelper = new THREE.AxesHelper(30);
        scene.add(axesHelper);

        // mesh init
        const geometry = new THREE.CylinderGeometry(5, 5, 40, 32);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        cylinderRef.current = new THREE.Mesh(geometry, material);

        scene.add(cylinderRef.current);

        // controls init
        // new OrbitControls(camera, renderer.domElement);

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

  // 스크롤에 따라 실린더 위치 업데이트
  useEffect(() => {
    if (cylinderRef.current) {
      const newPositionX = scrollPosition * -1 * 0.01;
      cylinderRef.current.position.x = newPositionX;

      const newPositionZ = scrollPosition * 1 * 0.0033;
      cylinderRef.current.position.z = newPositionZ;

      const rotationAngle = scrollPosition * -1 * 0.001;
      cylinderRef.current.rotation.y = rotationAngle;
    }
  }, [scrollPosition]); // 스크롤 위치 변경에 따라 실행

  return (
    <div className="h-99999">
      <div
        className="fixed border border-solid border-black"
        ref={rendererRef}
      ></div>
    </div>
  );
}
