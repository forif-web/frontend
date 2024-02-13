"use client";
import { MilestoneEvent, MilestoneType } from "@/app/types/milestone";
import handleObserver from "@/hooks/intersectionObserver";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./milestone-styles.module.css";
export default function Milestone({
  milestoneData,
}: {
  milestoneData: MilestoneType;
}) {
  //이미지 관련 states
  const [selectedImage, setSelectedImage] = useState({
    name: "",
    url: "",
  });
  const [imageClickState, setImageClickState] = useState({
    state: false,
    idx: 999,
  });
  const handleImageClick = (detail: MilestoneEvent) => {
    setSelectedImage({
      name: detail.event,
      url: detail.imgUrl,
    });
    setImageClickState({ state: true, idx: detail.id });
  };

  const handleCloseImage = () => {
    setImageClickState({ state: false, idx: 999 });
  };

  //CountUp 애니메이션
  const [lineVisible, setLineVisible] = useState<boolean>(false);
  const milestoneObserver = handleObserver("#milestone");

  useEffect(() => {
    function handleVisible() {
      if (
        !lineVisible &&
        milestoneObserver !== undefined &&
        milestoneObserver > 0.1
      ) {
        setLineVisible(true);
      }
    }
    handleVisible();
  }, [milestoneObserver, lineVisible]);

  return (
    <div
      id="milestone"
      className="w-full h-full flex md:flex-row flex-col gap-10 justify-between items-start"
    >
      <ul className={styles.milestone}>
        {milestoneData.data.map((val, index) => (
          <li
            key={val.year}
            className={`${
              index === milestoneData.data.length - 1 ? styles.lastItem : ""
            }`}
          >
            <div className={styles.wrap_cont}>
              <strong>{val.year}</strong>
              <div className={styles.inner_cont}>
                {val.events.map((event) => (
                  <div
                    key={`${val.year}-${event.month}`}
                    className="flex justify-start"
                  >
                    <em>{event.month}월</em>
                    <div className="ml-9">
                      <ul className={styles.milestone_link}>
                        {event.details.map((detail) => (
                          <button
                            onClick={() => handleImageClick(detail)}
                            key={`${val.year}-${event.month}-${detail.id}`}
                          >
                            <li className="focus:text-forif hover:text-forif">
                              {detail.event}
                            </li>
                          </button>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div
        className="w-10 transition-all duration-line bg-gradient-to-b from-cyan-500 to-forif"
        style={{ height: `${lineVisible ? `100` : `10`}%` }}
      />

      {imageClickState.state && (
        <div className={styles.overlay} onClick={handleCloseImage}>
          <div className={styles.image_modal}>
            <Image
              src={`/images/gallery/${selectedImage.url}`}
              alt="Modal Image"
              width={1000}
              height={1000}
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII="
              priority
            />
            <figcaption>
              <h1 className="text-4xl">{selectedImage.name}</h1>
              <p>{"예시 텍스트입니다."}</p>
            </figcaption>
          </div>
        </div>
      )}
    </div>
  );
}
