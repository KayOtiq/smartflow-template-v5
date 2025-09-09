import { test as base } from '@playwright/test';
import axios, { AxiosInstance } from 'axios';

// Define the type for the API client fixture
interface Fixtures {
  api: AxiosInstance;
}

export const test = base.extend<Fixtures>({
  api: async ({}, use) => {
    // Configure the API client (baseURL, auth, etc. as needed)
    const client = axios.create({
      baseURL: 'https://api.thirdparty.com',
      timeout: 5000,
      // headers: { Authorization: 'Bearer ...' },
    });
    await use(client);
    // Optionally, add cleanup logic here
  },
});

export { expect } from '@playwright/test';
