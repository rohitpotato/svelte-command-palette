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
			shortcut = ''
		}) => {
			return {
				actionId,
				canActionRun,
				title,
				subTitle,
				onRun,
				description,
				keywords,
				shortcut
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
			activeCommandId: actionId,
			selectedCommandId: actionId,
			calledActions: [...n.calledActions, actionId]
		};
	});
};

const runAction = ({ action }: { action: action }) => {
	const { onRun, canActionRun = noop, actionId = '' } = action;
	const storeProps = get(paletteStore);
	const { storeMethods } = storeProps;
	if (canActionRun({ action, storeProps, storeMethods }) && onRun) {
		updatePaletteStoreAfterActionExec(actionId);
		onRun({ action, storeProps, storeMethods });
	}
};

const createFuse = (actions: commands) =>
	new Fuse(actions, {
		keys: [
			{
				name: 'title',
				weight: 1
			},
			{
				name: 'subtitle',
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
		]
	});

const getNonEmptyArray = (...args: Array<commands>) => {
	return args.find((array = []) => array.length > 0) || [];
};

const camelCaseToDash = (str: string) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

const toCssString = (props: Properties = {}) =>
	props
		? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
		  // @ts-ignore
		  Object.keys(props).reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, '')
		: '';

export {
	noop,
	defineActions,
	formatResults,
	runAction,
	createFuse,
	updatePaletteStoreAfterActionExec,
	getNonEmptyArray,
	camelCaseToDash,
	toCssString
};
