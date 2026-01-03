import { describe, it, expect, beforeEach } from 'vitest';
import { paletteStore } from '$lib/store/PaletteStore';
import { get } from 'svelte/store';

describe('paletteStore', () => {
	beforeEach(() => {
		// Reset store to initial state
		paletteStore.set({
			isVisible: false,
			textInput: '',
			commands: [],
			storeMethods: {},
			actionMap: {},
			activeCommandId: 0,
			selectedCommandId: 0,
			calledActions: [],
			results: []
		});
	});

	describe('initial state', () => {
		it('should have correct initial values', () => {
			const state = get(paletteStore);

			expect(state.isVisible).toBe(false);
			expect(state.textInput).toBe('');
			expect(state.commands).toEqual([]);
			expect(state.calledActions).toEqual([]);
			expect(state.results).toEqual([]);
		});
	});

	describe('update', () => {
		it('should update isVisible', () => {
			paletteStore.update((n) => ({ ...n, isVisible: true }));

			const state = get(paletteStore);
			expect(state.isVisible).toBe(true);
		});

		it('should update textInput', () => {
			paletteStore.update((n) => ({ ...n, textInput: 'search query' }));

			const state = get(paletteStore);
			expect(state.textInput).toBe('search query');
		});

		it('should update commands', () => {
			const commands = [{ title: 'Test', actionId: '1' }];
			paletteStore.update((n) => ({ ...n, commands }));

			const state = get(paletteStore);
			expect(state.commands).toEqual(commands);
		});

		it('should update activeCommandId', () => {
			paletteStore.update((n) => ({ ...n, activeCommandId: 'active-1' }));

			const state = get(paletteStore);
			expect(state.activeCommandId).toBe('active-1');
		});

		it('should update calledActions', () => {
			paletteStore.update((n) => ({
				...n,
				calledActions: ['action-1', 'action-2']
			}));

			const state = get(paletteStore);
			expect(state.calledActions).toEqual(['action-1', 'action-2']);
		});

		it('should update results', () => {
			const results = [
				{ title: 'Result 1', actionId: 'r1' },
				{ title: 'Result 2', actionId: 'r2' }
			];
			paletteStore.update((n) => ({ ...n, results }));

			const state = get(paletteStore);
			expect(state.results).toEqual(results);
		});
	});

	describe('subscribe', () => {
		it('should notify subscribers on changes', () => {
			let notifiedValue: any = null;

			const unsubscribe = paletteStore.subscribe((value) => {
				notifiedValue = value;
			});

			paletteStore.update((n) => ({ ...n, isVisible: true }));

			expect(notifiedValue.isVisible).toBe(true);

			unsubscribe();
		});

		it('should allow multiple subscribers', () => {
			let count = 0;

			const unsub1 = paletteStore.subscribe(() => {
				count++;
			});
			const unsub2 = paletteStore.subscribe(() => {
				count++;
			});

			paletteStore.update((n) => ({ ...n, textInput: 'test' }));

			expect(count).toBeGreaterThan(2); // Initial calls + update

			unsub1();
			unsub2();
		});
	});

	describe('set', () => {
		it('should replace entire state', () => {
			const newState = {
				isVisible: true,
				textInput: 'new text',
				commands: [{ title: 'New', actionId: 'new' }],
				storeMethods: {},
				actionMap: {},
				activeCommandId: 'new-active',
				selectedCommandId: 'new-selected',
				calledActions: ['called-1'],
				results: []
			};

			paletteStore.set(newState);

			const state = get(paletteStore);
			expect(state).toEqual(newState);
		});
	});
});

