<script lang="ts">
	type themeTypes = 'primary' | 'secondary';

	interface Props {
		theme?: themeTypes;
		shortcuts?: Array<string>;
		onShortcutClick?: (detail: { event: Event }) => void;
	}

	let { theme = 'primary', shortcuts = [], onShortcutClick }: Props = $props();

	const onClick = (event: Event) => {
		onShortcutClick?.({ event });
	};

	let bgColor = $derived(
		theme === 'primary'
			? 'bg-gray-800 dark:bg-dark-mode-gray text-white dark:text-light-gray'
			: 'bg-gray-100 shadow text-black  dark:text-light-gray dark:bg-dark-mode-gray'
	);
</script>

<button
	class={`p-2 ${bgColor} mx-2 inline-flex gap-1 font-semibold rounded-md hover:scale-110 transition-transform duration-300`}
	onclick={onClick}
>
	{#each shortcuts as shortcut}
		<div class="rounded-md h-8 w-8 inline-flex items-center justify-center">
			{shortcut}
		</div>
	{/each}
</button>
