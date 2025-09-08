# Copilot Instructions for smartflow-template-v5-0

## Architecture Overview
- **Playwright + TypeScript**: Automated UI testing using Playwright, organized with TypeScript and the Page Object Model (POM).
- **Page Objects**: All page objects are in `pages/` and extend `BasePage`. Each page class encapsulates its own locators and actions via `initializeLocators`.
- **Page Manager**: `PageManager` (in `pages/pageManager.ts`) centralizes access to all page objects. Use `onXPage()` methods to get page instances in tests.
- **Test Files**: All tests are in `tests/`, named `<feature-or-page>.spec.ts`. Use one file per major feature or page.

## Key Patterns & Conventions
- **Locators**: Always use Playwright's recommended built-in locators (`getByRole`, `getByLabel`, `getByText`, etc.) for all selectors. Avoid CSS/XPath unless absolutely necessary. See [Playwright Locator Docs](https://playwright.dev/docs/locators) for best practices.
- **Assertions**: Prefer web-first, auto-retrying assertions (e.g., `await expect(locator).toHaveText()`).
- **Test Structure**: Use `test.describe()` to group related tests. Use `beforeEach` for setup. Instantiate `PageManager` via fixtures for access to all page objects.
- **Naming**: Test and step titles should be descriptive and intent-revealing. Test files follow the `<feature-or-page>.spec.ts` pattern.
- **Encapsulation**: Page classes should expose only necessary actions. Keep locators/methods private unless needed externally.

## Developer Workflows
- **Install dependencies**: `pnpm install` (enforced via `only-allow` and `.npmrc`)
- **Run tests**: `pnpm exec playwright test`
- **Lint/Format**: `pnpm lint` and `pnpm format` (ESLint/Prettier enforced via Husky pre-commit hook)
- **Debug**: Use Playwright's built-in debugging tools and `test.step()` for granular reporting.
- **CI**: See `.github/workflows/playwright.yml` for GitHub Actions setup. CI uses pnpm and runs Playwright tests on push/PR.

## Example Usage
```typescript
import { test } from '../pages/pageManager';

test.describe('Feature', () => {
  test('Scenario', async ({ pm }) => {
    await pm.onHomePage().navigateTo('/');
    await expect(pm.onHomePage().locators.logo).toBeVisible();
  });
});
```

## Integration & External Dependencies
- **Playwright**: Main test runner and browser automation tool.
- **pnpm**: Required package manager (see `.npmrc` and `preinstall` script).
- **Husky/lint-staged**: Enforces code quality on commit.

## References
- Page objects: `pages/`
- Test entry: `tests/`
- Page manager: `pages/pageManager.ts`
- CI: `.github/workflows/playwright.yml`
- Test writing: `.github/workflows/instructions/playwright.instructions.md`
- Playwright locator best practices: https://playwright.dev/docs/locators

---
If any conventions or patterns are unclear, check the referenced files or ask for clarification. Update this file as the project evolves.
