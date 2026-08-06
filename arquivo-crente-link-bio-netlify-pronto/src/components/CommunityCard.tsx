import React from 'react';
import { APP_CONFIG } from '../data/config';

export const CommunityCard: React.FC = () => {
  return (
    <section className="px-4 my-6">
      <div className="p-5 sm:p-6 rounded-2xl bg-[#101114] border border-[#25D366]/30 shadow-xl relative overflow-hidden">
        {/* Category Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold tracking-widest text-[#25D366] uppercase font-serif-title">
            COMUNIDADE
          </span>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-5">
          {/* WhatsApp Official Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#0A101A] border border-[#25D366]/30 flex items-center justify-center p-1.5 shrink-0">
            <img
              src="https://drive.google.com/thumbnail?id=1HhiftFnmT95tZySGVsMgCSoVgCLvpfmr&sz=w1000"
              alt="WhatsApp"
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-[#F5F2E8] mb-1.5 font-serif-title">
              Comunidade Arquivo Crente
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed">
              Entre no grupo e receba rascunhos, materiais gratuitos e avisos das novas aulas de Escola Bíblica Dominical.
            </p>
          </div>
        </div>

        {/* Button */}
        <a
          href={APP_CONFIG.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#050505] font-bold text-xs sm:text-sm tracking-wider uppercase text-center block shadow-[0_4px_18px_rgba(37,211,102,0.25)] transition-all duration-200 active:scale-98"
        >
          ENTRAR NO WHATSAPP
        </a>
      </div>
    </section>
  );
};
