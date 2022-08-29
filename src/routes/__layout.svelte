<script>
	import Navbar from '../components/Navbar.svelte';
	import '../app.css';
</script>

<svelte:head>
	<script>
		const getThemeFromLocalStorage = () => {
			const theme = localStorage.getItem('theme') || 'dark';
			return theme;
		};

		const applyTheme = () => {
			const theme = getThemeFromLocalStorage();
			const root = window.document.documentElement;
			root.classList.add(theme);
		};
		applyTheme();
	</script>
</svelte:head>

<Navbar />
<slot />
