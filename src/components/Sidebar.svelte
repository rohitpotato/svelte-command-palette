<script>
	import { page } from '$app/stores';
	console.log($page.url.pathname);
</script>

<aside class="sticky left-0 w-72 h-screen top-0 shadow-md">
	<nav class="p-4">
		<h4 class="text-2xl">Command Palette API</h4>
		<ul class="mt-4">
			<li
				class=" cursor-pointer tracking-wide hover:bg-svelte-brand rounded"
				class:bg-svelte-brand={$page.url.pathname === '/docs/command-palette-api'}
			>
				<a class="py-3 px-2 block w-full" href="/docs/command-palette-api">CommandPalette</a>
			</li>
			<li
				class=" cursor-pointer tracking-wide hover:bg-svelte-brand rounded"
				class:bg-svelte-brand={$page.url.pathname === '/docs/define-actions'}
			>
				<a class="py-3 px-2 block w-full" href="/docs/define-actions">defineActions</a>
			</li>
			<li
				class=" cursor-pointer tracking-wide hover:bg-svelte-brand rounded"
				class:bg-svelte-brand={$page.url.pathname === '/docs/palette-store'}
			>
				<a class="py-3 px-2 block w-full" href="/docs/palette-store">palette-store</a>
			</li>
		</ul>
	</nav>
</aside>
