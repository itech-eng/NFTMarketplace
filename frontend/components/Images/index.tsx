import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePalette } from "react-palette";
import { DEFAULT_IMAGE } from "src/helpers/coreconstants";
import { hexToRgba } from "src/helpers/functions";

export const ImageItem = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  layout,
  objectPosition,
  forModal = false,
  isNextImage = true,
}: any) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div>
      <Image
        loader={() => imgSrc}
        // priority
        // unoptimized={true}
        src={imgSrc}
        blurDataURL={DEFAULT_IMAGE.ITEM}
        alt={alt}
        onClick={onClick}
        onError={() => {
          setImgSrc(DEFAULT_IMAGE.ITEM);
        }}
        placeholder="blur"
        width={width ? width : 50}
        height={height ? height : 50}
        layout={layout ? layout : "fill"}
        className={className}
        objectPosition={objectPosition ? objectPosition : "center"}
      />
    </div>
  );
};

export const ImageProfile = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  forModal = false,
  forItem = false,
}: any) => {
  let imgSrc = "";

  if (src) {
    imgSrc = src;
  } else if (forItem) {
    imgSrc = DEFAULT_IMAGE.ITEM;
  } else {
    imgSrc = DEFAULT_IMAGE.USER;
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevent looping
        currentTarget.src = forItem ? DEFAULT_IMAGE.ITEM : DEFAULT_IMAGE.USER;
      }}
      width={width}
      height={height}
      className={className}
      style={{
        maxHeight: forModal ? "85vh" : "",
      }}
      onClick={onClick}
    />
  );
};

export const ImageItemForPalette = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  layout,
  setBgGradientColor,
}: any) => {
  const [imgSrc, setImgSrc] = useState(DEFAULT_IMAGE.ITEM);

  const { data, loading, error } = usePalette(imgSrc);

  if (!loading && !error) {
    setBgGradientColor(
      `linear-gradient(${hexToRgba(data.lightVibrant, 0.015)} 0%, ${hexToRgba(
        data.vibrant,
        0.9
      )} 75%)`
    );
  }

  // intersection
  const imgRef = useRef<any>(null);

  const callBackFn = (entries: any) => {
    const [entry] = entries;

    if (entry.isIntersecting) setImgSrc(src);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(callBackFn, options);
    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <div ref={imgRef}>
      <Image
        loader={() => src}
        src={src}
        blurDataURL={DEFAULT_IMAGE.ITEM}
        alt={alt}
        onClick={onClick}
        onError={() => {
          setImgSrc(DEFAULT_IMAGE.ITEM);
        }}
        placeholder="blur"
        width={width ? width : 50}
        height={height ? height : 50}
        layout={layout ? layout : "fill"}
        className={className}
      />
    </div>
  );
};
