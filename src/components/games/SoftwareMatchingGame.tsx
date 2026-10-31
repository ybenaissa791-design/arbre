'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '@/utils/audio';
import { RotateCcw, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface Mission {
  id: string;
  task: string;
  emoji: string;
  target: 'os' | 'paint' | 'scratch' | 'browser';
  explanation: string;
}

const MISSIONS: Mission[] = [
  {
    id: '1',
    task: "L'ordinateur s'allume ! Qui réveille le processeur et prépare l'écran ?",
    emoji: "⏰",
    target: 'os',
    explanation: "Bravo ! C'est le Système d'Exploitation (OS) qui est le chef de la maison !",
  },
  {
    id: '2',
    task: "Je veux dessiner un soleil radieux et une maison pleine de couleurs !",
    emoji: "🎨",
    target: 'paint',
    explanation: "Super ! Le logiciel de dessin (comme Paint) est parfait pour tes créations !",
  },
  {
    id: '3',
    task: "Je veux apprendre à programmer un petit jeu avec un héros chat roux !",
    emoji: "🐱",
    target: 'scratch',
    explanation: "Génial ! Scratch te permet d'emboîter des briques de code en t'amusant !",
  },
  {
    id: '4',
    task: "Je veux explorer des photos d'animaux marins sur Internet !",
    emoji: "🌐",
    target: 'browser',
    explanation: "Exactement ! Le navigateur Web (Chrome, Firefox) ouvre la porte sur le monde !",
  },
  {
    id: '5',
    task: "Tu branches une clé USB ! Qui la détecte et affiche son dossier ?",
    emoji: "💾",
    target: 'os',
    explanation: "Oui ! C'est toujours l'OS qui gère le matériel et les branchements !",
  },
];

const TARGETS = [
  { id: 'os', name: "Système d'Exploitation (OS)", emoji: "👑", desc: "Le Chef d'orchestre", color: "from-blue-500 to-indigo-600" },
  { id: 'paint', name: "Logiciel de Dessin (Paint)", emoji: "🖌️", desc: "Pour créer des images", color: "from-pink-500 to-rose-600" },
  { id: 'scratch', name: "Scratch (Coder)", emoji: "🐱", desc: "Pour fabriquer ses jeux", color: "from-amber-500 to-orange-600" },
  { id: 'browser', name: "Navigateur Web", emoji: "🧭", desc: "Pour surfer sur le Web", color: "from-teal-500 to-emerald-600" },
];

export const SoftwareMatchingGame: React.FC = () => {
  const [missionIndex, setMissionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: 'none' | 'success' | 'error'; message: string }>({
    type: 'none',
    message: '',
  });
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentMission = MISSIONS[missionIndex];

  const handleSelectTarget = (targetId: string) => {
    if (feedback.type === 'success') return; // Waiting for next

    if (targetId === currentMission.target) {
      sounds.playSuccess();
      setScore(score + 1);
      setFeedback({
        type: 'success',
        message: currentMission.explanation,
      });

      setTimeout(() => {
        if (missionIndex < MISSIONS.length - 1) {
          setMissionIndex(missionIndex + 1);
          setFeedback({ type: 'none', message: '' });
        } else {
          setIsFinished(true);
          sounds.playFanfare();
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
      }, 1500);
    } else {
      sounds.playOops();
      setFeedback({
        type: 'error',
        message: "Oups ! Ce n'est pas le bon logiciel pour cette mission. Réfléchis bien à son rôle !",
      });
    }
  };

  const handleRestart = () => {
    sounds.playWhoosh();
    setMissionIndex(0);
    setScore(0);
    setFeedback({ type: 'none', message: '' });
    setIsFinished(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-4 sm:p-6 rounded-3xl border-4 border-purple-300 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl shadow-md">
            👑
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              Le Défi du Chef d&apos;Orchestre
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Quel logiciel ou application faut-il utiliser pour cette mission ?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-purple-200 text-xs sm:text-sm font-bold text-purple-700">
            Mission {missionIndex + 1} / {MISSIONS.length} ⭐ Score : {score}
          </span>
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold"
            title="Recommencer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isFinished ? (
        <>
          {/* Mission Card */}
          <div className="bg-white p-5 rounded-2xl border-2 border-purple-200 shadow-md mb-6 text-center">
            <span className="text-4xl block mb-2">{currentMission.emoji}</span>
            <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Ta Mission :
            </span>
            <h4 className="text-lg sm:text-xl font-black text-slate-800 mt-2">
              &laquo; {currentMission.task} &raquo;
            </h4>
          </div>

          {/* Feedback banner */}
          {feedback.type !== 'none' && (
            <div
              className={`p-3.5 mb-6 rounded-2xl border text-sm font-bold flex items-center gap-2.5 transition-all ${
                feedback.type === 'success'
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900 animate-bounce-slow'
                  : 'bg-rose-100 border-rose-300 text-rose-900'
              }`}
            >
              <span className="text-2xl">{feedback.type === 'success' ? '🎉' : '🤔'}</span>
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {TARGETS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTarget(t.id)}
                className="p-4 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 text-left transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-3.5 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform`}
                >
                  {t.emoji}
                </div>
                <div>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-800">
                    {t.name}
                  </h5>
                  <p className="text-xs text-slate-500 font-medium">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center shadow-lg">
          <h4 className="text-2xl font-black mb-1">
            🌟 Mission accomplie Grand Chef ! 👑
          </h4>
          <p className="text-sm font-medium mb-4 max-w-md mx-auto text-purple-100">
            Tu connais sur le bout des doigts le rôle du Système d&apos;Exploitation et de toutes les applications !
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-2.5 rounded-full bg-white text-purple-800 font-black text-sm shadow-md hover:bg-purple-50 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rejouer le défi</span>
          </button>
        </div>
      )}
    </div>
  );
};
