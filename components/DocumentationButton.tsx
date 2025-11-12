'use client';

import React from 'react';

const DocumentationButton = () => {
  return (
    <button
      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-md"
      style={{ 
        backgroundColor: '#FFEFC3',
        border: '2px solid #E6E1E1',
        color: '#000000'
      }}
    >
      Go to Documentation
    </button>
  );
};

export default DocumentationButton;
