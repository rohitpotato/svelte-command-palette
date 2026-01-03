<script lang="ts">
	import type { Snippet } from 'svelte';
	import { paletteStore } from '../store/PaletteStore';
	import { onDestroy, getContext } from 'svelte';
	import Result from './Result.svelte';
	import { getNonEmptyArray, groupActions } from '../utils';
	import { THEME_CONTEXT } from '../constants';
	import type { commands, storeParams, themeContext as ThemeContextType } from '../types';
	import type { Writable } from 'svelte/store';

	interface Props {
		emptyState?: Snippet;
	}

	let { emptyState }: Props = $props();

	let actions: commands = $state([]);

	const unsubscribe = paletteStore.subscribe((value: storeParams) => {
		actions =
			value.results.length > 0 ? getNonEmptyArray(value.results) : getNonEmptyArray(value.commands);
	});

	const themeCtx = getContext(THEME_CONTEXT) as Writable<ThemeContextType>;
	const { resultsContainerClass, unstyled, resultsContainerStyle } = $themeCtx;

	// Group actions by their group property
	let groupedActions = $derived(groupActions(actions));

	onDestroy(unsubscribe);
</script>

{#if actions.length > 0}
	<div
		class={resultsContainerClass}
		class:cp-results={!unstyled}
		style={resultsContainerStyle}
		role="listbox"
		id="command-palette-results"
	>
		{#each [...groupedActions.entries()] as [groupName, groupActions]}
			{#if groupName}
				<div class="cp-group-header">
					{groupName}
				</div>
			{/if}
			{#each groupActions as action (action.actionId)}
				<Result {action} />
			{/each}
		{/each}
	</div>
{:else}
	<div class="cp-empty">
		{#if emptyState}
			{@render emptyState()}
		{:else}
			<div class="cp-empty-content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.3-4.3"></path>
				</svg>
				<p>No results found</p>
				<span>Try a different search term</span>
			</div>
		{/if}
	</div>
{/if}

<style>
	.cp-results {
		width: 100%;
		overflow-y: auto;
		max-height: calc(70vh - 60px);
		padding: 0.5rem;
	}

	/* Default: Dark mode styles */
	.cp-group-header {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #9ca3af;
		padding: 0.75rem 0.75rem 0.5rem;
		margin-top: 0.5rem;
	}

	.cp-group-header:first-child {
		margin-top: 0;
	}

	.cp-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
	}

	.cp-empty-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		color: #6b7280;
		text-align: center;
	}

	.cp-empty-content p {
		font-weight: 500;
		color: #9ca3af;
		margin: 0;
	}

	.cp-empty-content span {
		font-size: 0.875rem;
	}

	@media (max-width: 640px) {
		.cp-results {
			max-height: calc(85vh - 60px);
		}
	}

	/* Light mode: class-based */
	:global(.light) .cp-group-header,
	:global(html.light) .cp-group-header,
	:global(body.light) .cp-group-header {
		color: #6b7280;
	}

	:global(.light) .cp-empty-content,
	:global(html.light) .cp-empty-content,
	:global(body.light) .cp-empty-content {
		color: #9ca3af;
	}

	:global(.light) .cp-empty-content p,
	:global(html.light) .cp-empty-content p,
	:global(body.light) .cp-empty-content p {
		color: #6b7280;
	}

	/* Light mode: media query fallback */
	@media (prefers-color-scheme: light) {
		.cp-group-header {
			color: #6b7280;
		}

		.cp-empty-content {
			color: #9ca3af;
		}

		.cp-empty-content p {
			color: #6b7280;
		}
	}
</style>
