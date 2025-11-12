'use client';

import React from 'react';
import Image from 'next/image';

interface BentoProps {
  title?: string;
  description?: string;
  backgroundColor: string;
  icon?: React.ReactNode;
  isWhiteText?: boolean;
  customContent?: React.ReactNode;
  topSvgIcon?: string;
  mainSvgIcon?: string;
}

const Bento = ({ 
  title, 
  description, 
  backgroundColor, 
  icon, 
  isWhiteText,
  customContent,
  topSvgIcon,
  mainSvgIcon
}: BentoProps) => {
  return (
    <div
      className={` sm:p-8 rounded-lg  overflow-hidden ${isWhiteText ? 'text-white' : ''}`}
      style={{ backgroundColor, borderRadius: '8px' }}
    >
      {/* Top decorative SVG */}
      {topSvgIcon && (
        <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-100 sm:h-100">
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
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-80 lg:h-80 mb-2">
          <Image
            src={mainSvgIcon}
            alt="Guide icon"
            width={80}
            height={80}
            className="w-full h-full object-contain"
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
