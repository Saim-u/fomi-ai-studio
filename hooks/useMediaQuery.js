'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor matchMedia queries with SSR safety.
 *
 * @param {string} query - CSS media query string (e.g. '(min-width: 1024px)')
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event) => {
      setMatches(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Returns true if viewport is mobile (<768px).
 * @returns {boolean}
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Returns true if viewport is tablet (768px - 1023px).
 * @returns {boolean}
 */
export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

/**
 * Returns true if viewport is desktop (>= 1024px).
 * @returns {boolean}
 */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
