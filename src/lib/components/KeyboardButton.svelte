<script lang="ts">
	import { THEME_CONTEXT } from '$lib/constants';
	import type { themeContext } from '$lib/types';
	import { createEventDispatcher, getContext } from 'svelte';
	const dispatch = createEventDispatcher();

	const handleButtonClick = (event: MouseEvent) => {
		dispatch('KeyboardButtonClicked', {
			event
		});
	};

	const themeContext: themeContext = getContext(THEME_CONTEXT);
	const { unstyled, keyboardButtonClass, keyboardButtonStyle } = themeContext;
</script>

<button
	style={keyboardButtonStyle}
	class:keyboardButton={!unstyled}
	class={keyboardButtonClass}
	on:click={handleButtonClick}
>
	<slot />
</button>

<style>
	.keyboardButton {
		background: #cbd5e0;
		padding: 0.25rem 0.5rem;
		box-shadow: 0 0 0 0px #fff, 0, 0 1px 2px rgb(0 0 0/0.05) 0 0 #0000;
		border: 2px solid #cbd5e0;
		color: #718096;
		font-size: 14px;
		border-radius: 4px;
	}
</style>
