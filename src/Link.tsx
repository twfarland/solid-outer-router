import { JSXElement } from "solid-js";
import { navigate } from "./history";

export interface LinkProps {
  href: string;
  children: JSXElement;
  title?: string;
  replace?: boolean;
  class?: string;
}

export function Link(p: LinkProps) {
  return (
    <a
      title={p.title}
      class={p.class}
      onClick={event => {
        event.preventDefault();
        navigate(p.href, p.replace);
      }}
    >
      {p.children}
    </a>
  );
}
