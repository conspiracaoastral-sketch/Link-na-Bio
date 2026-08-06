import React from 'react';
import { Youtube, MessageCircle, Heart, Folder } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-8 pb-12 px-4 border-t border-[#C89B2C]/20 text-center bg-[#050505]">
      {/* Footer Social & Link Icons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <a
          href={APP_CONFIG.links.youtubeChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-[#101114] border border-[#C89B2C]/30 text-[#A7A7A7] hover:text-[#F0A500] hover:border-[#C89B2C] transition-all hover:scale-110 active:scale-95"
          aria-label="Canal no YouTube"
          title="YouTube"
        >
          <Youtube className="w-5 h-5" />
        </a>
        <a
          href={APP_CONFIG.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-[#101114] border border-[#25D366]/30 text-[#A7A7A7] hover:text-[#25D366] hover:border-[#25D366] transition-all hover:scale-110 active:scale-95"
          aria-label="Grupo no WhatsApp"
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href={APP_CONFIG.links.apoiase}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-[#101114] border border-[#C89B2C]/30 text-[#A7A7A7] hover:text-[#F0A500] hover:border-[#C89B2C] transition-all hover:scale-110 active:scale-95"
          aria-label="Apoia.se"
          title="Apoia.se"
        >
          <Heart className="w-5 h-5" />
        </a>
        <a
          href={APP_CONFIG.links.googleDrive}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-[#101114] border border-[#C89B2C]/30 text-[#A7A7A7] hover:text-[#F0A500] hover:border-[#C89B2C] transition-all hover:scale-110 active:scale-95"
          aria-label="Pasta de Materiais no Google Drive"
          title="Google Drive"
        >
          <Folder className="w-5 h-5" />
        </a>
      </div>

      {/* Slogan */}
      <p className="text-xs sm:text-sm text-[#A7A7A7] font-serif italic max-w-md mx-auto mb-4 leading-relaxed">
        {APP_CONFIG.footerText}
      </p>

      {/* Copyright */}
      <p className="text-[11px] text-[#A7A7A7]/60 tracking-wider uppercase">
        {APP_CONFIG.copyright}
      </p>
    </footer>
  );
};
