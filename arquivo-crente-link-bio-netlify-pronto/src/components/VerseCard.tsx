import React, { useMemo } from 'react';
import { BookMarked, Copy, Quote } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

interface VerseCardProps {
  onShowToast: (msg: string) => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({ onShowToast }) => {
  const dailyMeditation = useMemo(() => {
    const list = APP_CONFIG.meditations;
    const now = new Date();
    // Calculate day of year
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = Math.abs(dayOfYear) % list.length;
    return list[index];
  }, []);

  const handleCopy = () => {
    const textToCopy = `"${dailyMeditation.verse}" — ${dailyMeditation.reference}\n\nMeditação: ${dailyMeditation.meditation}\n\n— Arquivo Crente`;
    navigator.clipboard.writeText(textToCopy);
    onShowToast('Meditação copiada!');
  };

  return (
    <section className="px-4 my-6">
      <div className="p-5 sm:p-6 rounded-2xl bg-[#101114] border border-[#C89B2C]/30 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C89B2C]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-[#C89B2C]/15 text-[#C89B2C]">
            <BookMarked className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold tracking-widest text-[#C89B2C] uppercase font-serif-title">
            VERSÍCULO & MEDITAÇÃO
          </span>
        </div>

        {/* Biblical Verse */}
        <div className="relative pl-4 border-l-2 border-[#C89B2C] mb-4">
          <p className="text-base sm:text-lg font-serif italic text-[#F5F2E8] leading-relaxed">
            "{dailyMeditation.verse}"
          </p>
          <span className="inline-block text-xs font-bold text-[#F0A500] uppercase tracking-wider mt-2">
            {dailyMeditation.reference}
          </span>
        </div>

        {/* Authorial Meditation */}
        <div className="p-3.5 rounded-xl bg-[#0A101A] border border-[#C89B2C]/15 mb-5 text-xs sm:text-sm text-[#A7A7A7] leading-relaxed">
          <div className="flex items-center gap-1.5 text-[#C89B2C] font-semibold text-xs mb-1">
            <Quote className="w-3.5 h-3.5 rotate-180" />
            <span>Reflexão Diária</span>
          </div>
          <p>{dailyMeditation.meditation}</p>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          type="button"
          className="w-full py-2.5 px-4 rounded-lg bg-[#0A101A] hover:bg-[#101826] border border-[#C89B2C]/40 text-[#C89B2C] hover:text-[#F0A500] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>COPIAR MEDITAÇÃO</span>
        </button>
      </div>
    </section>
  );
};
