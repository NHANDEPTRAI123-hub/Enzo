'use client';

import React from 'react';

interface DocumentationButtonProps {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

const DocumentationButton = ({ 
  backgroundColor = '#FFEFC3',
  borderColor = '#E6E1E1',
  textColor = '#000000'
}: DocumentationButtonProps) => {
  return (
    <button
      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium"
      style={{ 
        backgroundColor,
        border: `2px solid ${borderColor}`,
        color: textColor
      }}
    >
      Go to Documentation
    </button>
  );
};

export default DocumentationButton;
