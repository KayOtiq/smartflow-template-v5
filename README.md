# smartflow-template-v5-0

## Project Overview
Automated UI testing for https://practicesoftwaretesting.com/ using Playwright, TypeScript, and the Page Object Model.

## Setup
1. **Install pnpm** (if not already):
   ```sh
   npm install -g pnpm
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```


## Running Tests

- **Run all tests for a specific app (from monorepo root):**
  ```sh
  pnpm run test:practice-software-testing
  ```
  This runs all Playwright tests in `apps/practice-software-testing/tests` using the app's config.

- **Run a specific test file (from monorepo root):**
  ```sh
  pnpm exec playwright test apps/practice-software-testing/tests/add-pliers-to-cart.spec.ts --config=apps/practice-software-testing/playwright.config.ts
  ```

- **View HTML report:**
  ```sh
  pnpm exec playwright show-report apps/practice-software-testing/playwright-report
  ```

- **(Legacy) Run all tests in all apps:**
  ```sh
  pnpm exec playwright test
  ```
  (This will only work if all testDirs and configs are compatible.)

## Linting & Formatting
- Lint code:
  ```sh
  pnpm lint
  ```
- Format code:
  ```sh
  pnpm format
  ```

## Contribution Guidelines
- All code must pass linting and tests before merging.
- Use Playwright's built-in locators and follow the page object model.
- See `.github/copilot-instructions.md` for AI agent and code convention details.

## CI/CD
- GitHub Actions runs all tests and lint checks on push/PR (see `.github/workflows/playwright.yml`).
- Branch protection and required checks are recommended for main/master.

## Test Coverage
- To collect coverage:
  ```sh
  pnpm exec playwright test --coverage
  ```
- Coverage report will be available in the `coverage/` directory.

# Monorepo User Journey Automation

## Project Structure Walkthrough

```
/apps/
  /practice-software-testing/
    /pages/           # Page objects for this app
    /tests/           # User journey test files
    /user-journeys/   # (Optional) Workflow modules
    /config/          # App-specific config
    README.md         # App documentation
    playwright.config.ts
    tsconfig.json
/packages/
  /workflows/         # Shared user journey modules
  /api-helpers/       # Shared API helpers
  /ui-helpers/        # Shared UI helpers
  /test-data/         # Test data factories/utilities
pnpm-workspace.yaml   # Monorepo workspace config
README.md             # (This file)
```

- Each app in `/apps/` is a self-contained user journey automation project.
- Shared code lives in `/packages/` for maximum reuse.
- Use pnpm workspaces for dependency management and cross-app sharing.

## How to Add a New App

1. **Run the App Template Script:**
   ```
   node scripts/create-app-template.js <app-name>
   ```
   This creates `/apps/<app-name>/` with all required folders and configs.

2. **Add Page Objects:**
   - Place page object files in `/apps/<app-name>/pages/`.

3. **Write User Journey Tests:**
   - Add test files in `/apps/<app-name>/tests/`.

4. **(Optional) Add Workflow Modules:**
   - Place reusable workflow logic in `/apps/<app-name>/user-journeys/`.

5. **Update Configs:**
   - Edit `playwright.config.ts` and `tsconfig.json` as needed for your app.

6. **Install Dependencies:**
   - From the root, run:
     ```
     pnpm install
     ```

7. **Run Tests:**
   - From the app directory:
     ```
     pnpm exec playwright test
     ```

8. **Use Shared Packages:**
   - Import helpers or workflows from `/packages/` as needed.

## API Mocking Approaches

### 1. Playwright Built-in Mocking (Recommended for Most Tests)
- Use `page.route` to intercept and mock API requests directly in your tests.
- Fast, reliable, and no build step required.
- Example:
  ```typescript
  await page.route('https://api.thirdparty.com/user/123', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ id: '123', name: 'Mocked User', email: 'mocked@example.com' }),
    });
  });
  ```
- See `apps/practice-software-testing/tests/playwright-mock-demo.spec.ts` for a working example.

### 2. MSW (Mock Service Worker) for Advanced/Large-Scale Mocking
- Use MSW if you need to share mocks between frontend/backend, simulate complex scenarios, or want a declarative mock layer.
- Requires a more advanced browser build setup (see `mocks/` for starter files).
- See `apps/practice-software-testing/mocks/handlers.ts` for handler examples.
- Note: Browser injection of MSW requires bundling all dependencies together (see project notes).

## Mocking APIs with MSW

- **Build MSW mocks for Playwright browser tests:**
  ```sh
  pnpm run build:mocks:practice-software-testing
  ```
  This compiles TypeScript mocks in `apps/practice-software-testing/mocks/` to JavaScript for browser injection.

- **How to use in a Playwright test:**
  1. Build the mocks (see above).
  2. In your test, inject the MSW worker before page loads:
     ```typescript
     await page.addInitScript({ path: require.resolve('../mocks/browser.js') });
     await page.evaluate(async () => {
       // @ts-ignore
       if (window.worker) await window.worker.start();
     });
     ```
  3. Any requests to mocked endpoints will be intercepted by MSW.

- **Example test:** See `apps/practice-software-testing/tests/msw-demo.spec.ts` for a working example.

---
For more details, see the codebase and referenced instructions files.
