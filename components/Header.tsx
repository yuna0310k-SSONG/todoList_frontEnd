"use client";

import ThemeToggle from "./ThemeToggle";
import { Theme } from "../hooks/useTheme";

type Props = {
  theme: Theme;
  onToggle: () => void;
};

export default function Header({ theme, onToggle }: Props) {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold drop-shadow-sm"> Todo-List 🍋</h1>
        <span className="text-sm opacity-70">Fresh day, fresh mind 🌿</span>
      </div>

      <ThemeToggle theme={theme} onToggle={onToggle} />
    </header>
  );
}
