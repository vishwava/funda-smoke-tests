import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CITY } from "../setup/constants";

export class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // each listing card is identified by its address block
  readonly listingCards = this.page.locator(
    '[data-testid="listingDetailsAddress"]',
  );
  // header contains the formatted result count (e.g. "5000+ koopwoningen in Amsterdam")
  readonly resultCountInCity = this.page.locator('[data-testid="pageHeader"]', {
    hasText: new RegExp(CITY, "i"),
  });

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
