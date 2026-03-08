import { test, expect } from "@playwright/test";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ListingDetailPage } from "../pages/ListingDetailPage";
import { BUY_IN_CITY } from "../setup/constants";

test.describe("Listing detail", () => {
  let listingDetailPage: ListingDetailPage;

  // Verify that the listing detail page loads correctly with all main sections visible
  test("Buy listing detail page loads correctly", async ({ page }) => {
    const searchPage = new SearchResultsPage(page);
    await searchPage.open(BUY_IN_CITY);
    await searchPage.listingCards.first().click();
    listingDetailPage = new ListingDetailPage(page);

    await expect(listingDetailPage.addressHeading).toBeVisible();
    await expect(listingDetailPage.photoGallery).toBeVisible();
    await expect(listingDetailPage.priceBlock).toBeVisible();
    await expect(listingDetailPage.buildBlock).toBeVisible();
    await expect(listingDetailPage.sizeBlock).toBeVisible();
    await expect(listingDetailPage.layoutBlock).toBeVisible();
    await expect(listingDetailPage.agentSection.agentLink).toBeVisible();
  });

  // Verify that the agent section displays a valid phone number when revealed
  test("Agent section displays phone number", async ({ page }) => {
    const searchPage = new SearchResultsPage(page);
    await searchPage.open(BUY_IN_CITY);
    await searchPage.listingCards.first().click();
    listingDetailPage = new ListingDetailPage(page);

    const phoneNumber =
      await listingDetailPage.agentSection.revealPhoneNumber();
    await expect(phoneNumber).toBeVisible();

    const href = await phoneNumber.getAttribute("href");
    expect(href).toMatch(/^tel:0\d{2}\s\d{7}$/);
  });
});
