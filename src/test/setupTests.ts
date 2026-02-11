import '@testing-library/jest-dom';
import { vi } from 'vitest';


vi.mock('../../services/api', () => ({
  fetchVacancies: vi.fn(() => Promise.resolve({
    items: [],
    found: 0,
    pages: 0,
    page: 0,
  })),
}));


Object.defineProperty(window, 'open', {
  value: vi.fn(),
});


vi.useFakeTimers();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, 
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
