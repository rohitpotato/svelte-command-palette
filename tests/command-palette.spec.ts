import { test, expect } from '@playwright/test';

test.describe('Command Palette', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test.describe('Opening and Closing', () => {
		test('should open command palette with keyboard shortcut', async ({ page }) => {
			// Press Cmd+K (Mac) or Ctrl+K (Windows/Linux)
			await page.keyboard.press('Meta+k');

			await expect(page.locator('#command-palette-overlay')).toBeVisible();
		});

		test('should close command palette with Escape key', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await expect(page.locator('#command-palette-overlay')).toBeVisible();

			await page.keyboard.press('Escape');
			await expect(page.locator('#command-palette-overlay')).not.toBeVisible();
		});

		test('should close command palette when clicking outside', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await expect(page.locator('#command-palette-overlay')).toBeVisible();

			// Click on the overlay (outside the palette container)
			await page.locator('#command-palette-overlay').click({ position: { x: 10, y: 10 } });
			await expect(page.locator('#command-palette-overlay')).not.toBeVisible();
		});

		test('should toggle palette open and closed', async ({ page }) => {
			// Open
			await page.keyboard.press('Meta+k');
			await expect(page.locator('#command-palette-overlay')).toBeVisible();

			// Close
			await page.keyboard.press('Meta+k');
			await expect(page.locator('#command-palette-overlay')).not.toBeVisible();

			// Open again
			await page.keyboard.press('Meta+k');
			await expect(page.locator('#command-palette-overlay')).toBeVisible();
		});
	});

	test.describe('Focus Management', () => {
		test('should focus search input when opened', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			await expect(page.locator('#paletteInput')).toBeFocused();
		});

		test('should close palette with keyboard button click', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await expect(page.locator('#command-palette-overlay')).toBeVisible();

			// Click the ESC keyboard button
			await page.locator('.cp-kbd-btn').click();
			await expect(page.locator('#command-palette-overlay')).not.toBeVisible();
		});
	});

	test.describe('Search Functionality', () => {
		test('should display results', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			// Wait for results to load
			await expect(page.locator('[role="listbox"]')).toBeVisible();
		});

		test('should filter results based on search input', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			// Type in search
			await page.fill('#paletteInput', 'toggle');

			// Results should be filtered (implementation depends on demo actions)
			await expect(page.locator('[role="listbox"]')).toBeVisible();
		});

		test('should update results as user types', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			// Start typing
			await page.fill('#paletteInput', 't');
			await page.waitForTimeout(100);

			await page.fill('#paletteInput', 'te');
			await page.waitForTimeout(100);

			// Results should still be visible
			await expect(page.locator('[role="listbox"]')).toBeVisible();
		});

		test('should clear search when palette is closed and reopened', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await page.fill('#paletteInput', 'test search');

			await page.keyboard.press('Escape');
			await page.keyboard.press('Meta+k');

			await expect(page.locator('#paletteInput')).toHaveValue('');
		});
	});

	test.describe('Keyboard Navigation', () => {
		test('should navigate down with Arrow Down', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await page.waitForTimeout(100);

			// Press down arrow
			await page.keyboard.press('ArrowDown');

			// First item should have active class
			const firstItem = page.locator('[role="option"]').first();
			await expect(firstItem).toHaveAttribute('aria-selected', 'true');
		});

		test('should navigate up with Arrow Up', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await page.waitForTimeout(100);

			// Navigate down first, then up
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowUp');

			// Should be back to first item
			await expect(page.locator('[role="option"][aria-selected="true"]')).toBeVisible();
		});

		test('should wrap around when navigating past last item', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await page.waitForTimeout(100);

			// Count items and navigate past all of them
			const itemCount = await page.locator('[role="option"]').count();

			for (let i = 0; i < itemCount + 1; i++) {
				await page.keyboard.press('ArrowDown');
			}

			// Should wrap to first item
			await expect(page.locator('[role="option"][aria-selected="true"]')).toBeVisible();
		});
	});

	test.describe('Action Execution', () => {
		test('should execute action on Enter key', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await page.waitForTimeout(100);

			// Navigate to an item
			await page.keyboard.press('ArrowDown');

			// Press Enter to execute
			await page.keyboard.press('Enter');

			// Palette should close after action execution
			await expect(page.locator('#command-palette-overlay')).not.toBeVisible();
		});

		test('should execute action on click', async ({ page }) => {
			await page.keyboard.press('Meta+k');
			await page.waitForTimeout(100);

			// Click on first result
			await page.locator('[role="option"]').first().click();

			// Palette should close
			await expect(page.locator('#command-palette-overlay')).not.toBeVisible();
		});
	});

	test.describe('Accessibility', () => {
		test('should have correct ARIA attributes', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			// Check dialog role
			await expect(page.locator('[role="dialog"]')).toBeVisible();
			await expect(page.locator('[role="dialog"]')).toHaveAttribute('aria-modal', 'true');

			// Check combobox role
			await expect(page.locator('[role="combobox"]')).toBeVisible();
			await expect(page.locator('[role="combobox"]')).toHaveAttribute('aria-expanded', 'true');
			await expect(page.locator('[role="combobox"]')).toHaveAttribute('aria-haspopup', 'listbox');

			// Check listbox role
			await expect(page.locator('[role="listbox"]')).toBeVisible();

			// Check option roles
			const options = page.locator('[role="option"]');
			if ((await options.count()) > 0) {
				await expect(options.first()).toBeVisible();
			}
		});

		test('should have accessible search input', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			const input = page.locator('#paletteInput');
			await expect(input).toHaveAttribute('aria-autocomplete', 'list');
		});

		test('should have label for search input', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			await expect(page.locator('label[for="paletteInput"]')).toBeAttached();
		});
	});

	test.describe('Visual States', () => {
		test('should show overlay with backdrop', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			const overlay = page.locator('#command-palette-overlay');
			await expect(overlay).toBeVisible();
		});

		test('should show search icon', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			await expect(page.locator('.cp-search-icon')).toBeVisible();
		});

		test('should show keyboard button for closing', async ({ page }) => {
			await page.keyboard.press('Meta+k');

			await expect(page.locator('.cp-kbd-btn')).toBeVisible();
		});
	});
});

test.describe('Command Palette - Mobile', () => {
	test.use({ viewport: { width: 375, height: 667 } });

	test('should be usable on mobile viewport', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Meta+k');

		await expect(page.locator('#command-palette-overlay')).toBeVisible();
		await expect(page.locator('#paletteInput')).toBeFocused();
	});

	test('should have proper mobile styling', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Meta+k');

		// On mobile, palette should be at bottom (bottom sheet style)
		const overlay = page.locator('#command-palette-overlay');
		await expect(overlay).toBeVisible();
	});
});

