import type createActionMap from '$lib/utils/createActionMap';
import type createStoreMethods from '$lib/utils/createStoreMethods';

export type ActionId = number | string;
export type onRunParams = {
	action: action;
	storeProps: storeParams;
	storeMethods: ReturnType<typeof createStoreMethods>;
};

export type action = {
	actionId?: ActionId;
	canActionRun?: (args: onRunParams) => boolean;
	title: string;
	description?: string;
	subTitle?: string;
	onRun?: (args: onRunParams) => void;
	keywords?: Array<string>;
	shortcut?: string;
};
export type commands = Array<action>;

export interface storeParams {
	isVisible: boolean;
	textInput: '';
	commands: commands;
	storeMethods: ReturnType<typeof createStoreMethods>;
	actionMap: ReturnType<typeof createActionMap>;
	activeCommandId: ActionId;
	selectedCommandId: ActionId;
	calledActions: Array<ActionId>;
	results: commands;
	[key: string]: any;
}

export interface actionMap {
	[key: ActionId]: action;
}

export interface shortCutMap {
	[key: string]: (event: KeyboardEvent) => void;
}
