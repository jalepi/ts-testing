export function sendMessage(message: string): void {
  window.postMessage(message, "*");
}

export function onMessage(handler: (message: string) => void) {
  const messageHandler = (event: MessageEvent) => {
    handler(event.data);
  };
  window.addEventListener("message", messageHandler);
  return () => {
    window.removeEventListener("message", messageHandler);
  };
}
