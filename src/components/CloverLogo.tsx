import React from 'react';

interface CloverLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
}

export const CloverLogo: React.FC<CloverLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  light = false
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Four-Leaf Clover SVG Icon */}
      <div className={`relative ${sizeMap[size]} shrink-0 transition-transform duration-200 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Emerald Gradient */}
            <linearGradient id="cloverGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Subtle Metallic Specular Highlight */}
            <linearGradient id="specularGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </linearGradient>

            {/* Gold Central Core for prestige touch */}
            <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="80%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>
          </defs>

          {/* Stem curving down */}
          <path
            d="M50 50 Q48 72 44 86 Q42 90 46 90 Q49 88 52 74 Q53 60 50 50 Z"
            fill="#047857"
          />

          {/* Top Leaf */}
          <path
            d="M50 50 C44 38 33 22 40 14 C46 8 50 17 50 20 C50 17 54 8 60 14 C67 22 56 38 50 50 Z"
            fill="url(#cloverGrad)"
          />
          <path
            d="M50 50 C44 38 33 22 40 14 C46 8 50 17 50 20 C50 17 54 8 60 14 C67 22 56 38 50 50 Z"
            fill="url(#specularGrad)"
          />

          {/* Right Leaf */}
          <path
            d="M50 50 C62 44 78 33 86 40 C92 46 83 50 80 50 C83 50 92 54 86 60 C78 67 62 56 50 50 Z"
            fill="url(#cloverGrad)"
          />
          <path
            d="M50 50 C62 44 78 33 86 40 C92 46 83 50 80 50 C83 50 92 54 86 60 C78 67 62 56 50 50 Z"
            fill="url(#specularGrad)"
          />

          {/* Bottom Leaf */}
          <path
            d="M50 50 C44 62 33 78 40 84 C45 88 49 81 49 78 C50 82 55 88 60 84 C67 78 56 62 50 50 Z"
            fill="url(#cloverGrad)"
          />
          <path
            d="M50 50 C44 62 33 78 40 84 C45 88 49 81 49 78 C50 82 55 88 60 84 C67 78 56 62 50 50 Z"
            fill="url(#specularGrad)"
          />

          {/* Left Leaf */}
          <path
            d="M50 50 C38 44 22 33 14 40 C8 46 17 50 20 50 C17 50 8 54 14 60 C22 67 38 56 50 50 Z"
            fill="url(#cloverGrad)"
          />
          <path
            d="M50 50 C38 44 22 33 14 40 C8 46 17 50 20 50 C17 50 8 54 14 60 C22 67 38 56 50 50 Z"
            fill="url(#specularGrad)"
          />

          {/* Fine leaf veins */}
          <path d="M50 50 L50 24" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <path d="M50 50 L76 50" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <path d="M50 50 L50 76" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <path d="M50 50 L24 50" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

          {/* Central gold core node */}
          <circle cx="50" cy="50" r="3.5" fill="url(#centerCore)" />
          <circle cx="50" cy="50" r="1.5" fill="#FEF3C7" />
        </svg>
      </div>

      {/* Brand Wordmark (Single text element according to Top Bar Contract) */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-extrabold tracking-tight text-lg md:text-xl ${
              light ? 'text-white' : 'text-slate-900'
            }`}>
              TREVO
            </span>
            <span className="text-[11px] font-bold tracking-widest text-emerald-700 bg-emerald-100/90 px-1.5 py-0.5 rounded">
              OFICINA
            </span>
          </div>
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-0.5 ${
            light ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Centro Automotivo Especializado
          </span>
        </div>
      )}
    </div>
  );
};
