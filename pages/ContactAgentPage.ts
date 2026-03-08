import { Page, expect } from "@playwright/test";
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

  // Returns a locator for a day abbreviation label (e.g. 'Ma' for Monday)
  dayLabel(day: string) {
    return this.page.getByText(day, { exact: true });
  }

  // Returns a locator for a part-of-day label by its checkbox id suffix (e.g. "'s morgens")
  partOfDayLabel(time: string) {
    return this.page.locator(`label[for="checkbox-${time}"]`);
  }

  async fillContactForm(data: {
    message: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await this.messageInput.fill(data.message);
    await this.fillPersonalDetails(data);
  }

  async fillAppointmentForm(data: {
    appointmentData: { day: string; time: string };
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await this.viewingRequestCheckbox.check();
    const dayButton = this.dayLabel(data.appointmentData.day);
    const hasScheduler = await dayButton
      .waitFor({ state: "visible", timeout: 5000 })
      .then(
        () => true,
        () => false,
      );
    if (hasScheduler) {
      await dayButton.click();
      await this.partOfDayLabel(data.appointmentData.time).click();
      await expect(dayButton).toBeVisible();
      await expect(
        this.partOfDayLabel(data.appointmentData.time),
      ).toBeVisible();
    }
    await this.fillPersonalDetails(data);
  }

  async fillPersonalDetails(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }
}
