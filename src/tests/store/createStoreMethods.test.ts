import { describe, it, expect, beforeEach } from 'vitest';
import createStoreMethods from '$lib/utils/createStoreMethods';
import { paletteStore } from '$lib/store/PaletteStore';
import { get } from 'svelte/store';

describe('createStoreMethods', () => {
	beforeEach(() => {
		// Reset the store before each test
		paletteStore.set({
			isVisible: false,
			textInput: '',
			commands: [],
			storeMethods: {},
			actionMap: {},
			activeCommandId: null,
			selectedCommandId: null,
			calledActions: [],
			results: []
		});
	});

	describe('openPalette', () => {
		it('should set isVisible to true', () => {
			const { openPalette } = createStoreMethods();

			openPalette();

			const store = get(paletteStore);
			expect(store.isVisible).toBe(true);
		});
	});

	describe('closePalette', () => {
		it('should set isVisible to false', () => {
			paletteStore.update((n) => ({ ...n, isVisible: true }));
			const { closePalette } = createStoreMethods();

			closePalette();

			const store = get(paletteStore);
			expect(store.isVisible).toBe(false);
		});

		it('should reset store to default state', () => {
			paletteStore.update((n) => ({
				...n,
				isVisible: true,
				textInput: 'search query',
				activeCommandId: 'some-id',
				results: [{ title: 'test', actionId: '1' }]
			}));
			const { closePalette } = createStoreMethods();

			closePalette();

			const store = get(paletteStore);
			expect(store.isVisible).toBe(false);
			expect(store.textInput).toBe('');
			expect(store.activeCommandId).toBe(null);
			expect(store.results).toEqual([]);
		});
	});

	describe('togglePalette', () => {
		it('should toggle isVisible from false to true', () => {
			const { togglePalette } = createStoreMethods();

			togglePalette();

			const store = get(paletteStore);
			expect(store.isVisible).toBe(true);
		});

		it('should toggle isVisible from true to false', () => {
			paletteStore.update((n) => ({ ...n, isVisible: true }));
			const { togglePalette } = createStoreMethods();

			togglePalette();

			const store = get(paletteStore);
			expect(store.isVisible).toBe(false);
		});

		it('should reset activeCommandId when toggling', () => {
			paletteStore.update((n) => ({ ...n, activeCommandId: 'some-id' }));
			const { togglePalette } = createStoreMethods();

			togglePalette();

			const store = get(paletteStore);
			expect(store.activeCommandId).toBe('');
		});
	});

	describe('resetPaletteStore', () => {
		it('should reset to default state', () => {
			paletteStore.update((n) => ({
				...n,
				isVisible: true,
				textInput: 'query',
				activeCommandId: 'id',
				selectedCommandId: 'selected',
				results: [{ title: 'test', actionId: '1' }]
			}));
			const { resetPaletteStore } = createStoreMethods();

			resetPaletteStore();

			const store = get(paletteStore);
			expect(store.isVisible).toBe(false);
			expect(store.textInput).toBe('');
			expect(store.activeCommandId).toBe(null);
			expect(store.selectedCommandId).toBe(null);
			expect(store.results).toEqual([]);
		});
	});

	describe('storeCalledAction', () => {
		it('should add action id to calledActions', () => {
			const storeMethods = createStoreMethods();

			storeMethods.storeCalledAction('action-1');

			const store = get(paletteStore);
			expect(store.calledActions).toContain('action-1');
		});

		it('should accumulate multiple action ids', () => {
			const storeMethods = createStoreMethods();

			storeMethods.storeCalledAction('action-1');
			storeMethods.storeCalledAction('action-2');

			const store = get(paletteStore);
			expect(store.calledActions.length).toBeGreaterThanOrEqual(2);
		});
	});

	describe('getAllCalledActions', () => {
		it('should return empty array initially', () => {
			const { getAllCalledActions } = createStoreMethods();

			const result = getAllCalledActions();

			expect(result).toEqual([]);
		});
	});

	describe('revertLastAction', () => {
		it('should remove last action from calledActions', () => {
			paletteStore.update((n) => ({
				...n,
				calledActions: ['action-1', 'action-2', 'action-3']
			}));
			const storeMethods = createStoreMethods();

			storeMethods.revertLastAction('action-3');

			const store = get(paletteStore);
			expect(store.calledActions).not.toContain('action-3');
		});
	});

	describe('resetActionLog', () => {
		it('should clear calledActions array', () => {
			paletteStore.update((n) => ({
				...n,
				calledActions: ['action-1', 'action-2']
			}));
			const { resetActionLog } = createStoreMethods();

			resetActionLog();

			const store = get(paletteStore);
			expect(store.calledActions).toEqual([]);
		});
	});

	describe('returned methods object', () => {
		it('should return all expected methods', () => {
			const methods = createStoreMethods();

			expect(typeof methods.togglePalette).toBe('function');
			expect(typeof methods.getAllCalledActions).toBe('function');
			expect(typeof methods.storeCalledAction).toBe('function');
			expect(typeof methods.revertLastAction).toBe('function');
			expect(typeof methods.resetActionLog).toBe('function');
			expect(typeof methods.openPalette).toBe('function');
			expect(typeof methods.closePalette).toBe('function');
			expect(typeof methods.resetPaletteStore).toBe('function');
		});
	});
});

