"use client";

import React from "react";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9FFF8]/90 dark:bg-[#10121A]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-white/90 px-8 py-7 shadow-xl ring-1 ring-mint/50 dark:bg-[#171925] dark:ring-mint/30">
        {/* 아이콘 영역 */}
        <div className="relative flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lemon/90 text-4xl animate-lemonFloat">🍋</div>
          <div className="absolute h-16 w-16 rounded-2xl animate-lemonGlow" />
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-semibold tracking-[0.18em] text-navyDeep/60 dark:text-white/60">LOADING</p>
          <p className="text-base font-semibold text-navyDeep dark:text-white">오늘의 할 일 불러오는 중이에요...🍃</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
