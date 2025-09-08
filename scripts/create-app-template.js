#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const appName = process.argv[2];
if (!appName) {
  console.error('Usage: node create-app-template.js <app-name>');
  process.exit(1);
}

const appRoot = path.join(__dirname, '../apps', appName);
const dirs = ['pages', 'tests', 'user-journeys', 'config'];

if (fs.existsSync(appRoot)) {
  console.error(`App directory ${appRoot} already exists.`);
  process.exit(1);
}

fs.mkdirSync(appRoot, { recursive: true });
dirs.forEach((dir) => fs.mkdirSync(path.join(appRoot, dir)));

// README.md
fs.writeFileSync(path.join(appRoot, 'README.md'), `# ${appName}\n\nUser journey automation app.\n`);

// playwright.config.ts
fs.writeFileSync(
  path.join(appRoot, 'playwright.config.ts'),
  `import { defineConfig } from '@playwright/test';\n\nexport default defineConfig({\n  testDir: './tests',\n  timeout: 30000,\n  expect: { timeout: 5000 },\n  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],\n  use: {\n    baseURL: 'http://localhost:3000',\n    trace: 'on-first-retry',\n  },\n  projects: [\n    { name: 'chromium', use: { browserName: 'chromium' } },\n    { name: 'firefox', use: { browserName: 'firefox' } },\n    { name: 'webkit', use: { browserName: 'webkit' } },\n  ],\n});\n`,
);

// tsconfig.json
fs.writeFileSync(
  path.join(appRoot, 'tsconfig.json'),
  `{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["pages/*"],
      "@tests/*": ["tests/*"]
    }
  },
  "include": ["pages", "tests"]
}
`,
);

console.log(`App template created at ${appRoot}`);
