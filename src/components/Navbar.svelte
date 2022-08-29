<script lang="ts">
	import themeStore from '../store/themeStore';
	const LIGHT = 'light';
	const DARK = 'dark';

	const handleThemeSwitch = () => {
		const theme = localStorage.getItem('theme') || 'light';
		const root = window.document.documentElement;
		const isDark = theme === DARK;
		root.classList.remove(theme);
		root.classList.add(isDark ? LIGHT : DARK);
		localStorage.setItem('theme', isDark ? LIGHT : DARK);
		themeStore.set(isDark ? LIGHT : DARK);
	};
</script>

<nav class="flex items-center justify-between shadow-sm  py-6 px-8 dark:bg-dark-mode-gray">
	<a href="/" class="text-svelte-brand text-xl font-bold">Svelte Command Palette</a>
	<div class="flex gap-12 dark:text-svelte-brand">
		<button on:click={() => handleThemeSwitch()} type="button">Switch Theme</button>
		<a href="/docs">Docs</a>
		<a target="_blank" rel="noreferrer" href="https://github.com/rohitpotato/svelte-command-palette"
			>Github</a
		>
		<a href="https://twitter.com/rohitpotato">Twitter</a>
	</div>
</nav>
