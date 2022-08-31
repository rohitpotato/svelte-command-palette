<script>
	import Navbar from '../../components/Navbar.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
</script>

<Navbar />
<div class="flex dark:text-white dark:bg-dark-mode-gray">
	<Sidebar />
	<main class="px-12 py-4"><slot /></main>
</div>
