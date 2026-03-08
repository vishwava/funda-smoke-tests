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

  readonly day = (day: string) => {
    return {
      label: this.page.locator(`label[for="checkbox-${day}"]`),
      checkbox: this.page.getByLabel(day, { exact: true }),
    };
  };

  readonly timeOfDay = (time: string) => {
    return {
      label: this.page.locator(`label[for="checkbox-${time}"]`),
      checkbox: this.page.getByLabel(time, { exact: true }),
    };
  };

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
    const dayLabel = this.day(data.appointmentData.day).label;
    const hasScheduler = await dayLabel
      .waitFor({ state: "visible", timeout: 5000 })
      .then(
        () => true,
        () => false,
      );
    if (hasScheduler) {
      await dayLabel.click();
      await this.timeOfDay(data.appointmentData.time).label.click();
      await expect(this.day(data.appointmentData.day).checkbox).toBeChecked();
      await expect(
        this.timeOfDay(data.appointmentData.time).checkbox,
      ).toBeChecked();
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
