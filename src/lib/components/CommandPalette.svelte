<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onDestroy, onMount, setContext as setThemeContext } from 'svelte';
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
	import type { ActionId, commands, storeParams, className, action } from '$lib/types';
	import type { Properties } from 'csstype';

	interface Props {
		commands?: commands;
		placeholder?: string;
		shortcut?: string;
		// Component-level event callbacks
		onOpen?: () => void;
		onClose?: () => void;
		onActionSelect?: (action: action) => void;
		// Style classes
		inputClass?: className;
		overlayClass?: className;
		paletteWrapperInnerClass?: className;
		resultsContainerClass?: className;
		resultContainerClass?: className;
		optionSelectedClass?: className;
		titleClass?: className;
		subtitleClass?: className;
		descriptionClass?: className;
		keyboardButtonClass?: className;
		unstyled?: boolean;
		// Style objects
		inputStyle?: Properties;
		overlayStyle?: Properties;
		paletteWrapperInnerStyle?: Properties;
		resultsContainerStyle?: Properties;
		resultContainerStyle?: Properties;
		optionSelectedStyle?: Properties;
		titleStyle?: Properties;
		subtitleStyle?: Properties;
		descriptionStyle?: Properties;
		keyboardButtonStyle?: Properties;
		// Custom rendering
		emptyState?: Snippet;
	}

	let {
		commands: commandsProp = [],
		placeholder = 'Search for an action...',
		shortcut = '$mod+k',
		onOpen,
		onClose,
		onActionSelect,
		inputClass = null,
		overlayClass = null,
		paletteWrapperInnerClass = null,
		resultsContainerClass = null,
		resultContainerClass = null,
		optionSelectedClass = null,
		titleClass = null,
		subtitleClass = null,
		descriptionClass = null,
		keyboardButtonClass = null,
		unstyled = false,
		inputStyle = {},
		overlayStyle = {},
		paletteWrapperInnerStyle = {},
		resultsContainerStyle = {},
		resultContainerStyle = {},
		optionSelectedStyle = {},
		titleStyle = {},
		subtitleStyle = {},
		descriptionStyle = {},
		keyboardButtonStyle = {},
		emptyState
	}: Props = $props();

	let wrapperElement: HTMLDivElement | undefined = $state();
	let searchInputRef: HTMLInputElement | undefined = $state();
	let commandPaletteRef: HTMLElement | undefined = $state();
	let unsubscribeKbdListener: (() => void) | undefined;
	let isPaletteVisible = $state(false);
	let activeCommand: ActionId = $state(null);
	let lastActiveElement: HTMLElement | null = null;
	let searchResults: commands = $state([]);
	const searchInputId = 'paletteInput';

	let actions: commands = $state([]);

	// set themes to context to pass down to deeply nested components
	const themeStore = writable({});
	setThemeContext(THEME_CONTEXT, themeStore);

	const storeMethods = createStoreMethods();
	let formattedEscKey = $state('');
	const { togglePalette, closePalette: closeCommandPalette } = storeMethods;

	// Create actionMap reactively based on commandsProp
	let actionMap = $derived(createActionMap(commandsProp));

	const updateStore = () => {
		paletteStore.update((n) => ({
			...n,
			commands: commandsProp,
			storeMethods,
			actionMap: createActionMap(commandsProp),
			activeCommandId: null,
			results: commandsProp
		}));
	};

	// Initial store update
	$effect(() => {
		updateStore();
	});

	// Track visibility changes for callbacks
	let prevVisible = false;
	const unsubscribePaletteStore = paletteStore.subscribe((value: storeParams) => {
		const wasVisible = prevVisible;
		isPaletteVisible = value.isVisible;
		actions = value.commands;
		activeCommand = value.activeCommandId ?? null;
		searchResults = getNonEmptyArray(value.results, value.commands, []);

		// Fire callbacks on visibility change
		if (!wasVisible && value.isVisible) {
			lastActiveElement = document.activeElement as HTMLElement;
			onOpen?.();
		} else if (wasVisible && !value.isVisible) {
			onClose?.();
		}
		prevVisible = value.isVisible;
	});

	const focusLastElement = () => {
		if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
			lastActiveElement.focus();
		}
	};

	const closePalette = (event?: KeyboardEvent) => {
		event?.preventDefault?.();
		closeCommandPalette();
		focusLastElement();
	};

	const focusSearchInput = () => {
		if (isPaletteVisible && searchInputRef) {
			searchInputRef.focus();
		}
	};

	const setActiveCommand = (id: ActionId) => {
		paletteStore.update((n: storeParams) => ({ ...n, activeCommandId: id }));
	};

	// Only handle arrow keys when palette is visible
	const handleArrowUp = (event: KeyboardEvent) => {
		if (!isPaletteVisible) return;
		event.preventDefault();
		let activeCommandIndex = searchResults.findIndex((a) => a.actionId === activeCommand) ?? 0;
		activeCommandIndex = activeCommandIndex === -1 ? 0 : activeCommandIndex;
		const totalCommands = searchResults.length;
		const prevCommandIndex = (totalCommands + activeCommandIndex - 1) % totalCommands;
		const indexToSet = searchResults[prevCommandIndex] ? prevCommandIndex : activeCommandIndex;
		setActiveCommand(searchResults[indexToSet]?.actionId || '');
	};

	const handleArrowDown = (event: KeyboardEvent) => {
		if (!isPaletteVisible) return;
		event.preventDefault();
		if (searchResults.length) {
			let activeCommandIndex = searchResults.findIndex((a) => a.actionId === activeCommand) ?? 0;
			activeCommandIndex = activeCommandIndex === -1 ? -1 : activeCommandIndex;
			const totalCommands = searchResults.length;
			const nextCommand = (activeCommandIndex + 1) % totalCommands;
			const indexToSet = searchResults[nextCommand] ? nextCommand : activeCommandIndex;
			setActiveCommand(searchResults[indexToSet]?.actionId || '');
		}
	};

	const handleEnterKey = (event: KeyboardEvent) => {
		if (!isPaletteVisible) return;
		event.preventDefault();
		const action = actionMap[activeCommand as string];
		if (action) {
			onActionSelect?.(action);
			runAction({ action });
		}
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

	// Focus trap - handle Tab key
	const handleTab = (event: KeyboardEvent) => {
		if (!isPaletteVisible || !commandPaletteRef) return;

		const focusableElements = commandPaletteRef.querySelectorAll(
			'input, button, [tabindex]:not([tabindex="-1"])'
		);
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement?.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement?.focus();
		}
	};

	onMount(async () => {
		const { tinykeys, parseKeybinding } = await import('tinykeys');
		formattedEscKey = parseKeybinding('Esc').flat().join('');
		const shortcuts = createShortcuts({
			actions: commandsProp
		});

		// Build keyboard bindings with customizable shortcut
		const keyBindings: Record<string, (event: KeyboardEvent) => void> = {
			...shortcuts,
			[shortcut]: toggleCommandPalette,
			Escape: closePalette,
			ArrowUp: handleArrowUp,
			ArrowDown: handleArrowDown,
			Enter: handleEnterKey,
			Tab: handleTab
		};

		unsubscribeKbdListener = tinykeys(window, keyBindings);
	});

	// Create fuse reactively based on actions
	let fuse = $derived(createFuse(actions));

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

	// Effect for focusing and click handler setup
	$effect(() => {
		if (isPaletteVisible) {
			focusSearchInput();
			if (wrapperElement) {
				wrapperElement.addEventListener('click', handleOutsideClick);
			}
		}
		return () => {
			wrapperElement?.removeEventListener('click', handleOutsideClick);
		};
	});

	// Separate effect for theme store updates
	$effect(() => {
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
			keyboardButtonStyle: toCssString(keyboardButtonStyle),
			emptyState
		});
	});

	onDestroy(() => {
		unsubscribeKbdListener?.();
		unsubscribePaletteStore();
		focusLastElement();
	});

	const handleFormSubmit = (ev: SubmitEvent) => ev.preventDefault();
</script>

<Portal target="body">
	{#snippet children()}
		{#if isPaletteVisible}
			<div
				id="command-palette-overlay"
				class={overlayClass}
				style={toCssString(overlayStyle)}
				class:cp-overlay={!unstyled}
				bind:this={wrapperElement}
				role="presentation"
			>
				<div
					class="cp-wrapper"
					role="dialog"
					aria-modal="true"
					aria-label="Command palette"
				>
					<div
						class:cp-container={!unstyled}
						class={paletteWrapperInnerClass}
						style={toCssString(paletteWrapperInnerStyle)}
						bind:this={commandPaletteRef}
						role="combobox"
						aria-expanded="true"
						aria-haspopup="listbox"
						aria-controls="command-palette-results"
					>
						<form autocomplete="off" role="search" novalidate onsubmit={handleFormSubmit}>
							<label for={searchInputId} class="sr-only">Search for an action</label>
							<div class="cp-input-wrapper">
								<svg
									class="cp-search-icon"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="11" cy="11" r="8"></circle>
									<path d="m21 21-4.3-4.3"></path>
								</svg>
								<input
									type="text"
									class={inputClass}
									class:cp-input={!unstyled}
									style={toCssString(inputStyle)}
									{placeholder}
									aria-autocomplete="list"
									spellcheck={false}
									aria-activedescendant={activeCommand ? `palette-${activeCommand}` : undefined}
									bind:this={searchInputRef}
									id={searchInputId}
									autocomplete="off"
									autocapitalize="off"
									bind:value={$paletteStore.textInput}
									oninput={handleSearch}
								/>
								<KeyboardButton onKeyboardButtonClicked={() => closePalette()}>
									{#snippet children()}
										{formattedEscKey}
									{/snippet}
								</KeyboardButton>
							</div>
						</form>
						<ResultPanel {emptyState} />
					</div>
				</div>
			</div>
		{/if}
	{/snippet}
</Portal>

<style>
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.cp-overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 10vh 1rem 1rem;
		animation: fadeIn 0.15s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: scale(0.96) translateY(-10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	:global(.cp-wrapper) {
		width: 100%;
		max-width: 640px;
		animation: slideIn 0.2s ease-out;
	}

	:global(.cp-wrapper *) {
		box-sizing: border-box;
	}

	/* Default: Dark mode styles */
	.cp-container {
		width: 100%;
		background: #1f2937;
		border-radius: 12px;
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.1);
		overflow: hidden;
		max-height: 70vh;
		display: flex;
		flex-direction: column;
	}

	form {
		width: 100%;
		border-bottom: 1px solid #374151;
	}

	.cp-input-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
	}

	.cp-search-icon {
		flex-shrink: 0;
		color: #6b7280;
	}

	.cp-input {
		flex: 1;
		font-size: 1rem;
		border: none;
		outline: none;
		background: transparent;
		color: #f9fafb;
	}

	.cp-input::placeholder {
		color: #6b7280;
	}

	@media (max-width: 640px) {
		.cp-overlay {
			padding: 0;
			align-items: flex-end;
		}

		:global(.cp-wrapper) {
			max-width: 100%;
		}

		.cp-container {
			border-radius: 12px 12px 0 0;
			max-height: 85vh;
		}
	}

	/* Light mode: class-based (for sites using .light class) */
	:global(.light) .cp-container,
	:global(html.light) .cp-container,
	:global(body.light) .cp-container {
		background: #ffffff;
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.15),
			0 0 0 1px rgba(0, 0, 0, 0.08);
	}

	:global(.light) form,
	:global(html.light) form,
	:global(body.light) form {
		border-bottom-color: #e5e7eb;
	}

	:global(.light) .cp-input,
	:global(html.light) .cp-input,
	:global(body.light) .cp-input {
		color: #111827;
	}

	:global(.light) .cp-input::placeholder,
	:global(html.light) .cp-input::placeholder,
	:global(body.light) .cp-input::placeholder {
		color: #9ca3af;
	}

	:global(.light) .cp-search-icon,
	:global(html.light) .cp-search-icon,
	:global(body.light) .cp-search-icon {
		color: #9ca3af;
	}

	/* Light mode: media query fallback for users without class-based theming */
	@media (prefers-color-scheme: light) {
		.cp-container {
			background: #ffffff;
			box-shadow:
				0 25px 50px -12px rgba(0, 0, 0, 0.15),
				0 0 0 1px rgba(0, 0, 0, 0.08);
		}

		form {
			border-bottom-color: #e5e7eb;
		}

		.cp-input {
			color: #111827;
		}

		.cp-input::placeholder {
			color: #9ca3af;
		}

		.cp-search-icon {
			color: #9ca3af;
		}
	}
</style>
