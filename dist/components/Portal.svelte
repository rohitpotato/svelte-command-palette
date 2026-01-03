<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tick } from 'svelte';

	interface Props {
		target?: string;
		children?: Snippet;
	}

	let { target = 'body', children }: Props = $props();

	const portal = (node: HTMLElement, targetSelector: string) => {
		async function update(targetSelector: string) {
			let targetElement = document.querySelector(targetSelector);
			if (targetElement === null) {
				await tick();
				targetElement = document.querySelector(targetSelector);
			}
			if (targetElement === null) {
				throw new Error('No element found matching selector');
			}
			targetElement.appendChild(node);
		}

		function destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}

		update(targetSelector);
		return {
			update,
			destroy
		};
	};
</script>

<div use:portal={target}>
	{#if children}
		{@render children()}
	{/if}
</div>
