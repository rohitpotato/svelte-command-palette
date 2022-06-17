import type { commands, actionMap } from '$lib/types';

const createActionMap = (commands: commands = []) => {
	return commands.reduce((acc: actionMap, curr) => {
		const { actionId = '' } = curr;
		acc[actionId] = curr;
		return acc;
	}, {});
};

export default createActionMap;
