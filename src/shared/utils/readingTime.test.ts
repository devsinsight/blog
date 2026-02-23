import { readingTime } from "./readingTime";

describe("readingTime", () => {
  it("returns zero for empty text", () => {
    expect(readingTime("")).toEqual({ minutes: 0, words: 0 });
  });

  it("computes minutes rounding up with minimum 1", () => {
    const text = "word ".repeat(50); // 50 words -> 1 minute (min bound)
    expect(readingTime(text)).toEqual({ minutes: 1, words: 50 });
  });

  it("computes minutes based on 200 wpm", () => {
    const words = 420; // 420 / 200 = 2.1 -> 3 minutes
    const text = "word ".repeat(words);
    expect(readingTime(text)).toEqual({ minutes: 3, words });
  });
});
