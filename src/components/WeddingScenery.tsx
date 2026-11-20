import React from 'react';
import type { ReactNode } from 'react';

export function PatternCardFrame({
  children,
  className = '',
  innerClassName = '',
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={`wedding-mosaic-border p-2.5 sm:p-3.5 rounded-2xl shadow-xl ${className}`}>
      <div
        className={`bg-[#FFFDF8] border border-amber-900/15 rounded-xl px-5 py-7 sm:px-8 sm:py-9 ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

export function BuntingGarland({ className = '' }: { className?: string }) {
  const colors = ['#C83232', '#EAB308', '#157347', '#2563EB', '#EA580C', '#0D9488'];
  return (
    <svg
      viewBox="0 0 600 90"
      className={`w-full h-auto pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Left & Right wooden poles */}
      <line x1="22" y1="8" x2="22" y2="88" stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round" />
      <line x1="578" y1="8" x2="578" y2="88" stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round" />

      {/* Top curved string */}
      <path d="M 22 14 Q 300 62 578 14" fill="none" stroke="#6B4423" strokeWidth="2" />
      {/* Second lower string */}
      <path d="M 22 26 Q 300 84 578 26" fill="none" stroke="#6B4423" strokeWidth="1.5" opacity="0.7" />

      {/* Top flags */}
      {Array.from({ length: 17 }).map((_, idx) => {
        const t = (idx + 0.5) / 17;
        const x = 22 + t * 556;
        const curveY = (1 - t) * (1 - t) * 14 + 2 * (1 - t) * t * 62 + t * t * 14;
        const color = colors[idx % colors.length];
        return (
          <polygon
            key={`top-${idx}`}
            points={`${x - 10},${curveY} ${x + 10},${curveY} ${x},${curveY + 20}`}
            fill={color}
          />
        );
      })}

      {/* Bottom flags */}
      {Array.from({ length: 15 }).map((_, idx) => {
        const t = (idx + 0.5) / 15;
        const x = 22 + t * 556;
        const curveY = (1 - t) * (1 - t) * 26 + 2 * (1 - t) * t * 84 + t * t * 26;
        const color = colors[(idx + 2) % colors.length];
        return (
          <polygon
            key={`bot-${idx}`}
            points={`${x - 8},${curveY} ${x + 8},${curveY} ${x},${curveY + 16}`}
            fill={color}
            opacity="0.92"
          />
        );
      })}
    </svg>
  );
}

export function VintageWeddingCar({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 120"
      className={`w-full h-auto drop-shadow-md select-none ${className}`}
      aria-label="Decorated vintage wedding car"
    >
      {/* Ground shadow */}
      <ellipse cx="130" cy="108" rx="108" ry="8" fill="#1C1917" opacity="0.18" />

      {/* Groom silhouette (wearing pagri) */}
      <g transform="translate(88, 22)">
        <rect x="8" y="24" width="24" height="26" rx="6" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="20" cy="15" r="9" fill="#D99B72" />
        {/* Pagri */}
        <path d="M 10 13 Q 20 1 30 13 Q 20 10 10 13 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="23" cy="6" r="2.5" fill="#C83232" />
      </g>

      {/* Bride silhouette (wearing red veil) */}
      <g transform="translate(122, 24)">
        <path d="M 6 24 L 30 24 L 34 50 L 2 50 Z" fill="#C83232" />
        <circle cx="18" cy="14" r="8.5" fill="#E3AD88" />
        {/* Red Bridal Veil / Dupatta */}
        <path d="M 9 12 Q 18 2 27 12 L 32 42 L 6 42 Z" fill="#B91C1C" opacity="0.92" />
        <circle cx="18" cy="14" r="8.5" fill="#E3AD88" />
        <path d="M 9 11 Q 18 3 27 11" fill="none" stroke="#FBBF24" strokeWidth="2" />
      </g>

      {/* Vintage Car Body */}
      <path
        d="M 28 74 Q 30 56 54 54 L 84 54 L 90 68 L 164 68 L 176 50 L 220 52 Q 236 56 238 74 L 242 88 L 22 88 Z"
        fill="#C83232"
        stroke="#7F1D1D"
        strokeWidth="2"
      />
      {/* Cream side trim */}
      <path d="M 46 72 L 224 72 L 220 79 L 44 79 Z" fill="#FEF3C7" />

      {/* Windshield */}
      <path d="M 164 68 L 176 44 L 181 44 L 172 68 Z" fill="#BAE6FD" stroke="#475569" strokeWidth="1.5" />

      {/* Marigold floral garlands draped on hood & trunk */}
      <path d="M 176 56 Q 202 68 232 58" fill="none" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 5" />
      <path d="M 176 56 Q 202 68 232 58" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 8" />
      <path d="M 32 62 Q 58 72 82 60" fill="none" stroke="#FACC15" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="2 5" />

      {/* Headlight & Bumper */}
      <circle cx="238" cy="68" r="5.5" fill="#FEF08A" stroke="#78350F" strokeWidth="1.5" />
      <rect x="234" y="81" width="14" height="6" rx="3" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
      <rect x="14" y="81" width="14" height="6" rx="3" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />

      {/* Rear Wheel */}
      <g transform="translate(66, 88)">
        <circle cx="0" cy="0" r="18" fill="#1C1917" />
        <circle cx="0" cy="0" r="11" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
        <circle cx="0" cy="0" r="4" fill="#C83232" />
      </g>

      {/* Front Wheel */}
      <g transform="translate(198, 88)">
        <circle cx="0" cy="0" r="18" fill="#1C1917" />
        <circle cx="0" cy="0" r="11" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
        <circle cx="0" cy="0" r="4" fill="#C83232" />
      </g>
    </svg>
  );
}

export function BengaliCNG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 85"
      className={`w-full h-auto drop-shadow select-none ${className}`}
      aria-label="Bengali CNG auto-rickshaw"
    >
      <ellipse cx="65" cy="76" rx="50" ry="5" fill="#1C1917" opacity="0.16" />
      {/* Canopy */}
      <path d="M 24 22 Q 65 8 104 26 L 108 42 L 20 42 Z" fill="#15803D" stroke="#14532D" strokeWidth="2" />
      {/* Yellow stripe */}
      <rect x="22" y="34" width="84" height="7" fill="#FACC15" />
      {/* Body */}
      <path d="M 18 42 L 108 42 L 114 62 L 16 62 Z" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
      {/* Window */}
      <rect x="30" y="25" width="24" height="12" rx="2" fill="#E0F2FE" />
      <rect x="60" y="25" width="26" height="12" rx="2" fill="#E0F2FE" />
      {/* Wheels */}
      <circle cx="34" cy="64" r="11" fill="#1C1917" />
      <circle cx="34" cy="64" r="5" fill="#E5E7EB" />
      <circle cx="96" cy="64" r="11" fill="#1C1917" />
      <circle cx="96" cy="64" r="5" fill="#E5E7EB" />
    </svg>
  );
}

export function PineTreeCluster({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 120 180"
      className={`w-20 sm:w-28 h-auto pointer-events-none select-none ${
        side === 'right' ? 'scale-x-[-1]' : ''
      }`}
      aria-hidden="true"
    >
      <rect x="32" y="138" width="10" height="36" fill="#785233" rx="2" />
      <polygon points="37,24 6,86 68,86" fill="#3D7A56" />
      <polygon points="37,56 4,118 70,118" fill="#2F6645" />
      <polygon points="37,88 2,148 72,148" fill="#245437" />

      <rect x="84" y="148" width="8" height="26" fill="#785233" rx="2" />
      <polygon points="88,64 64,114 112,114" fill="#52916A" />
      <polygon points="88,92 60,152 116,152" fill="#3E7A56" />
    </svg>
  );
}

export function TwilightCoupleFinale() {
  return (
    <div className="relative w-full max-w-2xl mx-auto pt-8 pb-4 overflow-hidden">
      {/* Twinkling stars */}
      <div className="relative h-56 sm:h-64 w-full">
        {[
          { top: '10%', left: '12%', delay: '0s' },
          { top: '18%', left: '34%', delay: '0.8s' },
          { top: '8%', left: '56%', delay: '1.5s' },
          { top: '22%', left: '78%', delay: '0.4s' },
          { top: '14%', left: '88%', delay: '1.2s' },
        ].map((star, idx) => (
          <span
            key={idx}
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
            className="animate-twinkle absolute w-1.5 h-1.5 rounded-full bg-amber-200"
          />
        ))}

        {/* Crescent Moon */}
        <svg viewBox="0 0 60 60" className="absolute top-3 right-8 sm:right-16 w-12 h-12" aria-hidden="true">
          <path
            d="M 38 10 A 20 20 0 1 0 50 42 A 16 16 0 1 1 38 10 Z"
            fill="#FDE68A"
          />
        </svg>

        {/* Dhaka Evening Skyline & Festive Fairy Lights */}
        <svg
          viewBox="0 0 640 240"
          className="w-full h-full"
          aria-label="Bride and groom exchanging wedding vows under night lights"
        >
          {/* City silhouette */}
          <path
            d="M0 240 L0 165 L38 165 L38 138 L78 138 L78 172 L112 172 L112 124 L156 124 L156 160 L196 160 L196 114 Q216 96 236 114 L236 170 L398 170 L398 128 L442 128 L442 156 L486 156 L486 118 L526 118 L526 152 L575 152 L575 130 L618 130 L618 165 L640 165 L640 240 Z"
            fill="#282366"
            opacity="0.72"
          />

          {/* Festive draped fairy light strings */}
          <path d="M 0 36 Q 160 88 320 44 Q 480 90 640 32" fill="none" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
          {Array.from({ length: 19 }).map((_, i) => {
            const x = 18 + i * 33;
            const y = 44 + Math.sin(i * 0.65) * 18;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5.5" fill="#FDE047" opacity="0.25" />
                <circle cx={x} cy={y} r="2.6" fill="#FEF08A" />
              </g>
            );
          })}

          {/* Wedding Pavilion Arch behind couple */}
          <path
            d="M 218 232 L 218 112 Q 320 68 422 112 L 422 232"
            fill="#312E81"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />

          {/* Groom */}
          <g transform="translate(262, 120)">
            {/* Sherwani */}
            <path d="M 14 42 L 42 42 L 48 112 L 8 112 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
            <line x1="28" y1="42" x2="28" y2="112" stroke="#D97706" strokeWidth="1.5" />
            {/* Stole */}
            <path d="M 16 42 Q 28 74 42 64" fill="none" stroke="#C83232" strokeWidth="5" strokeLinecap="round" />
            {/* Head & Pagri */}
            <circle cx="28" cy="26" r="11" fill="#D99B72" />
            <path d="M 15 22 Q 28 6 41 22 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="33" cy="14" r="3" fill="#C83232" />
            {/* Extended hand */}
            <path d="M 40 58 L 56 64" stroke="#D99B72" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Bride */}
          <g transform="translate(324, 124)">
            {/* Lehenga / Jamdani Saree */}
            <path d="M 18 40 L 42 40 L 58 108 L 2 108 Z" fill="#C83232" stroke="#FBBF24" strokeWidth="1.5" />
            {/* Gold zari diagonal */}
            <path d="M 18 42 L 46 82" stroke="#FCD34D" strokeWidth="2.5" />
            {/* Head & Dupatta */}
            <path d="M 16 20 Q 30 6 44 20 L 50 64 L 10 64 Z" fill="#991B1B" />
            <circle cx="28" cy="24" r="10.5" fill="#E3AD88" />
            <path d="M 17 20 Q 28 11 39 20" fill="none" stroke="#FBBF24" strokeWidth="2.2" />
            {/* Extended hand */}
            <path d="M 18 56 L 0 60" stroke="#E3AD88" strokeWidth="4.5" strokeLinecap="round" />
          </g>

          {/* Golden sparkle between joined hands */}
          <circle cx="320" cy="184" r="7" fill="#FDE047" opacity="0.35" />
          <circle cx="320" cy="184" r="3" fill="#FEF9C3" />
        </svg>
      </div>
    </div>
  );
}
