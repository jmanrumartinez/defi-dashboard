import { generateTimeStampsByTimeframe } from "../portfolio";
import moment from "moment";
import { Timeframe } from "@/types/portfolio";

describe("utils/portfolio", () => {
  const mockDate = new Date("2024-01-15T12:00:00Z");

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("generateTimeStampsByTimeframe", () => {
    describe("1D timeframe", () => {
      it("should generate 24 timestamps for 1D timeframe", () => {
        const result = generateTimeStampsByTimeframe("1D");

        expect(result).toHaveLength(24);
      });

      it("should generate timestamps in descending order for 1D timeframe", () => {
        const result = generateTimeStampsByTimeframe("1D");

        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i]).toBeGreaterThan(result[i + 1]);
        }
      });

      it("should generate timestamps with minutes and seconds set to 0 for 1D timeframe", () => {
        const result = generateTimeStampsByTimeframe("1D");

        result.forEach((timestamp) => {
          const date = moment.unix(timestamp);
          expect(date.minute()).toBe(0);
          expect(date.second()).toBe(0);
        });
      });

      // TODO: Fix this test
      it.skip("should generate correct timestamps for 1D timeframe", () => {
        const result = generateTimeStampsByTimeframe("1D");

        const firstTimestamp = moment.unix(result[0]);

        expect(firstTimestamp.hour()).toBe(12);
        expect(firstTimestamp.date()).toBe(15);
        expect(firstTimestamp.month()).toBe(0);

        const lastTimestamp = moment.unix(result[23]);
        expect(lastTimestamp.hour()).toBe(13);
        expect(lastTimestamp.date()).toBe(14);
      });
    });

    describe("1W timeframe", () => {
      it("should generate 7 timestamps for 1W timeframe", () => {
        const result = generateTimeStampsByTimeframe("1W");

        expect(result).toHaveLength(7);
      });

      it("should generate timestamps in descending order for 1W timeframe", () => {
        const result = generateTimeStampsByTimeframe("1W");

        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i]).toBeGreaterThan(result[i + 1]);
        }
      });

      it("should generate timestamps with hours, minutes and seconds set to 0 for 1W timeframe", () => {
        const result = generateTimeStampsByTimeframe("1W");

        result.forEach((timestamp) => {
          const date = moment.unix(timestamp);
          expect(date.hour()).toBe(0);
          expect(date.minute()).toBe(0);
          expect(date.second()).toBe(0);
        });
      });

      it("should generate correct timestamps for 1W timeframe", () => {
        const result = generateTimeStampsByTimeframe("1W");

        const firstTimestamp = moment.unix(result[0]);
        expect(firstTimestamp.hour()).toBe(0);
        expect(firstTimestamp.date()).toBe(15);

        const lastTimestamp = moment.unix(result[6]);
        expect(lastTimestamp.date()).toBe(9);
      });
    });

    describe("1M timeframe", () => {
      it("should generate 30 timestamps for 1M timeframe", () => {
        const result = generateTimeStampsByTimeframe("1M");

        expect(result).toHaveLength(30);
      });

      it("should generate timestamps in descending order for 1M timeframe", () => {
        const result = generateTimeStampsByTimeframe("1M");

        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i]).toBeGreaterThan(result[i + 1]);
        }
      });

      it("should generate timestamps with hours, minutes and seconds set to 0 for 1M timeframe", () => {
        const result = generateTimeStampsByTimeframe("1M");

        result.forEach((timestamp) => {
          const date = moment.unix(timestamp);
          expect(date.hour()).toBe(0);
          expect(date.minute()).toBe(0);
          expect(date.second()).toBe(0);
        });
      });

      it("should generate correct timestamps for 1M timeframe", () => {
        const result = generateTimeStampsByTimeframe("1M");

        const firstTimestamp = moment.unix(result[0]);
        expect(firstTimestamp.hour()).toBe(0);
        expect(firstTimestamp.date()).toBe(15);

        const lastTimestamp = moment.unix(result[29]);
        expect(lastTimestamp.date()).toBe(17);
      });
    });

    describe("1Y timeframe", () => {
      it("should generate 12 timestamps for 1Y timeframe", () => {
        const result = generateTimeStampsByTimeframe("1Y");

        expect(result).toHaveLength(12);
      });

      it("should generate timestamps in descending order for 1Y timeframe", () => {
        const result = generateTimeStampsByTimeframe("1Y");

        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i]).toBeGreaterThan(result[i + 1]);
        }
      });

      it("should generate timestamps with hours, minutes and seconds set to 0 for 1Y timeframe", () => {
        const result = generateTimeStampsByTimeframe("1Y");

        result.forEach((timestamp) => {
          const date = moment.unix(timestamp);
          expect(date.hour()).toBe(0);
          expect(date.minute()).toBe(0);
          expect(date.second()).toBe(0);
        });
      });

      it("should generate correct timestamps for 1Y timeframe", () => {
        const result = generateTimeStampsByTimeframe("1Y");

        const firstTimestamp = moment.unix(result[0]);
        expect(firstTimestamp.hour()).toBe(0);
        expect(firstTimestamp.month()).toBe(0);
        expect(firstTimestamp.date()).toBe(15);

        const lastTimestamp = moment.unix(result[11]);
        expect(lastTimestamp.month()).toBe(1);
      });
    });

    describe("edge cases and validation", () => {
      it("should handle all valid timeframe values", () => {
        const timeframes: Timeframe[] = ["1D", "1W", "1M", "1Y"];

        timeframes.forEach((timeframe) => {
          const result = generateTimeStampsByTimeframe(timeframe);
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toBeGreaterThan(0);
        });
      });

      it("should return timestamps as numbers", () => {
        const timeframes: Timeframe[] = ["1D", "1W", "1M", "1Y"];

        timeframes.forEach((timeframe) => {
          const result = generateTimeStampsByTimeframe(timeframe);
          result.forEach((timestamp) => {
            expect(typeof timestamp).toBe("number");
            expect(Number.isInteger(timestamp)).toBe(true);
            expect(timestamp).toBeGreaterThan(0);
          });
        });
      });

      it("should generate unique timestamps", () => {
        const timeframes: Timeframe[] = ["1D", "1W", "1M", "1Y"];

        timeframes.forEach((timeframe) => {
          const result = generateTimeStampsByTimeframe(timeframe);
          const uniqueTimestamps = new Set(result);
          expect(uniqueTimestamps.size).toBe(result.length);
        });
      });
    });

    describe("timestamp accuracy", () => {
      it("should generate timestamps that are valid Unix timestamps", () => {
        const timeframes: Timeframe[] = ["1D", "1W", "1M", "1Y"];

        timeframes.forEach((timeframe) => {
          const result = generateTimeStampsByTimeframe(timeframe);
          result.forEach((timestamp) => {
            const now = Math.floor(Date.now() / 1000);
            expect(timestamp).toBeLessThanOrEqual(now);
            expect(timestamp).toBeGreaterThan(now - 365 * 24 * 60 * 60);
          });
        });
      });

      it("should generate timestamps that can be converted back to valid dates", () => {
        const timeframes: Timeframe[] = ["1D", "1W", "1M", "1Y"];

        timeframes.forEach((timeframe) => {
          const result = generateTimeStampsByTimeframe(timeframe);
          result.forEach((timestamp) => {
            const date = moment.unix(timestamp);
            expect(date.isValid()).toBe(true);
          });
        });
      });
    });
  });
});
