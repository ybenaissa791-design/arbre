'use client';

import React from 'react';
import { sounds } from '@/utils/audio';
import { CheckCircle2, Star } from 'lucide-react';

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

  // Sizes
  const sizeClasses = {
    root: 'w-44 h-44 sm:w-52 sm:h-52 text-5xl sm:text-6xl border-6',
    main: 'w-36 h-36 sm:w-40 sm:h-40 text-4xl sm:text-5xl border-5',
    sub: 'w-28 h-28 sm:w-32 sm:h-32 text-3xl sm:text-4xl border-4',
  };

  const titleSizes = {
    root: 'text-sm sm:text-base font-black mt-1 px-3',
    main: 'text-xs sm:text-sm font-black mt-1 px-2',
    sub: 'text-[11px] sm:text-xs font-black mt-0.5 px-1.5',
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer select-none rounded-full flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-108 active:scale-95 bg-gradient-to-br ring-4 hover:ring-8 ${
        sizeClasses[size]
      } ${themes[colorTheme]}`}
      title={title}
    >
      {/* Completed Star badge */}
      {isCompleted && (
        <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black shadow-md animate-bounce">
          ⭐
        </span>
      )}

      {/* Emoji */}
      <span className="filter drop-shadow-md transform group-hover:scale-120 transition-transform">
        {emoji}
      </span>

      {/* Only Title */}
      <span className={`leading-tight tracking-tight drop-shadow-sm max-w-[90%] text-center ${titleSizes[size]}`}>
        {title}
      </span>
    </div>
  );
};
