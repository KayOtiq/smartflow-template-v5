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

---
For more details, see the codebase and referenced instructions files.
