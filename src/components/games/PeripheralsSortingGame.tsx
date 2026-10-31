'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '@/utils/audio';
import { Language } from '@/data/translations';
import { RotateCcw, CheckCircle2, Play, AlertCircle, Sparkles, Trophy, Hand } from 'lucide-react';

interface PeripheralCard {
  id: string;
  category: 'entree' | 'sortie' | 'stockage';
  emoji: string;
  frName: string;
  arName: string;
  frHint: string;
  arHint: string;
  frExplanation: string;
  arExplanation: string;
}

const CARDS_DATA: PeripheralCard[] = [
  {
    id: 'souris',
    frName: 'Souris',
    arName: 'الفأرة',
    category: 'entree',
    emoji: '🖱️',
    frHint: 'Elle envoie tes clics et la flèche dans l\'ordinateur !',
    arHint: 'ترسل النقرات وحركة السهم إلى الحاسوب !',
    frExplanation: 'La souris envoie la position de tes mouvements à la machine : c\'est une Entrée !',
    arExplanation: 'الفأرة ترسل نقراتك وحركاتك إلى الداخل : إنها وحدة إدخال !',
  },
  {
    id: 'ecran',
    frName: 'Écran',
    arName: 'الشاشة',
    category: 'sortie',
    emoji: '🖥️',
    frHint: 'Il affiche les images lumineuses pour tes yeux !',
    arHint: 'تُظهر الصور والفيديوهات لعينيك !',
    frExplanation: 'L\'écran fait SORTIR les images calculées pour que tu les voies : c\'est une Sortie !',
    arExplanation: 'الشاشة تُخرج الصور لنراها بأعيننا : إنها وحدة إخراج !',
  },
  {
    id: 'clavier',
    frName: 'Clavier',
    arName: 'لوحة المفاتيح',
    category: 'entree',
    emoji: '⌨️',
    frHint: 'Il fait entrer chaque lettre que tu tapes !',
    arHint: 'تُدخل الحروف والأرقام إلى الحاسوب !',
    frExplanation: 'Le clavier fait ENTRER chaque caractère tapé : c\'est une Entrée !',
    arExplanation: 'لوحة المفاتيح تُدخل الحروف والكلمات : إنها وحدة إدخال !',
  },
  {
    id: 'imprimante',
    frName: 'Imprimante',
    arName: 'الطابعة',
    category: 'sortie',
    emoji: '🖨️',
    frHint: 'Elle fait sortir ton dessin sur une vraie feuille !',
    arHint: 'تُخرج رسمتك مطبوعة على ورقة حقيقية !',
    frExplanation: 'L\'imprimante fait SORTIR ton document sur du vrai papier : c\'est une Sortie !',
    arExplanation: 'الطابعة تُخرج الأوراق المطبوعة من الحاسوب : إنها وحدة إخراج !',
  },
  {
    id: 'usb',
    frName: 'Clé USB',
    arName: 'مفتاح USB',
    category: 'stockage',
    emoji: '💾',
    frHint: 'Elle garde tes fichiers et voyage dans ta poche !',
    arHint: 'يحفظ ملفاتك ويسافر معك في الجيب !',
    frExplanation: 'La clé USB stocke tes fichiers et les transporte : c\'est du Stockage !',
    arExplanation: 'مفتاح USB يحفظ الملفات وينقلها من حاسوب لآخر : إنه للتخزين والاتصال !',
  },
  {
    id: 'micro',
    frName: 'Microphone',
    arName: 'الميكروفون',
    category: 'entree',
    emoji: '🎙️',
    frHint: 'Il écoute ta voix et la fait entrer dans la machine !',
    arHint: 'يُدخل صوتك عند التحدث والغناء !',
    frExplanation: 'Le micro capte le son de ta voix vers l\'intérieur : c\'est une Entrée !',
    arExplanation: 'الميكروفون يلتقط صوتك ويدخله إلى الحاسوب : إنه وحدة إدخال !',
  },
  {
    id: 'haut-parleurs',
    frName: 'Haut-parleurs',
    arName: 'مكبرات الصوت',
    category: 'sortie',
    emoji: '🔊',
    frHint: 'Ils font sortir la musique pour tes oreilles !',
    arHint: 'تُخرج الأناشيد والأصوات الجميلة لأذنيك !',
    frExplanation: 'Les enceintes font SORTIR les mélodies pour tes oreilles : c\'est une Sortie !',
    arExplanation: 'مكبرات الصوت تُخرج الأناشيد والأصوات من الحاسوب : إنها وحدة إخراج !',
  },
  {
    id: 'webcam',
    frName: 'Webcam',
    arName: 'الكاميرا',
    category: 'entree',
    emoji: '📹',
    frHint: 'Elle filme ton visage pour la classe virtuelle !',
    arHint: 'تُدخل صورتك في حصص التعلم عن بعد !',
    frExplanation: 'La webcam est comme un œil qui fait ENTRER ton image : c\'est une Entrée !',
    arExplanation: 'الكاميرا تصور وجهك وتُدخله إلى الحاسوب : إنها وحدة إدخال !',
  },
  {
    id: 'modem',
    frName: 'Modem / Wi-Fi',
    arName: 'المودم / الواي فاي',
    category: 'stockage',
    emoji: '📶',
    frHint: 'Il envoie et reçoit les données avec Internet sans fil !',
    arHint: 'يرسل ويستقبل معلومات الإنترنت بدون أسلاك !',
    frExplanation: 'Le modem assure la communication avec le monde entier : c\'est de la Communication !',
    arExplanation: 'المودم يربط الحاسوب بالإنترنت والعالم الخارجي : إنه جهاز اتصال !',
  },
];

export const PeripheralsSortingGame: React.FC<{ lang?: Language }> = ({ lang = 'fr' }) => {
  const isAr = lang === 'ar';

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [cards, setCards] = useState<PeripheralCard[]>(() =>
    [...CARDS_DATA].sort(() => Math.random() - 0.5)
  );
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [dragOverBox, setDragOverBox] = useState<'entree' | 'sortie' | 'stockage' | null>(null);

  const [sortedBoxes, setSortedBoxes] = useState<{
    entree: PeripheralCard[];
    sortie: PeripheralCard[];
    stockage: PeripheralCard[];
  }>({
    entree: [],
    sortie: [],
    stockage: [],
  });

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  }>({
    type: 'info',
    message: isAr
      ? 'اضغط أو اسحب البطاقة نحو الصندوق الصحيح !'
      : 'Clique sur une carte ou glisse-la dans sa boîte convenable !',
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const startGame = () => {
    sounds.playWhoosh();
    setHasStarted(true);
    setCards([...CARDS_DATA].sort(() => Math.random() - 0.5));
    setSortedBoxes({ entree: [], sortie: [], stockage: [] });
    setSelectedCardId(null);
    setIsCompleted(false);
    setFeedback({
      type: 'info',
      message: isAr
        ? 'اضغط أو اسحب البطاقة نحو الصندوق الصحيح !'
        : 'Clique sur une carte ou glisse-la dans sa boîte convenable !',
    });
  };

  // Select card (Click / Touch)
  const handleCardClick = (card: PeripheralCard) => {
    sounds.playPop();
    if (selectedCardId === card.id) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(card.id);
      setFeedback({
        type: 'info',
        message: isAr
          ? `اخترت "${card.arName}" ${card.emoji}. ${card.arHint} اضغط الآن على الصندوق المناسب !`
          : `Tu as choisi "${card.frName}" ${card.emoji}. ${card.frHint} Clique maintenant sur la bonne boîte !`,
      });
    }
  };

  // Place card in box (Called by either click or drag-and-drop)
  const placeCardInBox = (cardId: string, boxType: 'entree' | 'sortie' | 'stockage') => {
    const currentCard = cards.find((c) => c.id === cardId);
    if (!currentCard) return;

    if (currentCard.category === boxType) {
      // SUCCESS!
      sounds.playSuccess();
      const newBoxes = {
        ...sortedBoxes,
        [boxType]: [...sortedBoxes[boxType], currentCard],
      };
      setSortedBoxes(newBoxes);

      const remainingCards = cards.filter((c) => c.id !== cardId);
      setCards(remainingCards);
      setSelectedCardId(null);
      setDragOverBox(null);

      setFeedback({
        type: 'success',
        message: isAr ? `🎉 ${currentCard.arExplanation}` : `🎉 ${currentCard.frExplanation}`,
      });

      if (remainingCards.length === 0) {
        setIsCompleted(true);
        sounds.playFanfare();
        confetti({
          particleCount: 160,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      // WRONG BOX -> Encouraging feedback, card is NOT lost, child can retry!
      sounds.playOops();
      setDragOverBox(null);

      let expectedBoxName = isAr ? 'وحدات الإدخال 📥' : "d'Entrée 📥";
      if (currentCard.category === 'sortie') {
        expectedBoxName = isAr ? 'وحدات الإخراج 📤' : 'de Sortie 📤';
      } else if (currentCard.category === 'stockage') {
        expectedBoxName = isAr ? 'التخزين والاتصال 💾' : 'de Stockage & Réseau 💾';
      }

      setFeedback({
        type: 'error',
        message: isAr
          ? `قريب جداً ! "${currentCard.arName}" لا توضع هنا. تلميح : هي تنتمي لصندوق ${expectedBoxName}. حاول مجدداً !`
          : `Presque ! "${currentCard.frName}" n'appartient pas à cette boîte. Indice : place-la dans la boîte ${expectedBoxName} !`,
      });
    }
  };

  // HTML5 Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, card: PeripheralCard) => {
    sounds.playPop();
    e.dataTransfer.setData('text/plain', card.id);
    setSelectedCardId(card.id);
  };

  const handleDragOver = (e: React.DragEvent, boxType: 'entree' | 'sortie' | 'stockage') => {
    e.preventDefault();
    if (dragOverBox !== boxType) {
      setDragOverBox(boxType);
    }
  };

  const handleDragLeave = () => {
    setDragOverBox(null);
  };

  const handleDrop = (e: React.DragEvent, boxType: 'entree' | 'sortie' | 'stockage') => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain') || selectedCardId;
    if (cardId) {
      placeCardInBox(cardId, boxType);
    }
    setDragOverBox(null);
  };

  const totalSorted =
    sortedBoxes.entree.length + sortedBoxes.sortie.length + sortedBoxes.stockage.length;
  const totalCards = CARDS_DATA.length;

  return (
    <div
      className="w-full bg-gradient-to-br from-amber-50 via-sky-50 to-purple-50 p-4 sm:p-8 rounded-3xl border-4 border-amber-300 shadow-2xl text-slate-800 select-none"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. START SCREEN */}
      {/* ------------------------------------------------------------- */}
      {!hasStarted ? (
        <div className="py-10 px-4 text-center max-w-xl mx-auto space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-5xl mx-auto shadow-xl ring-4 ring-amber-300/40 animate-bounce-slow">
            📦
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              {isAr ? 'لعبة الصناديق الثلاثية 3D' : 'Le Grand Jeu des Boîtes 3D'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
              {isAr
                ? 'ضع كل بطاقة جهاز في صندوقها المناسب : إدخال 📥 أو إخراج 📤 أو تخزين واتصال 💾 ! يمكنك السحب أو الضغط.'
                : 'Range chaque périphérique dans sa boîte convenable : Entrée 📥, Sortie 📤, ou Stockage & Réseau 💾 ! Tu peux glisser ou cliquer.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-bold text-slate-700">
            <div className="p-3 rounded-2xl bg-sky-100 border-2 border-sky-300 text-center">
              <span className="text-2xl block mb-1">📥</span>
              <span>{isAr ? 'وحدات الإدخال' : 'Entrée'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-center">
              <span className="text-2xl block mb-1">📤</span>
              <span>{isAr ? 'وحدات الإخراج' : 'Sortie'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-center">
              <span className="text-2xl block mb-1">💾</span>
              <span>{isAr ? 'التخزين والاتصال' : 'Stockage'}</span>
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-lg shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>{isAr ? 'ابدأ اللعبة الآن ! 🚀' : 'Commencer la partie ! 🚀'}</span>
          </button>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* 2. PLAYING SCREEN */
        /* ------------------------------------------------------------- */
        <div className="space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white shadow-md border-2 border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center text-2xl shadow-xs">
                📦
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg text-slate-900">
                  {isAr ? 'رتّب البطاقات في الصناديق المناسبة' : 'Classe chaque carte dans sa boîte'}
                </h4>
                <p className="text-xs text-slate-500 font-semibold">
                  {isAr ? 'اسحب البطاقة أو اضغط عليها ثم اضغط على الصندوق' : 'Glisse la carte ou clique dessus puis clique sur la boîte'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-amber-100 border border-amber-300 text-slate-900 font-black text-sm flex items-center gap-1.5 shadow-xs">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>
                  {totalSorted} / {totalCards} ⭐
                </span>
              </div>

              <button
                onClick={startGame}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-300"
                title={isAr ? 'إعادة اللعب' : 'Recommencer'}
              >
                <RotateCcw className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'إعادة' : 'Rejouer'}</span>
              </button>
            </div>
          </div>

          {/* Dynamic Feedback Banner */}
          <div
            className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center gap-3 transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : feedback.type === 'error'
                ? 'bg-rose-100 border-rose-400 text-rose-900 animate-shake'
                : 'bg-sky-100 border-sky-400 text-sky-900'
            }`}
          >
            <span className="text-2xl shrink-0">
              {feedback.type === 'success' ? '🎉' : feedback.type === 'error' ? '🤔' : '💡'}
            </span>
            <span className="flex-1 leading-relaxed">{feedback.message}</span>
          </div>

          {/* 3 PHYSICAL 3D BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* BOX 1: ENTRÉE */}
            <div
              onDragOver={(e) => handleDragOver(e, 'entree')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'entree')}
              onClick={() => selectedCardId && placeCardInBox(selectedCardId, 'entree')}
              className={`rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer shadow-lg transform active:scale-98 ${
                dragOverBox === 'entree' || selectedCardId
                  ? 'border-sky-500 bg-sky-100/95 ring-4 ring-sky-300/60 scale-102'
                  : 'border-sky-300 bg-white hover:border-sky-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">📥</span>
                  <div>
                    <h5 className="font-black text-sky-900 text-base sm:text-lg">
                      {isAr ? 'وحدات الإدخال' : "Boîte d'Entrée"}
                    </h5>
                    <p className="text-[11px] text-sky-700 font-semibold">
                      {isAr ? 'لإرسال الأوامر نحو الداخل' : 'De l\'extérieur vers la machine'}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-200 text-sky-900 shadow-xs">
                  {sortedBoxes.entree.length}
                </span>
              </div>

              {/* Box Content Area */}
              <div className="min-h-28 p-2.5 bg-sky-50 rounded-2xl border-2 border-sky-200 flex flex-wrap gap-2 items-start mt-3">
                {sortedBoxes.entree.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 text-white font-black text-xs shadow-md animate-fadeIn"
                  >
                    <span>{item.emoji}</span>
                    <span>{isAr ? item.arName : item.frName}</span>
                  </span>
                ))}
                {sortedBoxes.entree.length === 0 && (
                  <span className="text-xs text-sky-400 font-bold italic m-auto py-6">
                    {isAr ? 'اسحب أو اضغط لوضع أجهزة الإدخال هنا' : 'Glisse ou clique pour ranger une Entrée ici !'}
                  </span>
                )}
              </div>
            </div>

            {/* BOX 2: SORTIE */}
            <div
              onDragOver={(e) => handleDragOver(e, 'sortie')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'sortie')}
              onClick={() => selectedCardId && placeCardInBox(selectedCardId, 'sortie')}
              className={`rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer shadow-lg transform active:scale-98 ${
                dragOverBox === 'sortie' || selectedCardId
                  ? 'border-rose-500 bg-rose-100/95 ring-4 ring-rose-300/60 scale-102'
                  : 'border-rose-300 bg-white hover:border-rose-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">📤</span>
                  <div>
                    <h5 className="font-black text-rose-900 text-base sm:text-lg">
                      {isAr ? 'وحدات الإخراج' : 'Boîte de Sortie'}
                    </h5>
                    <p className="text-[11px] text-rose-700 font-semibold">
                      {isAr ? 'لإظهار الصور والأصوات' : 'De la machine vers tes yeux/oreilles'}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-200 text-rose-900 shadow-xs">
                  {sortedBoxes.sortie.length}
                </span>
              </div>

              <div className="min-h-28 p-2.5 bg-rose-50 rounded-2xl border-2 border-rose-200 flex flex-wrap gap-2 items-start mt-3">
                {sortedBoxes.sortie.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500 text-white font-black text-xs shadow-md animate-fadeIn"
                  >
                    <span>{item.emoji}</span>
                    <span>{isAr ? item.arName : item.frName}</span>
                  </span>
                ))}
                {sortedBoxes.sortie.length === 0 && (
                  <span className="text-xs text-rose-400 font-bold italic m-auto py-6">
                    {isAr ? 'اسحب أو اضغط لوضع أجهزة الإخراج هنا' : 'Glisse ou clique pour ranger une Sortie ici !'}
                  </span>
                )}
              </div>
            </div>

            {/* BOX 3: STOCKAGE & RÉSEAU */}
            <div
              onDragOver={(e) => handleDragOver(e, 'stockage')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'stockage')}
              onClick={() => selectedCardId && placeCardInBox(selectedCardId, 'stockage')}
              className={`rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer shadow-lg transform active:scale-98 ${
                dragOverBox === 'stockage' || selectedCardId
                  ? 'border-emerald-500 bg-emerald-100/95 ring-4 ring-emerald-300/60 scale-102'
                  : 'border-emerald-300 bg-white hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">💾</span>
                  <div>
                    <h5 className="font-black text-emerald-900 text-base sm:text-lg">
                      {isAr ? 'التخزين والاتصال' : 'Stockage & Réseau'}
                    </h5>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      {isAr ? 'لحمل الملفات والتواصل' : 'Pour voyager et communiquer'}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-200 text-emerald-900 shadow-xs">
                  {sortedBoxes.stockage.length}
                </span>
              </div>

              <div className="min-h-28 p-2.5 bg-emerald-50 rounded-2xl border-2 border-emerald-200 flex flex-wrap gap-2 items-start mt-3">
                {sortedBoxes.stockage.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-md animate-fadeIn"
                  >
                    <span>{item.emoji}</span>
                    <span>{isAr ? item.arName : item.frName}</span>
                  </span>
                ))}
                {sortedBoxes.stockage.length === 0 && (
                  <span className="text-xs text-emerald-400 font-bold italic m-auto py-6">
                    {isAr ? 'اسحب أو اضغط لوضع أجهزة التخزين هنا' : 'Glisse ou clique pour ranger du Stockage ici !'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* CARDS TRAY (CARDS LEFT TO BE SORTED) */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white shadow-lg border-2 border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs sm:text-sm font-black uppercase text-slate-700 flex items-center gap-2">
                <Hand className="w-4 h-4 text-amber-500" />
                <span>{isAr ? 'البطاقات التي تنتظر الترتيب' : 'Cartes à placer dans les boîtes'}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs">
                  {cards.length}
                </span>
              </span>

              <span className="text-xs text-slate-400 font-bold">
                {isAr ? '💡 يمكنك السحب أو الضغط' : '💡 Glisser-déposer ou Clic'}
              </span>
            </div>

            {cards.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {cards.map((card) => {
                  const isSelected = selectedCardId === card.id;

                  return (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, card)}
                      onClick={() => handleCardClick(card)}
                      className={`p-3.5 rounded-2xl border-3 cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-center text-center shadow-md ${
                        isSelected
                          ? 'bg-amber-400 border-amber-600 text-slate-950 scale-108 shadow-xl ring-4 ring-amber-300 -translate-y-1'
                          : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:scale-103'
                      }`}
                    >
                      <span className="text-4xl sm:text-5xl mb-1 filter drop-shadow">
                        {card.emoji}
                      </span>
                      <span className="font-black text-xs sm:text-sm tracking-tight line-clamp-1">
                        {isAr ? card.arName : card.frName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                        {isAr ? 'المس للنقل' : 'Glisse-moi'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Celebration Banner */
              <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-white text-emerald-800 flex items-center justify-center text-4xl mx-auto mb-3 shadow-md">
                  🏆
                </div>
                <h4 className="text-2xl sm:text-3xl font-black mb-1">
                  {isAr ? '🎉 رائع جداً يا بطل ! أكملت التصنيف بامتياز ! 🏆' : '🎉 Bravo champion ! Toutes les boîtes sont remplies ! 🏆'}
                </h4>
                <p className="text-sm font-semibold text-emerald-50 max-w-md mx-auto mb-5">
                  {isAr
                    ? 'لقد تعلمت بنجاح وظيفة كل جهاز وصنّفته في مكانه الصحيح !'
                    : 'Tu sais désormais parfaitement classer chaque périphérique d\'entrée, de sortie et de stockage !'}
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-3 rounded-full bg-white text-emerald-800 font-black text-sm shadow-md hover:bg-emerald-50 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isAr ? 'إعادة اللعب' : 'Recommencer une partie'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
