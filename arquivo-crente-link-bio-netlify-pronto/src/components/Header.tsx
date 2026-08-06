import React from 'react';
import { Share2 } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

interface HeaderProps {
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowToast }) => {
  const handleShare = async () => {
    const shareData = {
      title: 'ARQUIVO CRENTE',
      text: APP_CONFIG.header.descricao,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyUrl();
        }
      }
    } else {
      copyUrl();
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    onShowToast('Link copiado.');
  };

  return (
    <header className="flex flex-col items-center text-center pt-8 pb-6 px-4">
      {/* Avatar Oficial */}
      <div className="relative mb-5">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#C89B2C] shadow-[0_0_28px_rgba(240,165,0,0.30)] bg-black">
          <img
            src="https://drive.google.com/thumbnail?id=1TL7JlwZ4AsrIq-dv4ReA-wptIuOGtiYN&sz=w1000"
            alt="Arquivo Crente"
            className="block w-full h-full object-cover object-center rounded-full"
            width={144}
            height={144}
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>

      {/* Selo */}
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#101114] border border-[#C89B2C]/30 text-[#C89B2C] text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-3 shadow-inner">
        {APP_CONFIG.header.selo}
      </div>

      {/* Nome */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F5F2E8] mb-3 font-serif-title uppercase">
        {APP_CONFIG.header.nome}
      </h1>

      {/* Descrição */}
      <p className="text-sm sm:text-base text-[#A7A7A7] max-w-lg leading-relaxed font-normal mb-5">
        {APP_CONFIG.header.descricao}
      </p>

      {/* Botão Compartilhar */}
      <button
        onClick={handleShare}
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#101114] hover:bg-[#181a20] border border-[#C89B2C]/30 text-[#A7A7A7] hover:text-[#F5F2E8] text-xs font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C89B2C]/50 cursor-pointer"
        aria-label="Compartilhar página"
      >
        <Share2 className="w-3.5 h-3.5 text-[#C89B2C]" />
        <span>{APP_CONFIG.header.shareButtonText}</span>
      </button>
    </header>
  );
};