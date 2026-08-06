import React, { useEffect, useState } from 'react';
import { X, Youtube, Heart, QrCode, Copy, Check, ExternalLink, ShieldAlert } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [copiedPix, setCopiedPix] = useState(false);

  // Lock body scroll and register Escape listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(APP_CONFIG.pix.chave);
    setCopiedPix(true);
    onShowToast('Chave copiada.');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-lg max-h-[90vh] bg-[#101114] border border-[#C89B2C]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#F5F2E8] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#C89B2C]/20 bg-[#0A101A]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#F0A500] fill-[#F0A500]/20" />
            <h2 id="modal-title" className="text-base sm:text-lg font-bold font-serif-title uppercase tracking-wide text-[#F5F2E8]">
              Formas de Apoio
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-[#A7A7A7] hover:text-[#F5F2E8] hover:bg-[#101114] border border-transparent hover:border-[#C89B2C]/30 transition-all cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Area - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* 1. Membro do Canal */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0A101A] border border-[#C89B2C]/20 relative">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F0A500] uppercase tracking-wider mb-2">
              <Youtube className="w-4 h-4 text-[#F0A500]" />
              <span>1. Membro do Canal</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#F5F2E8] mb-1 font-serif-title">
              Seja membro do Arquivo Crente
            </h3>
            <p className="text-xs text-[#A7A7A7] leading-relaxed mb-4">
              Apoie mensalmente pelo YouTube e tenha acesso aos benefícios disponíveis para membros.
            </p>
            <a
              href={APP_CONFIG.links.youtubeJoin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-[#C89B2C] hover:bg-[#F0A500] text-[#050505] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>QUERO SER MEMBRO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 2. Apoia.se */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0A101A] border border-[#C89B2C]/20 relative">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F0A500] uppercase tracking-wider mb-2">
              <Heart className="w-4 h-4 text-[#F0A500]" />
              <span>2. Apoia.se</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#F5F2E8] mb-1 font-serif-title">
              Apoio recorrente pelo Apoia.se
            </h3>
            <p className="text-xs text-[#A7A7A7] leading-relaxed mb-4">
              Escolha um valor mensal e contribua para a continuidade do projeto.
            </p>
            <a
              href={APP_CONFIG.links.apoiase}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-[#8E691A] hover:bg-[#A3791E] text-[#F5F2E8] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-[#C89B2C]/40 transition-all active:scale-98"
            >
              <span>APOIAR PELO APOIA.SE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3. Pix */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#0A101A] border border-[#C89B2C]/30 relative">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F0A500] uppercase tracking-wider mb-2">
              <QrCode className="w-4 h-4 text-[#F0A500]" />
              <span>3. Contribuição direta por Pix</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#F5F2E8] mb-3 font-serif-title">
              Contribuição direta por Pix
            </h3>

            {/* White Area for QR Pix */}
            <div className="w-[220px] h-[220px] mx-auto bg-white p-3 border-2 border-[#C89B2C] rounded-xl flex items-center justify-center mb-4">
              <img
                src="https://drive.google.com/thumbnail?id=1Yu97t-_rvHNuF53kxusQ-0gG0wBAJr6V&sz=w1000"
                alt="QR Code Pix"
                className="w-full h-full object-contain block bg-white"
                width={220}
                height={220}
              />
            </div>

            {/* Pix Details */}
            <div className="space-y-2 mb-4 text-xs bg-[#101114] p-3 rounded-lg border border-[#C89B2C]/15">
              <div className="flex justify-between items-center pb-1.5 border-b border-[#C89B2C]/10">
                <span className="text-[#A7A7A7]">Tipo de Chave:</span>
                <span className="font-semibold text-[#F5F2E8]">{APP_CONFIG.pix.tipo}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-[#C89B2C]/10">
                <span className="text-[#A7A7A7]">Chave Pix:</span>
                <span className="font-mono font-semibold text-[#F0A500] select-all">{APP_CONFIG.pix.chave}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A7A7A7]">Favorecido:</span>
                <span className="font-semibold text-[#F5F2E8] text-right">{APP_CONFIG.pix.favorecido}</span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyPix}
              type="button"
              className="w-full py-2.5 px-4 rounded-lg bg-[#C89B2C] hover:bg-[#F0A500] text-[#050505] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer mb-3"
            >
              {copiedPix ? (
                <>
                  <Check className="w-4 h-4 text-[#050505]" />
                  <span>Chave copiada.</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#050505]" />
                  <span>COPIAR CHAVE PIX</span>
                </>
              )}
            </button>

            {/* Safety Disclaimer */}
            <div className="flex items-start gap-2 text-[11px] text-[#A7A7A7] bg-[#101114]/80 p-2.5 rounded-lg border border-[#C89B2C]/10">
              <ShieldAlert className="w-4 h-4 text-[#F0A500] shrink-0 mt-0.5" />
              <span>{APP_CONFIG.pix.disclaimer}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#C89B2C]/20 bg-[#0A101A] text-center">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2 rounded-lg bg-[#101114] hover:bg-[#181a20] border border-[#C89B2C]/30 text-[#A7A7A7] hover:text-[#F5F2E8] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
