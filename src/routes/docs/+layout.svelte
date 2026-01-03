<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from '../../components/Sidebar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

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
