import { describe, expect, test, vi, afterEach } from "vitest";
import { Person } from "./mock-object-member";

describe("mocks object members", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("mocks on Person object .greet", () => {
    const alice = new Person("Alice");
    expect(alice.greet("John")).toBe("Hello, John. My name is Alice.");

    const spy = vi
      .spyOn(alice, "greet")
      .mockImplementation((name) => `Hello, ${name}. My name is mock.`);
    expect(spy).toHaveBeenCalledTimes(0);

    expect(alice.greet("Alice")).toBe("Hello, Alice. My name is mock.");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("Alice");
    expect(spy).toHaveReturnedWith("Hello, Alice. My name is mock.");

    // Mocking on the object does not affects other instances
    const charlie = new Person("Charlie");
    expect(charlie.greet("Alice")).toBe("Hello, Alice. My name is Charlie.");
    expect(spy).not.toHaveBeenCalledTimes(2);
  });
});