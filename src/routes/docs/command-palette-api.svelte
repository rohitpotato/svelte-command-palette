<script context="module">
	export async function load({ fetch }) {
		let data = await fetch('/code/code.json?file=command-palette.html');
		data = await data.json();
		return {
			props: {
				html: data.html
			}
		};
	}
</script>

<script lang="ts">
	export let html: string;

</script>

<div class="flex flex-col gap-5 my-4">
	<h1 class="text-2xl font-semibold">Command Palette API</h1>
	<h3 class="text-lg font-medium">
		Actions can be defined with the defineActions API.
	</h3>

	<h3 class="text-lg font-medium">These actions can then be passed to CommandPalette</h3>

	<h3 class="text-lg font-medium">Render CommandPalette at the root of your application.</h3>
</div>

<div>{@html html}</div>

<style>
	div > :global(pre) {
		padding: 2rem;
		border-radius: 0.4rem;
	}
</style>
