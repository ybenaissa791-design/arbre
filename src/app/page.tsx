'use client';

import React, { useState, useEffect } from 'react';
import { CONTENT_FR, CONTENT_AR, Language, UI_TEXT } from '@/data/translations';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { InteractiveTree } from '@/components/tree/InteractiveTree';
import { LessonModal } from '@/components/lesson/LessonModal';
import { sounds } from '@/utils/audio';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('fr');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);

  const isAr = lang === 'ar';
  const data = isAr ? CONTENT_AR : CONTENT_FR;
  const t = UI_TEXT[lang];

  // Load state from localStorage if available
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('rp_lang') as Language;
      if (savedLang && (savedLang === 'fr' || savedLang === 'ar')) {
        setLang(savedLang);
      }
      const savedCompleted = localStorage.getItem('rp_completed_nodes');
      if (savedCompleted) {
        setCompletedNodes(JSON.parse(savedCompleted));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'fr' ? 'ar' : 'fr';
    setLang(nextLang);
    try {
      localStorage.setItem('rp_lang', nextLang);
    } catch {
      // Ignore
    }
  };

  const handleSelectNode = (id: string) => {
    setSelectedNodeId(id);
  };

  const handleCloseModal = () => {
    setSelectedNodeId(null);
  };

  const handleLessonComplete = (nodeId: string) => {
    if (!completedNodes.includes(nodeId)) {
      const updated = [...completedNodes, nodeId];
      setCompletedNodes(updated);
      try {
        localStorage.setItem('rp_completed_nodes', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const currentNode = selectedNodeId ? data[selectedNodeId] : null;

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-gradient-to-b from-sky-50/50 via-slate-50 to-emerald-50/40" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Navbar */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        completedCount={completedNodes.length}
        totalCount={Object.keys(data).length}
      />

      {/* Main Spacious Tree View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8">
        {/* Child-friendly banner with very little text */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black mb-3 shadow-xs border border-emerald-300 animate-pulse">
            <span>✨ {t.treeHint} ✨</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
            {t.siteTitle}
          </h2>
        </div>

        {/* The Spacious Binary / Concept Tree */}
        <InteractiveTree
          lang={lang}
          onSelectNode={handleSelectNode}
          completedNodes={completedNodes}
        />
      </main>

      {/* Footer with Red Phoenix Club ENSAO Branding */}
      <Footer lang={lang} />

      {/* Fullscreen Lesson Modal (When a circle is clicked) */}
      {currentNode && (
        <LessonModal
          node={currentNode}
          lang={lang}
          onClose={handleCloseModal}
          onLessonComplete={handleLessonComplete}
          onToggleLang={handleToggleLang}
          isCompleted={completedNodes.includes(currentNode.id)}
        />
      )}
    </div>
  );
}
