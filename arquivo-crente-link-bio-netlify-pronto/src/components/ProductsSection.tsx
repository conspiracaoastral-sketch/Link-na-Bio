import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../data/config';

export const ProductsSection: React.FC = () => {
  return (
    <section className="px-4 my-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101114] border border-[#C89B2C]/30 text-[#C89B2C] text-[11px] font-semibold tracking-widest uppercase mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>PRODUTOS DIGITAIS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#F5F2E8] font-serif-title uppercase tracking-tight mb-2">
          BIBLIOTECA ARQUIVO CRENTE
        </h2>
        <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-md mx-auto leading-relaxed">
          Recursos digitais para fortalecer sua fé, sua família e seu ensino da Palavra.
        </p>
      </div>

      {/* Products List */}
      <div className="flex flex-col gap-5">
        {APP_CONFIG.products.map((product) => (
          <div
            key={product.id}
            className="p-5 rounded-2xl bg-[#101114] border border-[#C89B2C]/25 hover:border-[#C89B2C]/50 shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch"
          >
            {/* Product Cover Image Container */}
            <div className="w-full sm:w-36 aspect-[3/4] rounded-xl bg-[#0A101A] border border-[#C89B2C]/30 flex items-center justify-center p-1.5 shrink-0 relative overflow-hidden shadow-md">
              {product.coverImage ? (
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="w-full h-full object-contain object-center rounded-lg"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <BookOpen className="w-6 h-6 text-[#C89B2C] mb-1" />
                  <span className="text-[10px] font-bold text-[#C89B2C] font-serif-title uppercase">
                    {product.title}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#F5F2E8] mb-2 font-serif-title leading-snug">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed mb-4">
                  {product.description}
                </p>
              </div>

              {/* Action Button */}
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#0A101A] hover:bg-[#151f30] border border-[#C89B2C]/60 text-[#F5F2E8] hover:text-[#F0A500] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 active:scale-98"
              >
                <span>{product.buttonText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C89B2C]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
