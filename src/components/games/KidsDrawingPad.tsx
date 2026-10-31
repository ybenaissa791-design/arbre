'use client';

import React, { useRef, useState, useEffect } from 'react';
import { sounds } from '@/utils/audio';
import { Language } from '@/data/translations';
import { RotateCcw, Palette, Sparkles, Download, Eraser } from 'lucide-react';

export const KidsDrawingPad: React.FC<{ lang?: Language }> = ({ lang = 'fr' }) => {
  const isAr = lang === 'ar';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#3b82f6');
  const [lineWidth, setLineWidth] = useState<number>(8);
  const [isEraser, setIsEraser] = useState<boolean>(false);

  const colors = [
    '#ef4444', // Red
    '#f97316', // Orange
    '#facc15', // Yellow
    '#22c55e', // Green
    '#06b6d4', // Cyan
    '#3b82f6', // Blue
    '#a855f7', // Purple
    '#ec4899', // Pink
    '#1e293b', // Slate dark
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#ffffff' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    sounds.playWhoosh();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4 sm:p-6 rounded-3xl border-4 border-pink-300 shadow-xl"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-2xl shadow-md">
            🎨
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base sm:text-lg">
              {isAr ? 'ورشة الرسم والتلوين السحرية (Paint)' : 'Atelier de Dessin Magique (Paint)'}
            </h4>
            <p className="text-xs text-slate-500 font-semibold">
              {isAr ? 'جرّب بنفسك كيف تعمل برامج الرسم على الحاسوب !' : 'Découvre comment fonctionne un vrai logiciel d\'application de dessin !'}
            </p>
          </div>
        </div>

        {/* Tools Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playPop();
              setIsEraser(!isEraser);
            }}
            className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black transition-all flex items-center gap-1.5 shadow-xs ${
              isEraser
                ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>{isAr ? 'ممحاة' : 'Gomme'}</span>
          </button>

          <button
            onClick={clearCanvas}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 text-xs font-black transition-all shadow-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? 'مسح اللوحة' : 'Effacer tout'}</span>
          </button>
        </div>
      </div>

      {/* Colors palette */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => {
              sounds.playPop();
              setColor(c);
              setIsEraser(false);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-transform shadow-xs ${
              !isEraser && color === c
                ? 'scale-125 border-slate-950 ring-2 ring-pink-400'
                : 'border-white hover:scale-110'
            }`}
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}

        <div className="flex items-center gap-1.5 ml-auto text-xs font-bold text-slate-600">
          <span>{isAr ? 'سُمك القلم' : 'Taille :'}</span>
          <button
            onClick={() => setLineWidth(4)}
            className={`px-2 py-0.5 rounded-lg border ${lineWidth === 4 ? 'bg-pink-500 text-white font-black' : 'bg-white'}`}
          >
            {isAr ? 'رفيع' : 'Fin'}
          </button>
          <button
            onClick={() => setLineWidth(10)}
            className={`px-2 py-0.5 rounded-lg border ${lineWidth === 10 ? 'bg-pink-500 text-white font-black' : 'bg-white'}`}
          >
            {isAr ? 'متوسط' : 'Moyen'}
          </button>
          <button
            onClick={() => setLineWidth(18)}
            className={`px-2 py-0.5 rounded-lg border ${lineWidth === 18 ? 'bg-pink-500 text-white font-black' : 'bg-white'}`}
          >
            {isAr ? 'عريض' : 'Épais'}
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative rounded-2xl overflow-hidden border-3 border-pink-300 bg-white shadow-inner cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="w-full h-64 sm:h-80 touch-none block"
        />
      </div>
    </div>
  );
};
