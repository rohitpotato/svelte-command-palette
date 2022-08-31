<script lang="ts">
	import switchTheme from '../utils/switchTheme';
</script>

<nav class="flex items-center justify-between shadow-sm  py-6 px-8 dark:bg-dark-mode-gray">
	<a href="/" class="text-svelte-brand text-xl font-bold">Svelte Command Palette</a>
	<div class="flex gap-12 dark:text-svelte-brand">
		<button on:click={() => switchTheme()} type="button">Switch Theme</button>
		<a href="/docs">Docs</a>
		<a target="_blank" rel="noreferrer" href="https://github.com/rohitpotato/svelte-command-palette"
			>Github</a
		>
		<a href="https://twitter.com/rohitpotato">Twitter</a>
	</div>
</nav>
