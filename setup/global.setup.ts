import { chromium } from "@playwright/test";
import path from "path";
import { CookieBannerPage } from "../pages/CookieBannerPage";
import { BASE_URL, USER_AGENT } from "./constants";

export const STORAGE_STATE = path.resolve(
  __dirname,
  "../.auth/storageState.json",
);

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: BASE_URL,
    userAgent: USER_AGENT,
  });
  const page = await context.newPage();

  await page.goto("/");
  await new CookieBannerPage(page).dismiss();

  await context.storageState({ path: STORAGE_STATE });
  await browser.close();
}

export default globalSetup;
