import { describe, it, expect } from 'vitest';
import { camelCaseToDash, toCssString } from '$lib/utils';

describe('camelCaseToDash', () => {
	it('should convert camelCase to kebab-case', () => {
		expect(camelCaseToDash('backgroundColor')).toBe('background-color');
		expect(camelCaseToDash('fontSize')).toBe('font-size');
		expect(camelCaseToDash('borderTopLeftRadius')).toBe('border-top-left-radius');
	});

	it('should handle single word', () => {
		expect(camelCaseToDash('color')).toBe('color');
		expect(camelCaseToDash('margin')).toBe('margin');
	});

	it('should handle already lowercase', () => {
		expect(camelCaseToDash('padding')).toBe('padding');
	});

	it('should handle empty string', () => {
		expect(camelCaseToDash('')).toBe('');
	});

	it('should handle consecutive uppercase letters', () => {
		expect(camelCaseToDash('zIndex')).toBe('z-index');
		expect(camelCaseToDash('WebkitTransform')).toBe('webkit-transform');
	});
});

describe('toCssString', () => {
	it('should convert style object to CSS string', () => {
		const result = toCssString({
			backgroundColor: 'red',
			fontSize: '16px'
		});

		expect(result).toContain('background-color: red');
		expect(result).toContain('font-size: 16px');
	});

	it('should handle single property', () => {
		const result = toCssString({ color: 'blue' });
		expect(result).toContain('color: blue');
	});

	it('should handle empty object', () => {
		const result = toCssString({});
		expect(result).toBe('');
	});

	it('should handle undefined', () => {
		const result = toCssString(undefined);
		expect(result).toBe('');
	});

	it('should handle multiple CSS properties', () => {
		const result = toCssString({
			padding: '10px',
			margin: '5px',
			borderRadius: '8px',
			boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
		});

		expect(result).toContain('padding: 10px');
		expect(result).toContain('margin: 5px');
		expect(result).toContain('border-radius: 8px');
		expect(result).toContain('box-shadow: 0 2px 4px rgba(0,0,0,0.1)');
	});

	it('should handle CSS custom properties', () => {
		const result = toCssString({
			color: 'var(--primary-color)'
		});

		expect(result).toContain('color: var(--primary-color)');
	});
});

