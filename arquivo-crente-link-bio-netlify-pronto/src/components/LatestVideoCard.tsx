import React from 'react';
import { Play, Tv } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import { YouTubeVideoData } from '../types';

interface LatestVideoCardProps {
  latestVideo?: YouTubeVideoData;
  isLoading?: boolean;
}

export const LatestVideoCard: React.FC<LatestVideoCardProps> = ({ latestVideo, isLoading }) => {
  const videoUrl = latestVideo?.link || APP_CONFIG.links.youtubeVideos;

  return (
    <section className="px-4 my-6">
      <div className="p-6 sm:p-7 rounded-2xl bg-[#101114] border-2 border-[#C89B2C]/40 shadow-2xl relative overflow-hidden">
        {/* Category Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#C89B2C]/15 text-[#C89B2C]">
              <Tv className="w-4 h-4" />
            </div>
            <span className="text-xs font-extrabold tracking-widest text-[#C89B2C] uppercase font-serif-title">
              ÚLTIMO VÍDEO
            </span>
          </div>
          {isLoading && (
            <span className="text-[10px] text-[#A7A7A7] animate-pulse">
              Carregando...
            </span>
          )}
        </div>

        {/* Thumbnail Area */}
        <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-[#0A101A] via-[#101114] to-[#050505] border border-[#C89B2C]/25 flex flex-col items-center justify-center mb-5 relative group overflow-hidden shadow-inner">
          {latestVideo?.thumbnail ? (
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full block relative group">
              <img
                src={latestVideo.thumbnail}
                alt={latestVideo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#C89B2C]/90 border border-[#C89B2C] flex items-center justify-center text-[#050505] shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-5 h-5 ml-0.5 fill-[#050505]" />
                </div>
              </div>
              {latestVideo.duration && (
                <span className="absolute bottom-2 right-2 bg-black/85 text-[#F5F2E8] text-[10px] font-bold px-2 py-0.5 rounded border border-[#C89B2C]/30">
                  {latestVideo.duration}
                </span>
              )}
            </a>
          ) : (
            <>
              {/* Subtle gold line accent */}
              <div className="absolute inset-0 border border-[#C89B2C]/10 rounded-xl pointer-events-none" />
              
              <div className="w-12 h-12 rounded-full bg-[#C89B2C]/20 border border-[#C89B2C] flex items-center justify-center text-[#F0A500] mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="w-5 h-5 ml-0.5 fill-[#F0A500]" />
              </div>
              <span className="text-xs font-bold tracking-widest text-[#C89B2C] uppercase font-serif-title">
                ÚLTIMO VÍDEO
              </span>
              <span className="text-[10px] text-[#A7A7A7]/70 mt-1 uppercase tracking-wider">
                [Área reservada para thumbnail oficial]
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-[#F5F2E8] mb-2 font-serif-title leading-snug">
          {latestVideo?.title || 'Assista ao conteúdo mais recente do Arquivo Crente'}
        </h2>

        {/* Publication Date */}
        {latestVideo?.publishedAtFormatted && (
          <p className="text-[11px] text-[#C89B2C] font-semibold mb-2">
            Publicado em {latestVideo.publishedAtFormatted}
          </p>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed mb-6">
          {latestVideo?.description || 'Aulas profundas de Escola Bíblica Dominical, estudos bíblicos e aplicações práticas da Palavra de Deus.'}
        </p>

        {/* Button */}
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-5 rounded-xl bg-[#C89B2C] hover:bg-[#F0A500] text-[#050505] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[0_4px_18px_rgba(200,155,44,0.3)] transition-all duration-200 active:scale-98"
        >
          <Play className="w-4 h-4 fill-[#050505]" />
          <span>ASSISTIR AGORA</span>
        </a>
      </div>
    </section>
  );
};
