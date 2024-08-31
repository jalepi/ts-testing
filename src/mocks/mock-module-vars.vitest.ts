import { describe, expect, test, vi, afterEach } from "vitest";
import { foo } from "./mock-module-var";
import * as Bar from "./bar";

describe("mock module vars", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("mocks on bar", async () => {
    expect(foo()).toBe("foo and bar");

    const spy = vi.spyOn(Bar, "bar").mockImplementation(() => "mocked bar");
    expect(spy).toHaveBeenCalledTimes(0);

    const result = foo();

    // Note that the spy REPLACES the original implementation
    expect(result).toBe("foo and mocked bar");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith("mocked bar");
    
    // Restore the original implementation
    spy.mockRestore();
    expect(foo()).toBe("foo and bar");
  });
});
