'use client';

import React, { useState } from 'react';
import { sounds } from '@/utils/audio';
import { Language, UI_TEXT } from '@/data/translations';
import { Volume2, VolumeX, Star, Globe } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  completedCount,
  totalCount,
}) => {
  const isAr = lang === 'ar';
  const t = UI_TEXT[lang];
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);

  const toggleSound = () => {
    const nextState = !isAudioOn;
    setIsAudioOn(nextState);
    sounds.setEnabled(nextState);
    if (nextState) sounds.playPop();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-sky-500 text-white flex items-center justify-center text-xl sm:text-2xl shadow-md transform -rotate-3 hover:rotate-6 transition-transform cursor-pointer shrink-0">
            🌳
          </div>
          <div className="min-w-0">
            <div className="hidden sm:flex items-center gap-1.5 mb-0.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wider">
                {t.subTitle}
              </span>
              <span className="text-[11px] font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                Red Phoenix ENSAO
              </span>
            </div>
            <h1 className="text-sm sm:text-lg md:text-xl font-black text-slate-900 tracking-tight leading-tight truncate">
              {t.siteTitle}
            </h1>
          </div>
        </div>

        {/* Right: Action Controls (Responsive & Compact on Phone) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher (FR <-> AR) */}
          <button
            onClick={() => {
              sounds.playPop();
              onToggleLang();
            }}
            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-black text-xs border border-purple-300 shadow-xs transition-all active:scale-95 flex items-center gap-1"
            title={isAr ? 'Passer en Français' : 'التحويل إلى اللغة العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-purple-600" />
            <span>{isAr ? '🇫🇷 FR' : '🇲🇦 عربي'}</span>
          </button>

          {/* Stars Count */}
          <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>
              {completedCount}/{totalCount}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
              isAudioOn
                ? 'bg-sky-50 border-sky-300 text-sky-700 hover:bg-sky-100'
                : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
            }`}
            title={isAudioOn ? t.soundOff : t.soundOn}
          >
            {isAudioOn ? <Volume2 className="w-3.5 h-3.5 text-sky-600" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
