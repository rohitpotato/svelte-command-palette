<script>
	import Navbar from '../../components/Navbar.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
</script>

<Navbar />
<div class="flex">
	<Sidebar />
	<main class="px-12 py-4"><slot /></main>
</div>
