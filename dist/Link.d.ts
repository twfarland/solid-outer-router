import { JSXElement } from "solid-js";
export interface LinkProps {
    href: string;
    children: JSXElement;
    title?: string;
    replace?: boolean;
    class?: string;
}
export declare function Link(p: LinkProps): import("solid-js").JSX.Element;
