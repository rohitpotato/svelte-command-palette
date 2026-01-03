<script lang="ts">
	import { page } from '$app/stores';
	import switchTheme from '../utils/switchTheme';

	let isMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		isMenuOpen = false;
	};
</script>

<nav class="navbar">
	<div class="navbar-container">
		<a href="/" class="navbar-brand">
			<svg width="28" height="28" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M239.03 38.97C230.63 30.57 219.43 26 207.62 26H48.38C24.11 26 4.38 45.73 4.38 70V186C4.38 210.27 24.11 230 48.38 230H207.62C231.89 230 251.62 210.27 251.62 186V70C251.62 58.19 247.05 46.99 238.65 38.59L239.03 38.97ZM195.92 137.06L147.42 206.06C145.66 208.56 142.81 210.06 139.77 210.06C139.21 210.06 138.64 210.02 138.08 209.93C134.49 209.38 131.46 206.99 130.08 203.64L113.54 166.27L75.39 182.27C71.72 183.81 67.54 183.06 64.61 180.35C61.68 177.64 60.58 173.53 61.79 169.74L93.79 71.74C95.13 67.63 98.91 64.72 103.22 64.47C107.53 64.22 111.59 66.67 113.42 70.56L147.42 144.56L189.23 85.06C191.93 81.22 197.01 80.03 201.1 82.33C205.19 84.63 206.91 89.55 205.04 93.86L195.92 137.06Z" fill="currentColor"/>
			</svg>
			<span>Svelte Command Palette</span>
		</a>

		<button class="navbar-toggle" onclick={toggleMenu} aria-label="Toggle menu">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				{#if isMenuOpen}
					<path d="M18 6L6 18M6 6l12 12"/>
				{:else}
					<path d="M4 6h16M4 12h16M4 18h16"/>
				{/if}
			</svg>
		</button>

		<div class="navbar-menu" class:active={isMenuOpen}>
			<a href="/docs" class="navbar-link" class:active={$page.url.pathname.startsWith('/docs')} onclick={closeMenu}>
				Documentation
			</a>
			<a href="https://github.com/rohitpotato/svelte-command-palette" target="_blank" rel="noopener" class="navbar-link" onclick={closeMenu}>
				GitHub
			</a>
			<button class="navbar-theme-toggle" onclick={switchTheme} aria-label="Toggle theme">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="4"/>
					<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
				</svg>
			</button>
			<a href="/docs" class="btn btn-primary navbar-cta" onclick={closeMenu}>
				Get Started
			</a>
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: rgba(10, 10, 15, 0.8);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--color-border);
	}

	:global(.light) .navbar {
		background: rgba(255, 255, 255, 0.8);
	}

	.navbar-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.875rem 1.5rem;
	}

	.navbar-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		text-decoration: none;
	}

	.navbar-brand svg {
		color: var(--color-accent);
	}

	.navbar-toggle {
		display: none;
		background: none;
		border: none;
		color: var(--color-text-primary);
		cursor: pointer;
		padding: 0.5rem;
	}

	.navbar-menu {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.navbar-link {
		font-size: 0.9375rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.navbar-link:hover,
	.navbar-link.active {
		color: var(--color-text-primary);
	}

	.navbar-theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--color-bg-tertiary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.navbar-theme-toggle:hover {
		background: var(--color-bg-hover);
		color: var(--color-text-primary);
	}

	.navbar-cta {
		padding: 0.5rem 1.25rem;
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.navbar-toggle {
			display: flex;
		}

		.navbar-menu {
			position: fixed;
			top: 60px;
			left: 0;
			right: 0;
			bottom: 0;
			flex-direction: column;
			gap: 1rem;
			padding: 2rem;
			background: var(--color-bg-primary);
			border-top: 1px solid var(--color-border);
			transform: translateX(100%);
			transition: transform var(--transition-normal);
		}

		.navbar-menu.active {
			transform: translateX(0);
		}

		.navbar-link {
			font-size: 1.125rem;
			padding: 0.75rem 0;
		}

		.navbar-cta {
			width: 100%;
			margin-top: 1rem;
		}
	}
</style>
