import { describe, expect, test, vi, afterEach } from "vitest";
import { Person } from "./mock-class-member";

describe("mock class members", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("mocks on Person prototype .greet", () => {
    const alice = new Person("Alice");
    expect(alice.greet("John")).toBe("Hello, John. My name is Alice.");

    const spy = vi
      .spyOn(Person.prototype, "greet")
      .mockImplementation((name) => `Hello, ${name}. My name is mock.`);
    expect(spy).toHaveBeenCalledTimes(0);

    // Spying on the prototype affects all instances
    const charlie = new Person("Charlie");

    const result = charlie.greet("Alice");

    // Note that the spy PRESERVES the original implementation
    expect(result).toBe("Hello, Alice. My name is mock.");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("Alice");
    expect(spy).toHaveReturnedWith("Hello, Alice. My name is mock.");
  });

  test("clear mocks", () => {
    const spy = vi
      .spyOn(Person.prototype, "greet")
      .mockImplementation((name) => `Hello, ${name}. My name is mock.`);
    expect(spy).toHaveBeenCalledTimes(0);

    const person = new Person("Alice");
    expect(person.greet("John")).toBe("Hello, John. My name is mock.");
    expect(spy).toHaveBeenCalledTimes(1);

    // Restores the original implementation
    spy.mockRestore();
    expect(person.greet("John")).toBe("Hello, John. My name is Alice.");
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
