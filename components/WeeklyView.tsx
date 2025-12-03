"use client";
import { useMemo, useState, useEffect } from "react";
import Holidays from "date-holidays";

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  // Treat Monday as start (Mon=1 ... Sun=0)
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateMMDD(date: Date): string {
  const m = date.getMonth() + 1;
  const dd = date.getDate();
  return `${m}/${dd}`;
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatRangeLabel(start: Date): string {
  const end = addDays(start, 6);
  const sy = start.getFullYear();
  const sm = pad2(start.getMonth() + 1);
  const sd = pad2(start.getDate());
  const ey = end.getFullYear();
  const em = pad2(end.getMonth() + 1);
  const ed = pad2(end.getDate());
  return `${sy}/${sm}/${sd} - ${ey}/${em}/${ed}`;
}

type WeeklyViewProps = {
  selectedDate?: string;
  onSelectDate?: (isoDate: string) => void;
  todos?: { target_date?: string }[];
};

export default function WeeklyView({ selectedDate, onSelectDate, todos = [] }: WeeklyViewProps) {
  const [anchor, setAnchor] = useState<Date>(() => startOfWeek(new Date()));
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(anchor, i)), [anchor]);
  const [hd, setHd] = useState<Holidays | null>(null);

  useEffect(() => {
    try {
      const h = new Holidays("KR");
      setHd(h);
    } catch {
      setHd(null);
    }
  }, []);

  return (
    <section
      className="
        rounded-2xl p-5 transition-colors
        bg-white border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        dark:bg-[#0f0f10] dark:border-[#262626]
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Weekly View</h2>
        <div
          className="text-xs px-2 py-0.5 rounded-full border bg-gray-100 text-gray-700 border-gray-200 dark:bg-[#1a1a1a] dark:text-gray-200 dark:border-[#2a2a2a]"
          aria-label="Week range"
        >
          {formatRangeLabel(anchor)}
        </div>
      </div>

      <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))_auto] items-stretch gap-2 text-xs">
        {/* Prev button at far left of Monday */}
        <div className="flex items-center justify-center">
          <button
            className="h-full px-2 rounded-xl border bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 dark:bg-[#141414] dark:text-gray-200 dark:border-[#2a2a2a] dark:hover:bg-[#1a1a1a]"
            title="Previous week"
            onClick={() =>
              setAnchor((prev) => {
                const next = addDays(prev, -7);
                if (onSelectDate) setTimeout(() => onSelectDate(toIsoDate(next)), 0);
                return next;
              })
            }
          >
            ◀
          </button>
        </div>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
          const d = days[idx];
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const dd = String(d.getDate()).padStart(2, "0");
          const iso = `${y}-${m}-${dd}`;
          const count = todos.filter((t) => t.target_date === iso).length;
          const isSelected = selectedDate === iso;
          const isSaturday = d.getDay() === 6;
          const isSunday = d.getDay() === 0;
          const isHoliday = !!hd?.isHoliday(d) || isSunday;
          const selectedBg = "bg-[#fff3a1] dark:bg-[#1a1a1a]";
          // Change bordered cell to use full background color (blue/red) when not selected
          const unselectedBg = isHoliday ? "bg-[#ff5f54]" : isSaturday ? "bg-[#a1c5ff]" : "bg-gray-50 dark:bg-[#141414]";
          const borderClass = isHoliday ? "border-[#ff5f54]" : isSaturday ? "border-[#a1c5ff]" : "border-gray-200 dark:border-[#2a2a2a]";
          const dateTextClass = isSelected ? "text-[#7a5a00] dark:text-gray-200" : "opacity-90";
          const dayTextClass = isSelected ? "text-[#5c4a00] dark:text-gray-100" : "";
          return (
            <div
              key={day}
              className={`relative rounded-xl px-3 py-3 transition grid grid-rows-[auto_auto_auto_auto] grid-cols-1 place-items-center gap-1 shadow-sm ${
                isSelected ? selectedBg : unselectedBg
              } ${borderClass} border-[1.5px]`}
              onClick={() => {
                if (onSelectDate) setTimeout(() => onSelectDate(iso), 0);
              }}
            >
              {isSelected && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent select-none">
                  <span className="text-base">🍋</span>
                </div>
              )}
              {/* Date on top, day label below */}
              <div className={`text-[0.75rem] font-medium ${dateTextClass}`}>{formatDateMMDD(d)}</div>
              <div className={`text-[0.8rem] font-semibold ${dayTextClass}`}>{day}</div>
              <div className="text-[0.65rem] opacity-70">{count} tasks</div>
              <div className="h-1.5 w-8 rounded-full bg-gray-200 dark:bg-[#2a2a2a] overflow-hidden">
                <div className={`h-full ${count >= 1 ? "w-full bg-[#fff94f]" : "w-0 bg-gray-500"}`} />
              </div>
            </div>
          );
        })}
        {/* Next button at far right of Sunday */}
        <div className="flex items-center justify-center">
          <button
            className="h-full px-2 rounded-xl border bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 dark:bg-[#141414] dark:text-gray-200 dark:border-[#2a2a2a] dark:hover:bg-[#1a1a1a]"
            title="Next week"
            onClick={() =>
              setAnchor((prev) => {
                const next = addDays(prev, 7);
                if (onSelectDate) setTimeout(() => onSelectDate(toIsoDate(next)), 0);
                return next;
              })
            }
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
