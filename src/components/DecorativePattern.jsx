import React from 'react';

/**
 * Historical Khiva / Uzbek "Islimiy & Shamsa" ornamental medallion pattern.
 * Uses the Light mode text color (#2B3320) with a soft radial fade mask.
 */
export const GirihPattern = ({ className = '', id = 'khiva-ornament' }) => {
  const maskId = `${id}-mask`;
  const gradId = `${id}-grad`;
  const petals8 = [0, 45, 90, 135, 180, 225, 270, 315];
  const petals16 = Array.from({ length: 16 }, (_, i) => i * 22.5);

  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      style={{ color: '#2B3320' }}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="400" height="400" fill={`url(#${gradId})`} />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer scalloped Khiva dome / mehrob border ring */}
        <circle cx="200" cy="200" r="184" strokeWidth="1.2" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="172" strokeWidth="1.4" />
        <circle cx="200" cy="200" r="128" strokeWidth="1.1" />
        <circle cx="200" cy="200" r="82" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="38" strokeWidth="1.3" />
        <circle cx="200" cy="200" r="12" strokeWidth="1.4" />

        {/* 16 delicate inner lotus / shamsa rays */}
        {petals16.map((angle) => (
          <g key={`p16-${angle}`} transform={`rotate(${angle} 200 200)`}>
            <path
              d="M200 162 C206 175 206 184 200 188 C194 184 194 175 200 162 Z"
              strokeWidth="1"
            />
            <path
              d="M200 28 C207 42 206 58 200 72 C194 58 193 42 200 28 Z"
              strokeWidth="1.1"
            />
          </g>
        ))}

        {/* 8 main historical Islimi & Bodom (paisley/arch) ornamental motifs */}
        {petals8.map((angle) => (
          <g key={`p8-${angle}`} transform={`rotate(${angle} 200 200)`}>
            {/* Pointed Khiva mehrob arch petal */}
            <path
              d="M200 72 C222 92 226 118 200 128 C174 118 178 92 200 72 Z"
              strokeWidth="1.5"
            />
            {/* Inner bodom leaf inside arch */}
            <path
              d="M200 84 C210 97 210 111 200 119 C190 111 190 97 200 84 Z"
              strokeWidth="1.1"
            />
            {/* Arabesque curved vine scrolls flanking each arch */}
            <path
              d="M200 72 C188 60 170 64 166 78 C163 89 173 97 181 92"
              strokeWidth="1.2"
            />
            <path
              d="M200 72 C212 60 230 64 234 78 C237 89 227 97 219 92"
              strokeWidth="1.2"
            />
            {/* Outer decorative finial */}
            <path
              d="M200 16 C214 32 214 48 200 62 C186 48 186 32 200 16 Z"
              strokeWidth="1.3"
            />
            {/* Inner rosette petal */}
            <path
              d="M200 128 C210 142 210 156 200 162 C190 156 190 142 200 128 Z"
              strokeWidth="1.2"
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

/**
 * Symmetrical Khiva-inspired ornamental flourish for flanking section titles.
 */
export const TitleOrnament = ({ side = 'left', className = '' }) => {
  const gradId = `title-ornament-fade-${side}`;

  return (
    <svg
      className={`pointer-events-none select-none shrink-0 ${side === 'right' ? '-scale-x-100' : ''} ${className}`}
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="16" x2="54" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Tapering outer line */}
        <path d="M2 16 H54" stroke={`url(#${gradId})`} strokeWidth="1.3" />

        {/* Small outer bud */}
        <circle cx="54" cy="16" r="2.2" fill="currentColor" fillOpacity="0.5" strokeWidth="1" />

        {/* Islimi curved tendrils */}
        <path d="M74 12 C67 4 56 5 52 11" strokeWidth="1.2" />
        <path d="M74 20 C67 28 56 27 52 21" strokeWidth="1.2" />

        {/* Pointed Khiva bodom / mehrob motif */}
        <path d="M62 16 C75 6 95 6 112 16 C95 26 75 26 62 16 Z" strokeWidth="1.5" />
        <path d="M74 16 C83 10 95 10 103 16 C95 22 83 22 74 16 Z" strokeWidth="1.1" />

        {/* Inner rosette jewel closest to the title */}
        <path
          d="M118 16 L125 10.5 L132 16 L125 21.5 Z"
          fill="currentColor"
          fillOpacity="0.22"
          strokeWidth="1.3"
        />
        <circle cx="136" cy="16" r="1.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
};
