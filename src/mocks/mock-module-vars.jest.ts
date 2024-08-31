import { describe, expect, test, jest, afterEach } from "@jest/globals";
import { foo } from "./mock-module-var";
import * as Bar from "./bar";

describe("mock module vars", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("mocks on bar", () => {
    expect(foo()).toBe("foo and bar");

    const spy = jest.spyOn(Bar, "bar").mockImplementation(() => "mocked bar");
    expect(spy).toHaveBeenCalledTimes(0);

    const result = foo();

    // Note that the spy REPLACES the original implementation
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBe("foo and mocked bar");
    expect(spy).toHaveReturnedWith("mocked bar");

    // Restore the original implementation
    spy.mockRestore();
    expect(foo()).toBe("foo and bar");
  });
});