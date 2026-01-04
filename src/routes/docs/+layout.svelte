<script lang="ts">
	import type { Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import Sidebar from '../../components/Sidebar.svelte';
	import CommandPalette, { defineActions, createStoreMethods } from '$lib';
	import { 
		BookOpen, 
		Zap, 
		FileCode, 
		Target, 
		Database, 
		Paintbrush, 
		Moon,
		Keyboard,
		Puzzle,
		Home,
		Github
	} from 'lucide-svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	const paletteMethods = createStoreMethods();
</script>

<!-- Define Lucide icon snippets -->
{#snippet bookOpenIcon()}
	<BookOpen size={18} />
{/snippet}

{#snippet zapIcon()}
	<Zap size={18} />
{/snippet}

{#snippet fileCodeIcon()}
	<FileCode size={18} />
{/snippet}

{#snippet targetIcon()}
	<Target size={18} />
{/snippet}

{#snippet databaseIcon()}
	<Database size={18} />
{/snippet}

{#snippet paintbrushIcon()}
	<Paintbrush size={18} />
{/snippet}

{#snippet moonIcon()}
	<Moon size={18} />
{/snippet}

{#snippet keyboardIcon()}
	<Keyboard size={18} />
{/snippet}

{#snippet puzzleIcon()}
	<Puzzle size={18} />
{/snippet}

{#snippet homeIcon()}
	<Home size={18} />
{/snippet}

{#snippet githubIcon()}
	<Github size={18} />
{/snippet}

<CommandPalette
	commands={defineActions([
		{
			title: 'Getting Started',
			subTitle: 'Installation and quick start guide',
			icon: bookOpenIcon,
			group: 'Documentation',
			onRun: () => goto('/docs/installation'),
			shortcut: 'G I'
		},
		{
			title: 'Quick Start',
			subTitle: 'Get up and running in 5 minutes',
			icon: zapIcon,
			group: 'Documentation',
			onRun: () => goto('/docs/quick-start'),
			shortcut: 'G Q'
		},
		{
			title: 'Command Palette API',
			subTitle: 'Component props and configuration',
			icon: fileCodeIcon,
			group: 'API Reference',
			onRun: () => goto('/docs/command-palette-api'),
			shortcut: 'G A'
		},
		{
			title: 'Define Actions',
			subTitle: 'Creating and configuring actions',
			icon: targetIcon,
			group: 'API Reference',
			onRun: () => goto('/docs/define-actions'),
		},
		{
			title: 'Palette Store',
			subTitle: 'Store methods and state management',
			icon: databaseIcon,
			group: 'API Reference',
			onRun: () => goto('/docs/palette-store'),
		},
		{
			title: 'Styling',
			subTitle: 'Customize the look and feel',
			icon: paintbrushIcon,
			group: 'Customization',
			onRun: () => goto('/docs/styling'),
			shortcut: 'G S'
		},
		{
			title: 'Theming',
			subTitle: 'Light and dark mode support',
			icon: moonIcon,
			group: 'Customization',
			onRun: () => goto('/docs/theming'),
		},
		{
			title: 'Keyboard Shortcuts',
			subTitle: 'Configure keyboard bindings',
			icon: keyboardIcon,
			group: 'Customization',
			onRun: () => goto('/docs/shortcuts'),
		},
		{
			title: 'Custom Components',
			subTitle: 'Icons, groups, and empty states',
			icon: puzzleIcon,
			group: 'Customization',
			onRun: () => goto('/docs/custom-components'),
		},
		{
			title: 'Go to Homepage',
			subTitle: 'Return to the main page',
			icon: homeIcon,
			group: 'Navigation',
			onRun: () => goto('/'),
			shortcut: 'G H'
		},
		{
			title: 'View on GitHub',
			subTitle: 'Check out the source code',
			icon: githubIcon,
			group: 'Navigation',
			onRun: () => window.open('https://github.com/rohitpotato/svelte-command-palette', '_blank'),
		}
	])}
	placeholder="Search documentation..."
	shortcut="$mod+k"
/>

<div class="docs-layout">
	<Sidebar />
	<main class="docs-main">
		<article class="docs-content">
			{@render children()}
		</article>
	</main>
</div>

<style>
	.docs-layout {
		display: flex;
		min-height: calc(100vh - 60px);
		margin-top: 60px;
	}

	.docs-main {
		flex: 1;
		margin-left: 280px;
		padding: var(--space-2xl);
	}

	.docs-content {
		max-width: 800px;
		margin: 0 auto;
	}

	/* Prose styles for documentation content */
	.docs-content :global(h1) {
		font-size: 2.5rem;
		margin-bottom: var(--space-lg);
	}

	.docs-content :global(h2) {
		font-size: 1.75rem;
		margin-top: var(--space-2xl);
		margin-bottom: var(--space-md);
		padding-bottom: var(--space-sm);
		border-bottom: 1px solid var(--color-border);
	}

	.docs-content :global(h3) {
		font-size: 1.25rem;
		margin-top: var(--space-xl);
		margin-bottom: var(--space-sm);
	}

	.docs-content :global(p) {
		margin-bottom: var(--space-md);
		line-height: 1.7;
	}

	.docs-content :global(ul),
	.docs-content :global(ol) {
		margin-bottom: var(--space-md);
		padding-left: var(--space-lg);
	}

	.docs-content :global(li) {
		margin-bottom: var(--space-sm);
		color: var(--color-text-secondary);
	}

	.docs-content :global(pre) {
		margin: var(--space-lg) 0;
	}

	.docs-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: var(--space-lg) 0;
		font-size: 0.9375rem;
	}

	.docs-content :global(th),
	.docs-content :global(td) {
		text-align: left;
		padding: var(--space-sm) var(--space-md);
		border-bottom: 1px solid var(--color-border);
	}

	.docs-content :global(th) {
		font-weight: 600;
		color: var(--color-text-primary);
		background: var(--color-bg-secondary);
	}

	.docs-content :global(td) {
		color: var(--color-text-secondary);
	}

	.docs-content :global(td code) {
		font-size: 0.8125rem;
	}

	@media (max-width: 1024px) {
		.docs-main {
			margin-left: 0;
			padding: var(--space-lg);
		}
	}
</style>
