"use client";

import { useRef } from "react";
import type { FormEvent } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (inputRef.current?.value || "").trim();
    if (!value) return;
    onAdd(value);
    if (inputRef.current) inputRef.current.value = "";
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="
          flex-1 px-3 py-2 rounded-xl transition-colors
          bg-white border border-gray-300 text-gray-900
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300
          shadow-[0_3px_10px_rgba(0,0,0,0.07)]
          dark:bg-[#111] dark:border-[#2a2a2a] dark:text-white dark:placeholder:text-gray-500
        "
        placeholder="오늘 할 일을 적어봐요... 🍋"
      />
      <button
        type="submit"
        className="
          px-4 py-2 rounded-xl transition
          bg-gray-900 text-white font-medium shadow-sm hover:bg-black
          active:scale-95
          dark:bg-white dark:text-black dark:hover:bg-gray-200
        "
      >
        + Add
      </button>
    </form>
  );
}
