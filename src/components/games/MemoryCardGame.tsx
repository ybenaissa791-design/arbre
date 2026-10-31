'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '@/utils/audio';
import { Language } from '@/data/translations';
import { RotateCcw, Sparkles, Trophy, Clock, Play, CheckCircle2, Eye, ShieldAlert } from 'lucide-react';

interface MemoryCardGameProps {
  lang?: Language;
}

interface MemoryCardItem {
  uid: string;
  pairId: string;
  type: 'image' | 'category';
  title: string;
  emoji: string;
  bgGradient: string;
  borderColor: string;
}

const PAIRS_DATA = [
  {
    id: 'clavier',
    frName: 'Clavier',
    arName: 'لوحة المفاتيح',
    emoji: '⌨️',
    categoryFr: "Périphérique d'Entrée",
    categoryAr: 'وحدة إدخال',
    categoryEmoji: '📥',
    color: 'from-sky-500 to-blue-600',
    border: 'border-sky-400',
  },
  {
    id: 'souris',
    frName: 'Souris',
    arName: 'الفأرة',
    emoji: '🖱️',
    categoryFr: "Périphérique d'Entrée",
    categoryAr: 'وحدة إدخال',
    categoryEmoji: '📥',
    color: 'from-cyan-500 to-teal-600',
    border: 'border-cyan-400',
  },
  {
    id: 'ecran',
    frName: 'Écran',
    arName: 'الشاشة',
    emoji: '🖥️',
    categoryFr: 'Périphérique de Sortie',
    categoryAr: 'وحدة إخراج',
    categoryEmoji: '📤',
    color: 'from-rose-500 to-pink-600',
    border: 'border-rose-400',
  },
  {
    id: 'imprimante',
    frName: 'Imprimante',
    arName: 'الطابعة',
    emoji: '🖨️',
    categoryFr: 'Périphérique de Sortie',
    categoryAr: 'وحدة إخراج',
    categoryEmoji: '📤',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-400',
  },
  {
    id: 'usb',
    frName: 'Clé USB',
    arName: 'مفتاح USB',
    emoji: '💾',
    categoryFr: 'Stockage & Réseau',
    categoryAr: 'تخزين واتصال',
    categoryEmoji: '🌐',
    color: 'from-emerald-500 to-teal-700',
    border: 'border-emerald-400',
  },
  {
    id: 'micro',
    frName: 'Microphone',
    arName: 'الميكروفون',
    emoji: '🎙️',
    categoryFr: "Périphérique d'Entrée",
    categoryAr: 'وحدة إدخال',
    categoryEmoji: '📥',
    color: 'from-purple-500 to-indigo-700',
    border: 'border-purple-400',
  },
];

export const MemoryCardGame: React.FC<MemoryCardGameProps> = ({ lang = 'fr' }) => {
  const isAr = lang === 'ar';

  const [gameState, setGameState] = useState<'idle' | 'memorizing' | 'playing' | 'won'>('idle');
  const [cards, setCards] = useState<MemoryCardItem[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [mismatchedUids, setMismatchedUids] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(10);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Generate Deck
  const setupGame = () => {
    sounds.playWhoosh();
    const deck: MemoryCardItem[] = [];

    PAIRS_DATA.forEach((p) => {
      // Peripheral Device Card
      deck.push({
        uid: `${p.id}-device`,
        pairId: p.id,
        type: 'image',
        title: isAr ? p.arName : p.frName,
        emoji: p.emoji,
        bgGradient: p.color,
        borderColor: p.border,
      });

      // Matching Category Card
      deck.push({
        uid: `${p.id}-category`,
        pairId: p.id,
        type: 'category',
        title: isAr ? p.categoryAr : p.categoryFr,
        emoji: p.categoryEmoji,
        bgGradient: p.color,
        borderColor: p.border,
      });
    });

    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedUids(shuffled.map((c) => c.uid)); // All revealed during memorization
    setMatchedPairIds([]);
    setMismatchedUids([]);
    setScore(0);
    setCountdown(10);
    setGameState('memorizing');
  };

  // Memorization Timer
  useEffect(() => {
    if (gameState !== 'memorizing') return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Hide all cards & start playing!
      finishMemorization();
    }
  }, [gameState, countdown]);

  const finishMemorization = () => {
    sounds.playWhoosh();
    setFlippedUids([]);
    setGameState('playing');
  };

  // Card Click Handler
  const handleCardClick = (card: MemoryCardItem) => {
    if (gameState !== 'playing' || isLocked) return;
    if (flippedUids.includes(card.uid) || matchedPairIds.includes(card.pairId)) return;
    if (flippedUids.length >= 2) return;

    sounds.playPop();
    const newFlipped = [...flippedUids, card.uid];
    setFlippedUids(newFlipped);

    if (newFlipped.length === 2) {
      const first = cards.find((c) => c.uid === newFlipped[0]);
      const second = cards.find((c) => c.uid === newFlipped[1]);

      if (first && second && first.pairId === second.pairId) {
        // MATCH!
        sounds.playSuccess();
        const nextMatched = [...matchedPairIds, first.pairId];
        setMatchedPairIds(nextMatched);
        setScore((s) => s + 20);
        setFlippedUids([]);

        if (nextMatched.length === PAIRS_DATA.length) {
          setTimeout(() => {
            setGameState('won');
            sounds.playFanfare();
            confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
          }, 600);
        }
      } else {
        // MISMATCH -> Lock and give 1.8 seconds so the child can easily memorize both cards!
        sounds.playOops();
        setIsLocked(true);
        setMismatchedUids(newFlipped);

        setTimeout(() => {
          setFlippedUids([]);
          setMismatchedUids([]);
          setIsLocked(false);
        }, 1800);
      }
    }
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-4 sm:p-8 rounded-3xl border-4 border-indigo-500/50 shadow-2xl text-white select-none"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. START SCREEN (BEFORE STARTING GAME) */}
      {/* ------------------------------------------------------------- */}
      {gameState === 'idle' && (
        <div className="py-10 px-4 text-center max-w-xl mx-auto space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-5xl mx-auto shadow-xl ring-4 ring-amber-300/40 animate-bounce-slow">
            🃏
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {isAr ? 'لعبة ذاكرة بطاقات الملحقات 3D' : 'Jeu 3D de Mémoire des Cartes'}
            </h3>
            <p className="text-sm sm:text-base text-indigo-200 font-semibold leading-relaxed">
              {isAr
                ? 'ستظهر لك البطاقات أولاً مكشوفة لمدة 10 ثوانٍ لتحفظ أماكنها، ثم تنقلب لتجد الأزواج المتطابقة بين الجهاز وفئته !'
                : 'Toutes les cartes vont s\'afficher pendant 10 secondes pour te laisser le temps de les mémoriser. Ensuite, retrouve les paires correspondantes !'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-900/60 border border-indigo-400/40 text-xs sm:text-sm text-indigo-100 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 font-bold">
              <span>⌨️ Clavier</span>
              <span>↔️</span>
              <span className="text-amber-300">📥 Entrée</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span>🖥️ Écran</span>
              <span>↔️</span>
              <span className="text-pink-300">📤 Sortie</span>
            </div>
          </div>

          <button
            onClick={setupGame}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 font-black text-lg shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>{isAr ? 'ابدأ اللعبة الآن ! 🚀' : 'Commencer la partie ! 🚀'}</span>
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. GAME IN PROGRESS (MEMORIZING OR PLAYING) */}
      {/* ------------------------------------------------------------- */}
      {(gameState === 'memorizing' || gameState === 'playing') && (
        <div className="space-y-6">
          {/* Header Controls & Score */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/80 border border-indigo-400/30">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🃏</span>
              <div>
                <h4 className="font-black text-base sm:text-lg text-white">
                  {isAr ? 'ابحث عن أزواج البطاقات المتطابقة' : 'Associe chaque appareil à sa catégorie'}
                </h4>
                <p className="text-xs text-indigo-300">
                  {isAr ? 'التقدم' : 'Progression'} : {matchedPairIds.length} / {PAIRS_DATA.length} {isAr ? 'أزواج' : 'paires'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-1.5 shadow-md">
                <Trophy className="w-4 h-4" />
                <span>{score} ⭐</span>
              </div>

              <button
                onClick={setupGame}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
                title={isAr ? 'إعادة اللعب' : 'Recommencer'}
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'إعادة' : 'Rejouer'}</span>
              </button>
            </div>
          </div>

          {/* Memorization Banner */}
          {gameState === 'memorizing' && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-pulse">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 animate-spin" />
                <div>
                  <span className="text-base sm:text-lg block">
                    {isAr
                      ? `احفظ أماكن البطاقات ! ستنقلب بعد : ${countdown} ثوانٍ`
                      : `Mémorise bien l'emplacement des cartes ! Elles se cachent dans : ${countdown} s`}
                  </span>
                  <span className="text-xs text-amber-950 font-bold">
                    {isAr ? 'خذ وقتك، لا تتسرع !' : 'Prends ton temps pour bien observer !'}
                  </span>
                </div>
              </div>

              <button
                onClick={finishMemorization}
                className="px-5 py-2 rounded-xl bg-slate-950 text-white font-black text-xs sm:text-sm hover:bg-slate-900 transition-transform active:scale-95 shadow-md shrink-0"
              >
                {isAr ? 'أنا مستعد ! (اقلبها الآن) 👍' : 'Je suis prêt ! (Cacher les cartes) 👍'}
              </button>
            </div>
          )}

          {/* 3D CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 perspective-1000">
            {cards.map((card) => {
              const isRevealed =
                gameState === 'memorizing' ||
                flippedUids.includes(card.uid) ||
                matchedPairIds.includes(card.pairId);

              const isMatched = matchedPairIds.includes(card.pairId);
              const isMismatch = mismatchedUids.includes(card.uid);

              return (
                <div
                  key={card.uid}
                  onClick={() => handleCardClick(card)}
                  className={`h-32 sm:h-40 rounded-2xl cursor-pointer perspective-1000 transition-all transform active:scale-95 ${
                    isMatched ? 'opacity-85 pointer-events-none' : 'hover:-translate-y-1'
                  }`}
                >
                  <div
                    className={`relative w-full h-full rounded-2xl transition-transform duration-700 transform-style-3d shadow-xl ${
                      isRevealed ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* BACK FACE (When Face Down) */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-900 border-3 border-indigo-400/60 p-3 flex flex-col items-center justify-center text-center backface-hidden shadow-inner">
                      <div className="w-12 h-12 rounded-2xl bg-red-600/30 border border-red-500/50 flex items-center justify-center mb-1">
                        <span className="text-2xl filter drop-shadow">🔥</span>
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                        RED PHOENIX
                      </span>
                      <span className="text-[10px] text-indigo-300 font-bold mt-0.5">
                        {isAr ? 'المس للقلب' : 'Touche-moi'}
                      </span>
                    </div>

                    {/* FRONT FACE (When Face Up) */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-2xl border-3 p-3 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 transition-colors ${
                        isMatched
                          ? 'border-emerald-400 bg-emerald-950/90 text-white'
                          : isMismatch
                          ? 'border-rose-400 bg-rose-950/90 text-white animate-shake'
                          : `bg-slate-800/95 text-white ${card.borderColor}`
                      }`}
                    >
                      <span className="text-3xl sm:text-5xl filter drop-shadow mb-1 transform hover:scale-110 transition-transform">
                        {card.emoji}
                      </span>
                      <span className="font-black text-xs sm:text-sm leading-tight text-white line-clamp-1">
                        {card.title}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full mt-1 ${
                          card.type === 'category'
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-indigo-500/40 text-indigo-200'
                        }`}
                      >
                        {card.type === 'category'
                          ? isAr ? 'فئة' : 'Catégorie'
                          : isAr ? 'جهاز' : 'Périphérique'}
                      </span>

                      {isMatched && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. VICTORY SCREEN */}
      {/* ------------------------------------------------------------- */}
      {gameState === 'won' && (
        <div className="py-12 px-4 text-center max-w-lg mx-auto space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-emerald-400 text-slate-950 flex items-center justify-center text-5xl mx-auto shadow-2xl animate-bounce">
            🏆
          </div>

          <div>
            <h3 className="text-3xl font-black text-white mb-2">
              {isAr ? '🎉 مبروك يا بطل الذاكرة الخارقة !' : '🎉 Félicitations petit génie !'}
            </h3>
            <p className="text-indigo-200 text-sm sm:text-base font-semibold leading-relaxed">
              {isAr
                ? 'لقد عثرت على جميع الأزواج وتعرفت على وحدات الإدخال والإخراج بذكاء فائق !'
                : 'Tu as retrouvé toutes les paires et maîtrisé les périphériques d\'entrée, de sortie et de stockage !'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-900/50 border border-indigo-400/40 inline-flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <span className="text-lg font-black text-amber-300">
              {isAr ? 'النتيجة النهائية' : 'Score Final'} : {score} points
            </span>
          </div>

          <div>
            <button
              onClick={setupGame}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black text-base shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{isAr ? 'العب مرة أخرى' : 'Rejouer une partie'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
