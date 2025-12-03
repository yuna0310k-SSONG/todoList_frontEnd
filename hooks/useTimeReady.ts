"use client";

import { useEffect, useState } from "react";

export function useTimeReady(delayMs: number = 200) {
  const [timeReady, setTimeReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setTimeReady(true), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);

  return timeReady;
}
