import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '$lib/utils';

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should delay function execution', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should only execute once after multiple rapid calls', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		debouncedFn();
		debouncedFn();
		debouncedFn();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should reset timer on each call', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		vi.advanceTimersByTime(50);
		debouncedFn(); // Reset timer
		vi.advanceTimersByTime(50);

		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(50);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should pass arguments to the function', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn('arg1', 'arg2');
		vi.advanceTimersByTime(100);

		expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
	});

	it('should use the last arguments when called multiple times', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn('first');
		debouncedFn('second');
		debouncedFn('third');

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledWith('third');
	});

	it('should handle zero delay', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 0);

		debouncedFn();
		vi.advanceTimersByTime(0);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('should allow multiple separate invocations after delay', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, 100);

		debouncedFn();
		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);

		debouncedFn();
		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(2);
	});
});

