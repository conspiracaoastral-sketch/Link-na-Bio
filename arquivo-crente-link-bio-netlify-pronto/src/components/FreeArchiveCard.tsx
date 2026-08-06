import React from 'react';
import { APP_CONFIG } from '../data/config';

export const FreeArchiveCard: React.FC = () => {
  return (
    <section className="px-4 my-6">
      <div className="p-5 sm:p-6 rounded-2xl bg-[#101114] border border-[#C89B2C]/30 shadow-xl relative overflow-hidden">
        {/* Category Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold tracking-widest text-[#F0A500] uppercase font-serif-title">
            MATERIAIS GRATUITOS
          </span>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-5">
          {/* Google Drive Official Icon Container */}
          <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#0A101A] border border-[#C89B2C]/30 rounded-xl p-1.5">
            <img
              src="https://drive.google.com/thumbnail?id=1e7c4XuXLrRWMvwkVN6lr0OV0FQgEGdeS&sz=w1000"
              alt="Google Drive"
              className="max-w-full max-h-full w-auto h-auto object-contain object-center"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-[#F5F2E8] mb-1.5 font-serif-title">
              Acervo Arquivo Crente
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed">
              Acesse slides, rascunhos e materiais digitais organizados para professores e alunos da Escola Bíblica Dominical.
            </p>
          </div>
        </div>

        {/* Button */}
        <a
          href={APP_CONFIG.links.googleDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-5 rounded-xl bg-[#0A101A] hover:bg-[#141b28] border border-[#C89B2C] text-[#F0A500] hover:text-[#F5F2E8] font-bold text-xs sm:text-sm tracking-wider uppercase text-center block shadow-md transition-all duration-200 active:scale-98"
        >
          ABRIR PASTA DE MATERIAIS
        </a>
      </div>
    </section>
  );
};
