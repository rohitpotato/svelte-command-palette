import type createActionMap from '$lib/utils/createActionMap';
import type createStoreMethods from '$lib/utils/createStoreMethods';

export type ActionId = number | string | null;
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
	textInput: string;
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

export type className = string | null;
export type cssStyle = string | null;
export interface themeContext {
	inputClass: className;
	overlayClass: className;
	paletteWrapperInnerClass: className;
	resultsContainerClass: className;
	resultContainerClass: className;
	optionSelectedClass: className;
	titleClass: className;
	subtitleClass: className;
	descriptionClass: className;
	keyboardButtonClass: className;
	unstyled: boolean;
	inputStyle;
	overlayStyle: cssStyle;
	paletteWrapperInnerStyle: cssStyle;
	resultsContainerStyle: cssStyle;
	resultContainerStyle: cssStyle;
	optionSelectedStyle: cssStyle;
	titleStyle: cssStyle;
	subtitleStyle: cssStyle;
	descriptionStyle: cssStyle;
	keyboardButtonStyle: cssStyle;
}
