import { get } from 'svelte/store';
import { paletteStore } from '../store/PaletteStore';
import { defaultAppState } from '../constants';
const createStoreMethods = () => {
    const storeProps = get(paletteStore);
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
    const storeCalledAction = (id) => {
        const { calledActions } = storeProps;
        calledActions.push(id);
        paletteStore.update((n) => ({ ...n, calledActions }));
    };
    const revertLastAction = (id) => {
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
