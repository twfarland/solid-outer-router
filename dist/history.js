import { setLocation } from "./signals";
// non destructively tap into the history api to update signals
export function initialize(history) {
    const { pushState, replaceState } = history;
    history.pushState = (data, unused, url) => {
        const ret = pushState.call(history, data, unused, url?.toString());
        setLocation(window.location);
        return ret;
    };
    history.replaceState = (data, unused, url) => {
        const ret = replaceState.call(history, data, unused, url?.toString());
        setLocation(window.location);
        return ret;
    };
    window.addEventListener("popstate", () => setLocation(window.location));
}
export function navigate(url, replace) {
    if (replace) {
        history.replaceState({}, "", url.toString());
    }
    else {
        history.pushState({}, "", url.toString());
    }
}
