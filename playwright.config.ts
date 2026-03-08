import { defineConfig, devices } from "@playwright/test";
import { STORAGE_STATE } from "./setup/global.setup";
import { BASE_URL, USER_AGENT } from "./setup/constants";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 5 : undefined,
  globalSetup: "./setup/global.setup",
  reporter: [["list"], ["html"]],

  use: {
    baseURL: BASE_URL,
    viewport: { width: 1280, height: 800 },
    headless: true,
    screenshot: "on",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        userAgent: USER_AGENT,
        storageState: STORAGE_STATE,
      },
    },
  ],
});
