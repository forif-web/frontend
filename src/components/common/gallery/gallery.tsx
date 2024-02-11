"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./gallery-styles.module.css";

export type GalleryImageType = {
  id: number;
  imageURI: string;
  name: string;
  description: string;
  isHovered: boolean;
  isClick: boolean;
};

export default function Gallery({ images }: { images: GalleryImageType[] }) {
  const [imageHoverStates, setImageHoverStates] = useState(
    images.map(() => false)
  );

  const [imageClickState, setImageClickState] = useState({
    state: false,
    idx: -1,
  });

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

  const handleImageClick = (idx: number) => {
    setImageClickState({ state: true, idx: idx });
    document.body.classList.add("no-scroll");
  };

  const handleCloseImage = () => {
    setImageClickState({ state: false, idx: -1 });
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className={styles.gallery_container}>
      {images.map((val) => (
        <div
          key={val.id}
          style={{
            backgroundImage: `url('/images/gallery/${val.imageURI}.avif')`,
          }}
          className={styles.image_container}
          onMouseEnter={() => handleImageHover(val.id)}
          onMouseLeave={() => handleImageUnhover(val.id)}
          onClick={() => handleImageClick(val.id)}
        >
          {imageHoverStates[val.id] && <h2>{val.name}</h2>}
        </div>
      ))}
      {imageClickState.state && (
        <div className={styles.overlay} onClick={handleCloseImage}>
          <div className={styles.image_modal}>
            <Image
              src={`/images/gallery/${
                images[imageClickState.idx].imageURI
              }.avif`}
              alt="Modal Image"
              width={1000}
              height={1000}
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII="
              priority
            />
            <figcaption>
              <h1 className="text-4xl">{images[imageClickState.idx].name}</h1>
              <p>{images[imageClickState.idx].description}</p>
            </figcaption>
          </div>
        </div>
      )}
    </div>
  );
}
