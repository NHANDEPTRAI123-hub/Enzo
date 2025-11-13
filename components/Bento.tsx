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
      className={` relative p-8 sm:p-8 rounded-lg  overflow-hidden ${
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
            className="max-w-none w-105 h-auto sm:w-100 sm:h-auto lg:w-200 lg:h-auto"
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
            className="w-50 h-auto sm:w-50 sm:h-auto lg:w-80 lg:h-auto object-contain"
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
