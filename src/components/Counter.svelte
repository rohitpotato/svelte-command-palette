<script lang="ts">
	interface Props {
		counter?: number;
	}

	let { counter = 0 }: Props = $props();
</script>

<div
	class="mt-8 py-16 shadow-md flex items-center justify-center text-6xl dark:bg-dark-mode-gray dark:text-light-gray"
>
	{counter}
</div>
