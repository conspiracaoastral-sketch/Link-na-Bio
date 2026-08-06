import React from 'react';
import { Youtube, MessageCircle, Heart } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

interface MainActionsProps {
  onOpenSupportModal: () => void;
  latestVideoLink?: string;
}

export const MainActions: React.FC<MainActionsProps> = ({ onOpenSupportModal, latestVideoLink }) => {
  return (
    <section className="px-4 my-6 flex flex-col gap-3.5">
      {/* 1. Botão Dourado */}
      <a
        href={latestVideoLink || APP_CONFIG.links.youtubeVideos}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#C89B2C] via-[#F0A500] to-[#C89B2C] text-[#050505] font-bold text-sm sm:text-base tracking-wider uppercase text-center flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(200,155,44,0.25)] hover:shadow-[0_6px_25px_rgba(240,165,0,0.35)] hover:brightness-105 active:scale-[0.98] transition-all duration-200"
      >
        <Youtube className="w-5 h-5 text-[#050505] shrink-0" />
        <span>ASSISTIR AO ÚLTIMO VÍDEO</span>
      </a>

      {/* 2. Botão Verde */}
      <a
        href={APP_CONFIG.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-4 px-6 rounded-xl bg-[#25D366] text-[#050505] font-bold text-sm sm:text-base tracking-wider uppercase text-center flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.35)] hover:bg-[#22c35e] active:scale-[0.98] transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5 text-[#050505] shrink-0" />
        <span>COMUNIDADE ARQUIVO CRENTE</span>
      </a>

      {/* 3. Botão Dourado Escuro */}
      <button
        onClick={onOpenSupportModal}
        type="button"
        className="w-full py-4 px-6 rounded-xl bg-[#8E691A] hover:bg-[#A3791E] text-[#F5F2E8] font-bold text-sm sm:text-base tracking-wider uppercase text-center flex items-center justify-center gap-3 border border-[#C89B2C]/40 shadow-[0_4px_20px_rgba(142,105,26,0.3)] hover:shadow-[0_6px_25px_rgba(200,155,44,0.3)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        <Heart className="w-5 h-5 text-[#F0A500] shrink-0 fill-[#F0A500]/20" />
        <span>APOIE ESTE MINISTÉRIO</span>
      </button>
    </section>
  );
};
