import type { ActionId } from '../types';
declare const createStoreMethods: () => {
    togglePalette: () => void;
    getAllCalledActions: () => ActionId[];
    storeCalledAction: (id: ActionId) => void;
    revertLastAction: (id: ActionId) => void;
    resetActionLog: () => void;
    openPalette: () => void;
    closePalette: () => void;
    resetPaletteStore: () => void;
};
export default createStoreMethods;
