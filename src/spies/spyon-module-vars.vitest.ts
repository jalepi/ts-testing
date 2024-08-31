import { describe, expect, test, vi, afterEach } from "vitest";
import * as Foo from "./spyon-module-var";

describe("spyon module vars", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("spies on foo", () => {
    const spy = vi.spyOn(Foo, "foo");
    expect(spy).toHaveBeenCalledTimes(0);

    const result = Foo.foo();

    // Note that the spy PRESERVES the original implementation
    expect(result).toBe("foo");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith("foo");
  });
});