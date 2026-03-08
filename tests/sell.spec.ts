import { test, expect } from "@playwright/test";
import { SellPage } from "../pages/SellPage";
import {
  APPRAISAL_LINK_TEXT,
  COMPARE_AGENTS_LINK_TEXT,
  CONTACT_US_LINK_TEXT,
  SELL_KNOW_MORE,
  SELL_KNOW_MORE_TITLE,
  SELL_PRODUCTS_AND_SERVICES,
  SELL_PRODUCTS_AND_SERVICES_TITLE,
  SITE_NAME,
  VIEW_STEPS_LINK_TEXT,
} from "../setup/constants";

test.describe("Sell", () => {
  let sellPage: SellPage;

  test("Sales information page loads correctly", async ({ page }) => {
    sellPage = new SellPage(page);
    await sellPage.open(SELL_KNOW_MORE);

    // Verify page title contains "funda"
    const title = await sellPage.getTitle();
    expect(title.toLowerCase()).toContain(SITE_NAME);

    // Verify key elements on the information page are visible
    await expect(sellPage.pageHeading(SELL_KNOW_MORE_TITLE)).toBeVisible();
    await expect(sellPage.subHeading).toBeVisible();
    await expect(sellPage.getLink(COMPARE_AGENTS_LINK_TEXT)).toBeVisible();
  });

  test("Sales products and services page loads correctly", async ({ page }) => {
    sellPage = new SellPage(page);
    await sellPage.open(SELL_PRODUCTS_AND_SERVICES);

    // Verify page title contains "funda"
    const title = await sellPage.getTitle();
    expect(title.toLowerCase()).toContain(SITE_NAME);

    // Verify key elements on the products and services page are visible
    await expect(
      sellPage.pageHeading(SELL_PRODUCTS_AND_SERVICES_TITLE),
    ).toBeVisible();
    await expect(sellPage.subHeading).toBeVisible();
    await expect(sellPage.getLink(APPRAISAL_LINK_TEXT)).toBeVisible();
    await expect(sellPage.getLink(VIEW_STEPS_LINK_TEXT)).toBeVisible();
    await expect(sellPage.getLink(COMPARE_AGENTS_LINK_TEXT)).toBeVisible();
    await expect(sellPage.getLink(CONTACT_US_LINK_TEXT)).toBeVisible();
  });
});
