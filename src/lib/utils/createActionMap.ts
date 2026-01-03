import type { commands, actionMap, ActionId } from '$lib/types';

const createActionMap = (commands: commands = []) => {
	return commands.reduce((acc: actionMap, curr) => {
		const { actionId = '' } = curr;
		if (actionId !== null) {
			acc[actionId as string | number] = curr;
		}
		return acc;
	}, {});
};

export default createActionMap;
