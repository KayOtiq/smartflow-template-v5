# App Template Creation Script

## Usage

From the root of your monorepo, run:

```
node scripts/create-app-template.js <app-name>
```

This will create a new app scaffold in `/apps/<app-name>/` with:
- `pages/` (page objects)
- `tests/` (user journey tests)
- `user-journeys/` (optional workflow modules)
- `config/` (app-specific config)
- `README.md` (app documentation)
- `playwright.config.ts` (Playwright config)
- `tsconfig.json` (TypeScript config)

You can then add your page objects, user journey tests, and configs as needed.
