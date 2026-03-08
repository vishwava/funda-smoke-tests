import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContactAgentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  readonly pageHeading = this.page.getByRole("heading", { level: 1 });

  // Message textarea at the top of the form
  readonly messageInput = this.page.locator("#questionInput");

  // Checkbox to request a viewing appointment
  readonly viewingRequestCheckbox = this.page.locator(
    "#checkbox-viewingRequest",
  );

  // Personal detail fields
  readonly emailInput = this.page.locator("#emailAddress");
  readonly firstNameInput = this.page.locator("#firstName");
  readonly lastNameInput = this.page.locator("#lastName");
  readonly phoneInput = this.page.locator("#phoneNumber");

  readonly submitButton = this.page.getByRole("button", { name: "Verstuur" });

  async fillContactForm(data: {
    message: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await this.messageInput.fill(data.message);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async fillAppointmentForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<void> {
    if (!(await this.viewingRequestCheckbox.isChecked())) {
      await this.viewingRequestCheckbox.check();
    }
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }
}
