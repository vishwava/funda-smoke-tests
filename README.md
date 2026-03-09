# funda-smoke-tests

Playwright smoke test suite for **[funda.nl](https://www.funda.nl)**, written in TypeScript, assisted by AI.

---

## Running the tests

```bash
#Install dependencies
npm install

#Install Playwright browsers
npm run install:browsers

#Run all tests (headless, Chromium)
npm test

#Run all tests in a visible browser window
npm run test:headed

#Open the last HTML report
npm run report
```

---

## Prerequisites

- **Node.js** ≥ 18 (v20+ recommended)
- **npm** ≥ 8
- Playwright browsers installed — run `npm run install:browsers` after `npm install`

---

## Setup

Before running tests, update the `USER_AGENT` constant in `setup/constants.ts` with your browser's user agent string. Without a valid user agent, requests may be blocked.

```ts
//setup/constants.ts
export const USER_AGENT = "Enter user agent here!";
```

A **global setup** step (`setup/global.setup.ts`) launches a headless Chromium browser, navigates to the funda homepage, dismisses the cookie consent banner, and saves the resulting browser storage state to `.auth/storageState.json`. All subsequent tests inherit this authenticated, cookie-accepted context.

The storage state file is git-ignored and regenerated automatically on every test run.

---

## Project structure

```
├── pages/                  #POM classes
│   ├── BasePage.ts
│   ├── CookieBannerPage.ts
│   ├── HomePage.ts
│   ├── SearchResultsPage.ts
│   ├── ListingDetailPage.ts
│   ├── SellPage.ts
│   └── ContactAgentPage.ts
│
├── tests/                  #Test suites
│   ├── homepage.spec.ts
│   ├── search.spec.ts
│   ├── listing-detail.spec.ts
│   ├── sell.spec.ts
│   └── contact-agent.spec.ts
│
├── setup/
│   ├── constants.ts
│   └── global.setup.ts
│
└── playwright.config.ts    #Playwright configuration
```

---

## Test suites

### `homepage.spec.ts` — Homepage

Navigates to the funda homepage and verifies:

- Page title contains `"funda"`
- All main navigation links are visible (Kopen, Huren, Verkopen, Nieuwbouw, Mijn Huis, Favorieten, Inloggen)
- The search bar is visible and functional — typing `"Amsterdam"` and selecting the suggestion navigates to an Amsterdam results URL
- The English language switcher is visible and navigates to `/en`

---

### `search.spec.ts` — Search results

Opens three different search result pages and verifies that listing cards and the city result count header are displayed:

| Test                                   | Path                    |
| -------------------------------------- | ----------------------- |
| Buy listing cards are visible          | `/koop/amsterdam/`      |
| Rent listing cards are visible         | `/huur/amsterdam/`      |
| New build listing cards are visible    | `/nieuwbouw/amsterdam/` |
| Recreational listing cards are visible | `/recreatie/amsterdam/` |    

---

### `listing-detail.spec.ts` — Listing detail page

Navigates to the first buy listing in Amsterdam and verifies:

**Buy listing detail page loads correctly**

- Address heading (h1) is visible
- Photo gallery is visible
- Key property detail blocks are visible: price/transfer (`overdracht`), building (`bouw`), size (`afmetingen`), layout (`indeling`)
- Agent section displays the estate agent link

**Agent section displays phone number**

- Clicks `Toon telefoonnummer` to reveal the phone number
- Asserts the phone number link `href` matches `tel:0` followed by 9 or more digits or spaces

---

### `sell.spec.ts` — Sell pages

Covers two pages in the sell/information section:

**Sales information page** (`/meer-weten/verkopen/`):

- Page title contains `"funda"`
- Page heading and subheading are visible
- "Vergelijk NVM-makelaars in de buurt" link is visible

**Products and services page** (`/meer-weten/producten-en-diensten/`):

- Page title contains `"funda"`
- Page heading and subheading are visible
- "Doe de Waardecheck", "Bekijk de stappen", "Vergelijk NVM-makelaars in de buurt", and "Vertel me meer" links are all visible

---

### `contact-agent.spec.ts` — Contact agent

Navigates to the first buy listing in Amsterdam and tests agent contact form interactions. Faker-generated data is created once and shared across both tests.

**Contact form can be filled in**

- Clicks the `Neem contact op` link to open the contact form
- Fills in the message textarea and all personal detail fields (first name, last name, email, phone) using faker-generated values
- Asserts each field reflects the entered value and the submit button is visible

**Appointment form can be filled in**

- Opens the contact form and checks the `Bezichtiging aanvragen` checkbox to request a viewing
- Fills in appointment data and personal detail fields using the same faker data
- Asserts the checkbox is checked, each field reflects the entered value, and the submit button is visible

> Neither test submits the form, avoiding real data being sent to funda.

---

## Configuration highlights

| Setting           | Value                                   |
| ----------------- | --------------------------------------- |
| Base URL          | `https://www.funda.nl`                  |
| Browser           | Chromium (Desktop Chrome)               |
| Viewport          | 1280 × 800                              |
| Test timeout      | 30 s                                    |
| Assertion timeout | 5 s                                     |
| Headless          | Yes (use `test:headed` for visual runs) |
| Retries           | 0 locally, 1 on CI                      |
| Parallelism       | Full (half of CPU cores locally, 5 workers on CI) |
| Traces            | Retained on failure                     |
| Screenshots       | Always captured                         |
| Reporter          | `list` (console) + `html`               |

---

## Code quality

```bash
#Type-check, lint and auto-format
npm run format
```
