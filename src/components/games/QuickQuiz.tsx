'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/data/courseData';
import { sounds } from '@/utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  courseTitle: string;
  onComplete?: () => void;
}

export const QuickQuiz: React.FC<QuizProps> = ({ questions, courseTitle, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  const q = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === q.correctIndex) {
      sounds.playSuccess();
      setScore(score + 1);
    } else {
      sounds.playOops();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsDone(true);
      sounds.playFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    sounds.playWhoosh();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  };

  if (isDone) {
    const isPerfect = score === questions.length;
    return (
      <div className="bg-gradient-to-br from-amber-50 to-emerald-50 p-6 rounded-3xl border-3 border-amber-300 text-center shadow-lg">
        <div className="w-16 h-16 rounded-3xl bg-amber-400 text-white flex items-center justify-center text-3xl mx-auto mb-3 shadow-md">
          {isPerfect ? '🏆' : '⭐'}
        </div>
        <h4 className="text-2xl font-black text-slate-800 mb-1">
          {isPerfect ? 'Score Parfait ! Champion !' : 'Bravo pour tes efforts !'}
        </h4>
        <p className="text-sm font-semibold text-slate-600 mb-4">
          Tu as obtenu <span className="text-amber-600 font-black text-base">{score}</span> sur{' '}
          <span className="font-bold">{questions.length}</span> bonnes réponses sur le cours &laquo; {courseTitle} &raquo; !
        </p>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Recommencer le quiz</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-lg">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span className="font-black text-slate-800 text-sm sm:text-base">
            Le Quiz des Petits Génies
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          <span>Question {currentIdx + 1} / {questions.length}</span>
        </div>
      </div>

      {/* Question Title */}
      <h4 className="text-base sm:text-lg font-black text-slate-800 mb-4 leading-snug">
        {q.question}
      </h4>

      {/* Options List */}
      <div className="space-y-2.5 mb-5">
        {q.options.map((opt, idx) => {
          let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-amber-50/60 hover:border-amber-300 text-slate-700';

          if (isAnswered) {
            if (idx === q.correctIndex) {
              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-black ring-2 ring-emerald-300';
            } else if (idx === selectedOption) {
              btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-bold';
            } else {
              btnStyle = 'border-slate-200 bg-slate-50 opacity-40 text-slate-400';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between group active:scale-[0.99] ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center font-black text-xs text-slate-600 group-hover:border-amber-400">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-bold">{opt}</span>
              </div>

              {isAnswered && idx === q.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              {isAnswered && idx === selectedOption && idx !== q.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner when answered */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold mb-4 leading-relaxed ${
            selectedOption === q.correctIndex
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="text-xl shrink-0">
              {selectedOption === q.correctIndex ? '🎉' : '💡'}
            </span>
            <div>
              <p className="font-extrabold mb-0.5">
                {selectedOption === q.correctIndex ? 'Bravo !' : 'Explication :'}
              </p>
              <p>{q.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>{currentIdx < questions.length - 1 ? 'Question suivante' : 'Voir mon résultat'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
