"use client";
import Milestone from "@/components/pages/home/milestone";
import milestone from "@/components/pages/home/milestoneData";
import Carousel from "@/containers/main/carousel";
import ProcessCards from "@/containers/main/process-cards";
import handleObserver from "@/hooks/intersectionObserver";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Pretendard, sourceCodePro } from "./fonts/fonts";

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
        <section className="flex flex-col items-center justify-center min-h-screen w-full pt-20">
          <div className="flex md:flex-row flex-col px-11 items-center max-w-7xl h-[calc(100%-60px)] relative">
            <div className="w-full flex flex-col gap-5">
              <div
                className={`${sourceCodePro.className} md:text-8xl text-6xl font-bold leading-tight text-gray-900 uppercase`}
              >
                <div className="flex flex-row justify-between items-center">
                  <h1 className="pr-8">UPGRADE</h1>
                  <p
                    className={`${Pretendard.className} text-base text-gray-500 font-medium md:block hidden`}
                  >
                    FORIF는 전공과 상관없이 프로그래밍을 배운다는 목표를 갖고
                    2015년에 창설된 한양대학교의 웹/앱 개발 중앙동아리입니다.
                    FORIF와 함께 프로그래밍을 향한 열정을 불태워보자구요!
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="border-2 border-gray-900 w-full md:block hidden" />
                  <h1 className="md:pl-8 md:text-right min-w-fit min-h-fit md:whitespace-nowrap">
                    YOUR PASSION
                  </h1>
                </div>
              </div>
              <div>
                <p className="text-2xl">2024.02.26 - 2024.03.06</p>
              </div>
              <div className="md:hidden flex flex-row items-center gap-4">
                <h1>지원하기</h1>
                <button className="rounded-full bg-black text-white w-12 h-12">
                  <Link
                    href={"/studies"}
                    className="flex items-center justify-center"
                  >
                    <MdOutlineArrowOutward size={24} />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </section>
        <div id="about_us"></div>
        {/* <div
          id="main-bg-img"
          className={`md:max-w-[1236px] w-full mx-auto aspect-video md:rounded-2xl flex items-center justify-center`}
        >
          <h1 className="text-gray-50 md:text-5xl text-2xl font-bold">
            지식의 선순환
          </h1>
        </div> */}
        {/* <section className="flex flex-col items-center w-full">
          <div className="flex flex-col px-11 w-full max-w-7xl gap-5">
            <h1
              className={`${sourceCodePro.className} md:text-6xl text-3xl font-bold md:w-2/3 mb-4`}
            >
              FIND YOUR FAVORITE STUDY
            </h1>
            <Swiper spaceBetween={100} slidesPerView={3}>
              {data?.map((study) => (
                <SwiperSlide>
                  <Card
                    size="4"
                    className="md:min-w-[360px] w-full max-h-[200px] h-full"
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold whitespace-normal">
                          <Strong>{study.studyName}</Strong>
                        </h1>
                        <p>
                          {study.date} {study.startTime} - {study.endTime}
                        </p>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <p className="text-xl font-medium text-gray-600">
                          {study.mentorName} 멘토
                        </p>
                        <div className="flex flex-row items-center gap-2">
                          <FaStar size={20} />
                          <p className="text-xl font-medium text-gray-600">
                            {study.level}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section> */}
        <section className="mt-20 flex flex-col items-center min-h-fit w-full relative">
          <div className="flex md:flex-row flex-col w-10/12 px-11 max-w-7xl h-[calc(100%-60px)]">
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
          <div className="flex flex-col justify-start w-10/12 px-11 max-w-7xl">
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
      </main>
    </>
  );
}
