<script lang="ts">
	import { paletteStore } from '../store/PaletteStore';
	import { afterUpdate } from 'svelte';
	import { runAction } from '../utils';
	import KeyboardButton from './KeyboardButton.svelte';
	import { parseKeybinding } from 'tinykeys';
	import type { action } from '$lib/types';

	export let action: action;
	let elRef: HTMLElement;
	let isActive: boolean;
	let formattedShortcut: Array<string[] | string> = [];

	afterUpdate(() => {
		if (action.actionId === $paletteStore.activeCommandId && elRef) {
			isActive = true;
			elRef.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		} else {
			isActive = false;
		}
	});

	const handleRunAction = () => {
		runAction({
			action
		});
	};

	if (action.shortcut) {
		const parsedShortcut = parseKeybinding(action.shortcut);
		formattedShortcut = parsedShortcut.flat().filter((s) => s.length > 0);
	}
</script>

<li
	aria-selected={isActive}
	role="option"
	bind:this={elRef}
	on:click={handleRunAction}
	class:selected={isActive}
>
	<div>
		<h4 class="title">{action.title}</h4>
		<p class="subtitle">{action.subTitle}</p>
		<p class="description">{action.description}</p>
	</div>
	<div class="shortcuts">
		{#each formattedShortcut as shortcut}
			<KeyboardButton>
				<span>
					{shortcut}
				</span>
			</KeyboardButton>
		{/each}
	</div>
</li>

<style>
	li {
		padding: 1rem;
		border-bottom: 1px solid #f7fafc;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	li:hover {
		background: #edf2f7;
	}
	.selected {
		background: #edf2f7;
	}

	.title {
		font-weight: 400;
	}
	.subtitle {
		font-size: 13px;
		margin: 8px 0;
		color: #2d3748;
	}

	.description {
		font-size: 10px;
		color: #2d3748;
	}

	.shortcuts {
		display: flex;
		gap: 0.375rem;
	}
</style>
