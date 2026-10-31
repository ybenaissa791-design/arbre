'use client';

import React from 'react';
import { TreeNodeCircle } from './TreeNodeCircle';
import { CONTENT_FR, CONTENT_AR, Language } from '@/data/translations';

interface InteractiveTreeProps {
  lang: Language;
  onSelectNode: (id: string) => void;
  completedNodes: string[];
}

export const InteractiveTree: React.FC<InteractiveTreeProps> = ({
  lang,
  onSelectNode,
  completedNodes,
}) => {
  const isAr = lang === 'ar';
  const data = isAr ? CONTENT_AR : CONTENT_FR;

  const isDone = (id: string) => completedNodes.includes(id);

  return (
    <div className="w-full select-none" dir={isAr ? 'rtl' : 'ltr'}>
      {/* ============================================================= */}
      {/* 📱 1. VUE MOBILE SPÉCIFIQUE (100% Adaptée aux téléphones)       */}
      {/* ============================================================= */}
      <div className="block md:hidden w-full max-w-md mx-auto space-y-6">
        {/* ROOT: L'Ordinateur */}
        <div className="flex flex-col items-center">
          <TreeNodeCircle
            id="ordinateur"
            title={data['ordinateur'].title}
            emoji={data['ordinateur'].emoji}
            size="root"
            colorTheme="emerald"
            isCompleted={isDone('ordinateur')}
            onClick={onSelectNode}
          />
          <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-purple-500 rounded-full my-1.5" />
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
            {isAr ? 'اضغط على أي دائرة لفتح درسها' : 'Touche un cercle pour ouvrir sa leçon'}
          </span>
        </div>

        {/* 🟣 BRANCHE GAUCHE : PARTIE LOGICIELLE */}
        <div className="bg-purple-50/80 p-4 rounded-3xl border-2 border-purple-200 shadow-sm flex flex-col items-center space-y-3">
          <span className="text-[11px] font-black uppercase text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full">
            {isAr ? 'الفرع الأول : البرمجيات (العقل)' : 'Branche 1 : Partie Logicielle (L\'Esprit)'}
          </span>

          <TreeNodeCircle
            id="logiciel"
            title={data['logiciel'].title}
            emoji={data['logiciel'].emoji}
            size="main"
            colorTheme="purple"
            isCompleted={isDone('logiciel')}
            onClick={onSelectNode}
          />

          <div className="w-1 h-4 bg-purple-400 rounded-full" />

          {/* OS & Applications */}
          <div className="grid grid-cols-2 gap-3 w-full justify-items-center">
            <TreeNodeCircle
              id="os"
              title={data['os'].title}
              emoji={data['os'].emoji}
              size="sub"
              colorTheme="indigo"
              isCompleted={isDone('os')}
              onClick={onSelectNode}
            />

            <TreeNodeCircle
              id="applications"
              title={data['applications'].title}
              emoji={data['applications'].emoji}
              size="sub"
              colorTheme="purple"
              isCompleted={isDone('applications')}
              onClick={onSelectNode}
            />
          </div>
        </div>

        {/* 🔵 BRANCHE DROITE : PARTIE MATÉRIELLE */}
        <div className="bg-sky-50/80 p-4 rounded-3xl border-2 border-sky-200 shadow-sm flex flex-col items-center space-y-4">
          <span className="text-[11px] font-black uppercase text-sky-700 bg-sky-100 px-3 py-0.5 rounded-full">
            {isAr ? 'الفرع الثاني : العتاد والمكونات (الجسد)' : 'Branche 2 : Partie Matérielle (Le Corps)'}
          </span>

          <TreeNodeCircle
            id="materiel"
            title={data['materiel'].title}
            emoji={data['materiel'].emoji}
            size="main"
            colorTheme="sky"
            isCompleted={isDone('materiel')}
            onClick={onSelectNode}
          />

          {/* SOUS-BRANCHE A : L'UNITÉ CENTRALE */}
          <div className="w-full bg-indigo-50/90 p-3.5 rounded-2xl border border-indigo-200 flex flex-col items-center space-y-3">
            <TreeNodeCircle
              id="unite-centrale"
              title={data['unite-centrale'].title}
              emoji={data['unite-centrale'].emoji}
              size="sub"
              colorTheme="indigo"
              isCompleted={isDone('unite-centrale')}
              onClick={onSelectNode}
            />

            <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
              {isAr ? 'الأعضاء الداخلية' : 'Composants Internes'}
            </span>

            {/* 5 internal organs in responsive wrap */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
              <TreeNodeCircle
                id="cpu"
                title={data['cpu'].title}
                emoji={data['cpu'].emoji}
                size="sub"
                colorTheme="amber"
                isCompleted={isDone('cpu')}
                onClick={onSelectNode}
              />
              <TreeNodeCircle
                id="ram"
                title={data['ram'].title}
                emoji={data['ram'].emoji}
                size="sub"
                colorTheme="emerald"
                isCompleted={isDone('ram')}
                onClick={onSelectNode}
              />
              <TreeNodeCircle
                id="stockage"
                title={data['stockage'].title}
                emoji={data['stockage'].emoji}
                size="sub"
                colorTheme="sky"
                isCompleted={isDone('stockage')}
                onClick={onSelectNode}
              />
              <TreeNodeCircle
                id="carte-mere"
                title={data['carte-mere'].title}
                emoji={data['carte-mere'].emoji}
                size="sub"
                colorTheme="emerald"
                isCompleted={isDone('carte-mere')}
                onClick={onSelectNode}
              />
              <TreeNodeCircle
                id="alimentation"
                title={data['alimentation'].title}
                emoji={data['alimentation'].emoji}
                size="sub"
                colorTheme="orange"
                isCompleted={isDone('alimentation')}
                onClick={onSelectNode}
              />
            </div>
          </div>

          {/* SOUS-BRANCHE B : LES PÉRIPHÉRIQUES */}
          <div className="w-full bg-orange-50/90 p-3.5 rounded-2xl border border-orange-200 flex flex-col items-center space-y-3">
            <TreeNodeCircle
              id="peripheriques"
              title={data['peripheriques'].title}
              emoji={data['peripheriques'].emoji}
              size="sub"
              colorTheme="orange"
              isCompleted={isDone('peripheriques')}
              onClick={onSelectNode}
            />

            <span className="text-[10px] font-black uppercase text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
              {isAr ? 'أنواع الملحقات' : 'Familles Périphériques'}
            </span>

            {/* 3 peripheral sub-nodes */}
            <div className="grid grid-cols-3 gap-2 w-full justify-items-center">
              <TreeNodeCircle
                id="entree"
                title={data['entree'].title}
                emoji={data['entree'].emoji}
                size="sub"
                colorTheme="sky"
                isCompleted={isDone('entree')}
                onClick={onSelectNode}
              />
              <TreeNodeCircle
                id="sortie"
                title={data['sortie'].title}
                emoji={data['sortie'].emoji}
                size="sub"
                colorTheme="orange"
                isCompleted={isDone('sortie')}
                onClick={onSelectNode}
              />
              <TreeNodeCircle
                id="stockage-comm"
                title={data['stockage-comm'].title}
                emoji={data['stockage-comm'].emoji}
                size="sub"
                colorTheme="emerald"
                isCompleted={isDone('stockage-comm')}
                onClick={onSelectNode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 🖥️ 2. VUE TABLETTE & ORDINATEUR (Grand arbre binaire SVG)     */}
      {/* ============================================================= */}
      <div className="hidden md:flex flex-col items-center w-full max-w-6xl mx-auto py-4">
        {/* LEVEL 0 : RACINE (L'ORDINATEUR) */}
        <div className="flex flex-col items-center relative mb-2">
          <TreeNodeCircle
            id="ordinateur"
            title={data['ordinateur'].title}
            emoji={data['ordinateur'].emoji}
            size="root"
            colorTheme="emerald"
            isCompleted={isDone('ordinateur')}
            onClick={onSelectNode}
          />
        </div>

        {/* SVG Connector from Root to Level 1 (Logiciel & Matériel) */}
        <div className="w-[680px] h-20 relative">
          <svg className="w-full h-full" viewBox="0 0 680 80" fill="none">
            <line x1="340" y1="0" x2="340" y2="25" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
            <path
              d="M 340 25 C 340 55, 170 30, 170 80"
              stroke="#a855f7"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 340 25 C 340 55, 510 30, 510 80"
              stroke="#0ea5e9"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* LEVEL 1 : LOGICIEL (GAUCHE) & MATÉRIEL (DROITE) */}
        <div className="w-full grid grid-cols-2 gap-16 px-4 items-start">
          {/* GAUCHE : BRANCHE LOGICIELLE */}
          <div className="flex flex-col items-center">
            <TreeNodeCircle
              id="logiciel"
              title={data['logiciel'].title}
              emoji={data['logiciel'].emoji}
              size="main"
              colorTheme="purple"
              isCompleted={isDone('logiciel')}
              onClick={onSelectNode}
            />

            {/* SVG Connector to OS & Applications */}
            <div className="w-[320px] h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 320 64" fill="none">
                <line x1="160" y1="0" x2="160" y2="20" stroke="#a855f7" strokeWidth="4" />
                <path d="M 160 20 C 160 45, 80 30, 80 64" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
                <path d="M 160 20 C 160 45, 240 30, 240 64" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            <div className="flex items-center justify-center gap-10 w-full">
              <TreeNodeCircle
                id="os"
                title={data['os'].title}
                emoji={data['os'].emoji}
                size="sub"
                colorTheme="indigo"
                isCompleted={isDone('os')}
                onClick={onSelectNode}
              />

              <TreeNodeCircle
                id="applications"
                title={data['applications'].title}
                emoji={data['applications'].emoji}
                size="sub"
                colorTheme="purple"
                isCompleted={isDone('applications')}
                onClick={onSelectNode}
              />
            </div>
          </div>

          {/* DROITE : BRANCHE MATÉRIELLE */}
          <div className="flex flex-col items-center">
            <TreeNodeCircle
              id="materiel"
              title={data['materiel'].title}
              emoji={data['materiel'].emoji}
              size="main"
              colorTheme="sky"
              isCompleted={isDone('materiel')}
              onClick={onSelectNode}
            />

            {/* SVG Connector to Unité Centrale & Périphériques */}
            <div className="w-[440px] h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 440 64" fill="none">
                <line x1="220" y1="0" x2="220" y2="20" stroke="#0ea5e9" strokeWidth="4" />
                <path d="M 220 20 C 220 45, 110 30, 110 64" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
                <path d="M 220 20 C 220 45, 330 30, 330 64" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full items-start">
              {/* SUB-BRANCH 1: UNITÉ CENTRALE */}
              <div className="flex flex-col items-center bg-indigo-50/70 p-4 rounded-3xl border-2 border-indigo-200 shadow-sm">
                <TreeNodeCircle
                  id="unite-centrale"
                  title={data['unite-centrale'].title}
                  emoji={data['unite-centrale'].emoji}
                  size="sub"
                  colorTheme="indigo"
                  isCompleted={isDone('unite-centrale')}
                  onClick={onSelectNode}
                />

                <span className="text-[10px] font-black uppercase text-indigo-700 mt-2 mb-3 bg-indigo-100 px-3 py-0.5 rounded-full">
                  {isAr ? 'الأعضاء الداخلية' : 'Composants Internes'}
                </span>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <TreeNodeCircle
                    id="cpu"
                    title={data['cpu'].title}
                    emoji={data['cpu'].emoji}
                    size="sub"
                    colorTheme="amber"
                    isCompleted={isDone('cpu')}
                    onClick={onSelectNode}
                  />
                  <TreeNodeCircle
                    id="ram"
                    title={data['ram'].title}
                    emoji={data['ram'].emoji}
                    size="sub"
                    colorTheme="emerald"
                    isCompleted={isDone('ram')}
                    onClick={onSelectNode}
                  />
                  <TreeNodeCircle
                    id="stockage"
                    title={data['stockage'].title}
                    emoji={data['stockage'].emoji}
                    size="sub"
                    colorTheme="sky"
                    isCompleted={isDone('stockage')}
                    onClick={onSelectNode}
                  />
                  <TreeNodeCircle
                    id="carte-mere"
                    title={data['carte-mere'].title}
                    emoji={data['carte-mere'].emoji}
                    size="sub"
                    colorTheme="emerald"
                    isCompleted={isDone('carte-mere')}
                    onClick={onSelectNode}
                  />
                  <TreeNodeCircle
                    id="alimentation"
                    title={data['alimentation'].title}
                    emoji={data['alimentation'].emoji}
                    size="sub"
                    colorTheme="orange"
                    isCompleted={isDone('alimentation')}
                    onClick={onSelectNode}
                  />
                </div>
              </div>

              {/* SUB-BRANCH 2: LES PÉRIPHÉRIQUES */}
              <div className="flex flex-col items-center bg-orange-50/70 p-4 rounded-3xl border-2 border-orange-200 shadow-sm">
                <TreeNodeCircle
                  id="peripheriques"
                  title={data['peripheriques'].title}
                  emoji={data['peripheriques'].emoji}
                  size="sub"
                  colorTheme="orange"
                  isCompleted={isDone('peripheriques')}
                  onClick={onSelectNode}
                />

                <span className="text-[10px] font-black uppercase text-orange-700 mt-2 mb-3 bg-orange-100 px-3 py-0.5 rounded-full">
                  {isAr ? 'أنواع الملحقات' : 'Familles Périphériques'}
                </span>

                <div className="flex flex-col items-center gap-3 w-full">
                  <TreeNodeCircle
                    id="entree"
                    title={data['entree'].title}
                    emoji={data['entree'].emoji}
                    size="sub"
                    colorTheme="sky"
                    isCompleted={isDone('entree')}
                    onClick={onSelectNode}
                  />
                  <TreeNodeCircle
                    id="sortie"
                    title={data['sortie'].title}
                    emoji={data['sortie'].emoji}
                    size="sub"
                    colorTheme="orange"
                    isCompleted={isDone('sortie')}
                    onClick={onSelectNode}
                  />
                  <TreeNodeCircle
                    id="stockage-comm"
                    title={data['stockage-comm'].title}
                    emoji={data['stockage-comm'].emoji}
                    size="sub"
                    colorTheme="emerald"
                    isCompleted={isDone('stockage-comm')}
                    onClick={onSelectNode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
