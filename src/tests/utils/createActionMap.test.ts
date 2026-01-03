import { describe, it, expect } from 'vitest';
import createActionMap from '$lib/utils/createActionMap';
import { defineActions } from '$lib/utils';

describe('createActionMap', () => {
	it('should create a map from action array', () => {
		const actions = defineActions([
			{ title: 'Action 1', actionId: 'action-1' },
			{ title: 'Action 2', actionId: 'action-2' }
		]);

		const result = createActionMap(actions);

		expect(result['action-1']).toBeDefined();
		expect(result['action-2']).toBeDefined();
		expect(result['action-1'].title).toBe('Action 1');
		expect(result['action-2'].title).toBe('Action 2');
	});

	it('should return empty object for empty array', () => {
		const result = createActionMap([]);
		expect(result).toEqual({});
	});

	it('should return empty object when called with no arguments', () => {
		const result = createActionMap();
		expect(result).toEqual({});
	});

	it('should handle numeric actionIds', () => {
		const actions = defineActions([
			{ title: 'Action 1', actionId: 1 },
			{ title: 'Action 2', actionId: 2 }
		]);

		const result = createActionMap(actions);

		expect(result[1]).toBeDefined();
		expect(result[2]).toBeDefined();
	});

	it('should handle mixed string and numeric actionIds', () => {
		const actions = defineActions([
			{ title: 'String ID', actionId: 'string-id' },
			{ title: 'Numeric ID', actionId: 42 }
		]);

		const result = createActionMap(actions);

		expect(result['string-id']).toBeDefined();
		expect(result[42]).toBeDefined();
	});

	it('should preserve all action properties', () => {
		const actions = defineActions([
			{
				title: 'Full Action',
				subTitle: 'Subtitle',
				description: 'Description',
				actionId: 'full',
				keywords: ['test'],
				shortcut: '$mod+f'
			}
		]);

		const result = createActionMap(actions);
		const action = result['full'];

		expect(action.title).toBe('Full Action');
		expect(action.subTitle).toBe('Subtitle');
		expect(action.description).toBe('Description');
		expect(action.keywords).toEqual(['test']);
		expect(action.shortcut).toBe('$mod+f');
	});

	it('should allow quick lookup by actionId', () => {
		const actions = defineActions([
			{ title: 'Settings', actionId: 'settings' },
			{ title: 'Profile', actionId: 'profile' },
			{ title: 'Logout', actionId: 'logout' }
		]);

		const map = createActionMap(actions);

		// Quick O(1) lookup
		expect(map['profile'].title).toBe('Profile');
		expect(map['settings'].title).toBe('Settings');
		expect(map['logout'].title).toBe('Logout');
	});

	it('should not include actions with null actionId', () => {
		const actions = [
			{ title: 'Valid', actionId: 'valid' },
			{ title: 'Null ID', actionId: null }
		];

		const result = createActionMap(actions as any);

		expect(result['valid']).toBeDefined();
		expect(Object.keys(result)).toHaveLength(1);
	});

	it('should handle empty string actionId', () => {
		const actions = [{ title: 'Empty ID', actionId: '' }];

		const result = createActionMap(actions as any);

		// Empty string is falsy but still a valid key in the current implementation
		// The code checks for null specifically
		expect(result['']).toBeDefined();
	});
});

