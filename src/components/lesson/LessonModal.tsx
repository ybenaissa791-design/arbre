'use client';

import React, { useState, useEffect } from 'react';
import { LessonContent, Language, UI_TEXT } from '@/data/translations';
import { Computer3DViewer } from '@/components/3d/Computer3DViewer';
import { PeripheralsGameHub } from '@/components/games/PeripheralsGameHub';
import { KidsDrawingPad } from '@/components/games/KidsDrawingPad';
import { QuickQuiz } from '@/components/games/QuickQuiz';
import { speech } from '@/utils/speech';
import { sounds } from '@/utils/audio';
import {
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Gamepad2,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Globe,
} from 'lucide-react';

interface LessonModalProps {
  node: LessonContent;
  lang: Language;
  onClose: () => void;
  onLessonComplete: (id: string) => void;
  onToggleLang?: () => void;
  isCompleted?: boolean;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  node,
  lang,
  onClose,
  onLessonComplete,
  onToggleLang,
  isCompleted = false,
}) => {
  const isAr = lang === 'ar';
  const t = UI_TEXT[lang];

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const unsub = speech.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => {
      speech.stop();
      unsub();
    };
  }, []);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speech.stop();
    } else {
      sounds.playPop();
      const textToRead = `${node.title}. ${node.metaphorTitle}. ${node.metaphorDesc}. ${node.simpleWhat}. ${node.simpleRole.join('. ')}`;
      speech.speak(textToRead);
    }
  };

  const handleClose = () => {
    sounds.playWhoosh();
    speech.stop();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 w-full h-full bg-slate-950 text-white flex flex-col overflow-hidden animate-fadeIn"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ========================================================= */}
      {/* 1. TOP STICKY APP BAR (Plein écran & adapté au téléphone) */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b-2 border-slate-800 px-3 sm:px-6 py-3 flex items-center justify-between gap-2 shrink-0 shadow-lg">
        {/* Back Button to Tree */}
        <button
          onClick={handleClose}
          className="px-3 sm:px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 border border-slate-700 shadow-sm transition-all active:scale-95"
          title={t.backToTree}
        >
          {isAr ? <ArrowRight className="w-4 h-4 text-emerald-400" /> : <ArrowLeft className="w-4 h-4 text-emerald-400" />}
          <span className="hidden xs:inline">{t.backToTree}</span>
        </button>

        {/* Central Title and Icon */}
        <div className="flex items-center gap-2 sm:gap-3 text-center min-w-0">
          <span className="text-3xl sm:text-4xl filter drop-shadow shrink-0">
            {node.emoji}
          </span>
          <div className="min-w-0">
            <h2 className="text-base sm:text-2xl font-black text-white truncate tracking-tight">
              {node.title}
            </h2>
            <span className="hidden sm:inline-block text-[11px] font-bold text-amber-300 truncate max-w-xs">
              {node.metaphorTitle}
            </span>
          </div>
          {isCompleted && (
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>⭐</span>
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Audio Speech Narration */}
          <button
            onClick={handleToggleSpeech}
            className={`p-2 sm:px-3 sm:py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title={isSpeaking ? t.stopVoice : t.listenVoice}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-slate-950" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
            <span className="hidden md:inline">
              {isSpeaking ? t.stopVoice : t.listenVoice}
            </span>
          </button>

          {/* Language switch */}
          {onToggleLang && (
            <button
              onClick={() => {
                sounds.playPop();
                onToggleLang();
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 text-xs font-black transition-all flex items-center gap-1 shadow-sm"
              title={isAr ? 'Français' : 'العربية'}
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">{isAr ? 'FR' : 'عربي'}</span>
            </button>
          )}

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-2 rounded-2xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-all active:scale-90"
            title={t.close}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN FULLSCREEN CONTENT AREA (Smooth Scroll) */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-6 sm:py-10 max-w-6xl w-full mx-auto space-y-8">
        {/* Metaphor Top Banner */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-indigo-500/20 border-2 border-amber-400/40 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-4xl font-black shrink-0 shadow-lg">
            {node.emoji}
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full inline-block">
              {node.metaphorTitle}
            </span>
            <p className="text-base sm:text-xl font-black text-white leading-snug">
              {node.metaphorDesc}
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* A) LA VIDÉO (SEULEMENT SI CE NŒUD A SA PROPRE VIDÉO !) */}
        {/* --------------------------------------------------------- */}
        {node.videoUrl && (
          <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-black text-base sm:text-lg">
              <Film className="w-5 h-5" />
              <span>{t.videoTitle}</span>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl flex items-center justify-center">
              <video
                src={node.videoUrl}
                controls
                playsInline
                className="w-full max-h-[460px] object-contain rounded-2xl"
                poster={node.images[0]?.url}
              >
                Votre navigateur ne supporte pas la balise vidéo.
              </video>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* B) LES IMAGES RÉELLES ET LA VUE 3D INTERACTIVE */}
        {/* --------------------------------------------------------- */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-base sm:text-lg">
            <ImageIcon className="w-5 h-5" />
            <span>{t.picturesTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Real Photos with Kid Captions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {node.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-xl flex flex-col justify-end"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-3 bg-slate-900/90 backdrop-blur-xs border-t border-slate-800 text-center">
                    <span className="text-xs sm:text-sm font-bold text-slate-200">
                      {img.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 3D Interactive Model (Inspectable, Rotatable) */}
            {node.threeDType && (
              <div className="w-full h-full min-h-[320px]">
                <Computer3DViewer type={node.threeDType} title={node.title} />
              </div>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* C) EN RÉSUMÉ TRÈS SIMPLE (DÉFINITION & RÔLE POUR ENFANTS) */}
        {/* --------------------------------------------------------- */}
        <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-black text-base sm:text-lg">
            <Sparkles className="w-5 h-5" />
            <span>{t.summaryTitle}</span>
          </div>

          <p className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed">
            {node.simpleWhat}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {node.simpleRole.map((role, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm font-black text-white shadow-xs flex items-center gap-2"
              >
                <span>{role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* D) LE JEU CORRESPONDANT (SI IL EXISTE DANS CE NŒUD !) */}
        {/* --------------------------------------------------------- */}
        {node.gameType === 'peripherals-hub' && (
          <div className="space-y-4 pt-4 border-t-2 border-slate-800">
            <div className="flex items-center gap-2 text-purple-400 font-black text-lg sm:text-xl">
              <Gamepad2 className="w-6 h-6" />
              <span>{t.gameTitle} : Les Périphériques</span>
            </div>

            {/* Dual Game Center: Boxes Classification & 3D Memory Card Game */}
            <PeripheralsGameHub lang={lang} />
          </div>
        )}

        {node.gameType === 'drawing-canvas' && (
          <div className="space-y-4 pt-4 border-t-2 border-slate-800">
            <div className="flex items-center gap-2 text-pink-400 font-black text-lg sm:text-xl">
              <Gamepad2 className="w-6 h-6" />
              <span>{t.drawingStudio}</span>
            </div>

            <KidsDrawingPad lang={lang} />
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* E) QUIZ RAPIDE DU PETIT GÉNIE */}
        {/* --------------------------------------------------------- */}
        <div className="pt-4 border-t-2 border-slate-800">
          <QuickQuiz
            questions={node.quiz}
            courseTitle={node.title}
            onComplete={() => onLessonComplete(node.id)}
          />
        </div>
      </div>
    </div>
  );
};
