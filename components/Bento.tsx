"use client";

import React from "react";
import Image from "next/image";

interface BentoProps {
  title?: string;
  description?: string;
  backgroundColor: string;
  icon?: React.ReactNode;
  isWhiteText?: boolean;
  customContent?: React.ReactNode;
  topSvgIcon?: string;
  mainSvgIcon?: string;
  centerSvgIcon?: string;
  backgroundImage?: string;
}

const Bento = ({
  title,
  description,
  backgroundColor,
  icon,
  isWhiteText,
  customContent,
  topSvgIcon,
  mainSvgIcon,
  centerSvgIcon,
  backgroundImage,
}: BentoProps) => {
  return (
    <div
      className={` relative sm:p-8 rounded-lg  overflow-hidden ${
        isWhiteText ? "text-white" : ""
      }`}
      style={{ backgroundColor, borderRadius: "8px" }}
    >
      {/* Background cover image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Top decorative SVG */}
      {topSvgIcon && (
        <div className="absolute -top-28 left-1">
          <Image
            src={topSvgIcon}
            alt="Decorative pattern"
            width={128}
            height={128}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Main SVG icon with higher z-index */}
      {mainSvgIcon && (
        <div className="relative z-10 top-12  mb-15">
          <Image
            src={mainSvgIcon}
            alt="Guide icon"
            width={80}
            height={80}
            style={{ width: "900px", height: "auto" }}
            className="max-w-none"
          />
        </div>
      )}

      {/* Center SVG icon (for partner icon in middle of bento) */}
      {centerSvgIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={centerSvgIcon}
            alt="Center icon"
            width={200}
            height={200}
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 object-contain"
          />
        </div>
      )}

      {/* Custom content for special layouts */}
      {customContent ? (
        customContent
      ) : (
        <>
          {icon && <div className="text-3xl sm:text-4xl">{icon}</div>}
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}
        </>
      )}
    </div>
  );
};

export default Bento;
