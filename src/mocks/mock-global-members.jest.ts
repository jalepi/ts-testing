import { describe, test, expect, jest, afterEach } from "@jest/globals";
import { onMessage, sendMessage } from "./mock-global-members";

describe("mock global members", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("mocks window.postMessage", () => {
    // REPLACES the original implementation, so it doesn't actually post a message
    const spy = jest.spyOn(window, "postMessage").mockImplementation(() => {});
    sendMessage("Hello");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("Hello", "*");
  });
  test("mocks window event listeners", async () => {
    const eventTarget = new EventTarget();
    const addEventListenerSpy = jest
      .spyOn(window, "addEventListener")
      .mockImplementation((type, event) =>
        eventTarget.addEventListener(type, event)
      );
    const removeEventListenerSpy = jest
      .spyOn(window, "removeEventListener")
      .mockImplementation((type, event) =>
        eventTarget.removeEventListener(type, event)
      );

    const spy = jest.fn();
    const unsubscribe = onMessage(spy);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );

    queueMicrotask(() => {
      eventTarget.dispatchEvent(new MessageEvent("message", { data: "Hello" }));
    });

    await yieldEventLoop();
    expect(spy).toHaveBeenCalledWith("Hello");

    unsubscribe();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );
  });
});

function yieldEventLoop() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 0);
  });
}
