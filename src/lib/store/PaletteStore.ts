// @ts-nocheck
import { writable } from 'svelte/store';
import type { storeParams } from '$lib/types';

export const paletteStore = writable<storeParams>({
	isVisible: false,
	textInput: '',
	commands: [],
	storeMethods: {},
	actionMap: {},
	activeCommandId: 0,
	selectedCommandId: 0,
	calledActions: [],
	results: []
});
