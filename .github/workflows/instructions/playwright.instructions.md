---
description: 'Playwright test generation instructions'
applyTo: '**'
---

## Test Writing Guidelines

### Code Quality Standards
- **Locators**: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Simplicity**: Keep tests focused on a single feature or user flow. Avoid complex logic, loops, or conditionals within tests.
- **Reusability**: Use the Page Object Model (POM) to encapsulate page-specific logic and locators. This promotes code reuse and maintainability.
-**Architecture**: Structure tests and page objects in a clear, organized manner. Group related tests and page objects together. Use object-oriented and SOLID principles  to enhance code clarity and maintainability.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.
- **Error Handling**: Avoid try-catch blocks unless absolutely necessary. Let tests fail naturally to surface issues.

### Page Object Model Structure
- **BasePage**: Use `BasePage` class for common methods and properties shared across all pages (e.g., navigation, common elements).
- **Specific Page Classes**: Create separate classes for each page (e.g., `HomePage`, `SettingsPage`, `FormPage`) that extend `BasePage`. Each class should encapsulate page-specific locators and methods.
- **Page Manager**: Implement a `PageManager` class to instantiate and provide access to different page objects. This promotes cleaner test code by centralizing page object management.
- **Encapsulation**: Keep locators and methods private within page classes. Expose only necessary actions through public methods.
- **Interface Locators**: Ensure page classes provide a clear and concise interface for interacting with the page, abstracting away implementation details.


### Test Structure
- **Imports**: Start with `import { test, expect } from '@playwright/test';`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.
- Instantiate `PageManager` in test fixtures to ensure each test has access to the necessary page objects.

### Spec per User Journey/Workflow

For every distinct user journey, create a dedicated Playwright spec file in `tests/workflows/`, using TypeScript and the PageManager + interface-based locator pattern. Primary user journeys **must** each have their own spec.  For example:

- `tests/workflows/workOrder.create.spec.ts` — *Create Work Order*
- `tests/workflows/workOrder.modify.spec.ts` — *Modify Work Order*
- `tests/workflows/workOrder.cancel.spec.ts` — *Cancel Work Order*

Each user journey spec should:

- Import `test` from `src/pages/PageManager` and use typed Page Objects (no raw locators in specs).
- Include at least one **happy path** and one **guardrail/negative** test.
- Use descriptive `describe`/`test` names (e.g., `describe('Journey: Work Order – Create')`).
- Be self-contained (data setup/teardown lives in the spec or shared helpers), and not mix multiple journeys in the same file.  Tests should be atomic and independent. 
- If a test depends on another, it should be refactored to avoid that dependency. Use mocking, API calls or direct database setup for test data when possible to speed up tests and reduce UI dependencies.


### File Organization
- **Location**: Store all test files in the `tests/` directory.
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `search.spec.ts`).
- **Scope**: Aim for one test file per user journey.

### Assertion Best Practices
- **UI Structure**: Use `toMatchAriaSnapshot` to verify the accessibility tree structure of a component. This provides a comprehensive and accessible snapshot.
- **Element Counts**: Use `toHaveCount` to assert the number of elements found by a locator.
- **Text Content**: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- **Navigation**: Use `toHaveURL` to verify the page URL after an action.


## Example Page Object Structure
```typescript
import {Page} from '@playwright/test'
import { BasePage } from './basePage';

interface Locators {
    [key: string]: string;
}
export class NavigationPage extends BasePage {
    protected initializeLocators(page: Page): Locators {
        return {
            homeLink: 'a[aria-label="Home"]',
            aboutLink: 'a[aria-label="About"]',
            contactLink: 'a[aria-label="Contact"]',
            servicesLink: 'a[aria-label="Services"]',
            blogLink: 'a[aria-label="Blog"]',
        }; 
    }
}

```


## Example Test Structure

```typescript
import {  expect } from '@playwright/test';
import { test } from '../pages/pageManager';

test.describe('Movie Search Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  });

  test('Search for a movie by title', async ({ pm }) => {
    await test.step('Activate and perform search', async () => {
      await page.getByRole('search').click();
      const searchInput = page.getByRole('textbox', { name: 'Search Input' });
      await searchInput.fill('Garfield');
      await searchInput.press('Enter');
    });

    await test.step('Verify search results', async () => {
      // Verify the accessibility tree of the search results
      await expect(page.getByRole('main')).toMatchAriaSnapshot(`
        - main:
          - heading "Garfield" [level=1]
          - heading "search results" [level=2]
          - list "movies":
            - listitem "movie":
              - link "poster of The Garfield Movie The Garfield Movie rating":
                - /url: /playwright-movies-app/movie?id=tt5779228&page=1
                - img "poster of The Garfield Movie"
                - heading "The Garfield Movie" [level=2]
      `);
    });
  });
});
```

## Test Execution Strategy

1. **Initial Run**: Execute tests with `pnpm exec playwright test --project=chromium`
2. **Debug Failures**: Analyze test failures and identify root causes
3. **Iterate**: Refine locators, assertions, or test logic as needed
4. **Validate**: Ensure tests pass consistently and cover the intended functionality
5. **Report**: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:
- [ ] All locators are accessible and specific and avoid strict mode violations
- [ ] Tests are grouped logically and follow a clear structure
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented