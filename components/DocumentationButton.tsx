'use client';

import React from 'react';

interface DocumentationButtonProps {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

const DocumentationButton = ({ 
  backgroundColor,
  borderColor,
  textColor
}: DocumentationButtonProps) => {
  return (
    <button
      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium text-black"
      style={{ 
        backgroundColor: backgroundColor || 'var(--btn-doc-bg)',
        border: `2px solid ${borderColor || 'var(--btn-doc-border)'}`,
        color: textColor || 'var(--btn-doc-text)'
      }}
    >
      Go to Documentation
    </button>
  );
};

export default DocumentationButton;
