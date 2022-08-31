<script lang="ts">
	import { goto } from '$app/navigation';
	import { afterUpdate, onMount } from 'svelte';
	import Hero from '../components/Hero.svelte';
	import CommandPalette, { defineActions, paletteStore, createStoreMethods } from '../lib';
	import themeStore from '../store/themeStore';
	import switchTheme from '../utils/switchTheme';

	type Themes = string | null;

	let currentTheme: Themes;
	const paletteMethods = createStoreMethods();

	onMount(() => {
		themeStore.set(localStorage.getItem('theme'));
		themeStore.subscribe((value) => {
			currentTheme = value;
		});
	});

	let counter = 0;

	let actions = defineActions([
		{
			title: 'Go to docs',
			subTitle: 'Learn how to use svelte-command-palette',
			onRun: () => {
				goto('/docs');
			},
			shortcut: 'D D'
		},
		{
			title: 'Switch Theme',
			subTitle: 'Switch theme to see palette reflecting new theme',
			description: 'New feature, not customise command-palette however you want',
			shortcut: 'S T',
			onRun: switchTheme
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
			title: 'Open twitter',
			subTitle: 'Open my twitter handle in a new tab',
			onRun: () => {
				window.open('https://twitter.com/rohitpotato');
			},
			shortcut: 'T T'
		}
	]);

	const openCommandPalette = () => {
		paletteMethods.openPalette();
	};

	const incrementCounter = () => {
		counter = counter + 1;
	};

	const runConditionalAction = () => {
		alert('Look ma! I can run.');
	};

	$: paletteTheme =
		currentTheme === 'light'
			? {
					placeholder: 'Search for actions',
					inputStyles: {
						background: 'white'
					},
					resultsContainerStyle: {
						background: 'white'
					},
					resultContainerStyle: {
						background: 'white'
					},
					titleStyle: {
						color: 'black'
					},
					subtitleStyle: {
						color: 'blueviolet'
					},
					descriptionStyle: {
						color: 'black'
					}
			  }
			: {
					placeholder: 'Search for darker actions',
					inputStyles: {
						background: '#212121',
						color: '#ECEDF3'
					},
					resultsContainerStyle: {
						background: '#121212'
					},
					resultContainerStyle: {
						background: '#121212',
						border: '1px solid black'
					},
					titleStyle: {
						color: '#ECEDF3'
					},
					descriptionStyle: {
						color: '#313654'
					},
					subtitleStyle: {
						color: '#e44c1c'
					}
			  };
</script>

<CommandPalette
	unstyled={false}
	placeholder={paletteTheme.placeholder}
	commands={actions}
	keyboardButtonClass="bg-red-500"
	inputStyle={paletteTheme.inputStyles}
	resultsContainerStyle={paletteTheme.resultsContainerStyle}
	resultContainerStyle={paletteTheme.resultContainerStyle}
	titleStyle={paletteTheme.titleStyle}
	descriptionStyle={paletteTheme.descriptionStyle}
	subtitleStyle={paletteTheme.subtitleStyle}
	optionSelectedStyle={currentTheme === 'light'
		? { background: 'skyblue' }
		: { background: 'blue' }}
/>
<div class="px-8 dark:bg-dark-mode-black bg-white">
	<Hero {incrementCounter} {counter} {openCommandPalette} />
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>
