import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ListingDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly addressHeading = this.page.getByRole("heading", { level: 1 });

  readonly photoGallery = this.page.locator('[data-testid="photos"]');

  // "overdracht" section contains asking price and transfer details
  readonly priceBlock = this.page.locator(
    '[data-testid="category-overdracht"]',
  );

  // "bouw" section contains building details
  readonly buildBlock = this.page.locator('[data-testid="category-bouw"]');

  // "afmetingen" section contains size details
  readonly sizeBlock = this.page.locator('[data-testid="category-afmetingen"]');

  // "indeling" section contains layout details
  readonly layoutBlock = this.page.locator('[data-testid="category-indeling"]');

  // real estate agent section contains agent name, phone number and contact form link
  readonly agentSection = {
    agentLink: this.page
      .locator("h3")
      .filter({ has: this.page.locator('a[href*="/makelaar/"]') })
      .locator('a[href*="/makelaar/"]'),
    showPhoneLink: this.page.getByRole("button", {
      name: "Toon telefoonnummer",
    }),
    phoneNumber: this.page.locator('a[href^="tel:"]').last(),
    contactFormLink: this.page
      .getByRole("link", { name: "Neem contact op" })
      .first(),
    viewingRequestLink: this.page
      .getByRole("link", { name: "Vraag bezichtiging aan" })
      .first(),

    async revealPhoneNumber() {
      await this.showPhoneLink.dispatchEvent("click");
      return this.phoneNumber;
    },
  };
}
