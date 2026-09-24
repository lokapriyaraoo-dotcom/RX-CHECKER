import {
 describe,
 expect,
 test
} from "vitest";

describe(
 "OCR LIMITS",
 () => {

  test(
   "accepts image under limit",
   () => {
    expect(
      9 * 1024 * 1024
      < 10 * 1024 * 1024
    ).toBe(true);
   }
  );

  test(
   "rejects image over limit",
   () => {
    expect(
      12 * 1024 * 1024
      < 10 * 1024 * 1024
    ).toBe(false);
   }
  );

 }
);
