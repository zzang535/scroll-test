// module
import gsap from "gsap";
import { useEffect, useState, useRef } from "react";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tween } from "react-gsap";

// assets

// style
import "./Scroll2.css";

// module init
gsap.registerPlugin(ScrollTrigger);

export default function Component() {
  // scroll 출력
  const [scrollPosition, setScrollPosition] = useState(0);
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
        start: 600, // 시작 스크롤 포인트
        end: 20000, // 끝 스크롤 포인트
        scrub: 1, // 스크롤 속도의 비율
      },
    });
    gsap.to(".square3", {
      x: 2000, // 최종 위치
      // duration: 3,
      scrollTrigger: {
        trigger: ".square",
        start: 800, // 시작 스크롤 포인트
        end: 30000, // 끝 스크롤 포인트
        scrub: 1, // 스크롤 속도의 비율
      },
    });
  }, []);

  return (
    <div className="Scroll2">
      <div className="fixed">scroll: {scrollPosition}</div>
      {/* <Tween
        to={{
          x: "100px",
          scrollTrigger: {
            trigger: ".square", // 대상
            start: "-200px center", // 애니메이션 시작 위치
            end: "200px center", // 애니메이션 종료 위치
            scrub: 0.5, // 스크롤 속도의 비율
            markers: true, // 마커
          },
        }}
      > */}
      <div
        className="square3"
        style={{
          position: "fixed",
          top: 200,
          left: 0,
          width: "600px",
          height: "600px",
          background: "blue",
        }}
      />
      <div
        className="square"
        style={{
          position: "fixed",
          top: 200,
          left: 0,
          width: "100px",
          height: "100px",
          background: "#ccc",
        }}
      />
      <div
        className="square2"
        style={{
          position: "fixed",
          top: 400,
          left: 0,
          width: "200px",
          height: "200px",
          background: "red",
        }}
      />

      {/* </Tween> */}

      {/* <div className="text-3xl font-bold underline">hello</div> */}
    </div>
  );
}
