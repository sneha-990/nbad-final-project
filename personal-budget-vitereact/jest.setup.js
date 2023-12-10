// jest.setup.js

import { worker } from './src/mocks/browser';

beforeAll(() => {
  worker.start();
});

afterAll(() => {
  worker.stop();
});
