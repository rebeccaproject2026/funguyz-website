import React from 'react';

export function MushroomLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-[#ff4fa3]/20 border-t-[#ff4fa3] animate-spin"></div>
        <span className="text-4xl absolute animate-pulse drop-shadow-sm">🍄</span>
      </div>
    </div>
  );
}
