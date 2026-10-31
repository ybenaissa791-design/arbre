'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { sounds } from '@/utils/audio';

const STEPS = [
  {
    stage: 0,
    title: "1. Le clic de l'enfant !",
    component: "Souris / Périphérique d'Entrée",
    emoji: "🖱️",
    desc: "Tu cliques sur l'icône de ton jeu ou de ton logiciel de dessin !",
    box: 'input',
    color: 'border-sky-400 bg-sky-50 text-sky-800',
  },
  {
    stage: 1,
    title: "2. Réveil dans le Stockage !",
    component: "Disque Dur / SSD",
    emoji: "🗄️",
    desc: "Le jeu dormait tranquillement dans l'armoire permanente. L'OS vient le réveiller !",
    box: 'storage',
    color: 'border-cyan-400 bg-cyan-50 text-cyan-800',
  },
  {
    stage: 2,
    title: "3. Voyage sur le Bus !",
    component: "Les Bus de Données",
    emoji: "🚌⚡",
    desc: "Les données filent à la vitesse de l'éclair sur l'autoroute miniature !",
    box: 'bus1',
    color: 'border-amber-400 bg-amber-50 text-amber-800',
  },
  {
    stage: 3,
    title: "4. Installation sur la Table !",
    component: "Mémoire Vive (RAM)",
    emoji: "📝⚡",
    desc: "Le jeu est posé sur la table de travail magique pour que le CPU y accède sans attendre !",
    box: 'ram',
    color: 'border-emerald-400 bg-emerald-50 text-emerald-800',
  },
  {
    stage: 4,
    title: "5. Le Cerveau calcule !",
    component: "Processeur (CPU)",
    emoji: "⚡🧠",
    desc: "Le CPU exécute des millions de calculs : couleurs, positions et animations !",
    box: 'cpu',
    color: 'border-orange-400 bg-orange-50 text-orange-800',
  },
  {
    stage: 5,
    title: "6. Magie sur l'Écran !",
    component: "Écran / Périphérique de Sortie",
    emoji: "🖥️✨",
    desc: "Tadaaa ! L'image finale apparaît en grand sur ton écran ! Tu peux jouer !",
    box: 'output',
    color: 'border-purple-400 bg-purple-50 text-purple-800',
  },
];

export const CpuSimulationGame: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const delay = speed === 'slow' ? 2200 : speed === 'normal' ? 1400 : 700;
      timer = setTimeout(() => {
        setCurrentStep((prev) => {
          if (prev < STEPS.length - 1) {
            sounds.playPop();
            return prev + 1;
          } else {
            sounds.playSuccess();
            setIsPlaying(false);
            return prev;
          }
        });
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed]);

  const handleStart = () => {
    sounds.playPop();
    if (currentStep === STEPS.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    sounds.playPop();
    setIsPlaying(false);
  };

  const handleReset = () => {
    sounds.playWhoosh();
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      sounds.playPop();
      setCurrentStep(currentStep + 1);
    } else {
      sounds.playSuccess();
    }
  };

  const stepInfo = STEPS[currentStep];

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 sm:p-6 rounded-3xl border-4 border-indigo-400/50 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-2xl shadow-lg animate-pulse-slow">
            ⚡
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              La Grande Course des Données
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200">
              Découvre comment voyage l&apos;information entre les composants !
            </p>
          </div>
        </div>

        {/* Speed selectors */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => setSpeed('slow')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              speed === 'slow' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🐢 Tortue
          </button>
          <button
            onClick={() => setSpeed('normal')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              speed === 'normal' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            🐇 Lapin
          </button>
          <button
            onClick={() => setSpeed('fast')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              speed === 'fast' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚡ Éclair
          </button>
        </div>
      </div>

      {/* Interactive Circuit Map */}
      <div className="bg-slate-950/80 p-4 sm:p-6 rounded-2xl border border-indigo-500/30 mb-6 relative overflow-hidden">
        {/* Visual Stations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative z-10">
          {STEPS.map((step, idx) => {
            const isCurrent = currentStep === idx;
            const isPassed = currentStep > idx;

            return (
              <div
                key={step.stage}
                onClick={() => {
                  sounds.playPop();
                  setCurrentStep(idx);
                }}
                className={`cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center relative ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-500/20 ring-4 ring-amber-400/30 scale-105 shadow-xl'
                    : isPassed
                    ? 'border-emerald-500/60 bg-emerald-950/40 opacity-90'
                    : 'border-slate-800 bg-slate-900/60 opacity-40 hover:opacity-75'
                }`}
              >
                {/* Step badge */}
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full mb-1 ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950'
                      : isPassed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Étape {idx + 1}
                </span>

                <span className="text-3xl my-1 transition-transform">{step.emoji}</span>
                <span className="font-extrabold text-xs text-white line-clamp-1">
                  {step.component.split('/')[0]}
                </span>

                {isCurrent && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-black animate-ping">
                    •
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress connector line */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-400 via-amber-400 to-purple-500 h-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Detailed Card */}
      <div className="bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-indigo-400/40 mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl font-black shrink-0 shadow-lg animate-bounce-slow">
          {stepInfo.emoji}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-300 font-extrabold text-xs">
              {stepInfo.title}
            </span>
            <span className="text-xs text-slate-400 font-medium">({stepInfo.component})</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
            {stepInfo.desc}
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              onClick={handleStart}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{currentStep === STEPS.length - 1 ? 'Rejouer le voyage' : 'Lancer le voyage !'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Mettre en pause</span>
            </button>
          )}

          <button
            onClick={handleNextStep}
            disabled={isPlaying || currentStep === STEPS.length - 1}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Étape suivante</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-bold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Remettre à zéro</span>
        </button>
      </div>
    </div>
  );
};
