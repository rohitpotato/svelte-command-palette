<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { THEME_CONTEXT } from '../constants';
	import type { themeContext as ThemeContextType } from '../types';
	import { getContext } from 'svelte';

	interface Props {
		children?: Snippet;
		onKeyboardButtonClicked?: (detail: { event: MouseEvent }) => void;
	}

	let { children, onKeyboardButtonClicked }: Props = $props();

	const handleButtonClick = (event: MouseEvent) => {
		event.stopPropagation();
		onKeyboardButtonClicked?.({ event });
	};

	const themeCtx: Writable<ThemeContextType> = getContext(THEME_CONTEXT);
	const { unstyled, keyboardButtonClass, keyboardButtonStyle } = $themeCtx;
</script>

<kbd
	role="button"
	tabindex={onKeyboardButtonClicked ? 0 : -1}
	style={keyboardButtonStyle}
	class:cp-kbd={!unstyled}
	class={keyboardButtonClass}
	onclick={handleButtonClick}
	onkeydown={(e) => e.key === 'Enter' && handleButtonClick(e as unknown as MouseEvent)}
>
	{#if children}
		{@render children()}
	{/if}
</kbd>

<style>
	/* Default: Dark mode styles */
	.cp-kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.5rem;
		height: 1.5rem;
		padding: 0 0.375rem;
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 500;
		color: #9ca3af;
		background: #374151;
		border: 1px solid #4b5563;
		border-radius: 4px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	/* Light mode: class-based */
	:global(.light) .cp-kbd,
	:global(html.light) .cp-kbd,
	:global(body.light) .cp-kbd {
		color: #6b7280;
		background: #f3f4f6;
		border-color: #e5e7eb;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	/* Light mode: media query fallback */
	@media (prefers-color-scheme: light) {
		.cp-kbd {
			color: #6b7280;
			background: #f3f4f6;
			border-color: #e5e7eb;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		}
	}
</style>
