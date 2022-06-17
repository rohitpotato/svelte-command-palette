<script lang="ts">
	// @ts-nocheck
	import { tick } from 'svelte';

	export let target = 'body';
	const portal = (node: HTMLElement, target: keyof HTMLElementTagNameMap | HTMLElement) => {
		async function update(target: keyof HTMLElementTagNameMap | HTMLElement) {
			const targetType = typeof target;
			if (targetType === 'string') {
				const isValidTarget = document.querySelector(target);
				if (isValidTarget === null) {
					await tick();
				}
				if (isValidTarget === null) {
					throw new Error('No element found matching selector');
				}
				if (isValidTarget) {
					isValidTarget.appendChild(node);
					return true;
				}
				throw new Error(
					'Invalid target passed, target can either be a classname, id or HTMLElement'
				);
			} else if (target instanceof HTMLElement) {
				target.appendChild(node);
			}
		}

		function destroy() {
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
		update(target);
		return {
			update,
			destroy
		};
	};
</script>

<div use:portal={target}>
	<slot />
</div>
