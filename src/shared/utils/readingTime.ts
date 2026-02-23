const WORDS_PER_MINUTE = 200;

export type ReadingTime = {
  minutes: number;
  words: number;
};

export function readingTime(text: string): ReadingTime {
  if (!text) return { minutes: 0, words: 0 };

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return { minutes, words };
}
