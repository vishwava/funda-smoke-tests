import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SITE_NAME } from "../setup/constants";

test.describe("Homepage", () => {
  let homePage: HomePage;
  test("Homepage loads correctly", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();

    // Verify page title contains "funda"
    const title = await homePage.getTitle();
    expect(title.toLowerCase()).toContain(SITE_NAME);

    // Verify main navigation links are visible
    await expect(homePage.navKopen).toBeVisible();
    await expect(homePage.navHuren).toBeVisible();
    await expect(homePage.navSell).toBeVisible();
    await expect(homePage.navNewBuild).toBeVisible();
    await expect(homePage.navMijnHuis).toBeVisible();
    await expect(homePage.navFavorieten).toBeVisible();
    await expect(homePage.navInloggen).toBeVisible();

    // Verify search bar is visible
    await expect(homePage.searchBar).toBeVisible();
    await homePage.searchFor("Amsterdam");
    await expect(page).toHaveURL(/amsterdam/);

    // Verify language switcher is visible and functional
    await homePage.open();
    await expect(homePage.englishLink).toBeVisible();
    await homePage.englishLink.click();
    await expect(page).toHaveURL(/\/en/);
  });
});
