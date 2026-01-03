import Fuse from 'fuse.js';
import type { action, ActionId, commands } from '../types';
import type { Properties } from 'csstype';
declare const noop: () => boolean;
declare const defineActions: (actions?: Array<action>) => commands;
declare const formatResults: (results: Array<{
    item: action;
}>) => action[];
declare const updatePaletteStoreAfterActionExec: (actionId: ActionId) => void;
declare const runAction: ({ action }: {
    action: action;
}) => boolean;
declare const createFuse: (actions: commands) => Fuse<action>;
declare const getNonEmptyArray: (...args: Array<commands>) => commands;
declare const camelCaseToDash: (str: string) => string;
declare const toCssString: (props?: Properties) => string;
declare const groupActions: (actions: commands) => Map<string, commands>;
declare const debounce: <T extends (...args: unknown[]) => unknown>(fn: T, delay: number) => (...args: Parameters<T>) => void;
export { noop, defineActions, formatResults, runAction, createFuse, updatePaletteStoreAfterActionExec, getNonEmptyArray, camelCaseToDash, toCssString, groupActions, debounce };
