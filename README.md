# smartflow-template-v5-0

## Project Overview

Automated UI testing for https://practicesoftwaretesting.com/ using Playwright, TypeScript, and the Page Object Model.

## Prerequisites

- Node.js v20 or higher
- pnpm (install globally: `npm install -g pnpm`)
- Git (for version control, optional if just extracting zip)

## Quick Setup

1. Extract the zip.
2. Open a terminal in the project root.

3. **Install pnpm** (if not already):
   ```sh
   npm install -g pnpm
   ```
4. **Initialize Git:** (optional if just extracting the zip)
```
  git init
```
3. **Install dependencies:**
   ```sh
   pnpm install
   ```

## Running Tests

- **Run all tests for a specific app (from monorepo root):**
This command is a shortcut from package.json script

  ```sh
  pnpm run test:practice-software-testing
  ```

  This runs all Playwright tests in `apps/practice-software-testing/tests` using the app's config.  
  Run this test first to confirm setup 

- **Run a specific test file (from monorepo root):**
This is the long CLI command

  ```sh
  pnpm exec playwright test apps/practice-software-testing/tests/add-pliers-to-cart.spec.ts --config=apps/practice-software-testing/playwright.config.ts
  ```

**Run a specific test on a specific browser:**
- Add the "-project=<browser_name>"
- Refer to the playwright.config for browser name from the project list

  ```sh
  pnpm exec playwright test apps/practice-software-testing/tests/add-pliers-to-cart.spec.ts --config=apps/practice-software-testing/playwright.config.ts --project=chromium
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

## Troubleshooting
- If you see “pnpm: command not found”, run:
``` npm install -g pnpm. ```
- For Windows users, use PowerShell or Command Prompt for commands.
- If tests fail due to browser dependencies, run:
```pnpm exec playwright install --with-deps```

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



---

For more details, see the codebase and referenced instructions files.
