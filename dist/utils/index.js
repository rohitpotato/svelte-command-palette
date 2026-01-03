import Fuse from 'fuse.js';
import { paletteStore } from '../store/PaletteStore';
import { get } from 'svelte/store';
const noop = () => true;
const defineActions = (actions = []) => {
    return actions.map(({ actionId = Math.random(), canActionRun = noop, title = '', subTitle = '', onRun = noop, description, keywords = [], shortcut = '', icon, group }) => {
        return {
            actionId,
            canActionRun,
            title,
            subTitle,
            onRun,
            description,
            keywords,
            shortcut,
            icon,
            group
        };
    });
};
const formatResults = (results) => results.map(({ item }) => item);
const updatePaletteStoreAfterActionExec = (actionId) => {
    paletteStore.update((n) => {
        return {
            ...n,
            isVisible: false,
            textInput: '',
            activeCommandId: null,
            selectedCommandId: null,
            results: [],
            calledActions: [...n.calledActions, actionId]
        };
    });
};
const runAction = ({ action }) => {
    const { onRun, canActionRun = noop, actionId = '' } = action || {};
    const storeProps = get(paletteStore);
    const { storeMethods } = storeProps;
    if (canActionRun({ action, storeProps, storeMethods }) && onRun) {
        updatePaletteStoreAfterActionExec(actionId);
        onRun?.({ action, storeProps, storeMethods });
        return true;
    }
    paletteStore.update((n) => {
        return {
            ...n,
            isVisible: false
        };
    });
    return false;
};
// Fixed: 'subTitle' was incorrectly 'subtitle' causing search to not work on subtitles
const createFuse = (actions) => new Fuse(actions, {
    keys: [
        {
            name: 'title',
            weight: 1
        },
        {
            name: 'subTitle',
            weight: 0.7
        },
        {
            name: 'description',
            weight: 0.6
        },
        {
            name: 'keywords',
            weight: 0.5
        }
    ],
    threshold: 0.4,
    ignoreLocation: true
});
const getNonEmptyArray = (...args) => {
    return args.find((array = []) => array.length > 0) || [];
};
const camelCaseToDash = (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
const toCssString = (props = {}) => props
    ? Object.keys(props).reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, '')
    : '';
// Group actions by their group property
const groupActions = (actions) => {
    const groups = new Map();
    const ungrouped = [];
    actions.forEach((action) => {
        if (action.group) {
            const existing = groups.get(action.group) || [];
            groups.set(action.group, [...existing, action]);
        }
        else {
            ungrouped.push(action);
        }
    });
    // Put ungrouped items first
    if (ungrouped.length > 0) {
        const result = new Map();
        result.set('', ungrouped);
        groups.forEach((value, key) => result.set(key, value));
        return result;
    }
    return groups;
};
// Simple debounce utility
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};
export { noop, defineActions, formatResults, runAction, createFuse, updatePaletteStoreAfterActionExec, getNonEmptyArray, camelCaseToDash, toCssString, groupActions, debounce };
