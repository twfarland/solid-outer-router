import { updateLocation } from './signals';

// non destructively tap into the history api to update signals

const { pushState, replaceState } = history;

history.pushState = (data: any, unused: string, url?: string | URL | null) => {
  const ret = pushState.call(history, data, unused, url);
  updateLocation();
  return ret;
};

history.replaceState = (
  data: any,
  unused: string,
  url?: string | URL | null
) => {
  const ret = replaceState.call(history, data, unused, url);
  updateLocation();
  return ret;
};

window.addEventListener('popstate', updateLocation);

export function navigate(url: string | URL, replace?: boolean) {
  if (replace) {
    history.replaceState({}, '', url);
  } else {
    history.pushState({}, '', url);
  }
}
