import { get } from 'svelte/store';
import { runAction } from '.';
import { paletteStore } from '../store/PaletteStore';
const createShortcuts = ({ actions = [] }) => {
    return actions.reduce((acc, curr) => {
        const actionHandler = (eventHandler) => {
            const storeProps = get(paletteStore);
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
