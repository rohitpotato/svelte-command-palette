import { writable } from 'svelte/store';

type Theme = string | null;

const themeStore = writable<Theme>(null);

export default themeStore;
