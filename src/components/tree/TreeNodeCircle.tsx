'use client';

import React from 'react';
import { sounds } from '@/utils/audio';

interface NodeCircleProps {
  id: string;
  title: string;
  emoji: string;
  size?: 'root' | 'main' | 'sub';
  colorTheme?: 'emerald' | 'purple' | 'sky' | 'indigo' | 'orange' | 'amber';
  isCompleted?: boolean;
  onClick: (id: string) => void;
}

export const TreeNodeCircle: React.FC<NodeCircleProps> = ({
  id,
  title,
  emoji,
  size = 'sub',
  colorTheme = 'sky',
  isCompleted = false,
  onClick,
}) => {
  const handleClick = () => {
    sounds.playPop();
    onClick(id);
  };

  // Color styles
  const themes = {
    emerald: 'from-emerald-400 to-teal-600 border-emerald-400 text-white shadow-emerald-200 ring-emerald-300',
    purple: 'from-purple-400 to-indigo-600 border-purple-400 text-white shadow-purple-200 ring-purple-300',
    sky: 'from-sky-400 to-blue-600 border-sky-400 text-white shadow-sky-200 ring-sky-300',
    indigo: 'from-indigo-500 to-purple-700 border-indigo-400 text-white shadow-indigo-200 ring-indigo-300',
    orange: 'from-amber-400 to-orange-500 border-orange-400 text-white shadow-orange-200 ring-orange-300',
    amber: 'from-yellow-400 to-amber-500 border-amber-400 text-slate-950 shadow-amber-200 ring-amber-300',
  };

  // Responsive Sizes (Adapted for mobile screens while majestic on desktop)
  const sizeClasses = {
    root: 'w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 text-3xl sm:text-5xl md:text-6xl border-4 sm:border-6',
    main: 'w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 text-2xl sm:text-4xl md:text-5xl border-3 sm:border-5',
    sub: 'w-20 h-20 sm:w-26 sm:h-26 md:w-30 md:h-30 text-xl sm:text-3xl md:text-3xl border-3 sm:border-4',
  };

  const titleSizes = {
    root: 'text-[10px] sm:text-xs md:text-sm font-black mt-0.5 sm:mt-1 px-1 sm:px-2',
    main: 'text-[9px] sm:text-[11px] md:text-xs font-black mt-0.5 sm:mt-1 px-1',
    sub: 'text-[8.5px] sm:text-[10px] md:text-[11px] font-black mt-0.5 px-0.5 sm:px-1',
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer select-none rounded-full flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-br ring-2 sm:ring-4 hover:ring-6 shrink-0 relative ${
        sizeClasses[size]
      } ${themes[colorTheme]}`}
      title={title}
    >
      {/* Completed Star badge */}
      {isCompleted && (
        <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] sm:text-xs font-black shadow-md animate-bounce">
          ⭐
        </span>
      )}

      {/* Emoji */}
      <span className="filter drop-shadow-sm transform group-hover:scale-115 transition-transform">
        {emoji}
      </span>

      {/* Only Title */}
      <span className={`leading-tight tracking-tight drop-shadow-xs max-w-[92%] text-center ${titleSizes[size]}`}>
        {title}
      </span>
    </div>
  );
};
