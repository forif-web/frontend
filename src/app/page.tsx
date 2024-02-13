"use client";
import Milestone from "@/components/pages/home/milestone";
import milestone from "@/components/pages/home/milestoneData";
import { Button } from "@/components/ui/button";
import handleObserver from "@/hooks/intersectionObserver";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { TypeAnimation } from "react-type-animation";
import { sourceCodePro } from "./fonts/fonts";

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
      <main className={`pt-16 mb-8 min-h-full h-fit`}>
        <section className="h-screen w-full flex">
          <div className="flex flex-col gap-12 justify-center items-center h-[calc(100%-60px)] w-full">
            <div className="md:text-6xl text-3xl font-bold whitespace-pre-line tracking-wide text-center flex flex-col gap-10 text-gray-900">
              <div className="flex flex-row gap-2">
                <TypeAnimation
                  wrapper="span"
                  preRenderFirstString={true}
                  sequence={[
                    2000,
                    "개발자",
                    2000,
                    "팀 프로젝트",
                    2000,
                    "새로운 경험",
                    2000,
                    "한양대생",
                    3000,
                  ]}
                  speed={8}
                  repeat={Infinity}
                  className="text-forif"
                />
                <span>위한</span>
              </div>
              <h1
                className={sourceCodePro.className}
                style={{ fontWeight: "bold", fontSize: "72px" }}
              >
                FORIF
              </h1>
            </div>
            <Button variant={"default"} size={"lg"}>
              <Link href={"/studies"}>APPLY NOW</Link>
            </Button>
          </div>
        </section>
        <div id="about_us"></div>
        <section className="md:mt-32 mt-12 flex flex-col items-center min-h-fit w-full">
          <div className="flex flex-col w-10/12 max-w-8xl h-full">
            <h1 className="md:text-4xl text-3xl font-bold text-black transition-all flex items-center justify-start">
              변화를 열망하는 사람들이 모여,
              <br />
              역사에 남을만한 변화를 만듭니다.
            </h1>
          </div>
        </section>
        <section className="mt-12 flex flex-col items-center min-h-fit w-full relative">
          <div className="flex md:flex-row flex-col w-10/12 max-w-8xl h-[calc(100%-60px)]">
            <div className="w-full">
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
                  <p className="md:text-5xl text-3xl font-bold text-black absolute -top-4 -right-4">
                    +
                  </p>
                  <p className="md:text-xl text-lg text-black">누적 부원 수</p>
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
                성장률
              </h1>

              <div className="flex flex-row gap-16 mb-2">
                <div className="flex flex-col justify-center items-start relative">
                  <h2 className="md:text-9xl text-5xl font-bold text-black">
                    400
                  </h2>
                  <p className="md:text-xl text-lg text-black">지원 인원</p>
                  <p className="md:text-5xl text-3xl font-bold text-black absolute -top-4 -right-4">
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
        <section
          id="howitworks"
          className="md:mt-52 mt-12 flex flex-col gap-32 items-center h-fit"
        >
          <div className="flex flex-col justify-start w-10/12 max-w-8xl">
            <div className="flex flex-col items-start">
              <h1 className="md:text-7xl text-3xl font-bold text-black mb-4">
                진행과정
              </h1>
              <div>
                <h2></h2>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
