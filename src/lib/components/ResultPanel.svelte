<script lang="ts">
	import { paletteStore } from '../store/PaletteStore';
	import { onDestroy } from 'svelte';
	import Result from './Result.svelte';
	import { getNonEmptyArray } from '../utils';
	import type { commands, storeParams } from '$lib/types';

	let actions: commands = [];
	const unsubscribe = paletteStore.subscribe((value: storeParams) => {
		actions = getNonEmptyArray(value.results);
	});

	onDestroy(unsubscribe);
</script>

<ul role="listbox">
	{#if actions.length > 0}
		{#each actions as action (action.actionId)}
			<Result {action} />
		{/each}
	{:else}
		<div class="no-results">
			<span> No results found</span>
		</div>
	{/if}
</ul>

<style>
	ul {
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
