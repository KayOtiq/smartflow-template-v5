# Allure Reporting Integration for Playwright

This guide explains how to set up Allure reporting for Playwright tests in this monorepo.

## 1. Install Allure Playwright Reporter

Run the following command from the monorepo root:

```
pnpm add -D allure-playwright
```

## 2. Update Playwright Config

In your Playwright config (e.g., `apps/practice-software-testing/playwright.config.ts`), add the Allure reporter:

```ts
import { defineConfig } from '@playwright/test';
import { AllureReporter } from 'allure-playwright';

export default defineConfig({
  // ...existing config...
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
```

## 3. Run Tests and Generate Allure Results

Run your Playwright tests as usual. Allure results will be saved in the `allure-results` directory by default.

```
pnpm exec playwright test
```

## 4. Generate and View Allure Report

Install the Allure CLI globally if you haven't already:

```
pnpm add -g allure-commandline
```

Then generate and open the report:

```
allure generate allure-results --clean -o allure-report
allure open allure-report
```


## 5. Automated Report Generation

You can now generate and open the Allure report with a single command:

```
pnpm run allure:report
```

This will:
- Generate a new Allure report from the latest test results
- Open the report in your browser

You can also use these scripts individually:
- `pnpm run allure:generate` — Generate the report only
- `pnpm run allure:open` — Open the existing report

---

For more advanced usage, see the [allure-playwright documentation](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright).
