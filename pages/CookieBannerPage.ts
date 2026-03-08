import { Page } from "@playwright/test";

export class CookieBannerPage {
  private readonly oneTrustAcceptButton = this.page.locator(
    "#onetrust-accept-btn-handler",
  );
  private readonly didomiAcceptButton = this.page.locator(
    "#didomi-notice-agree-button",
  );
  private readonly didomiPopup = this.page.locator("#didomi-popup");

  constructor(private readonly page: Page) {}

  async dismiss(): Promise<void> {
    if (await this.oneTrustAcceptButton.isVisible()) {
      await this.oneTrustAcceptButton.click();
      await this.oneTrustAcceptButton.waitFor({
        state: "hidden",
        timeout: 5_000,
      });
      return;
    }

    if (await this.didomiAcceptButton.isVisible()) {
      await this.didomiAcceptButton.click();
      await this.didomiPopup.waitFor({ state: "hidden", timeout: 5_000 });
    }
  }
}
