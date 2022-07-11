<script>
	import { goto } from '$app/navigation';

	import CommandPalette, { defineActions } from 'svelte-command-palette';

	let actions = defineActions([
		{
			title: 'Go to demo',
			subTitle: 'Learn how to use svelte-command-palette',
			onRun: () => {
				goto('/');
			},
			shortcut: 'D D'
		},
		{
			title: 'Go to paletteStore docs',
			subTitle: 'Learn how to use paletteStore',
			onRun: () => {
				goto('/docs/palette-store');
			},
			shortcut: 'D P'
		},
		{
			title: 'Open Github',
			subTitle: 'Go to github in a new tab',
			onRun: () => {
				window.open('https://github.com');
			},
			shortcut: 'Space k'
		},

		{
			title: 'Open twitter',
			subTitle: 'Open my twitter handle in a new tab',
			onRun: () => {
				window.open('https://twitter.com/rohitpotato');
			},
			shortcut: 'T T'
		}
	]);
</script>

<CommandPalette commands={actions} />

<slot />
