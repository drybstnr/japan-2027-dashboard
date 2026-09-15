'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export function useLocalStorageState<T>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored) as T);
    } catch {
      // Keep the in-memory default when storage is unavailable or malformed.
    } finally {
      hydrated.current = true;
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Persistence is best effort; the React state remains authoritative.
    }
  }, [key, value]);

  return [value, setValue];
}
