"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
} from "framer-motion";

const IMGS: string[] = [
  "/projects/Mabini_tourism.png",
  "/projects/The Burger Spot.png",
  "/projects/Analytics.png",
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  // Use default images if none are provided
  const galleryImages = images.length > 0 ? images : IMGS;
  const faceCount = galleryImages.length || 1;

  // start with safe defaults, then measure on mount
  const [viewportWidth, setViewportWidth] = useState<number>(1200);
  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);

  useEffect(() => {
    const measure = () => {
      setViewportWidth(window.innerWidth);
      setIsScreenSizeSm(window.innerWidth <= 640);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 3D geometry calculations (responsive)
  const cylinderWidth: number = isScreenSizeSm
    ? Math.max(800, viewportWidth * 1.2)
    : Math.min(2400, viewportWidth * 1.4);

  // face width derived from cylinder but clamped so faces don't become too wide or too small
  const faceWidth: number = Math.max(180, Math.min(420, (cylinderWidth / faceCount) * 1.05));
  const radius: number = Math.max(100, cylinderWidth / (2 * Math.PI));

  // Image display size (use faceWidth so image fills the card exactly and no spacing)
  const imgWidth = Math.round(faceWidth); // intrinsic width for next/image
  const imgHeight = Math.round(imgWidth * (0.7)); // adjusted aspect ratio for analytics and other images

  // Framer Motion values and controls
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Put translateX(-50%) BEFORE the rotation so the carousel remains visually centered while rotating
  const transformWithTranslate = useTransform(
    rotation,
    (val: number) => `translateX(-50%) rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: any) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: any, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[275px] md:h-[450px] w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background: "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />

      <div className="relative h-full flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            position: "relative",
            left: "50%",
            width: `${cylinderWidth}px`,
            transform: transformWithTranslate, // translateX first, then rotate
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
            willChange: "transform",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => {
            const angle = (360 / faceCount) * i;
            const itemTransform = `translateX(-50%) rotateY(${angle}deg) translateZ(${radius}px)`;
            return (
              <div
                key={i}
                // removed padding to eliminate space between cards
                className="group absolute flex h-fit items-center justify-center [backface-visibility:hidden] p-0 md:p-0"
                style={{
                  width: `${faceWidth}px`,
                  left: "50%",
                  transform: itemTransform,
                }}
              >
                <Image
                  width={imgWidth}
                  height={imgHeight}
                  unoptimized
                  priority
                  src={url}
                  alt="gallery"
                  // ensure the image fills the face exactly
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 15,
                  }}
                  className="pointer-events-none rounded-[15px] border-[3px] border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;