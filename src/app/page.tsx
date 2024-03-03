"use client";
import { Button } from "@/components/ui/button";
import Carousel from "@/containers/main/carousel";
import { Text } from "@radix-ui/themes";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Pretendard, sourceCodePro } from "./fonts/fonts";
export default function HomePage() {
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
                    FORIF와 함께 프로그래밍을 향한 열정을 불태워봐요!
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <motion.div
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    className="border-2 border-gray-900 md:block hidden"
                  />
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
        <div className="w-full flex flex-col gap-2 justify-center py-10 bg-[#2d2f31] mb-40">
          <Text
            size={"8"}
            weight={"bold"}
            align={"center"}
            className="text-gray-50"
          >
            한양대학교 개발 중앙동아리
          </Text>
          <Text size={"5"} align={"center"} className="text-gray-400 mb-4">
            Loved By 1000+ School Fellows
          </Text>
          <div className="flex justify-center">
            <Button variant={"apply"} size={"apply"}>
              <Link href={`/apply`}>지원하기</Link>
            </Button>
          </div>
        </div>
        <div id="how_it_works"></div>
        <section className="mt-20 flex flex-col items-center min-h-fit w-full relative">
          <div className="flex md:flex-row flex-col md:w-10/12 md:px-0 px-11 w-full max-w-7xl">
            <div className="w-full flex flex-col md:gap-10 gap-20 justify-center items-start">
              <div className="w-full">
                <Text
                  as="p"
                  size={"9"}
                  weight={"bold"}
                  align={"center"}
                  className="mb-2"
                >
                  How it works?
                </Text>
                <Text as="p" size={"3"} color="gray" align={"center"}>
                  부원 모집부터 해커톤까지. FORIF가 한 학기 동안 부원 여러분들과
                  함께 만들어갈 여정에 동참해주세요.
                </Text>
              </div>
              <WorkCard
                title="원하는 스터디를 선택하세요"
                desc="10개 이상의 스터디에서 REACT, C++, JAVA, PYTHON 등 다양한 언어를 배워보세요. 초심자를 위한 스터디부터 프로젝트형 스터디까지, 함께 성장해나가요."
                img="/images/main/choose.jpg"
              />
              <WorkCard
                title="다양한 행사에 참여하세요"
                desc="FORIF에서는 학기 중에 다양한 행사를 개최합니다. 알고리즘 대회, 미니 해커톤, 중간 총회, MT 등에 참가해 재미와 실력 모두를 찾아가세요."
                img="/images/main/homecoming.avif"
                reverse
              />
              <WorkCard
                title="한 학기의 마지막, 해커톤"
                desc="한 학기의 마지막을 해커톤으로 장식하세요. 서로 다른 학과, 서로 다른 스터디가 모여 서로 배운 것을 공유합니다."
                img="/images/main/hackathon.avif"
              />
            </div>
          </div>
        </section>
        <section
          id="projects"
          className="mt-52 flex flex-col gap-32 items-center h-fit"
        >
          <div className="flex flex-col justify-start md:w-10/12 w-full px-11 max-w-8xl">
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

const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 50,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
};

function WorkCard({
  title,
  desc,
  img,
  reverse,
}: {
  title: string;
  desc: string;
  img: string;
  reverse?: boolean;
}) {
  function CardText() {
    return (
      <motion.div variants={cardVariants} className="card_order_second">
        <Text as="p" size={"8"} weight={"bold"} className="tracking-wide mb-2">
          {title}
        </Text>
        <Text
          as="p"
          size={"2"}
          color="gray"
          className="text-left w-full break-all"
        >
          {desc}
        </Text>
      </motion.div>
    );
  }

  function CardImage() {
    return (
      <motion.div variants={cardVariants} className="card_order_first">
        <Image
          src={img}
          width={600}
          height={300}
          alt="메인 사진"
          className={`object-cover rounded-lg`}
        />
      </motion.div>
    );
  }
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="flex flex-col md:flex-row md:gap-20 gap-5 justify-between items-center w-full md:px-12"
    >
      {reverse ? (
        <>
          <CardImage />
          <CardText />
        </>
      ) : (
        <>
          <CardText />
          <CardImage />
        </>
      )}
    </motion.div>
  );
}
