<script>
	import Hero from '../components/Hero.svelte';
	import Navbar from '../components/Navbar.svelte';
	import CommandPalette, { defineActions, paletteStore } from '../lib';

	let actions = defineActions([
		{
			title: 'Title 1',
			subTitle: 'this is the subtitle for title 1',
			description: '1. something going here idk about?',
			onRun: () => {
				console.log('do something');
			},
			shortcut: 'P P'
		},
		{
			title: 'Title 2',
			subTitle: 'this is the subtitle for title 2',
			description: '2. something going here idk about?',
			onRun: (props = {}) => {
				console.log('do something 2', props);
			},
			shortcut: 'K G B'
		},
		{
			title: 'Title 3',
			subTitle: 'this is the subtitle for title 3',
			description: '3. something going here idk about?',
			onRun: (props) => {
				console.log('do something 3', props);
			}
		},
		{
			title: 'Title 4',
			subTitle: 'this is the subtitle for title 4',
			description: '4. something going here idk about?',
			onRun: (props) => {
				console.log('4', props);
			},
			shortcut: 'C I A'
		},
		{
			title: 'Title 5',
			subTitle: 'this is the subtitle for title 5',
			description: '5. something going here idk about?',
			onRun: ({ storeProps }) => {
				window.open('https://github.com');
			},
			shortcut: 'Space k'
		},
		{
			title: 'Title 6',
			subTitle: 'this is the subtitle for title 6',
			description: '6. something going here idk about?',
			onRun: ({ storeProps }) => {
				window.open('https://github.com');
			}
		},
		{
			title: 'Title 7',
			subTitle: 'this is the subtitle for title 7',
			description: '7. something going here idk about?',
			onRun: ({ storeProps }) => {
				window.open('https://github.com');
			}
		},
		{
			title: 'Title 8',
			subTitle: 'this is the subtitle for title 8',
			description: '8. something going here idk about?',
			onRun: ({ storeProps }) => {
				window.open('https://github.com');
			}
		},
		{
			title: 'Title 9',
			subTitle: 'this is the subtitle for title 9',
			description: '9. something going here idk about?',
			onRun: ({ storeProps }) => {
				window.open('https://github.com');
			}
		},
		{
			title: 'Title 10',
			subTitle: 'this is the subtitle for title 10',
			description: '10. something going here idk about?',
			onRun: ({ storeProps }) => {
				window.open('https://github.com');
			}
		}
	]);

	const openCommandPalette = () => {
		paletteStore.update((val) => {
			val.isVisible = true;
			return val;
		});
	};
</script>

<CommandPalette commands={actions} />
<div class="px-8">
	<Navbar />
	<Hero onClick={openCommandPalette} />
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>
