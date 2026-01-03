import { describe, it, expect, vi, beforeEach } from 'vitest';
import createShortcuts from '$lib/utils/createShortcuts';
import { defineActions } from '$lib/utils';
import { paletteStore } from '$lib/store/PaletteStore';

describe('createShortcuts', () => {
	beforeEach(() => {
		// Reset store
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

	it('should create shortcut map from actions', () => {
		const actions = defineActions([
			{ title: 'Action 1', shortcut: '$mod+a', actionId: '1' },
			{ title: 'Action 2', shortcut: '$mod+b', actionId: '2' }
		]);

		const result = createShortcuts({ actions });

		expect(result['$mod+a']).toBeDefined();
		expect(result['$mod+b']).toBeDefined();
		expect(typeof result['$mod+a']).toBe('function');
		expect(typeof result['$mod+b']).toBe('function');
	});

	it('should return empty object for empty actions', () => {
		const result = createShortcuts({ actions: [] });
		expect(result).toEqual({});
	});

	it('should skip actions without shortcuts', () => {
		const actions = defineActions([
			{ title: 'With Shortcut', shortcut: '$mod+w', actionId: '1' },
			{ title: 'Without Shortcut', actionId: '2' }
		]);

		const result = createShortcuts({ actions });

		expect(Object.keys(result)).toHaveLength(1);
		expect(result['$mod+w']).toBeDefined();
	});

	it('should not execute when palette is visible', () => {
		const onRun = vi.fn();
		const actions = defineActions([
			{ title: 'Test', shortcut: '$mod+t', actionId: '1', onRun }
		]);

		// Set palette to visible
		paletteStore.update((n) => ({ ...n, isVisible: true }));

		const shortcuts = createShortcuts({ actions });
		const mockEvent = { preventDefault: vi.fn() } as unknown as KeyboardEvent;

		// Call the shortcut handler
		shortcuts['$mod+t'](mockEvent);

		// onRun should not be called when palette is visible
		expect(onRun).not.toHaveBeenCalled();
	});

	it('should execute when palette is not visible', () => {
		const onRun = vi.fn();
		const actions = defineActions([
			{ title: 'Test', shortcut: '$mod+t', actionId: '1', onRun }
		]);

		const shortcuts = createShortcuts({ actions });
		const mockEvent = { preventDefault: vi.fn() } as unknown as KeyboardEvent;

		// Call the shortcut handler
		shortcuts['$mod+t'](mockEvent);

		// onRun should be called
		expect(onRun).toHaveBeenCalled();
	});

	it('should prevent default event behavior', () => {
		const actions = defineActions([
			{ title: 'Test', shortcut: '$mod+t', actionId: '1', onRun: vi.fn() }
		]);

		const shortcuts = createShortcuts({ actions });
		const mockEvent = { preventDefault: vi.fn() } as unknown as KeyboardEvent;

		shortcuts['$mod+t'](mockEvent);

		expect(mockEvent.preventDefault).toHaveBeenCalled();
	});

	it('should handle multiple shortcuts', () => {
		const actions = defineActions([
			{ title: 'Action A', shortcut: '$mod+a', actionId: 'a' },
			{ title: 'Action B', shortcut: '$mod+b', actionId: 'b' },
			{ title: 'Action C', shortcut: '$mod+c', actionId: 'c' }
		]);

		const result = createShortcuts({ actions });

		expect(Object.keys(result)).toHaveLength(3);
	});

	it('should handle complex shortcut patterns', () => {
		const actions = defineActions([
			{ title: 'Shift Mod', shortcut: '$mod+Shift+s', actionId: '1' },
			{ title: 'Alt Key', shortcut: 'Alt+a', actionId: '2' },
			{ title: 'Control', shortcut: 'Control+c', actionId: '3' }
		]);

		const result = createShortcuts({ actions });

		expect(result['$mod+Shift+s']).toBeDefined();
		expect(result['Alt+a']).toBeDefined();
		expect(result['Control+c']).toBeDefined();
	});
});

