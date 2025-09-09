const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./browser.ts'],
    bundle: true,
    outfile: './browser.js',
    format: 'iife',
    platform: 'browser',
    globalName: 'mswMocks',
    sourcemap: false,
    target: ['chrome58', 'firefox57', 'safari11'],
    external: ['msw', 'msw/browser'],
  })
  .catch(() => process.exit(1));
