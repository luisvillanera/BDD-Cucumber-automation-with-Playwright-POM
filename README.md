# 🎭 Playwright BDD — Demo Web Shop & API

**BDD (Behavior-Driven Development)** automation suite with [Playwright](https://playwright.dev) and [Cucumber](https://cucumber.io) using [playwright-bdd](https://vitalets.github.io/playwright-bdd/).

The tests are written in **Gherkin** language (`.feature` files) and executed by Playwright, combining the advantages of BDD with the power of the testing framework.

> **Applications under test:**
> - 🛒 [Tricentis Demo Web Shop](https://demowebshop.tricentis.com) — UI E2E
> - 🔌 [Dummy REST API](https://dummy.restapiexample.com) — REST API (CRUD)

---

## 📁 Project Structure

```text
├── features/                    # 📝 Gherkin Files (.feature)
│   ├── demoshop/                #    UI Scenarios — Demo Web Shop
│   │   ├── home.feature
│   │   ├── login.feature
│   │   ├── register.feature
│   │   ├── search.feature
│   │   ├── cart.feature
│   │   ├── contact.feature
│   │   ├── locators.feature
│   │   └── windows.feature
│   └── api/                     #    API Scenarios — Dummy REST API
│       ├── get-employees.feature
│       ├── get-employee-by-id.feature
│       ├── post-create.feature
│       ├── put-update.feature
│       └── delete-employee.feature
│
├── steps/                       # 🔗 Step Definitions (Given/When/Then)
│   ├── demoshop/                #    UI Steps
│   │   ├── home.steps.ts
│   │   ├── login.steps.ts
│   │   ├── register.steps.ts
│   │   ├── search.steps.ts
│   │   ├── cart.steps.ts
│   │   ├── contact.steps.ts
│   │   ├── locators.steps.ts
│   │   └── windows.steps.ts
│   └── api/                     #    API Steps
│       ├── get-employees.steps.ts
│       ├── get-employee-by-id.steps.ts
│       ├── post-create.steps.ts
│       ├── put-update.steps.ts
│       └── delete-employee.steps.ts
│
├── pages/                       # 🏗️ Page Object Model (POM)
│   └── demoshop/
│       ├── BasePage.ts          #    Base class: header, search, tabs
│       ├── HomePage.ts
│       ├── LoginPage.ts
│       ├── RegisterPage.ts
│       ├── CatalogPage.ts
│       ├── ProductPage.ts
│       ├── CartPage.ts
│       ├── ContactPage.ts
│       └── index.ts             #    Barrel export
│
├── fixtures/
│   └── demoshop.fixture.ts      # 🔌 Fixtures: injects Page Objects
│
├── data/
│   ├── demoshop.ts              # 📊 Test data (users, products)
│   └── dummyRestApi.ts          # 📊 API endpoints and payloads
│
├── utils/
│   └── dummyApiClient.ts        # 🛠️ API request helper with retry
│
├── playwright.config.ts         # ⚙️ Playwright + BDD Config
├── package.json
├── tsconfig.json
└── .github/workflows/
    └── playwright.yml           # 🚀 CI — GitHub Actions
```

---

## 🧪 Features and Scenarios

### UI — Demo Web Shop

| Feature | Scenarios | Coverage |
|---|---|---|
| **Home** | 3 | Title, featured products, categories, header links |
| **Login** | 3 | Positive login (register → login), invalid credentials, empty fields |
| **Register** | 3 | Successful registration, empty form, mismatched passwords |
| **Search** | 3 | Search with results, without results, input accessibility |
| **Cart** | 4 | Add from details, from catalog, empty cart, remove product |
| **Contact** | 2 | Successful inquiry submission, empty form |
| **Locators** | 5 | Best practices: `getByRole`, `id`, `filter`, CSS, chaining |
| **Windows** | 4 | Tabs: Facebook, Twitter, YouTube, popup event pattern |

### API — Dummy REST API

| Feature | Scenarios | Coverage |
|---|---|---|
| **GET Employees** | 2 | List all, validate first record |
| **GET by ID** | 3 | Valid ID, ID 2, non-existing ID |
| **POST Create** | 3 | Valid payload, empty, incomplete |
| **PUT Update** | 2 | Successful update, empty payload |
| **DELETE** | 2 | Delete ID 2, invalid ID (string) |

**Total: 37 BDD Scenarios**

---

## 🏗️ Architecture

```text
Feature (.feature)  →  Step Definition (.steps.ts)  →  Page Object (.ts)  →  Browser/API
       ↓                        ↓                            ↓
   Gherkin            createBdd(test)                  Locators + Actions
  (business)          (orchestration)                 (implementation)
```

### BDD Flow

1. **Feature files** (`features/`) — Written in Gherkin, they describe the expected behavior in natural language.
2. **Step definitions** (`steps/`) — They connect each Gherkin step with Playwright code using `createBdd()`.
3. **Page Objects** (`pages/`) — They encapsulate locators and actions for each page. Steps do not interact directly with the browser.
4. **Fixtures** (`fixtures/`) — They inject instances of Page Objects into the steps via `test.extend()`.
5. **bddgen** — Generates Playwright specs (`.features-gen/`) from the `.feature` files. This directory is auto-generated and is in `.gitignore`.

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Requirements

- **Node.js** LTS (v18+)
- **npm** v8+

---

## ▶️ How to run the tests

```bash
# Run ALL the BDD suite (UI + API)
npm test

# Only UI tests — Demo Web Shop
npm run test:demoshop

# Only API tests — Dummy REST API
npm run test:api

# With visible browser (headed)
npm run test:headed

# Playwright interactive UI mode
npm run test:ui

# Run a specific feature
npx bddgen && npx playwright test features/demoshop/cart.feature --project=chromium

# View HTML report after running
npm run report
```

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm test` | `bddgen && playwright test` | Entire BDD suite |
| `npm run test:demoshop` | `bddgen && playwright test features/demoshop` | Only UI |
| `npm run test:api` | `bddgen && playwright test features/api` | Only API |
| `npm run test:headed` | `bddgen && playwright test ... --headed` | With visible browser |
| `npm run test:ui` | `bddgen && playwright test --ui` | Interactive UI mode |
| `npm run bddgen` | `bddgen` | Only regenerate specs |
| `npm run report` | `playwright show-report` | Open HTML report |
| `npm run codegen` | `playwright codegen <url>` | Record actions |

---

## 📝 How to add new tests

### 1. Create the feature file

```gherkin
# features/demoshop/my-feature.feature
Feature: Demo Web Shop - My Feature

  Scenario: Description of the positive scenario
    Given the user is on page X
    When the user performs action Y
    Then they should see result Z
```

### 2. Create the step definitions

```typescript
// steps/demoshop/my-feature.steps.ts
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/demoshop.fixture';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('the user is on page X', async ({ homePage }) => {
  await homePage.open();
});

When('the user performs action Y', async ({ homePage }) => {
  // Use Page Object to execute the action
});

Then('they should see result Z', async ({ homePage }) => {
  await expect(homePage.page).toHaveTitle(/expected/);
});
```

### 3. Create or extend the Page Object (if necessary)

```typescript
// pages/demoshop/MyPage.ts
import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  readonly myElement: Locator;

  constructor(page: Page) {
    super(page);
    this.myElement = page.locator('#my-selector');
  }

  async myAction(): Promise<void> {
    await this.myElement.click();
  }
}
```

### 4. Register in the fixture (if it's a new page)

```typescript
// fixtures/demoshop.fixture.ts
import { MyPage } from '../pages/demoshop/MyPage';

// Add to the type and to extend:
myPage: async ({ page }, use) => {
  await use(new MyPage(page));
},
```

### 5. Execute

```bash
npm test
```

---

## 🔍 Page Object Model — Best Practices

### Locator Hierarchy (recommended priority)

| Priority | Strategy | Example |
|---|---|---|
| 1️⃣ | `getByRole` / `getByLabel` | `page.getByRole('button', { name: 'Log in' })` |
| 2️⃣ | `getByText` / `getByPlaceholder` | `page.getByText('Welcome')` |
| 3️⃣ | `getByTestId` | `page.getByTestId('submit-btn')` |
| 4️⃣ | Stable ID | `page.locator('#Email')` |
| 5️⃣ | Scoped CSS | `page.locator('.product-grid .product-item')` |
| ❌ | Fragile XPath | Avoid unless strictly necessary |

### POM Principles

- **`BasePage`** — Contains header, search, notifications, and `openInNewTab()`. All pages inherit from it.
- **Each page = one class** — Locators as `readonly` in the constructor, methods for actions and verifications.
- **Steps do not use locators directly** — Always delegate to the Page Object.
- **Fixtures inject Page Objects** — They are not instantiated manually in the tests.

---

## 🚀 CI — GitHub Actions

The project includes a workflow that runs the complete suite on every push/PR to `main`:

```yaml
# .github/workflows/playwright.yml
- name: Run BDD tests
  run: npm test    # bddgen && playwright test
```

The HTML report is uploaded as an artifact and retained for 30 days.

---

## 📦 Push to GitHub

```bash
git init
git add .
git commit -m "feat: BDD Cucumber automation with Playwright + POM"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

> The `.gitignore` already excludes `node_modules/`, `test-results/`, `playwright-report/`, and `.features-gen/`.

---

## 🛠️ Technologies

| Tool | Role |
|---|---|
| [Playwright](https://playwright.dev) | E2E + API Testing Framework |
| [playwright-bdd](https://vitalets.github.io/playwright-bdd/) | Cucumber/Gherkin integration with Playwright |
| [Gherkin](https://cucumber.io/docs/gherkin/) | BDD specification language |
| TypeScript | Implementation language |
| GitHub Actions | CI/CD |

---

## 📌 Notes

- **Demo Web Shop** is a public practice site. Registration emails must be unique (the `uniqueEmail()` helper in `data/demoshop.ts` generates emails with a timestamp).
- **Dummy REST API** has aggressive rate limiting (HTTP 429). The `apiRequest()` helper in `utils/dummyApiClient.ts` implements automatic retries with backoff and `coolDown()` between requests.
- The files in `.features-gen/` are **auto-generated** by `bddgen` and should not be edited manually or committed.
