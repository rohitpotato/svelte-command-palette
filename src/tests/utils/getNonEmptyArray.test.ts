import { describe, it, expect } from 'vitest';
import { getNonEmptyArray } from '$lib/utils';

describe('getNonEmptyArray', () => {
	it('should return first non-empty array', () => {
		const result = getNonEmptyArray([], [1, 2], [3, 4]);
		expect(result).toEqual([1, 2]);
	});

	it('should return empty array if all are empty', () => {
		const result = getNonEmptyArray([], [], []);
		expect(result).toEqual([]);
	});

	it('should return first array if it has items', () => {
		const result = getNonEmptyArray([1], [2], [3]);
		expect(result).toEqual([1]);
	});

	it('should handle single argument', () => {
		expect(getNonEmptyArray([1, 2])).toEqual([1, 2]);
		expect(getNonEmptyArray([])).toEqual([]);
	});

	it('should skip undefined arrays', () => {
		const result = getNonEmptyArray(undefined as any, [], [1, 2]);
		expect(result).toEqual([1, 2]);
	});

	it('should handle objects in arrays', () => {
		const result = getNonEmptyArray([], [{ id: 1 }], [{ id: 2 }]);
		expect(result).toEqual([{ id: 1 }]);
	});

	it('should return last option when earlier ones are empty', () => {
		const result = getNonEmptyArray([], [], ['fallback']);
		expect(result).toEqual(['fallback']);
	});
});

