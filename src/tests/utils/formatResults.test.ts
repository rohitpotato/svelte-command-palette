import { describe, it, expect } from 'vitest';
import { formatResults } from '$lib/utils';
import type { action } from '$lib/types';

describe('formatResults', () => {
	it('should extract items from fuse results', () => {
		const fuseResults = [
			{ item: { title: 'Action 1', actionId: '1' } as action },
			{ item: { title: 'Action 2', actionId: '2' } as action }
		];

		const result = formatResults(fuseResults);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({ title: 'Action 1', actionId: '1' });
		expect(result[1]).toEqual({ title: 'Action 2', actionId: '2' });
	});

	it('should return empty array for empty input', () => {
		const result = formatResults([]);
		expect(result).toEqual([]);
	});

	it('should preserve all action properties', () => {
		const fullAction: action = {
			title: 'Full Action',
			subTitle: 'Subtitle',
			description: 'Description',
			keywords: ['test'],
			shortcut: '$mod+t',
			actionId: 'full-1',
			icon: '📝',
			group: 'Test'
		};

		const result = formatResults([{ item: fullAction }]);

		expect(result[0]).toEqual(fullAction);
	});

	it('should handle single result', () => {
		const result = formatResults([{ item: { title: 'Single', actionId: 'single' } as action }]);

		expect(result).toHaveLength(1);
		expect(result[0].title).toBe('Single');
	});

	it('should maintain order of results', () => {
		const fuseResults = [
			{ item: { title: 'First', actionId: '1' } as action },
			{ item: { title: 'Second', actionId: '2' } as action },
			{ item: { title: 'Third', actionId: '3' } as action }
		];

		const result = formatResults(fuseResults);

		expect(result[0].title).toBe('First');
		expect(result[1].title).toBe('Second');
		expect(result[2].title).toBe('Third');
	});
});

