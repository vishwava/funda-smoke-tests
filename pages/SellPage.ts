import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SellPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly pageHeading = (name: string) => {
    return this.page.getByRole("heading", { level: 1, name });
  };
  readonly subHeading = this.page.getByRole("heading", { level: 2 }).first();
  readonly getLink = (text: string) => {
    return this.page.getByRole("link", { name: text });
  };

  async open(link: string): Promise<void> {
    await this.page.goto(link);
  }
}
