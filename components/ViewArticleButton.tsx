'use client';

import React from 'react';

const ViewArticleButton = () => {
  return (
    <button
      className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base"
      style={{ 
        backgroundColor: 'var(--btn-article-bg)',
        border: '2px solid var(--btn-article-border)',
        color: 'var(--btn-article-text)'
      }}
    >
      View Article
    </button>
  );
};

export default ViewArticleButton;
