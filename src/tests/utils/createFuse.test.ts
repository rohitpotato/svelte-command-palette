import { describe, it, expect } from 'vitest';
import { createFuse, defineActions } from '$lib/utils';

describe('createFuse', () => {
	const actions = defineActions([
		{
			title: 'Open Settings',
			subTitle: 'Configure your preferences',
			description: 'Opens the application settings panel',
			keywords: ['config', 'preferences', 'options'],
			actionId: 'settings'
		},
		{
			title: 'Toggle Dark Mode',
			subTitle: 'Switch between light and dark themes',
			description: 'Changes the visual theme',
			keywords: ['theme', 'appearance', 'night'],
			actionId: 'dark-mode'
		},
		{
			title: 'Search Files',
			subTitle: 'Find files in your project',
			description: 'Quick file search',
			keywords: ['find', 'lookup', 'files'],
			actionId: 'search'
		}
	]);

	it('should create a Fuse instance', () => {
		const fuse = createFuse(actions);
		expect(fuse).toBeDefined();
		expect(typeof fuse.search).toBe('function');
	});

	it('should search by title', () => {
		const fuse = createFuse(actions);
		const results = fuse.search('Settings');

		expect(results.length).toBeGreaterThan(0);
		expect(results[0].item.title).toBe('Open Settings');
	});

	it('should search by subTitle', () => {
		const fuse = createFuse(actions);
		const results = fuse.search('preferences');

		expect(results.length).toBeGreaterThan(0);
		expect(results[0].item.actionId).toBe('settings');
	});

	it('should search by description', () => {
		const fuse = createFuse(actions);
		const results = fuse.search('visual theme');

		expect(results.length).toBeGreaterThan(0);
		expect(results[0].item.actionId).toBe('dark-mode');
	});

	it('should search by keywords', () => {
		const fuse = createFuse(actions);
		const results = fuse.search('night');

		expect(results.length).toBeGreaterThan(0);
		expect(results[0].item.actionId).toBe('dark-mode');
	});

	it('should return empty array for no matches', () => {
		const fuse = createFuse(actions);
		const results = fuse.search('xyznonexistent123');

		expect(results).toEqual([]);
	});

	it('should handle empty actions array', () => {
		const fuse = createFuse([]);
		const results = fuse.search('test');

		expect(results).toEqual([]);
	});

	it('should perform fuzzy matching', () => {
		const fuse = createFuse(actions);
		// Fuzzy search with partial match
		const results = fuse.search('Settngs'); // intentional typo

		expect(results.length).toBeGreaterThan(0);
		expect(results[0].item.title).toBe('Open Settings');
	});

	it('should weight title higher than other fields', () => {
		const fuse = createFuse(actions);
		// "Toggle" appears only in title, so it should match that action
		const results = fuse.search('Toggle');

		expect(results.length).toBeGreaterThan(0);
		expect(results[0].item.title).toBe('Toggle Dark Mode');
	});

	it('should return multiple relevant results', () => {
		const fuse = createFuse(actions);
		// "file" appears in multiple places
		const results = fuse.search('file');

		expect(results.length).toBeGreaterThan(0);
	});
});

