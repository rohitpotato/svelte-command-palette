import { writable } from 'svelte/store';

const themeStore = writable<string>('dark');

export default themeStore;
