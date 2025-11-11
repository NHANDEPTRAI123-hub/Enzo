'use client';

import React from 'react';

interface FeatureCardProps {
  backgroundColor: string;
  title: React.ReactNode;
  description: string;
  icon?: React.ReactNode;
}

const FeatureCard = ({
  backgroundColor,
  title,
  description,
  icon,
}: FeatureCardProps) => {
  return (
    <div
      className="flex flex-col gap-4 p-6 sm:p-8 flex-1 min-h-[200px] sm:min-h-[250px]"
      style={{ backgroundColor, borderRadius: '36px' }}
    >
      {icon && <div className="text-4xl">{icon}</div>}
      <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{title}</h3>
      <p className="text-sm sm:text-base">{description}</p>
    </div>  
  );
};

export default FeatureCard;
