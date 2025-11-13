'use client';

import React from 'react';

const SeeTutorialsButton = () => {
  return (
    <button
      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base text-white backdrop-blur-[2px]"
      style={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      See Tutorials
    </button>   
  );
};

export default SeeTutorialsButton;
