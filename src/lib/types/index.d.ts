import type { Snippet } from 'svelte';
import type createActionMap from '$lib/utils/createActionMap';
import type createStoreMethods from '$lib/utils/createStoreMethods';
import type { Properties } from 'csstype';

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
	/** 
	 * Icon for the action. Can be:
	 * - A string (emoji like "🚀" or image URL)
	 * - A Snippet for custom SVG/component rendering
	 */
	icon?: string | Snippet;
	group?: string;
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
	[key: string | number]: action;
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
	inputStyle: cssStyle;
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

// Component prop types for Svelte 5
export interface CommandPaletteProps {
	commands?: commands;
	placeholder?: string;
	shortcut?: string;
	// Component-level event callbacks
	onOpen?: () => void;
	onClose?: () => void;
	onActionSelect?: (action: action) => void;
	// Style classes
	inputClass?: className;
	overlayClass?: className;
	paletteWrapperInnerClass?: className;
	resultsContainerClass?: className;
	resultContainerClass?: className;
	optionSelectedClass?: className;
	titleClass?: className;
	subtitleClass?: className;
	descriptionClass?: className;
	keyboardButtonClass?: className;
	unstyled?: boolean;
	// Style objects
	inputStyle?: Properties;
	overlayStyle?: Properties;
	paletteWrapperInnerStyle?: Properties;
	resultsContainerStyle?: Properties;
	resultContainerStyle?: Properties;
	optionSelectedStyle?: Properties;
	titleStyle?: Properties;
	subtitleStyle?: Properties;
	descriptionStyle?: Properties;
	keyboardButtonStyle?: Properties;
	// Custom rendering
	emptyState?: Snippet;
	resultItem?: Snippet<[action, boolean]>;
}

export interface PortalProps {
	target?: string;
	children?: Snippet;
}

export interface KeyboardButtonProps {
	children?: Snippet;
	onKeyboardButtonClicked?: (detail: { event: MouseEvent }) => void;
}

export interface ResultProps {
	action: action;
}
