<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navbar from '../components/Navbar.svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<meta name="description" content="A beautiful, accessible command palette for Svelte 5. Boost productivity with keyboard shortcuts and fuzzy search.">
	<meta name="theme-color" content="#0a0a0f">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
	<title>Svelte Command Palette - Keyboard-driven productivity for Svelte apps</title>

	<script>
		// Theme initialization
		const getTheme = () => localStorage.getItem('theme') || 'dark';
		const applyTheme = () => {
			const theme = getTheme();
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(theme);
		};
		applyTheme();
	</script>
</svelte:head>

<Navbar />
<main>
	{@render children()}
</main>

<style>
	main {
		min-height: 100vh;
	}
</style>
