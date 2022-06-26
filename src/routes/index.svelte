<script>
	import Hero from '../components/Hero.svelte';
	import Navbar from '../components/Navbar.svelte';
	import CommandPalette, { defineActions, paletteStore } from '../lib';

	let counter = 0;

	paletteStore.update((value) => {
		return {
			...value,
			profileType: 'user'
		};
	});

	let actions = defineActions([
		{
			title: 'Title 1',
			subTitle: 'this is the subtitle for title 1',
			description: '1. something going here idk about?',
			onRun: ({ storeProps }) => {
				console.log('do something');
			},
			shortcut: 'P P'
		},
		{
			title: 'Increment Counter',
			subTitle: 'This will increment the counter',
			description: 'Or press C C to do it form anywhere!',
			onRun: () => {
				incrementCounter();
			},
			shortcut: 'C C'
		},
		{
			actionId: 3,
			title: 'Conditional Actions',
			subTitle: 'Conditional Actions based on state',
			description: 'You can add conditional actions to run only when you want them to!',
			canActionRun: () => {
				return counter > 2;
			},
			onRun: () => {
				runConditionalAction();
			},
			shortcut: 'F B I'
		},
		{
			title: 'Run advanced conditional action',
			subTitle: 'You must run the previous action atleast once to run this action',
			description: 'You can run actions based on the state of your command palette',
			canActionRun: ({ storeProps }) => {
				console.log({ storeProps, ca: storeProps.calledActions });
				const isActionExectuted = storeProps.calledActions.find((actionId) => {
					return actionId === 3;
				});
				if (isActionExectuted) {
					return true;
				}
				alert('Run the previous action alteast once!');
				return false;
			},
			onRun: () => {
				alert('Batman is bruce wayne!!');
			},
			shortcut: 'C I A'
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

	const incrementCounter = () => {
		counter = counter + 1;
	};

	const runConditionalAction = () => {
		alert('Look ma! I can run.');
	};
</script>

<CommandPalette commands={actions} />
<div class="px-8">
	<Navbar />
	<Hero {incrementCounter} {counter} {openCommandPalette} />
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>
