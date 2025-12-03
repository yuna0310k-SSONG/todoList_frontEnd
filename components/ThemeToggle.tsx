"use client";

import { Theme } from "../hooks/useTheme";

type Props = {
  theme: Theme;
  onToggle: () => void;
};

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="
        px-4 py-2 rounded-full text-sm transition
        bg-white text-gray-900 border border-gray-200 shadow-sm
        hover:bg-gray-50
        dark:bg-[#1a1a1a] dark:text-white dark:border-[#2a2a2a] dark:hover:bg-[#222]
      "
    >
      <span suppressHydrationWarning>{"☀️ Light"}</span>
    </button>
  );
}
