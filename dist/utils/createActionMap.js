const createActionMap = (commands = []) => {
    return commands.reduce((acc, curr) => {
        const { actionId = '' } = curr;
        if (actionId !== null) {
            acc[actionId] = curr;
        }
        return acc;
    }, {});
};
export default createActionMap;
