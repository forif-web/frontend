import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import styles from "./carousel.module.css";
type carouselItemType = {
  id: number;
  url: string;
  imgUrl: string;
  name: string;
  isHovered: boolean;
};
const items: carouselItemType[] = [
  {
    id: 0,
    url: "https://github.com/forif-web/frontend",
    imgUrl: "simulator.png",
    name: "학부생 시뮬레이터",
    isHovered: false,
  },
  {
    id: 1,
    url: "https://newsclipping-csr.co.kr/",
    imgUrl: "newsclipping.png",
    name: "News Clipping",
    isHovered: false,
  },
  {
    id: 2,
    url: "https://github.com/ajinjink/tetris_py",
    imgUrl: "tetris.jpeg",
    name: "파이썬 테트리스",
    isHovered: false,
  },
  {
    id: 3,
    url: "https://github.com/ImScareddd",
    imgUrl: "imscareddd.png",
    name: "날랑말랑",
    isHovered: false,
  },
  {
    id: 4,
    url: "https://solved.ac/en/profile/forif",
    imgUrl: "baekjoon.png",
    name: "롤 골 백 골",
    isHovered: false,
  },
  {
    id: 5,
    url: "https://github.com/starlike6617/FORIF_React-study",
    imgUrl: "CardNewsReact.png",
    name: "리액트 깨물어 먹기",
    isHovered: false,
  },
  {
    id: 6,
    url: "https://github.com/DonghyunKim98/horror-web-forif-21-1",
    imgUrl: "horror_react.png",
    name: "리액트 공포 게임",
    isHovered: false,
  },
];
export default function Carousel() {
  const [imageHoverStates, setImageHoverStates] = useState(
    items.map(() => false)
  );
  const handleImageHover = (idx: number) => {
    setImageHoverStates((prevState) => {
      const newHoverStates = [...prevState];
      newHoverStates[idx] = true;
      return newHoverStates;
    });
  };

  const handleImageUnhover = (idx: number) => {
    setImageHoverStates((prevState) => {
      const newHoverStates = [...prevState];
      newHoverStates[idx] = false;
      return newHoverStates;
    });
  };
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={item.url} target="_blank">
              <div
                style={{
                  backgroundImage: `url('/images/main/carousel/${item.imgUrl}')`,
                }}
                className={styles.carousel_container}
                onMouseEnter={() => handleImageHover(item.id)}
                onMouseLeave={() => handleImageUnhover(item.id)}
              >
                {imageHoverStates[item.id] && <h2>{item.name}</h2>}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
