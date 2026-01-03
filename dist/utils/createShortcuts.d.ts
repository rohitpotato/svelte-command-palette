import type { commands, shortCutMap } from '../types';
declare const createShortcuts: ({ actions }: {
    actions: commands;
}) => shortCutMap;
export default createShortcuts;
