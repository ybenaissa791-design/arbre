'use client';

import React from 'react';
import { Language, UI_TEXT } from '@/data/translations';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC<{ lang?: Language }> = ({ lang = 'fr' }) => {
  const isAr = lang === 'ar';
  const t = UI_TEXT[lang];

  return (
    <footer className="mt-16 bg-gradient-to-b from-slate-900 to-black text-white border-t-4 border-red-600 shadow-2xl relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-xs" />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Club Info & Logo */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
            <div className="relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-red-500 shadow-lg bg-slate-900 p-1 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpeg"
                  alt="Logo Club Red Phoenix ENSAO"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-black uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.clubName}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {t.clubFooter}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mt-1 font-medium">
                {t.schoolNote}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>{isAr ? 'صُنِع بـ' : 'Fait avec'}</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline mx-0.5" />
            <span>{isAr ? 'من أجل أطفالنا وأبطال الغد' : 'pour nos enfants'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
