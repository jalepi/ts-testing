import { describe, expect, test, jest, afterEach } from "@jest/globals";
import { onMessage, sendMessage } from "./spyon-global-members";

describe("spyon global members", () => {
  afterEach(async () => {
    jest.restoreAllMocks();
  });
  test("spyon window.postMessage", () => {
    const dispatchEventSpy = jest.fn();
    window.addEventListener("message", dispatchEventSpy);
    // KEEPS the original implementation
    const postMessageSpy = jest.spyOn(window, "postMessage");
    // window.postMessage is asynchronous, so we need to wait for the next event loop
    sendMessage("Hello");
    expect(postMessageSpy).toHaveBeenCalledTimes(1);
    expect(postMessageSpy).toHaveBeenCalledWith("Hello", "*");
  });
  test("spyon window event listeners", async () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const spy = jest.fn();
    const unsubscribe = onMessage(spy);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );

    window.postMessage("Hello", "*");

    await yieldEventLoop();
    expect(spy).toHaveBeenCalledTimes(1);
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
