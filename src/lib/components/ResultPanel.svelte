<script lang="ts">
	import { paletteStore } from '../store/PaletteStore';
	import { onDestroy, getContext } from 'svelte';
	import Result from './Result.svelte';
	import { getNonEmptyArray } from '../utils';
	import { THEME_CONTEXT } from '../constants';
	import type { commands, storeParams, themeContext } from '$lib/types';
	import type { Writable } from 'svelte/store';

	let actions: commands = [];
	const unsubscribe = paletteStore.subscribe((value: storeParams) => {
		actions =
			value.results.length > 0 ? getNonEmptyArray(value.results) : getNonEmptyArray(value.commands);
	});

	const themeContext = getContext(THEME_CONTEXT) as Writable<themeContext>;
	const { resultsContainerClass, unstyled, resultsContainerStyle } = $themeContext;

	onDestroy(unsubscribe);
</script>

{#if actions.length > 0}
	<ul
		class={resultsContainerClass}
		class:results={!unstyled}
		style={resultsContainerStyle}
		role="listbox"
	>
		{#each actions as action (action.actionId)}
			<Result {action} />
		{/each}
	</ul>
{:else}
	<div class="no-results">
		<span> No results found</span>
	</div>
{/if}

<style>
	.results {
		width: 100%;
		list-style-type: none;
		background: white;
		overflow: scroll;
	}

	.no-results {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
