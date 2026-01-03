import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineActions, createFuse, formatResults, runAction, groupActions } from '$lib/utils';
import createActionMap from '$lib/utils/createActionMap';
import createStoreMethods from '$lib/utils/createStoreMethods';
import { paletteStore } from '$lib/store/PaletteStore';
import { get } from 'svelte/store';

describe('Command Palette Integration', () => {
	beforeEach(() => {
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

	describe('Complete workflow', () => {
		it('should handle complete action definition and execution flow', () => {
			const onRunSpy = vi.fn();

			// 1. Define actions
			const actions = defineActions([
				{
					title: 'Open Settings',
					subTitle: 'Configure your preferences',
					actionId: 'settings',
					keywords: ['config', 'preferences'],
					onRun: onRunSpy
				},
				{
					title: 'Toggle Dark Mode',
					subTitle: 'Switch theme',
					actionId: 'dark-mode',
					onRun: vi.fn()
				}
			]);

			// 2. Create action map
			const actionMap = createActionMap(actions);

			// 3. Setup store
			const storeMethods = createStoreMethods();
			paletteStore.update((n) => ({
				...n,
				commands: actions,
				actionMap,
				storeMethods
			}));

			// 4. Open palette
			storeMethods.openPalette();
			expect(get(paletteStore).isVisible).toBe(true);

			// 5. Get action from map
			const settingsAction = actionMap['settings'];
			expect(settingsAction).toBeDefined();
			expect(settingsAction.title).toBe('Open Settings');

			// 6. Execute action
			runAction({ action: settingsAction });

			// 7. Verify execution
			expect(onRunSpy).toHaveBeenCalled();
			expect(get(paletteStore).isVisible).toBe(false);
			expect(get(paletteStore).calledActions).toContain('settings');
		});

		it('should handle search and filter flow', () => {
			const actions = defineActions([
				{
					title: 'Open Settings',
					subTitle: 'Configure preferences',
					keywords: ['config'],
					actionId: 'settings'
				},
				{
					title: 'Toggle Dark Mode',
					subTitle: 'Switch theme',
					keywords: ['theme'],
					actionId: 'dark-mode'
				},
				{
					title: 'Search Files',
					subTitle: 'Find files',
					keywords: ['find'],
					actionId: 'search'
				}
			]);

			// Create fuse search
			const fuse = createFuse(actions);

			// Search for "settings"
			const settingsResults = formatResults(fuse.search('settings'));
			expect(settingsResults.length).toBeGreaterThan(0);
			expect(settingsResults[0].actionId).toBe('settings');

			// Search for "theme"
			const themeResults = formatResults(fuse.search('theme'));
			expect(themeResults.length).toBeGreaterThan(0);
			expect(themeResults[0].actionId).toBe('dark-mode');

			// Search for non-existent
			const noResults = formatResults(fuse.search('xyz123'));
			expect(noResults).toHaveLength(0);
		});

		it('should handle action grouping flow', () => {
			const actions = defineActions([
				{ title: 'Settings', group: 'System', actionId: '1' },
				{ title: 'Profile', group: 'User', actionId: '2' },
				{ title: 'Logout', group: 'User', actionId: '3' },
				{ title: 'Help', actionId: '4' } // Ungrouped
			]);

			const grouped = groupActions(actions);

			// Should have 3 groups: '', 'System', 'User'
			expect(grouped.size).toBe(3);
			expect(grouped.get('')).toHaveLength(1); // Ungrouped
			expect(grouped.get('System')).toHaveLength(1);
			expect(grouped.get('User')).toHaveLength(2);
		});

		it('should handle conditional action execution', () => {
			const onRunSpy = vi.fn();
			let canRun = false;

			const [action] = defineActions([
				{
					title: 'Conditional Action',
					actionId: 'conditional',
					canActionRun: () => canRun,
					onRun: onRunSpy
				}
			]);

			// Should not run when canRun is false
			runAction({ action });
			expect(onRunSpy).not.toHaveBeenCalled();

			// Should run when canRun is true
			canRun = true;
			runAction({ action });
			expect(onRunSpy).toHaveBeenCalled();
		});
	});

	describe('Store methods integration', () => {
		it('should track action history', () => {
			const storeMethods = createStoreMethods();

			// Store some actions
			storeMethods.storeCalledAction('action-1');
			storeMethods.storeCalledAction('action-2');
			storeMethods.storeCalledAction('action-3');

			const state = get(paletteStore);
			expect(state.calledActions.length).toBeGreaterThanOrEqual(3);

			// Revert last action
			storeMethods.revertLastAction('action-3');

			// Reset log
			storeMethods.resetActionLog();
			expect(get(paletteStore).calledActions).toEqual([]);
		});

		it('should manage palette visibility', () => {
			const storeMethods = createStoreMethods();

			// Initial state
			expect(get(paletteStore).isVisible).toBe(false);

			// Open
			storeMethods.openPalette();
			expect(get(paletteStore).isVisible).toBe(true);

			// Close
			storeMethods.closePalette();
			expect(get(paletteStore).isVisible).toBe(false);

			// Toggle
			storeMethods.togglePalette();
			expect(get(paletteStore).isVisible).toBe(true);

			storeMethods.togglePalette();
			expect(get(paletteStore).isVisible).toBe(false);
		});
	});

	describe('Edge cases', () => {
		it('should handle empty action array', () => {
			const actions = defineActions([]);
			const actionMap = createActionMap(actions);
			const fuse = createFuse(actions);

			expect(actions).toHaveLength(0);
			expect(Object.keys(actionMap)).toHaveLength(0);
			expect(fuse.search('test')).toHaveLength(0);
		});

		it('should handle action without optional fields', () => {
			const [action] = defineActions([{ title: 'Minimal' }]);

			expect(action.title).toBe('Minimal');
			expect(typeof action.actionId).toBe('number'); // Auto-generated
			expect(action.subTitle).toBe('');
			expect(action.keywords).toEqual([]);
			expect(action.shortcut).toBe('');
		});

		it('should handle rapid palette toggling', () => {
			const storeMethods = createStoreMethods();

			for (let i = 0; i < 10; i++) {
				storeMethods.togglePalette();
			}

			// After 10 toggles (even number), should be closed
			expect(get(paletteStore).isVisible).toBe(false);

			storeMethods.togglePalette(); // 11th toggle
			expect(get(paletteStore).isVisible).toBe(true);
		});

		it('should handle special characters in search', () => {
			const actions = defineActions([
				{ title: 'Test @special', actionId: '1' },
				{ title: 'Test #hashtag', actionId: '2' },
				{ title: 'Test $dollar', actionId: '3' }
			]);

			const fuse = createFuse(actions);

			// Should handle special chars gracefully
			expect(() => fuse.search('@special')).not.toThrow();
			expect(() => fuse.search('#hashtag')).not.toThrow();
			expect(() => fuse.search('$dollar')).not.toThrow();
		});

		it('should handle very long action titles', () => {
			const longTitle = 'A'.repeat(1000);
			const actions = defineActions([{ title: longTitle, actionId: 'long' }]);

			const actionMap = createActionMap(actions);
			expect(actionMap['long'].title).toBe(longTitle);
		});
	});
});

