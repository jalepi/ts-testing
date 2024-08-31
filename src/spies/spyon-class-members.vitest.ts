import { describe, expect, test, vi, afterEach } from "vitest";
import { Person } from "./spyon-class-member";

describe("spyon class members", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("spies on Person prototype .greet", () => {
    const alice = new Person("Alice");
    expect(alice.greet("John")).toBe("Hello, John. My name is Alice.");

    const spy = vi.spyOn(Person.prototype, "greet");
    expect(spy).toHaveBeenCalledTimes(0);

    // Spying on the prototype affects all instances
    const charlie = new Person("Charlie");

    const result = charlie.greet("Alice");

    // Note that the spy PRESERVES the original implementation
    expect(result).toBe("Hello, Alice. My name is Charlie.");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("Alice");
    expect(spy).toHaveReturnedWith("Hello, Alice. My name is Charlie.");
  });

  test("clear spies", () => {
    const spy = vi.spyOn(Person.prototype, "greet");
    expect(spy).toHaveBeenCalledTimes(0);

    const person = new Person("Alice");
    person.greet("John");

    expect(spy).toHaveBeenCalledTimes(1);
    
    // Clear the spy. jest.clearAllMocks() works for ALL spies
    spy.mockClear();
    expect(spy).toHaveBeenCalledTimes(0);
  });
});