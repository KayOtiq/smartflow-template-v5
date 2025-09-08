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
- Run all tests:
  ```sh
  pnpm exec playwright test
  ```
- View HTML report:
  ```sh
  pnpm exec playwright show-report
  ```
- Run a specific test:
  ```sh
  pnpm exec playwright test tests/add-pliers-to-cart.spec.ts
  ```

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

---
For more details, see the codebase and referenced instructions files.
