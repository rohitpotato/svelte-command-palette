import type { Snippet } from 'svelte';
interface Props {
    target?: string;
    children?: Snippet;
}
declare const Portal: import("svelte").Component<Props, {}, "">;
type Portal = ReturnType<typeof Portal>;
export default Portal;
