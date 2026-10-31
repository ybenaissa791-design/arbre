'use client';

import React from 'react';
import { CourseNode } from '@/data/courseData';
import { sounds } from '@/utils/audio';
import { Sparkles, CheckCircle2, ChevronRight, Play } from 'lucide-react';

interface NodeCardProps {
  node: CourseNode;
  onSelect: (node: CourseNode) => void;
  isCompleted?: boolean;
  size?: 'large' | 'medium' | 'compact';
}

export const TreeNodeCard: React.FC<NodeCardProps> = ({
  node,
  onSelect,
  isCompleted = false,
  size = 'medium',
}) => {
  const handleClick = () => {
    sounds.playPop();
    onSelect(node);
  };

  const isLarge = size === 'large';
  const isCompact = size === 'compact';

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer select-none relative transition-all duration-300 transform hover:-translate-y-1.5 active:scale-98 ${
        isLarge
          ? 'w-72 sm:w-84 p-5 rounded-3xl border-4 shadow-xl'
          : isCompact
          ? 'w-52 sm:w-60 p-3 rounded-2xl border-2 shadow-md'
          : 'w-60 sm:w-68 p-4 rounded-3xl border-3 shadow-lg'
      } ${node.color.bg} ${node.color.border} hover:shadow-2xl hover:border-amber-400`}
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <span
          className={`px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider text-[10px] text-white bg-gradient-to-r ${node.color.gradient}`}
        >
          {node.badge}
        </span>

        {isCompleted && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            <span>Fait ⭐</span>
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="flex items-center gap-3 mb-2.5">
        <div
          className={`shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 ${
            isLarge
              ? 'w-16 h-16 text-4xl bg-white shadow-md'
              : 'w-12 h-12 text-3xl bg-white shadow-xs'
          }`}
        >
          {node.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={`font-black tracking-tight truncate ${
              isLarge ? 'text-lg sm:text-xl text-slate-900' : 'text-sm sm:text-base text-slate-800'
            }`}
          >
            {node.shortTitle}
          </h4>
          <p className="text-[11px] text-slate-600 font-bold truncate">
            {node.metaphor.title}
          </p>
        </div>
      </div>

      {/* Metaphor pill */}
      <div className="bg-white/90 p-2 rounded-xl border border-slate-200/60 mb-3 text-[11px] text-slate-700 font-medium line-clamp-2">
        💡 {node.metaphor.description}
      </div>

      {/* CTA Button */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>3D & Jeux</span>
        </span>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-black text-xs transition-colors shadow-xs">
          <span>Ouvrir</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
