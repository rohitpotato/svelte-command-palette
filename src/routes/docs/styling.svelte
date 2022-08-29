<script context="module">
	export async function load({ fetch }) {
		let data = await fetch('/code/code.json?file=styling.html');
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
	<h1 class="text-2xl font-semibold">Styling</h1>
	<h3 class="text-lg font-medium">
		You have complete control over the styling of the command palette
	</h3>

	<h3 class="text-lg font-medium">
		You can use classes (tailwind too) to style the command palette. Note that svelte applies the
		scoped classes with priority, to overwrite this, pass <pre class="inline">unstyled={true}</pre>
	</h3>

	<h3 class="text-lg font-medium">
		Or just directly pass css styles to completely change the look and feel of the command palette
	</h3>
</div>

<div>{@html html}</div>

<style>
	div > :global(pre) {
		padding: 2rem;
		border-radius: 0.4rem;
	}
</style>
