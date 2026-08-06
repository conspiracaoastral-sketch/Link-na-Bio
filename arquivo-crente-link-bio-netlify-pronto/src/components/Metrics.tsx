import React from 'react';
import { APP_CONFIG } from '../data/config';
import { YouTubeMetricsData } from '../types';

interface MetricsProps {
  metrics?: YouTubeMetricsData;
  isLoading?: boolean;
}

export const Metrics: React.FC<MetricsProps> = ({ metrics, isLoading }) => {
  const displayMetrics = [
    { value: metrics?.subscribers || APP_CONFIG.metrics[0].value, label: APP_CONFIG.metrics[0].label },
    { value: metrics?.videos || APP_CONFIG.metrics[1].value, label: APP_CONFIG.metrics[1].label },
    { value: APP_CONFIG.metrics[2].value, label: APP_CONFIG.metrics[2].label },
  ];

  return (
    <section className="px-4 my-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-4 rounded-xl bg-[#101114] border border-[#C89B2C]/20 shadow-lg">
        {displayMetrics.map((metric, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center text-center py-1 ${
              idx < displayMetrics.length - 1 ? 'border-r border-[#C89B2C]/15' : ''
            }`}
          >
            <span
              className={`text-base sm:text-xl md:text-2xl font-bold text-[#F0A500] font-serif-title tracking-tight transition-opacity ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {metric.value}
            </span>
            <span className="text-[10px] sm:text-xs text-[#A7A7A7] font-semibold tracking-wider uppercase mt-0.5">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
