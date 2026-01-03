import { vi } from 'vitest';

// Mock tinykeys for unit tests
vi.mock('tinykeys', () => ({
	tinykeys: vi.fn(() => vi.fn()),
	parseKeybinding: vi.fn((key: string) => [[key]])
}));

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
}));

