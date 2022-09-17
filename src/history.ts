import { setLocation } from "./signals";

// non destructively tap into the history api to update signals

export function initialize(history: History) {
  const { pushState, replaceState } = history;

  history.pushState = (data: unknown, unused: string, url?: string | URL | null) => {
    const ret = pushState.call(history, data, unused, url?.toString());
    setLocation(window.location);
    return ret;
  };

  history.replaceState = (data: unknown, unused: string, url?: string | URL | null) => {
    const ret = replaceState.call(history, data, unused, url?.toString());
    setLocation(window.location);
    return ret;
  };

  window.addEventListener("popstate", () => setLocation(window.location));
}

export function navigate(url: string | URL, replace?: boolean) {
  if (replace) {
    history.replaceState({}, "", url.toString());
  } else {
    history.pushState({}, "", url.toString());
  }
}
