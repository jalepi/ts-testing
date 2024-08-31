import { describe, expect, test, jest, afterEach } from "@jest/globals";
import * as Foo from "./spyon-module-var";

describe("spyon module vars", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("spies on foo", () => {
    const spy = jest.spyOn(Foo, "foo");
    expect(spy).toHaveBeenCalledTimes(0);

    const result = Foo.foo();

    // Note that the spy PRESERVES the original implementation
    expect(result).toBe("foo");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith("foo");
  });
});