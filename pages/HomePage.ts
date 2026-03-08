import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private readonly mainNav = this.page.getByRole("navigation", {
    name: "Main",
  });

  constructor(page: Page) {
    super(page);
  }

  // Top-level nav items
  readonly navKopen = this.mainNav.getByText("Kopen", { exact: true });
  readonly navHuren = this.mainNav.getByText("Huren", { exact: true });
  readonly navSell = this.mainNav.getByText("Verkopen", { exact: true });
  readonly navNewBuild = this.mainNav.getByText("Nieuwbouw", { exact: true });
  readonly navMijnHuis = this.mainNav.getByRole("link", { name: "Mijn Huis" });
  readonly navFavorieten = this.mainNav.getByRole("link", {
    name: "Favorieten",
  });
  readonly navInloggen = this.mainNav.getByRole("button", { name: "Inloggen" });

  // Search bar
  readonly searchBar = this.page.locator('[data-testid="search-box"]');

  // English language switcher in the footer
  readonly englishLink = this.page.getByRole("link", { name: "English" });

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async searchFor(keyword: string): Promise<void> {
    await this.open();
    await this.searchBar.fill(keyword);
    await this.page
      .getByRole("option", { name: new RegExp(keyword, "i") })
      .first()
      .click();
  }
}
