// @ts-nocheck
import { writable } from 'svelte/store';
export const paletteStore = writable({
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
