import { navigate } from "./history";
export function Link(p) {
    return (<a title={p.title} class={p.class} onClick={event => {
            event.preventDefault();
            navigate(p.href, p.replace);
        }}>
      {p.children}
    </a>);
}
