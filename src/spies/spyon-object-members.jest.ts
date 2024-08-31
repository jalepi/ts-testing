import { describe, expect, test, jest, afterEach } from "@jest/globals";
import { Person } from "./spyon-object-member";

describe("spyon object members", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("spies on Person object .greet", () => {
    const person = new Person("Alice");
    expect(person.greet("John")).toBe("Hello, John. My name is Alice.");

    const spy = jest.spyOn(person, "greet");
    expect(spy).toHaveBeenCalledTimes(0);

    const result = person.greet("Charlie");

    // Note that the spy PRESERVES the original implementation
    expect(result).toBe("Hello, Charlie. My name is Alice.");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("Charlie");
    expect(spy).toHaveReturnedWith("Hello, Charlie. My name is Alice.");
  });
});