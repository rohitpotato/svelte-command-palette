<script lang="ts">
	import { paletteStore } from '../store/PaletteStore';
	import { onMount, getContext } from 'svelte';
	import { runAction } from '../utils';
	import KeyboardButton from './KeyboardButton.svelte';
	import { THEME_CONTEXT } from '../constants';
	import type { action as ActionType, themeContext as ThemeContextType } from '$lib/types';
	import type { Writable } from 'svelte/store';

	interface Props {
		action: ActionType;
	}

	let { action: actionProp }: Props = $props();

	let elRef: HTMLElement | undefined = $state();
	let isActive = $state(false);
	let formattedShortcut: Array<string> = $state([]);

	const themeCtx: Writable<ThemeContextType> = getContext(THEME_CONTEXT);
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
	} = $themeCtx;

	// Replace afterUpdate with $effect
	$effect(() => {
		if (actionProp.actionId === $paletteStore.activeCommandId && elRef) {
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
			action: actionProp
		});
	};

	onMount(async () => {
		const tinyKeys = await import('tinykeys');
		const { parseKeybinding } = tinyKeys;
		if (actionProp.shortcut) {
			const parsedShortcut = parseKeybinding(actionProp.shortcut);
			formattedShortcut = parsedShortcut.flat().filter((s: string) => s.length > 0) as string[];
		}
	});

	const onMouseEnter = () => {
		isActive = true;
		paletteStore.update((value) => {
			return {
				...value,
				activeCommandId: actionProp.actionId || '',
				selectedCommandId: actionProp.actionId || ''
			};
		});
	};

	const onMouseLeave = () => {
		isActive = false;
	};

</script>

<div
	class:cp-result={!unstyled}
	class:cp-result-active={!unstyled && isActive}
	class={`${resultContainerClass || ''} ${
		isActive ? (!unstyled ? '' : optionSelectedClass || '') : ''
	}`}
	style={`${resultContainerStyle || ''} ${isActive ? optionSelectedStyle || '' : ''}`}
	aria-selected={isActive}
	role="option"
	id={`palette-${actionProp.actionId}`}
	bind:this={elRef}
	onclick={handleRunAction}
	onkeydown={(e) => e.key === 'Enter' && handleRunAction()}
	onmouseenter={onMouseEnter}
	onmouseleave={onMouseLeave}
	tabindex={-1}
>
	{#if actionProp.icon}
		<div class="cp-result-icon">
			{#if typeof actionProp.icon === 'function'}
				<!-- Snippet: custom SVG or component -->
				{@render actionProp.icon()}
			{:else if typeof actionProp.icon === 'string'}
				{#if actionProp.icon.startsWith('http') || actionProp.icon.startsWith('/')}
					<img src={actionProp.icon} alt="" width="20" height="20" />
				{:else}
					<span class="cp-result-emoji">{actionProp.icon}</span>
				{/if}
			{/if}
		</div>
	{/if}

	<div class="cp-result-content">
		<div class={`cp-result-title ${titleClass || ''}`} class:title={!unstyled} style={titleStyle || ''}>
			<span>{actionProp.title}</span>
		</div>
		{#if actionProp.subTitle}
			<div class={`cp-result-subtitle ${subtitleClass || ''}`} style={subtitleStyle || ''}>
				{actionProp.subTitle}
			</div>
		{/if}
		{#if actionProp.description}
			<div class={`cp-result-description ${descriptionClass || ''}`} style={descriptionStyle || ''}>
				{actionProp.description}
			</div>
		{/if}
	</div>

	{#if formattedShortcut.length > 0}
		<div class="cp-result-shortcuts">
			{#each formattedShortcut as shortcut}
				<KeyboardButton>
					{#snippet children()}
						<span>{shortcut}</span>
					{/snippet}
				</KeyboardButton>
			{/each}
		</div>
	{/if}
</div>

<style>
	.cp-result {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.1s ease;
	}

	/* Default: Dark mode styles */
	.cp-result:hover,
	.cp-result-active {
		background: #374151;
	}

	.cp-result-icon {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #374151;
		border-radius: 8px;
	}

	.cp-result-emoji {
		font-size: 1.25rem;
	}

	.cp-result-icon img {
		border-radius: 4px;
	}

	.cp-result-content {
		flex: 1;
		min-width: 0;
	}

	.cp-result-title {
		font-weight: 500;
		color: #f9fafb;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cp-result-subtitle {
		font-size: 0.875rem;
		color: #9ca3af;
		margin-top: 0.125rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cp-result-description {
		font-size: 0.75rem;
		color: #6b7280;
		margin-top: 0.25rem;
	}

	.cp-result-shortcuts {
		display: flex;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	/* Light mode: class-based */
	:global(.light) .cp-result:hover,
	:global(.light) .cp-result-active,
	:global(html.light) .cp-result:hover,
	:global(html.light) .cp-result-active,
	:global(body.light) .cp-result:hover,
	:global(body.light) .cp-result-active {
		background: #f3f4f6;
	}

	:global(.light) .cp-result-icon,
	:global(html.light) .cp-result-icon,
	:global(body.light) .cp-result-icon {
		background: #f3f4f6;
	}

	:global(.light) .cp-result-title,
	:global(html.light) .cp-result-title,
	:global(body.light) .cp-result-title {
		color: #111827;
	}

	:global(.light) .cp-result-subtitle,
	:global(html.light) .cp-result-subtitle,
	:global(body.light) .cp-result-subtitle {
		color: #6b7280;
	}

	:global(.light) .cp-result-description,
	:global(html.light) .cp-result-description,
	:global(body.light) .cp-result-description {
		color: #9ca3af;
	}

	/* Light mode: media query fallback */
	@media (prefers-color-scheme: light) {
		.cp-result:hover,
		.cp-result-active {
			background: #f3f4f6;
		}

		.cp-result-icon {
			background: #f3f4f6;
		}

		.cp-result-title {
			color: #111827;
		}

		.cp-result-subtitle {
			color: #6b7280;
		}

		.cp-result-description {
			color: #9ca3af;
		}
	}
</style>
