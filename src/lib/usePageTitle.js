import { useEffect } from 'react';

const BASE_TITLE = 'World Cup Hub — FIFA History';

/** Sync the document title to the current page; restores the default on unmount. */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — World Cup Hub` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
