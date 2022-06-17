import { get } from 'svelte/store';
import { runAction } from '.';
import { paletteStore } from '../store/PaletteStore';
import type { commands, shortCutMap, storeParams } from '$lib/types';

const createShortcuts = ({ actions = [] }: { actions: commands }) => {
	return actions.reduce((acc: shortCutMap, curr) => {
		const actionHandler = (eventHandler: KeyboardEvent) => {
			const storeProps: storeParams = get(paletteStore);
			const { isVisible } = storeProps;
			if (!isVisible) {
				eventHandler.preventDefault();
				runAction({ action: curr });
			}
		};
		const { shortcut } = curr;
		if (shortcut) {
			acc[shortcut] = actionHandler;
		}
		return acc;
	}, {});
};

export default createShortcuts;
