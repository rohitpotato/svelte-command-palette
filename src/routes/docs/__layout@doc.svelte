<script>
	import Navbar from '../../components/Navbar.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
</script>

<Navbar />
<div class="flex">
	<Sidebar />
	<main><slot /></main>
</div>
