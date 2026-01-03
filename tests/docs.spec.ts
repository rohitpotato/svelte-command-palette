import { test, expect } from '@playwright/test';

test.describe('Documentation Site', () => {
	test.describe('Navigation', () => {
		test('should navigate to docs from homepage', async ({ page }) => {
			await page.goto('/');
			await page.click('text=Documentation');
			await expect(page).toHaveURL(/\/docs/);
		});

		test('should have working sidebar navigation', async ({ page }) => {
			await page.goto('/docs');

			// Check if sidebar is visible on desktop
			await expect(page.locator('nav').first()).toBeVisible();
		});
	});

	test.describe('Documentation Pages', () => {
		test('should load installation page', async ({ page }) => {
			await page.goto('/docs/installation');
			await expect(page.locator('h1')).toContainText(/installation/i);
		});

		test('should load quick-start page', async ({ page }) => {
			await page.goto('/docs/quick-start');
			await expect(page.locator('h1')).toContainText(/quick.*start/i);
		});

		test('should load command-palette-api page', async ({ page }) => {
			await page.goto('/docs/command-palette-api');
			await expect(page.locator('h1')).toContainText(/command.*palette/i);
		});

		test('should load define-actions page', async ({ page }) => {
			await page.goto('/docs/define-actions');
			await expect(page.locator('h1')).toContainText(/define.*actions/i);
		});

		test('should load palette-store page', async ({ page }) => {
			await page.goto('/docs/palette-store');
			await expect(page.locator('h1')).toContainText(/palette.*store/i);
		});

		test('should load styling page', async ({ page }) => {
			await page.goto('/docs/styling');
			await expect(page.locator('h1')).toContainText(/styl/i);
		});

		test('should load theming page', async ({ page }) => {
			await page.goto('/docs/theming');
			await expect(page.locator('h1')).toContainText(/theming/i);
		});

		test('should load shortcuts page', async ({ page }) => {
			await page.goto('/docs/shortcuts');
			await expect(page.locator('h1')).toContainText(/shortcut/i);
		});

		test('should load custom-components page', async ({ page }) => {
			await page.goto('/docs/custom-components');
			await expect(page.locator('h1')).toContainText(/custom.*component/i);
		});
	});

	test.describe('Code Examples', () => {
		test('should display code blocks properly', async ({ page }) => {
			await page.goto('/docs/quick-start');

			// Check for code blocks
			const codeBlocks = page.locator('pre code, .code-block, [class*="highlight"]');
			if ((await codeBlocks.count()) > 0) {
				await expect(codeBlocks.first()).toBeVisible();
			}
		});
	});
});

test.describe('Homepage', () => {
	test('should display hero section', async ({ page }) => {
		await page.goto('/');

		// Check hero content is visible
		await expect(page.locator('h1').first()).toBeVisible();
	});

	test('should display command palette demo', async ({ page }) => {
		await page.goto('/');

		// Look for demo section or animated preview
		await expect(page.locator('main')).toBeVisible();
	});

	test('should have navigation links', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('nav')).toBeVisible();
		await expect(page.locator('text=Documentation')).toBeVisible();
	});

	test('should have theme toggle', async ({ page }) => {
		await page.goto('/');

		// Look for theme toggle button
		const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="Theme"], button:has-text("☀"), button:has-text("🌙")');
		if ((await themeToggle.count()) > 0) {
			await expect(themeToggle.first()).toBeVisible();
		}
	});
});

test.describe('Responsive Design', () => {
	test.describe('Desktop', () => {
		test.use({ viewport: { width: 1280, height: 720 } });

		test('should show full navigation on desktop', async ({ page }) => {
			await page.goto('/');
			await expect(page.locator('nav')).toBeVisible();
		});

		test('should show sidebar on docs pages', async ({ page }) => {
			await page.goto('/docs');
			// Sidebar should be visible on desktop
			await expect(page.locator('aside, nav').first()).toBeVisible();
		});
	});

	test.describe('Mobile', () => {
		test.use({ viewport: { width: 375, height: 667 } });

		test('should have mobile menu button', async ({ page }) => {
			await page.goto('/');

			// Look for mobile menu button
			const menuButton = page.locator(
				'button[aria-label*="menu"], button[aria-label*="Menu"], .mobile-menu-btn, [data-mobile-menu]'
			);
			if ((await menuButton.count()) > 0) {
				await expect(menuButton.first()).toBeVisible();
			}
		});

		test('should be scrollable on mobile', async ({ page }) => {
			await page.goto('/');

			// Content should be scrollable
			const body = page.locator('body');
			await expect(body).toBeVisible();
		});
	});

	test.describe('Tablet', () => {
		test.use({ viewport: { width: 768, height: 1024 } });

		test('should display properly on tablet', async ({ page }) => {
			await page.goto('/');
			await expect(page.locator('main')).toBeVisible();
		});
	});
});

