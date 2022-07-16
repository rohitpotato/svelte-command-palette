<script lang="ts">
	import { paletteStore } from '../store/PaletteStore';
	import { onDestroy, onMount, afterUpdate } from 'svelte';
	// import tinyKeys, { parseKeybinding } from 'tinykeys';
	import Portal from './Portal.svelte';
	import ResultPanel from './ResultPanel.svelte';
	import KeyboardButton from './KeyboardButton.svelte';
	import createShortcuts from '../utils/createShortcuts';
	import { createFuse, formatResults, getNonEmptyArray, runAction } from '../utils';
	import createStoreMethods from '../utils/createStoreMethods';
	import createActionMap from '../utils/createActionMap';
	import type { ActionId, commands, storeParams } from '$lib/types';

	export let commands: commands = [];
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
			activeCommandId: commands?.[0]?.actionId || '',
			results: commands
		}));
	};

	updateStore();

	const unsubscribePaletteStore = paletteStore.subscribe((value: storeParams) => {
		isPaletteVisible = value.isVisible;
		actions = value.commands;
		activeCommand = value.activeCommandId ?? actions?.[0]?.actionId;
		searchResults = getNonEmptyArray(value.results, value.commands, []);
	});

	const focusLastElement = () => {
		lastActiveElement?.focus();
	};

	const closePalette = () => {
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
		event.preventDefault();
		// get currently seleted item
		let activeCommandIndex = searchResults.findIndex((a) => a.actionId === activeCommand) ?? 0;

		activeCommandIndex = activeCommandIndex === -1 ? 0 : activeCommandIndex;
		const totalCommands = searchResults.length;
		const prevCommandIndex = (totalCommands + activeCommandIndex - 1) % totalCommands;
		const indexToSet = searchResults[prevCommandIndex] ? prevCommandIndex : activeCommandIndex;
		setActiveCommand(searchResults[indexToSet].actionId || '');
	};

	const handleArrowDown = (event: KeyboardEvent) => {
		event.preventDefault();
		if (searchResults.length) {
			// get currently seleted item
			let activeCommandIndex = searchResults.findIndex((a) => a.actionId === activeCommand) ?? 0;
			activeCommandIndex = activeCommandIndex === -1 ? 0 : activeCommandIndex;
			const totalCommands = searchResults.length;
			const nextCommand = (activeCommandIndex + 1) % totalCommands;
			const indexToSet = searchResults[nextCommand] ? nextCommand : activeCommandIndex;
			setActiveCommand(searchResults[indexToSet].actionId || '');
		}
	};

	const handleEnterKey = (event: KeyboardEvent) => {
		event.preventDefault();
		// get active command and execute
		const action = actionMap[activeCommand];
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
		event.preventDefault();
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
		<div id="wrapper" bind:this={wrapperElement}>
			<div
				class="paletteWrapper"
				role="combobox"
				aria-expanded={true}
				aria-haspopup="listbox"
				aria-controls={'uniqId'}
			>
				<div class="paletteWrapperInner" bind:this={commandPaletteRef}>
					<form autocomplete="off" role="search" novalidate on:submit={(ev) => ev.preventDefault()}>
						<label for={searchInputId}>Search for an action</label>
						<input
							type="search"
							placeholder="Search for an action"
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
							<KeyboardButton on:KeyboardButtonClicked={closePalette}
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
	#wrapper {
		position: fixed;
		top: 0;
		left: 0;
		max-height: 100vh;
		width: 100vw;
		background: transparent;
		display: flex;
		justify-content: center;
		padding: calc(13vh - -0.36px) 16px 16px;
	}

	:global(.paletteWrapper *) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	:global(.paletteWrapper),
	.paletteWrapperInner {
		position: relative;
		width: 60%;
		max-width: 640px;
		max-height: 400px;
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

	input {
		width: 100%;
		padding: 1rem;
		appearance: none;
		border: none;
	}

	input::placeholder {
		font-size: 20px;
	}

	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}
	input:focus {
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
		#wrapper {
			padding: 0;
		}
	}
</style>
