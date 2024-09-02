import { describe, test, expect, vi, afterEach } from "vitest";
import { onMessage, sendMessage } from "./mock-global-members";

describe("mock global members", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("mocks window.postMessage", () => {
    // REPLACES the original implementation, so it doesn't actually post a message
    const spy = vi.spyOn(window, "postMessage").mockImplementation(() => {});
    sendMessage("Hello");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("Hello", "*");
  });
  test("mocks window event listeners", async () => {
    const eventTarget = new EventTarget();
    const addEventListenerSpy = vi
      .spyOn(window, "addEventListener")
      .mockImplementation((type, event) =>
        eventTarget.addEventListener(type, event)
      );
    const removeEventListenerSpy = vi
      .spyOn(window, "removeEventListener")
      .mockImplementation((type, event) =>
        eventTarget.removeEventListener(type, event)
      );

    const spy = vi.fn();
    const unsubscribe = onMessage(spy);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );

    queueMicrotask(() => {
      eventTarget.dispatchEvent(new MessageEvent("message", { data: "Hello" }));
    });

    await vi.waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
    expect(spy).toHaveBeenCalledWith("Hello");

    unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );
  });
});
