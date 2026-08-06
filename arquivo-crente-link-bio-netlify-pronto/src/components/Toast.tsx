import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#101114] border border-[#C89B2C]/40 text-[#F5F2E8] shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C89B2C]/20 text-[#C89B2C]">
        <Check className="w-3.5 h-3.5" />
      </div>
      <span>{message}</span>
    </div>
  );
};
