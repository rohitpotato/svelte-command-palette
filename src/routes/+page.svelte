<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Hero from '../components/Hero.svelte';
	import Features from '../components/Features.svelte';
	import CommandPalette, { defineActions, createStoreMethods } from '$lib';
	import themeStore from '../store/themeStore';
	import switchTheme from '../utils/switchTheme';

	let currentTheme: string | null = $state('dark');
	const paletteMethods = createStoreMethods();

	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'dark';
		themeStore.set(savedTheme);
		themeStore.subscribe((value) => {
			currentTheme = value;
		});
	});

	const actions = defineActions([
		{
			title: 'Go to documentation',
			subTitle: 'Learn how to use Svelte Command Palette',
			icon: '📚',
			group: 'Navigation',
			onRun: () => goto('/docs'),
			shortcut: 'G D'
		},
		{
			title: 'View on GitHub',
			subTitle: 'Star us on GitHub!',
			icon: '⭐',
			group: 'Navigation',
			onRun: () => window.open('https://github.com/rohitpotato/svelte-command-palette', '_blank'),
			shortcut: 'G H'
		},
		{
			title: 'Toggle theme',
			subTitle: 'Switch between light and dark mode',
			icon: '🎨',
			group: 'Preferences',
			onRun: switchTheme,
			shortcut: 'T T'
		},
		{
			title: 'Copy npm install command',
			subTitle: 'Copy installation command to clipboard',
			icon: '📋',
			group: 'Quick Actions',
			onRun: () => {
				navigator.clipboard.writeText('npm install svelte-command-palette');
				alert('Copied to clipboard!');
			},
			shortcut: 'C I'
		},
		{
			title: 'Report an issue',
			subTitle: 'Found a bug? Let us know!',
			icon: '🐛',
			group: 'Quick Actions',
			onRun: () => window.open('https://github.com/rohitpotato/svelte-command-palette/issues', '_blank'),
		},
		{
			title: 'Follow on Twitter',
			subTitle: '@rohitpotato',
			icon: '🐦',
			group: 'Social',
			onRun: () => window.open('https://twitter.com/rohitpotato', '_blank'),
		}
	]);

	const openCommandPalette = () => {
		paletteMethods.openPalette();
	};

	// Dynamic theme styles
	let paletteStyles = $derived(
		currentTheme === 'light'
			? {
					inputStyle: { background: 'white', color: '#111827' },
					paletteWrapperInnerStyle: { background: 'white' },
					resultsContainerStyle: { background: 'white' }
				}
			: {
					inputStyle: { background: '#1f2937', color: '#f9fafb' },
					paletteWrapperInnerStyle: { background: '#1f2937' },
					resultsContainerStyle: { background: '#1f2937' }
				}
	);
</script>

<CommandPalette
	commands={actions}
	placeholder="Search actions..."
	shortcut="$mod+k"
	onOpen={() => console.log('Palette opened')}
	onClose={() => console.log('Palette closed')}
	onActionSelect={(action) => console.log('Selected:', action.title)}
	inputStyle={paletteStyles.inputStyle}
	paletteWrapperInnerStyle={paletteStyles.paletteWrapperInnerStyle}
	resultsContainerStyle={paletteStyles.resultsContainerStyle}
/>

<Hero {openCommandPalette} />
<Features />

<section class="cta section">
	<div class="container">
		<div class="cta-card card card-highlight">
			<h2>Ready to get started?</h2>
			<p>Install Svelte Command Palette and boost your app's productivity in minutes.</p>
			
			<div class="cta-install">
				<div class="code-block">
					<pre><code>npm install svelte-command-palette</code></pre>
				</div>
			</div>

			<div class="cta-actions">
				<a href="/docs" class="btn btn-primary">
					Read the docs
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
				<a href="https://github.com/rohitpotato/svelte-command-palette" target="_blank" rel="noopener" class="btn btn-secondary">
					View on GitHub
				</a>
			</div>
		</div>
	</div>
</section>

<footer class="footer">
	<div class="container">
		<p>
			Built with ❤️ by <a href="https://twitter.com/rohitpotato" target="_blank" rel="noopener">Rohit Kashyap</a>
		</p>
		<p class="footer-links">
			<a href="https://github.com/rohitpotato/svelte-command-palette" target="_blank" rel="noopener">GitHub</a>
			<span>•</span>
			<a href="https://twitter.com/rohitpotato" target="_blank" rel="noopener">Twitter</a>
			<span>•</span>
			<a href="/docs">Documentation</a>
		</p>
	</div>
</footer>

<style>
	.cta {
		padding-bottom: var(--space-3xl);
	}

	.cta-card {
		text-align: center;
		padding: var(--space-3xl);
	}

	.cta-card h2 {
		margin-bottom: var(--space-md);
	}

	.cta-card > p {
		max-width: 480px;
		margin: 0 auto var(--space-xl);
		font-size: 1.125rem;
	}

	.cta-install {
		max-width: 400px;
		margin: 0 auto var(--space-xl);
	}

	.cta-install .code-block {
		text-align: left;
	}

	.cta-install pre {
		margin: 0;
		padding: var(--space-md) var(--space-lg);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-md);
	}

	.footer {
		padding: var(--space-xl) 0;
		text-align: center;
		border-top: 1px solid var(--color-border);
	}

	.footer p {
		font-size: 0.875rem;
	}

	.footer-links {
		display: flex;
		justify-content: center;
		gap: var(--space-md);
		margin-top: var(--space-sm);
	}

	.footer-links span {
		color: var(--color-text-tertiary);
	}

	@media (max-width: 768px) {
		.cta-card {
			padding: var(--space-xl);
		}

		.cta-actions {
			flex-direction: column;
		}

		.cta-actions .btn {
			width: 100%;
			justify-content: center;
		}
	}
</style>
