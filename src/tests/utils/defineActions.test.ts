import { describe, it, expect, vi } from 'vitest';
import { defineActions, noop } from '$lib/utils';

describe('defineActions', () => {
	it('should return an empty array when no actions provided', () => {
		const result = defineActions([]);
		expect(result).toEqual([]);
	});

	it('should return an empty array when called with no arguments', () => {
		const result = defineActions();
		expect(result).toEqual([]);
	});

	it('should create actions with default values', () => {
		const result = defineActions([{ title: 'Test Action' }]);

		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			title: 'Test Action',
			subTitle: '',
			shortcut: '',
			keywords: []
		});
		// Check default functions
		expect(typeof result[0].actionId).toBe('number');
		expect(typeof result[0].canActionRun).toBe('function');
		expect(typeof result[0].onRun).toBe('function');
	});

	it('should preserve custom actionId', () => {
		const result = defineActions([
			{ title: 'Test Action', actionId: 'custom-id-123' },
			{ title: 'Test Action 2', actionId: 42 }
		]);

		expect(result[0].actionId).toBe('custom-id-123');
		expect(result[1].actionId).toBe(42);
	});

	it('should preserve all provided properties', () => {
		const customOnRun = vi.fn();
		const customCanRun = vi.fn(() => true);

		const result = defineActions([
			{
				title: 'Full Action',
				subTitle: 'Subtitle here',
				description: 'A description',
				keywords: ['keyword1', 'keyword2'],
				shortcut: '$mod+k',
				actionId: 'full-action',
				onRun: customOnRun,
				canActionRun: customCanRun,
				icon: '🚀',
				group: 'Navigation'
			}
		]);

		expect(result[0]).toEqual({
			title: 'Full Action',
			subTitle: 'Subtitle here',
			description: 'A description',
			keywords: ['keyword1', 'keyword2'],
			shortcut: '$mod+k',
			actionId: 'full-action',
			onRun: customOnRun,
			canActionRun: customCanRun,
			icon: '🚀',
			group: 'Navigation'
		});
	});

	it('should create multiple actions', () => {
		const result = defineActions([
			{ title: 'Action 1' },
			{ title: 'Action 2' },
			{ title: 'Action 3' }
		]);

		expect(result).toHaveLength(3);
		expect(result[0].title).toBe('Action 1');
		expect(result[1].title).toBe('Action 2');
		expect(result[2].title).toBe('Action 3');
	});

	it('should generate unique actionIds for each action', () => {
		const result = defineActions([{ title: 'Action 1' }, { title: 'Action 2' }]);

		expect(result[0].actionId).not.toBe(result[1].actionId);
	});
});

describe('noop', () => {
	it('should return true', () => {
		expect(noop()).toBe(true);
	});

	it('should be a callable function', () => {
		expect(typeof noop).toBe('function');
	});
});

