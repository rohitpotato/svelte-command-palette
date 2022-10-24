import { get } from 'svelte/store';
import { paletteStore } from '../store/PaletteStore';
import { defaultAppState } from '../constants';
import type { ActionId, storeParams } from '$lib/types';

const createStoreMethods = () => {
	const storeProps: storeParams = get(paletteStore);

	const resetPaletteStore = () => {
		paletteStore.update((n) => ({ ...n, ...defaultAppState }));
	};

	const openPalette = () => {
		paletteStore.update((n) => ({ ...n, isVisible: true }));
	};

	const closePalette = () => {
		resetPaletteStore();
	};

	const togglePalette = () => {
		paletteStore.update((n) => ({
			...n,
			isVisible: !n.isVisible,
			activeCommandId: ''
		}));
	};

	const getAllCalledActions = () => {
		return storeProps.calledActions || [];
	};

	const storeCalledAction = (id: ActionId) => {
		const { calledActions } = storeProps;
		calledActions.push(id);
		paletteStore.update((n) => ({ ...n, calledActions }));
	};

	const revertLastAction = (id: ActionId) => {
		const { calledActions } = storeProps;
		calledActions.pop();
		paletteStore.update((n) => ({ ...n, calledActions }));
	};

	const resetActionLog = () => {
		paletteStore.update((n) => ({ ...n, calledActions: [] }));
	};

	return {
		togglePalette,
		getAllCalledActions,
		storeCalledAction,
		revertLastAction,
		resetActionLog,
		openPalette,
		closePalette,
		resetPaletteStore
	};
};

export default createStoreMethods;
