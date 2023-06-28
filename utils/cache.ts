import createCache from '@emotion/cache';

export function createEmotionCache() {
  let insertionPoint;

  let isDocument = typeof document !== 'undefined';

  if (isDocument) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]');
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: 'mui-style', insertionPoint });
}
