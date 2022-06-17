<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const handleButtonClick = (event: MouseEvent) => {
		dispatch('KeyboardButtonClicked', {
			event
		});
	};
</script>

<button on:click={handleButtonClick}>
	<slot />
</button>

<style>
	button {
		background: #cbd5e0;
		padding: 0.25rem 0.375rem;
		box-shadow: 0 0 0 0px #fff, 0, 0 1px 2px rgb(0 0 0/0.05) 0 0 #0000;
		border: 2px solid #cbd5e0;
		color: #718096;
		font-size: 14px;
	}
</style>
