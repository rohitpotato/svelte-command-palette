import { describe, it, expect } from 'vitest';
import { groupActions, defineActions } from '$lib/utils';

describe('groupActions', () => {
	it('should group actions by group property', () => {
		const actions = defineActions([
			{ title: 'Action 1', group: 'Group A', actionId: '1' },
			{ title: 'Action 2', group: 'Group A', actionId: '2' },
			{ title: 'Action 3', group: 'Group B', actionId: '3' }
		]);

		const result = groupActions(actions);

		expect(result.size).toBe(2);
		expect(result.get('Group A')).toHaveLength(2);
		expect(result.get('Group B')).toHaveLength(1);
	});

	it('should handle ungrouped actions', () => {
		const actions = defineActions([
			{ title: 'Ungrouped 1', actionId: '1' },
			{ title: 'Grouped', group: 'Test', actionId: '2' },
			{ title: 'Ungrouped 2', actionId: '3' }
		]);

		const result = groupActions(actions);

		// Ungrouped actions should be first with empty string key
		expect(result.get('')).toHaveLength(2);
		expect(result.get('Test')).toHaveLength(1);
	});

	it('should put ungrouped actions first', () => {
		const actions = defineActions([
			{ title: 'Grouped', group: 'Test', actionId: '1' },
			{ title: 'Ungrouped', actionId: '2' }
		]);

		const result = groupActions(actions);
		const keys = Array.from(result.keys());

		expect(keys[0]).toBe(''); // Ungrouped first
		expect(keys[1]).toBe('Test');
	});

	it('should handle empty array', () => {
		const result = groupActions([]);
		expect(result.size).toBe(0);
	});

	it('should handle all ungrouped actions', () => {
		const actions = defineActions([
			{ title: 'Action 1', actionId: '1' },
			{ title: 'Action 2', actionId: '2' }
		]);

		const result = groupActions(actions);

		expect(result.size).toBe(1);
		expect(result.get('')).toHaveLength(2);
	});

	it('should handle all grouped actions', () => {
		const actions = defineActions([
			{ title: 'Action 1', group: 'Group A', actionId: '1' },
			{ title: 'Action 2', group: 'Group B', actionId: '2' }
		]);

		const result = groupActions(actions);

		expect(result.size).toBe(2);
		expect(result.has('')).toBe(false);
	});

	it('should maintain insertion order within groups', () => {
		const actions = defineActions([
			{ title: 'First', group: 'Test', actionId: '1' },
			{ title: 'Second', group: 'Test', actionId: '2' },
			{ title: 'Third', group: 'Test', actionId: '3' }
		]);

		const result = groupActions(actions);
		const group = result.get('Test')!;

		expect(group[0].title).toBe('First');
		expect(group[1].title).toBe('Second');
		expect(group[2].title).toBe('Third');
	});

	it('should handle multiple groups in correct order', () => {
		const actions = defineActions([
			{ title: 'A1', group: 'Navigation', actionId: '1' },
			{ title: 'B1', group: 'Settings', actionId: '2' },
			{ title: 'A2', group: 'Navigation', actionId: '3' }
		]);

		const result = groupActions(actions);
		const keys = Array.from(result.keys());

		expect(keys).toContain('Navigation');
		expect(keys).toContain('Settings');
		expect(result.get('Navigation')).toHaveLength(2);
		expect(result.get('Settings')).toHaveLength(1);
	});
});

