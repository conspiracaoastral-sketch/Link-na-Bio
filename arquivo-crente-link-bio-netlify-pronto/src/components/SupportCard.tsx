import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

interface SupportCardProps {
  onOpenModal: () => void;
}

export const SupportCard: React.FC<SupportCardProps> = ({ onOpenModal }) => {
  return (
    <section className="px-4 my-8">
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#101114] to-[#0A101A] border border-[#C89B2C]/40 shadow-2xl text-center relative overflow-hidden">
        {/* Top Icon */}
        <div className="w-12 h-12 mx-auto rounded-full bg-[#C89B2C]/15 border border-[#C89B2C] flex items-center justify-center text-[#F0A500] mb-3 shadow-lg">
          <Heart className="w-6 h-6 fill-[#F0A500]/20" />
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-[#F5F2E8] mb-2 font-serif-title uppercase tracking-wide">
          Apoie este ministério
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-md mx-auto leading-relaxed mb-6">
          Ajude o Arquivo Crente a continuar produzindo estudos profundos, aulas de EBD e materiais gratuitos.
        </p>

        {/* Button */}
        <button
          onClick={onOpenModal}
          type="button"
          className="w-full py-3.5 px-6 rounded-xl bg-[#8E691A] hover:bg-[#A3791E] text-[#F5F2E8] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border border-[#C89B2C]/50 shadow-[0_4px_18px_rgba(142,105,26,0.3)] transition-all duration-200 cursor-pointer active:scale-98"
        >
          <ShieldCheck className="w-4 h-4 text-[#F0A500]" />
          <span>VER FORMAS DE APOIO</span>
        </button>
      </div>
    </section>
  );
};
