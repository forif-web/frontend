"use client";
import Milestone from "@/components/pages/home/milestone";
import milestone from "@/components/pages/home/milestoneData";
import { Button } from "@/components/ui/button";
import Carousel from "@/containers/main/carousel";
import ProcessCards from "@/containers/main/process-cards";
import handleObserver from "@/hooks/intersectionObserver";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export default function HomePage() {
  //CountUp 애니메이션
  const [countUpVisible, setCountUpVisible] = useState<boolean>(false);
  const scaleVisible = handleObserver("#scale");
  useEffect(() => {
    function handleVisible() {
      if (!countUpVisible && scaleVisible !== undefined && scaleVisible > 0.3) {
        setCountUpVisible(true);
      }
    }
    handleVisible();
  }, [scaleVisible, countUpVisible]);

  return (
    <>
      <main className={`mb-8 min-h-full h-fit`}>
        <section className="flex flex-col items-center justify-center md:justify-end min-h-screen w-full pb-20">
          <div className="flex md:flex-row flex-col justify-between w-10/12 max-w-8xl h-[calc(100%-60px)]">
            <div className="w-full flex flex-col gap-5">
              <h1 className="md:text-[80px] text-5xl font-bold leading-tight text-gray-900 uppercase">
                <span className="text-blue-900">프로그래밍</span>을 향한
                <br />
                열정만 있다면
              </h1>
              <div>
                <p className="text-xl">2024.02.26 - 2024.03.06</p>
              </div>
              <div>
                <Button variant={"default"} size={"xl"}>
                  <Link href={"/studies"}>APPLY NOW</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block framer">
              <motion.svg
                width="360"
                height="360"
                viewBox="0 0 500 360"
                initial="hidden"
                animate="visible"
                style={{
                  strokeWidth: "10px",
                  strokeLinecap: "round",
                  fill: "transparent",
                }}
              >
                <motion.rect
                  width="360"
                  height="280"
                  x="40"
                  y="40"
                  rx="20"
                  stroke="#000000"
                  variants={draw}
                  custom={0}
                  style={{
                    strokeWidth: "10px",
                    strokeLinecap: "round",
                    fill: "transparent",
                  }}
                />
                <motion.line
                  x1="160"
                  y1="350"
                  x2="270"
                  y2="350"
                  strokeWidth={10}
                  stroke="#000000"
                  variants={draw}
                  custom={1}
                  style={{
                    strokeWidth: "10px",
                    strokeLinecap: "round",
                    fill: "transparent",
                  }}
                />
                <motion.line
                  x1="100"
                  y1="380"
                  x2="340"
                  y2="380"
                  strokeWidth={10}
                  stroke="#000000"
                  variants={draw}
                  custom={2}
                  style={{
                    strokeWidth: "16",
                    strokeLinecap: "round",
                    fill: "transparent",
                  }}
                />
                <motion.line
                  x1="120"
                  y1="80"
                  x2="80"
                  y2="120"
                  strokeWidth={10}
                  stroke="#000000"
                  variants={draw}
                  custom={2}
                  style={{
                    strokeWidth: "10px",
                    strokeLinecap: "round",
                    fill: "transparent",
                  }}
                />
                <motion.line
                  x1="160"
                  y1="70"
                  x2="70"
                  y2="160"
                  strokeWidth={10}
                  stroke="#000000"
                  variants={draw}
                  custom={2}
                  style={{
                    strokeWidth: "10px",
                    strokeLinecap: "round",
                    fill: "transparent",
                  }}
                />
              </motion.svg>
            </div>
          </div>
        </section>
        <div id="about_us"></div>
        <section className="mt-20 flex flex-col items-center min-h-fit w-full relative">
          <div className="flex md:flex-row flex-col w-10/12 max-w-8xl h-[calc(100%-60px)]">
            <div className="w-full">
              <h1 className="md:text-7xl text-3xl font-bold text-black mb-4">
                About us
              </h1>
              <Milestone milestoneData={milestone} />
            </div>
          </div>
        </section>
        <section
          id="scale"
          className="md:mt-52 mt-12 flex flex-col gap-32 items-center h-fit"
        >
          <div className="flex flex-col justify-start w-10/12 max-w-8xl">
            <div className="flex flex-col items-start">
              <h1 className="md:text-7xl text-3xl font-bold text-black mb-4">
                규모
              </h1>

              <div className="flex flex-row gap-16 mb-2">
                <div className="flex flex-col justify-center items-start relative">
                  <h2 className="md:text-9xl text-5xl font-bold text-black">
                    {countUpVisible ? (
                      <CountUp start={600} end={1200} duration={4} />
                    ) : (
                      1200
                    )}
                  </h2>
                  <p className="md:text-5xl text-3xl font-bold text-black absolute md:-top-4 md:-right-4 -top-2 -right-2">
                    +
                  </p>
                  <p className="md:text-xl text-lg text-black">
                    누적 신청 인원 수
                  </p>
                </div>
                <div className="flex flex-col justify-center items-start relative">
                  <h2 className="md:text-9xl text-5xl font-bold text-black">
                    {countUpVisible ? (
                      <CountUp start={1} end={64} duration={4} />
                    ) : (
                      64
                    )}
                  </h2>
                  <p className="md:text-xl text-lg text-black">총 스터디 수</p>
                </div>
              </div>
              <p className="text-sm text-black">* 2015년 기준</p>
            </div>
            <div className="flex flex-col items-end mt-32">
              <h1 className="md:text-7xl text-3xl font-bold text-black mb-4">
                성장 및 유지
              </h1>

              <div className="flex flex-row gap-16 mb-2">
                <div className="flex flex-col justify-center items-start relative">
                  <h2 className="md:text-9xl text-5xl font-bold text-black">
                    150
                  </h2>
                  <p className="md:text-xl text-lg text-black">
                    지원 인원 증가
                  </p>
                  <p className="md:text-5xl text-3xl font-bold text-black absolute md:-top-4 md:-right-4 -top-2 right-3">
                    +
                  </p>
                </div>
                <div className="flex flex-col justify-center items-start relative">
                  <h2 className="md:text-9xl text-5xl font-bold text-black">
                    90%
                  </h2>
                  <p className="md:text-xl text-lg text-black">등록률</p>
                </div>
              </div>
              <p className="text-sm text-black">* 2023년 기준 전년 대비</p>
            </div>
          </div>
        </section>
        <div id="howitworks"></div>
        <section className="md:mt-52 mt-12 flex flex-col gap-32 items-center h-fit">
          <div className="flex flex-col justify-start w-10/12 max-w-8xl">
            <div className="flex flex-col items-start">
              <h1 className="md:text-6xl text-3xl font-bold text-black mb-8">
                입부 과정
              </h1>
              <div className="flex flex-row w-full justify-between">
                <ProcessCards />
              </div>
            </div>
          </div>
        </section>
        <section
          id="projects"
          className="md:mt-52 mt-12 flex flex-col gap-32 items-center h-fit"
        >
          <div className="flex flex-col justify-start w-10/12 max-w-8xl">
            <div className="flex flex-col items-start">
              <h1 className="md:text-6xl text-3xl font-bold text-black mb-2">
                해커톤
              </h1>
              <p className="mb-8 md:text-xl text-base">
                한 학기의 마지막 행사, 해커톤입니다. 각 스터디의 최종 결과물을
                공유하며 한 학기를 마무리합니다.
              </p>
              <Carousel />
            </div>
          </div>
        </section>
        <Button
          variant={"default"}
          size={"lg"}
          className="fixed right-10 bottom-10"
        >
          <Link href={"/apply/mentor"}>멘토 모집 중</Link>
        </Button>
      </main>
    </>
  );
}
