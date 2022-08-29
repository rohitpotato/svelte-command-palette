<script>
	import { page } from '$app/stores';
</script>

<aside class="sticky left-0 w-72 h-screen top-0 shadow-md min-w-max dark:bg-dark-mode-black">
	<nav class="p-4">
		<h4 class="text-2xl">Command Palette API</h4>
		<ul class="mt-4 flex flex-col gap-4 dark:text-light-gray">
			<li
				class=" cursor-pointer tracking-wide hover:bg-svelte-brand rounded"
				class:bg-svelte-brand={$page.url.pathname === '/docs/command-palette-api'}
			>
				<a class="py-3 px-2 block w-full" href="/docs/command-palette-api">CommandPalette</a>
			</li>
			<li
				class=" cursor-pointer tracking-wide hover:bg-svelte-brand rounded"
				class:bg-svelte-brand={$page.url.pathname === '/docs/palette-store'}
			>
				<a class="py-3 px-2 block w-full" href="/docs/palette-store">palette-store</a>
			</li>
			<li
				class=" cursor-pointer tracking-wide hover:bg-svelte-brand rounded"
				class:bg-svelte-brand={$page.url.pathname === '/docs/styling'}
			>
				<a class="py-3 px-2 block w-full" href="/docs/styling">Styling</a>
			</li>
		</ul>
	</nav>
</aside>
