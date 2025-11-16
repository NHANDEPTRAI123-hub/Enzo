"use client";

import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  backgroundColor: string;
  title: React.ReactNode;
  description: string;
  icon?: React.ReactNode;
  svgIcon?: string;
  mainIcon?: string;
  buttonColor?: string;
  isWhiteText?: boolean;
}

const FeatureCard = ({
  backgroundColor,
  title,
  description,
  icon,
  svgIcon,
  mainIcon,
  buttonColor,
  isWhiteText = false,
}: FeatureCardProps) => {
  return (
    <div
      className="relative flex flex-col gap-4 p-6 sm:p-8 flex-1 min-h-[200px] sm:min-h-[250px] overflow-hidden"
      style={{ backgroundColor, borderRadius: "36px" }}
    >
      {/* Decorative SVG - Top Right */}
      {svgIcon && (
        <div className="absolute -top-7 -right-8 sm:-top-4 sm:-right-10">
          <Image
            src={svgIcon}
            alt="Decorative icon"
            width={120}
            height={120}
            className="w-30 h-auto sm:w-36 sm:h-36"
          />
        </div>
      )}

      {/* Main Icon - Top Left */}
      {mainIcon && (
        <div className="relative z-10 mb-4">
          <Image
            src={mainIcon}
            alt="Feature icon"
            width={48}
            height={48}
            className="relative right-2.5 w-23 h-auto sm:w-25 sm:h-25"
          />
        </div>
      )}

      {icon && <div className="text-4xl relative z-10">{icon}</div>}

      <h3
        className={`font-semibold leading-tight relative z-10 ${
          isWhiteText ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm sm:text-base relative z-10 grow ${
          isWhiteText ? "text-white" : "text-black"
        }`}
      >
        {description}
      </p>

      {/* Button - Bottom Right */}
      {buttonColor && (
        <div className="flex justify-end relative z-10 mt-3">
          <button
            className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: buttonColor, borderRadius: "11px" }}
            aria-label="View details"
          >
            <Image
              src="/ui/vector.svg"
              alt="Arrow icon"
              width={20}
              height={20}
              className="w-5 h-5 sm:w-5 sm:h-5"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
