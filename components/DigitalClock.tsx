"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function DigitalClock() {
  const [time, setTime] = useState(dayjs());
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      setTime(now);
      setDate(now);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex justify-center">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-lemon/80 px-6 py-4 shadow-lemonSoft backdrop-blur-sm">
          <div className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-navyDeep/80">TODAY</div>
          <div className="flex items-end gap-2 font-display text-navyDeep">
            <span className="text-4xl font-bold tabular-nums" suppressHydrationWarning>
              {time.format("HH:mm:ss")}
            </span>
          </div>
          <div className="text-xs text-navyDeep/70" suppressHydrationWarning>
            {date.format("YYYY.MM.DD (ddd)")}
          </div>
          <div className="mt-1 h-1 w-20 rounded-full bg-mint/80" />
        </div>
      </div>
    </section>
  );
}
