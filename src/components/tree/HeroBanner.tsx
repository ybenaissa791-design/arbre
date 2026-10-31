'use client';

import React from 'react';
import { Sparkles, Gamepad2, Compass, Play } from 'lucide-react';
import { sounds } from '@/utils/audio';

interface HeroProps {
  onStartRoot: () => void;
  onExploreGames: () => void;
}

export const HeroBanner: React.FC<HeroProps> = ({ onStartRoot, onExploreGames }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white p-6 sm:p-10 shadow-2xl mb-8 border-4 border-emerald-400/40">
      {/* Background playful floating shapes */}
      <div className="absolute top-2 right-4 text-7xl opacity-15 select-none pointer-events-none animate-float">
        🖥️
      </div>
      <div className="absolute -bottom-6 right-28 text-6xl opacity-10 select-none pointer-events-none">
        🎮
      </div>
      <div className="absolute -top-4 left-1/3 text-6xl opacity-10 select-none pointer-events-none animate-pulse-slow">
        ⚡
      </div>

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-black uppercase tracking-wider text-amber-200 mb-3 border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Le Cours Magique pour les Enfants de Primaire</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3">
          Comment fonctionne un <span className="text-amber-300 underline decoration-wavy decoration-amber-400">Ordinateur</span> ?
        </h2>

        <p className="text-xs sm:text-base text-emerald-50 leading-relaxed font-semibold mb-6 max-w-2xl">
          Imagine que l&apos;ordinateur est comme une personne : il a un <strong>Corps</strong> que l&apos;on peut toucher (le <strong>Matériel</strong>) et un <strong>Esprit</strong> invisible qui réfléchit (le <strong>Logiciel</strong>). Clique sur les branches de l&apos;arbre pour explorer ses secrets en <strong>3D</strong> et jouer à des jeux rigolos !
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              sounds.playPop();
              onStartRoot();
            }}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-950/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Découvrir la Racine : L&apos;Ordinateur 🌳</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              onExploreGames();
            }}
            className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm font-bold text-xs sm:text-sm border border-white/30 transition-all active:scale-95 flex items-center gap-2"
          >
            <Gamepad2 className="w-4 h-4 text-emerald-300" />
            <span>Le Grand Jeu des Périphériques 📦</span>
          </button>
        </div>
      </div>
    </div>
  );
};
