import { test, expect } from "@playwright/test";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import {
  BUY_IN_CITY,
  NEWBUILD_IN_CITY,
  RENT_IN_CITY,
  RECREATIONAL_IN_CITY,
} from "../setup/constants";

test.describe("Search results", () => {
  let searchPage: SearchResultsPage;

  //Verify buy listing cards are visible
  test("Buy listing cards are visible", async ({ page }) => {
    searchPage = new SearchResultsPage(page);
    await searchPage.open(BUY_IN_CITY);
    await expect(searchPage.listingCards.first()).toBeVisible();
    await expect(searchPage.resultCountInCity).toBeVisible();
  });

  //Verify rent listing cards are visible
  test("Rent listing cards are visible", async ({ page }) => {
    searchPage = new SearchResultsPage(page);
    await searchPage.open(RENT_IN_CITY);
    await expect(searchPage.listingCards.first()).toBeVisible();
    await expect(searchPage.resultCountInCity).toBeVisible();
  });

  //Verify new build listing cards are visible
  test("New build listing cards are visible", async ({ page }) => {
    searchPage = new SearchResultsPage(page);
    await searchPage.open(NEWBUILD_IN_CITY);
    await expect(searchPage.listingCards.first()).toBeVisible();
    await expect(searchPage.resultCountInCity).toBeVisible();
  });

  //Verify recreational listing cards are visible
  test("Recreational listing cards are visible", async ({ page }) => {
    searchPage = new SearchResultsPage(page);
    await searchPage.open(RECREATIONAL_IN_CITY);
    await expect(searchPage.listingCards.first()).toBeVisible();
    await expect(searchPage.resultCountInCity).toBeVisible();
  });
});
