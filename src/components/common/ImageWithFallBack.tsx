"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type imageFallBackType = {
  src: string | undefined;
} & Omit<ImageProps, "src">;

const ImageWithFallback = (props: imageFallBackType) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc ? imgSrc : process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMG_URL!}
      {...rest}
    />
  );
};

export default ImageWithFallback;
