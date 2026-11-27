import React from 'react';

/**
 * Subtle Khiva-inspired geometric girih pattern for decorative background accents.
 * Uses an SVG radial mask so edges fade softly into the section background.
 */
export const GirihPattern = ({ className = '', id = 'girih-pattern' }) => {
  const patternId = `${id}-tile`;
  const maskId = `${id}-mask`;
  const gradId = `${id}-grad`;

  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="80" height="80" patternUnits="userSpaceOnUse">
          {/* 8-pointed Khiva girih star & interlocking lattice */}
          <path
            d="M40 4 L49 31 L76 40 L49 49 L40 76 L31 49 L4 40 L31 31 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="22"
            y="22"
            width="36"
            height="36"
            transform="rotate(45 40 40)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="40" cy="40" r="7" stroke="currentColor" strokeWidth="1" />
          <path
            d="M0 40 H14 M66 40 H80 M40 0 V14 M40 66 V80"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="400" height="400" fill={`url(#${gradId})`} />
        </mask>
      </defs>
      <rect width="400" height="400" fill={`url(#${patternId})`} mask={`url(#${maskId})`} />
    </svg>
  );
};
