import { describe, test, expect } from "vitest";
import { add } from "./";

describe("add module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(add(1, 2)).toBe(3);
  });
});