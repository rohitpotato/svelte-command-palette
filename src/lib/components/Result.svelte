<script lang="ts">
	import { paletteStore } from '../store/PaletteStore';
	import { afterUpdate, onMount, getContext } from 'svelte';
	import { runAction } from '../utils';
	import KeyboardButton from './KeyboardButton.svelte';
	import { THEME_CONTEXT } from '../constants';
	import type { action, themeContext } from '$lib/types';

	export let action: action;
	let elRef: HTMLElement;
	let isActive: boolean;
	let formattedShortcut: Array<string[] | string> = [];

	const themeContext: themeContext = getContext(THEME_CONTEXT);
	const {
		resultContainerClass,
		unstyled,
		optionSelectedClass,
		titleClass,
		subtitleClass,
		descriptionClass,
		resultContainerStyle,
		titleStyle,
		subtitleStyle,
		descriptionStyle,
		optionSelectedStyle
	} = themeContext;

	afterUpdate(() => {
		if (action.actionId === $paletteStore.activeCommandId && elRef) {
			isActive = true;
			requestAnimationFrame(() => {
				elRef?.scrollIntoView?.({
					behavior: 'smooth',
					block: 'nearest'
				});
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

	onMount(async () => {
		const tinyKeys = await import('tinykeys');
		const { parseKeybinding } = tinyKeys;
		if (action.shortcut) {
			const parsedShortcut = parseKeybinding(action.shortcut);
			formattedShortcut = parsedShortcut.flat().filter((s) => s.length > 0);
		}
	});

	const onMouseEnter = () => {
		isActive = true;
		paletteStore.update((value) => {
			return {
				...value,
				activeCommandId: action.actionId || '',
				selectedCommandId: action.actionId || ''
			};
		});
	};

	const onMouseLeave = () => {
		isActive = false;
	};
</script>

<li
	class:resultContainer={!unstyled}
	class={`${resultContainerClass} ${
		isActive ? (!unstyled ? 'selected' : optionSelectedClass) : ''
	}`}
	style={`${resultContainerStyle} ${isActive ? optionSelectedStyle : ''}`}
	aria-selected={isActive}
	role="option"
	bind:this={elRef}
	on:click={handleRunAction}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
>
	<div>
		<h4 style={titleStyle} class:title={!unstyled} class={titleClass}>{action.title}</h4>
		<p style={subtitleStyle} class:subtitle={!unstyled} class={subtitleClass}>{action.subTitle}</p>
		<p style={descriptionStyle} class:description={!unstyled} class={descriptionClass}>
			{action.description || ''}
		</p>
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
	.resultContainer {
		padding: 1rem;
		border-bottom: 1px solid #f7fafc;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
