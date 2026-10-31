'use client';

import React, { useState } from 'react';
import { sounds } from '@/utils/audio';
import { Language } from '@/data/translations';
import { PeripheralsSortingGame } from './PeripheralsSortingGame';
import { MemoryCardGame } from './MemoryCardGame';
import { Sparkles, Package, Layers } from 'lucide-react';

export const PeripheralsGameHub: React.FC<{ lang?: Language }> = ({ lang = 'fr' }) => {
  const isAr = lang === 'ar';
  const [activeGame, setActiveGame] = useState<'boxes' | 'memory'>('boxes');

  const switchGame = (game: 'boxes' | 'memory') => {
    sounds.playPop();
    setActiveGame(game);
  };

  return (
    <div className="space-y-4" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Game Mode Switcher Tab */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-slate-800/80 rounded-2xl border border-indigo-400/30 max-w-md mx-auto">
        <button
          onClick={() => switchGame('boxes')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
            activeGame === 'boxes'
              ? 'bg-amber-400 text-slate-950 shadow-md scale-102'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{isAr ? 'لعبة الصناديق 📦' : '1. Jeu des Boîtes 📦'}</span>
        </button>

        <button
          onClick={() => switchGame('memory')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
            activeGame === 'memory'
              ? 'bg-purple-500 text-white shadow-md scale-102'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isAr ? 'لعبة الذاكرة 🃏' : '2. Jeu de Mémoire 🃏'}</span>
        </button>
      </div>

      {/* Render Active Game */}
      <div className="w-full">
        {activeGame === 'boxes' ? (
          <PeripheralsSortingGame lang={lang} />
        ) : (
          <MemoryCardGame lang={lang} />
        )}
      </div>
    </div>
  );
};
