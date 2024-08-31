import { defineConfig } from "vitest/config";

export default defineConfig(() => ({
  test: {
    environment: "happy-dom",
    // include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
    include: ["**/*.vitest.ts"],
  },
}));
