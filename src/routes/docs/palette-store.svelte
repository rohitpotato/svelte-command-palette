<script context="module">
	export async function load({ fetch }) {
		let data = await fetch('/code/code.json?file=paletteStore.html');
		data = await data.json();
		return {
			props: {
				html: data.html
			}
		};
	}
</script>

<script lang="ts">
    export let html:string
</script>
<div class="flex flex-col gap-5 my-4">
	<h1 class="text-2xl font-semibold">Palette Store </h1>
	<h3 class="text-lg font-medium">
		Palette store is a normal svelte store, you can update or subscribe to paletteStore like any svelte store.
	</h3>
</div>

<div>{@html html}</div>

<style>
	div > :global(pre) {
		padding: 2rem;
		border-radius: 0.4rem;
	}
</style>
