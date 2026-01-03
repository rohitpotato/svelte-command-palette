<script lang="ts">
	import { page } from '$app/stores';

	interface NavItem {
		title: string;
		href: string;
	}

	interface NavSection {
		title: string;
		items: NavItem[];
	}

	const navigation: NavSection[] = [
		{
			title: 'Getting Started',
			items: [
				{ title: 'Installation', href: '/docs/installation' },
				{ title: 'Quick Start', href: '/docs/quick-start' }
			]
		},
		{
			title: 'Core Concepts',
			items: [
				{ title: 'Defining Actions', href: '/docs/define-actions' },
				{ title: 'Keyboard Shortcuts', href: '/docs/shortcuts' },
				{ title: 'Palette Store', href: '/docs/palette-store' }
			]
		},
		{
			title: 'Customization',
			items: [
				{ title: 'Styling', href: '/docs/styling' },
				{ title: 'Theming', href: '/docs/theming' },
				{ title: 'Custom Components', href: '/docs/custom-components' }
			]
		},
		{
			title: 'API Reference',
			items: [
				{ title: 'CommandPalette', href: '/docs/command-palette-api' },
				{ title: 'defineActions', href: '/docs/define-actions-api' },
				{ title: 'createStoreMethods', href: '/docs/store-methods-api' }
			]
		}
	];

	let isMobileMenuOpen = $state(false);

	const toggleMobileMenu = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};

	const closeMobileMenu = () => {
		isMobileMenuOpen = false;
	};
</script>

<button class="sidebar-toggle" onclick={toggleMobileMenu} aria-label="Toggle sidebar">
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
		<path d="M4 6h16M4 12h16M4 18h16"/>
	</svg>
	Menu
</button>

<aside class="sidebar" class:open={isMobileMenuOpen}>
	<div class="sidebar-header">
		<a href="/docs" class="sidebar-brand" onclick={closeMobileMenu}>Documentation</a>
		<button class="sidebar-close" onclick={closeMobileMenu} aria-label="Close sidebar">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12"/>
			</svg>
		</button>
	</div>

	<nav class="sidebar-nav">
		{#each navigation as section}
			<div class="nav-section">
				<h4 class="nav-section-title">{section.title}</h4>
				<ul class="nav-list">
					{#each section.items as item}
						<li>
							<a
								href={item.href}
								class="nav-link"
								class:active={$page.url.pathname === item.href}
								onclick={closeMobileMenu}
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
</aside>

{#if isMobileMenuOpen}
	<button class="sidebar-overlay" onclick={closeMobileMenu} aria-label="Close menu"></button>
{/if}

<style>
	.sidebar-toggle {
		display: none;
		align-items: center;
		gap: 0.5rem;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 50;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		background: var(--color-accent);
		color: white;
		border: none;
		border-radius: var(--radius-full);
		cursor: pointer;
		box-shadow: var(--shadow-lg);
	}

	.sidebar {
		position: fixed;
		top: 60px;
		left: 0;
		bottom: 0;
		width: 280px;
		background: var(--color-bg-secondary);
		border-right: 1px solid var(--color-border);
		overflow-y: auto;
		padding: var(--space-lg);
		z-index: 40;
	}

	.sidebar-header {
		display: none;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-lg);
		border-bottom: 1px solid var(--color-border);
	}

	.sidebar-brand {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-decoration: none;
	}

	.sidebar-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-text-secondary);
		cursor: pointer;
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.nav-section-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-tertiary);
		margin-bottom: var(--space-sm);
	}

	.nav-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.nav-link {
		display: block;
		padding: 0.5rem 0.75rem;
		font-size: 0.9375rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.nav-link:hover {
		color: var(--color-text-primary);
		background: var(--color-bg-hover);
	}

	.nav-link.active {
		color: var(--color-accent);
		background: var(--color-accent-subtle);
		font-weight: 500;
	}

	.sidebar-overlay {
		display: none;
	}

	@media (max-width: 1024px) {
		.sidebar-toggle {
			display: flex;
		}

		.sidebar {
			transform: translateX(-100%);
			transition: transform var(--transition-normal);
			top: 0;
			width: 100%;
			max-width: 320px;
			z-index: 60;
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.sidebar-header {
			display: flex;
		}

		.sidebar-overlay {
			display: block;
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 55;
			border: none;
			cursor: pointer;
		}
	}
</style>
