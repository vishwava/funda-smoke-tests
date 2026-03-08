import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ListingDetailPage } from "../pages/ListingDetailPage";
import { ContactAgentPage } from "../pages/ContactAgentPage";
import { BUY_IN_CITY } from "../setup/constants";

test.describe("Contact agent", () => {
  let listingDetailPage: ListingDetailPage;

  // Generate realistic test data for contact form and appointment form
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const phone = faker.helpers.fromRegExp("06[0-9]{8}");
  const message = faker.lorem.sentence();

  test.beforeEach(async ({ page }) => {
    const searchPage = new SearchResultsPage(page);
    await searchPage.open(BUY_IN_CITY);
    await searchPage.listingCards.first().click();
    listingDetailPage = new ListingDetailPage(page);
  });

  // Verify that the contact form can be filled in with valid data and all fields are populated correctly
  test("Contact form can be filled in", async ({ page }) => {
    await listingDetailPage.agentSection.contactFormLink.click();

    const contactAgentPage = new ContactAgentPage(page);
    await expect(contactAgentPage.pageHeading).toBeVisible();

    await contactAgentPage.fillContactForm({
      message,
      firstName,
      lastName,
      email,
      phone,
    });

    await expect(contactAgentPage.messageInput).toHaveValue(message);
    await expect(contactAgentPage.firstNameInput).toHaveValue(firstName);
    await expect(contactAgentPage.lastNameInput).toHaveValue(lastName);
    await expect(contactAgentPage.emailInput).toHaveValue(email);
    await expect(contactAgentPage.phoneInput).toHaveValue(phone);
    await expect(contactAgentPage.submitButton).toBeVisible();
  });

  // Verify that the appointment form can be filled in with valid data and all fields are populated correctly
  test("Appointment form can be filled in", async ({ page }) => {
    await listingDetailPage.agentSection.viewingRequestLink.click();

    const contactAgentPage = new ContactAgentPage(page);
    await expect(contactAgentPage.pageHeading).toBeVisible();

    await contactAgentPage.fillAppointmentForm({
      firstName,
      lastName,
      email,
      phone,
    });

    await expect(contactAgentPage.viewingRequestCheckbox).toBeChecked();
    await expect(contactAgentPage.firstNameInput).toHaveValue(firstName);
    await expect(contactAgentPage.lastNameInput).toHaveValue(lastName);
    await expect(contactAgentPage.emailInput).toHaveValue(email);
    await expect(contactAgentPage.phoneInput).toHaveValue(phone);
    await expect(contactAgentPage.submitButton).toBeVisible();
  });
});
