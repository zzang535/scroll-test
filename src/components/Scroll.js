import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import mountain from "../assets/mountain.png";
// import brick from "../assets/Brick_Wall_009_COLOR.jpg";

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      // console.log("position", position);
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mountRef = useRef(null);

  useEffect(() => {
    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "/Brick_Wall_009_COLOR.jpg",
      () => {
        console.log("로드 완료");
      },
      () => {
        console.log("로드 중");
      },
      () => {
        console.log("로드 에러");
      }
    );
    setTexture(texture);
  }, []);

  useEffect(() => {
    // 씬(scene), 카메라(camera), 렌더러(renderer) 초기화
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 렌더러의 배경을 투명하게 설정
    renderer.setClearColor(0x000000, 0); // 첫 번째 인자는 배경색, 두 번째 인자는 투명도(0은 완전 투명)

    mountRef.current.appendChild(renderer.domElement);

    // 원통형 기하체와 재질(material) 생성
    const geometry = new THREE.CylinderGeometry(5, 5, 30, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cylinder = new THREE.Mesh(geometry, material);

    // 원통형 메시(mesh)를 씬에 추가
    scene.add(cylinder);

    // 카메라 위치 설정
    camera.position.z = 30;

    // 애니메이션 루프
    const animate = function () {
      requestAnimationFrame(animate);

      // 원통 회전
      //   cylinder.rotation.x += 0.01;
      //   cylinder.rotation.y += 0.01;
      // 스크롤 위치에 따라 원통의 y축 위치 변경
      //   console.log(scrollPosition);
      // console.log(cylinder.position);
      cylinder.position.x = scrollPosition * 0.01; // 0.1은 스크롤 감도 조절
      cylinder.position.z = scrollPosition * 0.005;

      // console.log(cylinder.position.x);

      // 렌더링
      renderer.render(scene, camera);
    };

    // 애니메이션 시작
    animate();

    // 컴포넌트 언마운트 시 정리
    return () => {
      // 랜더링 하면서 컴포넌트가 지속해서 unmount 됨
      // removeChild 필수
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [scrollPosition]);

  return (
    <div
      id="animatedElement"
      className="border border-solid border-black pt-16"
      style={{ opacity: 1, height: "3000px" }}
    >
      <div className="fixed">
        <div>scroll : {scrollPosition}</div>

        {/* scrol : 0 - 500 */}
        <div
          style={{
            position: "absolute",
            width: "1000px",
            //   border: "1px solid blue",
            //   transform: `scale(1.5) translateX(${scrollPosition * 0.5}px)`,
            transform: `scale(1) perspective(500px) translate3d(${
              (scrollPosition - 200) * 0.1
            }px, ${(scrollPosition - 200) * 0.1}px, ${
              Math.log(scrollPosition) * 50 * 0.5
            }px)`,
            opacity: `${0.5 + scrollPosition / 1000}`,
          }}
        >
          <img src={mountain} />
        </div>

        {/* scrol : 0 - 500 */}
        <div
          style={{
            position: "absolute",
            width: "1000px",
            //   border: "1px solid blue",
            //   transform: `scale(1.5) translateX(${scrollPosition * 0.5}px)`,
            transform: `scale(1) perspective(500px) translate3d(${scrollPosition}px, ${scrollPosition}px, ${
              Math.log(scrollPosition + 1) * 50
            }px)`,
            opacity: `${0.7 + scrollPosition / 500}`,
          }}
        >
          <img src={mountain} />
        </div>

        {/* <div
            style={{
              border: "1px solid blue",
              height: "100vh",
            }}
          > */}
        <div
          style={{
            position: "absolute",
            transform: `translateX(${
              scrollPosition * 0.0001
            }px) translateY(calc(50% - 150px))`,
            height: "650px",
            width: `${1000 + scrollPosition * 0.2}px`,
            backgroundColor: "transparent",
            border: "3px solid gray",
          }}
        ></div>
        {/* </div> */}

        <div
          ref={mountRef}
          style={{
            position: "absolute",
          }}
        ></div>
      </div>
    </div>
  );
}
