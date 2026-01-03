import Fuse from 'fuse.js';
import { paletteStore } from '../store/PaletteStore';
import { get } from 'svelte/store';
import type { action, ActionId, commands } from '../types';
import type { Properties } from 'csstype';

const noop = () => true;

const defineActions = (actions: Array<action> = []): commands => {
	return actions.map(
		({
			actionId = Math.random(),
			canActionRun = noop,
			title = '',
			subTitle = '',
			onRun = noop,
			description,
			keywords = [],
			shortcut = '',
			icon,
			group
		}) => {
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
		}
	);
};

const formatResults = (results: Array<{ item: action }>) =>
	results.map(({ item }: { item: action }) => item);

const updatePaletteStoreAfterActionExec = (actionId: ActionId) => {
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

const runAction = ({ action }: { action: action }) => {
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
const createFuse = (actions: commands) =>
	new Fuse(actions, {
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

const getNonEmptyArray = (...args: Array<commands>) => {
	return args.find((array = []) => array.length > 0) || [];
};

const camelCaseToDash = (str: string) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

const toCssString = (props: Properties = {}) =>
	props
		? Object.keys(props).reduce(
				(str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key as keyof Properties]}`,
				''
			)
		: '';

// Group actions by their group property
const groupActions = (actions: commands): Map<string, commands> => {
	const groups = new Map<string, commands>();
	const ungrouped: commands = [];

	actions.forEach((action) => {
		if (action.group) {
			const existing = groups.get(action.group) || [];
			groups.set(action.group, [...existing, action]);
		} else {
			ungrouped.push(action);
		}
	});

	// Put ungrouped items first
	if (ungrouped.length > 0) {
		const result = new Map<string, commands>();
		result.set('', ungrouped);
		groups.forEach((value, key) => result.set(key, value));
		return result;
	}

	return groups;
};

// Simple debounce utility
const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
};

export {
	noop,
	defineActions,
	formatResults,
	runAction,
	createFuse,
	updatePaletteStoreAfterActionExec,
	getNonEmptyArray,
	camelCaseToDash,
	toCssString,
	groupActions,
	debounce
};
