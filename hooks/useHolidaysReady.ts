"use client";

import { useEffect, useState } from "react";
import Holidays from "date-holidays";

export function useHolidaysReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const hd = new Holidays("KR");
      hd.getHolidays(new Date().getFullYear());
      const id = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(id);
    } catch {
      const id2 = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(id2);
    }
  }, []);

  return ready;
}
