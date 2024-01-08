// module
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rendererRef = useRef(null); // 랜더러 참조
  const cylinderRef = useRef(null); // 실린더 참조
  const planeRef = useRef(null); // 실린더 참조
  const planeTopRef = useRef(null); // 실린더 참조
  const planeBottomRef = useRef(null); // 실린더 참조
  const planeLeftRef = useRef(null); // 실린더 참조
  const planeRightRef = useRef(null); // 실린더 참조

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
        const fov = 30; // 시야각을 줄여서 원근감을 감소시킴
        const aspectRatio = window.innerWidth / window.innerHeight;
        const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);
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

        // cylinder init
        let geometry, material;
        geometry = new THREE.CylinderGeometry(5, 5, 36, 32);
        material = new THREE.MeshBasicMaterial({ map: texture });
        cylinderRef.current = new THREE.Mesh(geometry, material);
        scene.add(cylinderRef.current);

        // plane init
        // 오른쪽 배경
        geometry = new THREE.PlaneGeometry(50, 36);
        material = new THREE.MeshBasicMaterial({
          color: "#a08e6e",
          side: THREE.DoubleSide,
        });
        planeRightRef.current = new THREE.Mesh(geometry, material);
        planeRightRef.current.position.set(30, 0, 0);
        scene.add(planeRightRef.current);

        // 두루마리 시작 박스
        geometry = new THREE.PlaneGeometry(30, 36);
        material = new THREE.MeshBasicMaterial({
          color: "#d1be9b",
          side: THREE.DoubleSide,
        });
        planeRef.current = new THREE.Mesh(geometry, material);
        planeRef.current.position.set(10, 0, 0);
        scene.add(planeRef.current);

        geometry = new THREE.PlaneGeometry(100, 10);
        material = new THREE.MeshBasicMaterial({
          color: "#a08e6e",
          side: THREE.DoubleSide,
        });
        planeTopRef.current = new THREE.Mesh(geometry, material);
        planeTopRef.current.position.set(0, 22, 0);
        scene.add(planeTopRef.current);

        geometry = new THREE.PlaneGeometry(100, 10);
        material = new THREE.MeshBasicMaterial({
          color: "#a08e6e",
          side: THREE.DoubleSide,
        });
        planeBottomRef.current = new THREE.Mesh(geometry, material);
        planeBottomRef.current.position.set(0, -22, 0);
        scene.add(planeBottomRef.current);

        geometry = new THREE.PlaneGeometry(60, 60);
        material = new THREE.MeshBasicMaterial({
          color: "#a08e6e",
          side: THREE.DoubleSide,
        });
        planeLeftRef.current = new THREE.Mesh(geometry, material);
        planeLeftRef.current.position.set(-30, 0, 0);
        scene.add(planeLeftRef.current);

        // controls init
        // 스크롤에 영향 미쳐서 주석
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

  // mount 시 실행
  useEffect(() => {
    gsap.to(".square", {
      x: 2000, // 최종 위치
      // duration: 3,
      scrollTrigger: {
        trigger: ".square",
        start: 400, // 시작 스크롤 포인트
        end: 10000, // 끝 스크롤 포인트
        scrub: 1, // 스크롤 속도의 비율
      },
    });
    gsap.to(".square2", {
      x: 2000, // 최종 위치
      // duration: 3,
      scrollTrigger: {
        trigger: ".square",
        start: 800, // 시작 스크롤 포인트
        end: 8000, // 끝 스크롤 포인트
        scrub: 1, // 스크롤 속도의 비율
      },
    });
    gsap.to(".square3", {
      x: 2000, // 최종 위치
      // duration: 3,
      scrollTrigger: {
        trigger: ".square",
        start: 1200, // 시작 스크롤 포인트
        end: 20000, // 끝 스크롤 포인트
        scrub: 1, // 스크롤 속도의 비율
      },
    });
  }, []);

  // mesh moving
  useEffect(() => {
    // cylinder moving
    if (cylinderRef.current) {
      const newPositionX = scrollPosition * -1 * 0.01;
      cylinderRef.current.position.x = newPositionX;

      const newPositionZ = scrollPosition * 1 * 0.0033;
      cylinderRef.current.position.z = newPositionZ;

      const rotationAngle = scrollPosition * -1 * 0.001;
      cylinderRef.current.rotation.y = rotationAngle;
    }

    // plane moving
    if (planeRef.current) {
      const newPositionX = 10 + scrollPosition * 1 * 0.01;
      planeRef.current.position.x = newPositionX;
    }

    if (planeRightRef.current) {
      const newPositionX = 30 + scrollPosition * 1 * 0.01;
      planeRightRef.current.position.x = newPositionX;
    }

    // plane moving
    if (planeLeftRef.current) {
      const newPositionX = -30 + scrollPosition * -1 * 0.01;
      planeLeftRef.current.position.x = newPositionX;
    }
  }, [scrollPosition]); // 스크롤 위치 변경에 따라 실행

  return (
    <div className="h-99999">
      <div className="square fixed top-[300px] left-[10px] w-[100px] h-[100px] bg-blue-500" />
      <div className="square2 fixed top-[400px] left-[10px] w-[100px] h-[100px] bg-red-500" />
      <div className="square3 fixed top-[500px] left-[10px] w-[100px] h-[100px] bg-green-500" />
      {/* <div className="background-top fixed top-[105px] left-[0px] w-[2000px] h-[200px] bg-yellow-500" />
      <div className="background-bottom fixed bottom-[0px] left-[0px] w-[2000px] h-[200px] bg-yellow-500" />
      <div className="background-left fixed top-[300px] left-[0px] w-[800px] h-[500px] bg-yellow-500" /> */}
      <div className="fixed">scroll: {scrollPosition}</div>
      <div
        className="fixed border border-solid border-black"
        ref={rendererRef}
      ></div>
    </div>
  );
}

// 직교 카메라
// const aspectRatio = window.innerWidth / window.innerHeight;
// const frustumSize = 100; // 직교 카메라의 크기 조정을 위한 값
// const camera = new THREE.OrthographicCamera(
//   (frustumSize * aspectRatio) / -2,
//   (frustumSize * aspectRatio) / 2,
//   frustumSize / 2,
//   frustumSize / -2,
//   0.1,
//   1000
// );
// camera.position.set(0, 10, 40);
// camera.lookAt(0, 0, 0);
// scene.add(camera);
