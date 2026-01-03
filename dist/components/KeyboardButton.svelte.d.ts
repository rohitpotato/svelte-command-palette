import type { Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    onKeyboardButtonClicked?: (detail: {
        event: MouseEvent;
    }) => void;
}
declare const KeyboardButton: import("svelte").Component<Props, {}, "">;
type KeyboardButton = ReturnType<typeof KeyboardButton>;
export default KeyboardButton;
