<script lang="ts">
	import { onDestroy, onMount, afterUpdate } from 'svelte';
	import { setContext as setThemeContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { paletteStore } from '../store/PaletteStore';
	import Portal from './Portal.svelte';
	import ResultPanel from './ResultPanel.svelte';
	import KeyboardButton from './KeyboardButton.svelte';
	import createShortcuts from '../utils/createShortcuts';
	import { createFuse, formatResults, getNonEmptyArray, runAction, toCssString } from '../utils';
	import createStoreMethods from '../utils/createStoreMethods';
	import createActionMap from '../utils/createActionMap';
	import { THEME_CONTEXT } from '../constants';
	import type { ActionId, commands, storeParams, className, cssStyle } from '$lib/types';
	import type { Properties } from 'csstype';

	export let commands: commands = [];
	export let placeholder: string = 'Search for an action';

	// style classes

	export let inputClass: className = null;
	export let overlayClass: className = null;
	export let paletteWrapperInnerClass: className = null;
	export let resultsContainerClass: className = null;
	export let resultContainerClass: className = null;
	export let optionSelectedClass: className = null;
	export let titleClass: className = null;
	export let subtitleClass: className = null;
	export let descriptionClass: className = null;
	export let keyboardButtonClass: className = null;
	export let unstyled = false;

	// style props (convert to css)

	export let inputStyle: Properties = {};
	export let overlayStyle: Properties = {};
	export let paletteWrapperInnerStyle: Properties = {};
	export let resultsContainerStyle: Properties = {};
	export let resultContainerStyle: Properties = {};
	export let optionSelectedStyle: Properties = {};
	export let titleStyle: Properties = {};
	export let subtitleStyle: Properties = {};
	export let descriptionStyle: Properties = {};
	export let keyboardButtonStyle: Properties = {};

	let wrapperElement: HTMLDivElement;
	let searchInputRef: HTMLInputElement;
	let commandPaletteRef: HTMLElement;
	let unsubscribeKbdListener: ReturnType<typeof tinyKeys>;
	let isPaletteVisible = false;
	let activeCommand: ActionId;
	let lastActiveElement: HTMLElement;
	let searchResults: commands = [];
	const searchInputId = 'paletteInput';
	let isWrapperClickHandlerSet = false;

	let actions: commands = [];

	// set themes to context to pass down to deeply nested components

	const themeStore = writable({});

	setThemeContext(THEME_CONTEXT, themeStore);

	const storeMethods = createStoreMethods();
	const actionMap = createActionMap(commands);
	let formattedEscKey = '';
	const { togglePalette, closePalette: closeCommandPalette } = storeMethods;

	const updateStore = () => {
		paletteStore.update((n) => ({
			...n,
			commands,
			storeMethods,
			actionMap,
			activeCommandId: null,
			results: commands
		}));
	};

	updateStore();

	const unsubscribePaletteStore = paletteStore.subscribe((value: storeParams) => {
		isPaletteVisible = value.isVisible;
		actions = value.commands;
		activeCommand = value.activeCommandId ?? null;
		searchResults = getNonEmptyArray(value.results, value.commands, []);
	});

	const focusLastElement = () => {
		lastActiveElement?.focus();
	};

	const closePalette = (event?: KeyboardEvent) => {
		event?.stopPropagation();
		closeCommandPalette();
		focusLastElement();
	};

	const focusSearchInput = () => {
		if (isPaletteVisible) {
			searchInputRef.focus();
		}
	};

	const setActiveCommand = (id: ActionId) => {
		paletteStore.update((n: storeParams) => ({ ...n, activeCommandId: id }));
	};

	const handleArrowUp = (event: KeyboardEvent) => {
		event.stopPropagation();
		// get currently seleted item
		let activeCommandIndex = searchResults.findIndex((a) => a.actionId === activeCommand) ?? 0;

		activeCommandIndex = activeCommandIndex === -1 ? 0 : activeCommandIndex;
		const totalCommands = searchResults.length;
		const prevCommandIndex = (totalCommands + activeCommandIndex - 1) % totalCommands;
		const indexToSet = searchResults[prevCommandIndex] ? prevCommandIndex : activeCommandIndex;
		setActiveCommand(searchResults[indexToSet].actionId || '');
	};

	const handleArrowDown = (event: KeyboardEvent) => {
		event.stopPropagation();
		if (searchResults.length) {
			// get currently seleted item
			let activeCommandIndex = searchResults.findIndex((a) => a.actionId === activeCommand) ?? 0;
			activeCommandIndex = activeCommandIndex === -1 ? -1 : activeCommandIndex;
			const totalCommands = searchResults.length;
			const nextCommand = (activeCommandIndex + 1) % totalCommands;
			const indexToSet = searchResults[nextCommand] ? nextCommand : activeCommandIndex;
			setActiveCommand(searchResults[indexToSet].actionId || '');
		}
	};

	const handleEnterKey = (event: KeyboardEvent) => {
		event.stopPropagation();
		// get active command and execute
		const action = actionMap[activeCommand as string];
		runAction({ action });
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (commandPaletteRef && !commandPaletteRef.contains(event.target as Node)) {
			closePalette();
		}
	};

	const toggleCommandPalette = (event: KeyboardEvent) => {
		event.preventDefault();
		togglePalette();
	};

	onMount(async () => {
		const tinyKeys = await import('tinykeys');
		const { default: tiny, parseKeybinding } = tinyKeys;
		formattedEscKey = parseKeybinding('Esc').flat().join('');
		const shortcuts = createShortcuts({
			actions: commands
		});
		unsubscribeKbdListener = tiny(window, {
			...shortcuts,
			'$mod+k': toggleCommandPalette,
			Escape: closePalette,
			ArrowUp: handleArrowUp,
			ArrowDown: handleArrowDown,
			Enter: handleEnterKey
		});
	});

	const fuse = createFuse(actions);

	const updateSearchResults = (results: commands) => {
		paletteStore.update((n: storeParams) => ({
			...n,
			results,
			activeCommandId: results?.[0]?.actionId || ''
		}));
	};

	const handleSearch = (event: Event) => {
		let results = [...actions];
		if ($paletteStore.textInput) {
			const value = $paletteStore.textInput;
			results = formatResults(fuse.search(value));
		}
		updateSearchResults(results);
	};

	afterUpdate(() => {
		focusSearchInput();
		if (wrapperElement && !isWrapperClickHandlerSet) {
			wrapperElement?.addEventListener('click', handleOutsideClick);
			isWrapperClickHandlerSet = true;
		}
		if (!isPaletteVisible) {
			isWrapperClickHandlerSet = false;
		}

		themeStore.set({
			inputClass,
			overlayClass,
			paletteWrapperInnerClass,
			resultsContainerClass,
			resultContainerClass,
			optionSelectedClass,
			titleClass,
			subtitleClass,
			descriptionClass,
			keyboardButtonClass,
			unstyled,
			inputStyle: toCssString(inputStyle),
			overlayStyle: toCssString(overlayStyle),
			paletteWrapperInnerStyle: toCssString(paletteWrapperInnerStyle),
			resultsContainerStyle: toCssString(resultsContainerStyle),
			resultContainerStyle: toCssString(resultContainerStyle),
			optionSelectedStyle: toCssString(optionSelectedStyle),
			titleStyle: toCssString(titleStyle),
			subtitleStyle: toCssString(subtitleStyle),
			descriptionStyle: toCssString(descriptionStyle),
			keyboardButtonStyle: toCssString(keyboardButtonStyle)
		});
	});

	onDestroy(() => {
		unsubscribeKbdListener?.();
		unsubscribePaletteStore();
		focusLastElement();
		wrapperElement?.removeEventListener?.('click', handleOutsideClick);
	});
</script>

<Portal target="body">
	{#if isPaletteVisible}
		<div
			id="wrapper"
			class={overlayClass}
			style={toCssString(overlayStyle)}
			class:wrapper={!unstyled}
			bind:this={wrapperElement}
		>
			<div
				class="paletteWrapper"
				role="combobox"
				aria-expanded={true}
				aria-haspopup="listbox"
				aria-controls={'uniqId'}
			>
				<div
					class:paletteWrapperInner={!unstyled}
					class={paletteWrapperInnerClass}
					style={toCssString(paletteWrapperInnerStyle)}
					bind:this={commandPaletteRef}
				>
					<form autocomplete="off" role="search" novalidate on:submit={(ev) => ev.preventDefault()}>
						<label for={searchInputId}>Search for an action</label>
						<input
							type="search"
							class={inputClass}
							class:paletteInput={!unstyled}
							style={toCssString(inputStyle)}
							{placeholder}
							aria-autocomplete="list"
							spellcheck={false}
							aria-activedescendant={`palette-${activeCommand}`}
							bind:this={searchInputRef}
							id={searchInputId}
							autocomplete="off"
							autocapitalize="false"
							bind:value={$paletteStore.textInput}
							on:input={handleSearch}
						/>
						<div class="shortcut">
							<KeyboardButton on:KeyboardButtonClicked={() => closePalette()}
								>{formattedEscKey}</KeyboardButton
							>
						</div>
					</form>
					<ResultPanel />
				</div>
			</div>
		</div>
	{/if}
</Portal>

<style>
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: transparent;
		display: flex;
		justify-content: center;
		padding: calc(13vh - -0.36px) 16px 16px;
	}

	:global(.paletteWrapper *) {
		box-sizing: border-box;
	}

	:global(.paletteWrapper),
	.paletteWrapperInner {
		position: relative;
		width: 60%;
		max-width: 640px;
		max-height: 400px;
		height: fit-content;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	}

	.paletteWrapperInner {
		width: 100%;
	}

	form {
		width: 100%;
	}

	.paletteInput {
		width: 100%;
		padding: 1rem;
		appearance: none;
		border: none;
	}

	.paletteInput::placeholder {
		font-size: 20px;
	}

	.paletteInput[type='search']::-webkit-search-decoration,
	.paletteInput[type='search']::-webkit-search-cancel-button,
	.paletteInput[type='search']::-webkit-search-results-button,
	.paletteInput[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}
	.paletteInput:focus {
		outline: none;
	}

	label {
		display: none;
	}

	.shortcut {
		position: absolute;
		right: 0;
		top: 0;
		transform: translate(-50%, 40%);
	}

	@media (max-width: 640px) {
		:global(.paletteWrapper),
		.paletteWrapperInner {
			width: 100%;
			height: 100vh;
			max-height: 100vh;
		}
		.wrapper {
			padding: 0;
		}
	}
</style>
