import { describe, expect, test, jest, afterEach } from "@jest/globals";
import { Person } from "./spyon-class-members";

describe("spyon class members", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("spies on Person prototype .greet", () => {
    const alice = new Person("Alice");
    expect(alice.greet("John")).toBe("Hello, John. My name is Alice.");

    const spy = jest.spyOn(Person.prototype, "greet");
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
    const spy = jest.spyOn(Person.prototype, "greet");
    expect(spy).toHaveBeenCalledTimes(0);

    const person = new Person("Alice");
    person.greet("John");

    expect(spy).toHaveBeenCalledTimes(1);
    
    // Clear the spy. jest.clearAllMocks() works for ALL spies
    spy.mockClear();
    expect(spy).toHaveBeenCalledTimes(0);
  });
});