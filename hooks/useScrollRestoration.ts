'use client';

import { useEffect, useRef } from 'react';

export function useScrollRestoration(key = 'japan2027-scroll') {
  const restored = useRef(false);

  useEffect(() => {
    const restore = () => {
      if (restored.current) return;
      const stored = window.localStorage.getItem(key);
      const position = stored ? Number(stored) : 0;
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: Number.isFinite(position) ? position : 0, behavior: 'auto' });
        restored.current = true;
      });
    };
    const save = () => window.localStorage.setItem(key, String(window.scrollY));
    restore();
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('load', restore);
    return () => { save(); window.removeEventListener('scroll', save); window.removeEventListener('load', restore); };
  }, [key]);
}
