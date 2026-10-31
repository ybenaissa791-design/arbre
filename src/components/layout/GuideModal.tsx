'use client';

import React from 'react';
import { sounds } from '@/utils/audio';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface GuideProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-3xl border-4 border-amber-300 p-6 shadow-2xl relative animate-fadeIn">
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-2xl shadow-md">
            🧭
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Bienvenue sur l&apos;Arbre Magique !
            </h3>
            <p className="text-xs text-slate-600 font-bold">
              Le guide pour les élèves et les professeurs
            </p>
          </div>
        </div>

        <div className="space-y-3.5 mb-6 text-xs sm:text-sm text-slate-700 font-medium">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="text-2xl shrink-0">🌳</span>
            <div>
              <p className="font-black text-sky-900">1. Explore l&apos;Arbre Géant</p>
              <p className="text-sky-800">
                La racine tout en haut est <strong>l&apos;Ordinateur</strong>. À gauche, la <strong>Partie Logicielle</strong> (l&apos;Esprit) et à droite, la <strong>Partie Matérielle</strong> (le Corps).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-2xl shrink-0">🎨</span>
            <div>
              <p className="font-black text-purple-900">2. Clique sur un nœud pour ouvrir son cours</p>
              <p className="text-purple-800">
                Chaque carte t&apos;ouvre une leçon complète avec une <strong>vue 3D interactive</strong> que tu peux faire tourner avec ta souris ou ton doigt !
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-2xl shrink-0">🎮</span>
            <div>
              <p className="font-black text-emerald-900">3. Amuse-toi avec les mini-jeux</p>
              <p className="text-emerald-800">
                Trie les périphériques dans les bonnes boîtes, regarde la course des données dans le processeur, ou deviens le chef d&apos;orchestre !
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-2xl shrink-0">🎧</span>
            <div>
              <p className="font-black text-amber-900">4. Écoute l&apos;histoire lue à voix haute</p>
              <p className="text-amber-800">
                Clique sur le bouton <strong>&laquo; Écouter l&apos;histoire 🎧 &raquo;</strong> pour que l&apos;ordinateur te raconte tout gentiment !
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playSuccess();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>C&apos;est parti pour l&apos;aventure !</span>
        </button>
      </div>
    </div>
  );
};
