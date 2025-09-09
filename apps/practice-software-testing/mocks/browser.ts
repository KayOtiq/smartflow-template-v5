import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Attach the worker to window for Playwright to access
(window as any).worker = setupWorker(...handlers);
