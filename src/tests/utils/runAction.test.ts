import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runAction, defineActions } from '$lib/utils';
import { paletteStore } from '$lib/store/PaletteStore';
import { get } from 'svelte/store';

describe('runAction', () => {
	beforeEach(() => {
		// Reset the store before each test
		paletteStore.set({
			isVisible: true,
			textInput: 'test',
			commands: [],
			storeMethods: {},
			actionMap: {},
			activeCommandId: null,
			selectedCommandId: null,
			calledActions: [],
			results: []
		});
	});

	it('should execute action onRun callback', () => {
		const onRun = vi.fn();
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun
			}
		]);

		runAction({ action });

		expect(onRun).toHaveBeenCalled();
	});

	it('should return true when action runs successfully', () => {
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun: () => {}
			}
		]);

		const result = runAction({ action });

		expect(result).toBe(true);
	});

	it('should return false when canActionRun returns false', () => {
		const onRun = vi.fn();
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun,
				canActionRun: () => false
			}
		]);

		const result = runAction({ action });

		expect(result).toBe(false);
		expect(onRun).not.toHaveBeenCalled();
	});

	it('should close palette after action runs', () => {
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun: () => {}
			}
		]);

		runAction({ action });

		const store = get(paletteStore);
		expect(store.isVisible).toBe(false);
	});

	it('should clear text input after action runs', () => {
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun: () => {}
			}
		]);

		runAction({ action });

		const store = get(paletteStore);
		expect(store.textInput).toBe('');
	});

	it('should add actionId to calledActions', () => {
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test-action-id',
				onRun: () => {}
			}
		]);

		runAction({ action });

		const store = get(paletteStore);
		expect(store.calledActions).toContain('test-action-id');
	});

	it('should pass correct params to onRun', () => {
		const onRun = vi.fn();
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun
			}
		]);

		runAction({ action });

		expect(onRun).toHaveBeenCalledWith(
			expect.objectContaining({
				action: expect.objectContaining({ title: 'Test Action' }),
				storeProps: expect.any(Object),
				storeMethods: expect.any(Object)
			})
		);
	});

	it('should pass correct params to canActionRun', () => {
		const canActionRun = vi.fn(() => true);
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun: () => {},
				canActionRun
			}
		]);

		runAction({ action });

		expect(canActionRun).toHaveBeenCalledWith(
			expect.objectContaining({
				action: expect.objectContaining({ title: 'Test Action' }),
				storeProps: expect.any(Object),
				storeMethods: expect.any(Object)
			})
		);
	});

	it('should handle action without onRun', () => {
		const action = {
			title: 'No onRun',
			actionId: 'test',
			canActionRun: () => true
		};

		// Should not throw
		const result = runAction({ action: action as any });
		expect(result).toBe(false); // Returns false since no onRun
	});

	it('should close palette even when canActionRun returns false', () => {
		const [action] = defineActions([
			{
				title: 'Test Action',
				actionId: 'test',
				onRun: () => {},
				canActionRun: () => false
			}
		]);

		runAction({ action });

		const store = get(paletteStore);
		expect(store.isVisible).toBe(false);
	});

	it('should handle undefined action gracefully', () => {
		const result = runAction({ action: undefined as any });
		expect(result).toBe(false);
	});
});

