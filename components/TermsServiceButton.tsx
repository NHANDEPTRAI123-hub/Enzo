"use client";

import React from "react";

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    />
  </svg>
);

const TermsServiceButton = () => {
  return (
    <div className="flex gap-3 flex-col sm:flex-row">
      <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-poppins font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
        <span>Terms & Service</span>
        <InfoIcon />
      </button>
    </div>
  );
};

export default TermsServiceButton;
