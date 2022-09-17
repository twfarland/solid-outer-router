import { createSignal } from 'solid-js';

// source signals
const [_location, _setLocation] = createSignal({
  location
});
const setLocation = location => {
  _setLocation({
    location
  });
};
const [_routes, _setRoutes] = createSignal([]);
const setRoutes = _setRoutes; // derived signals

const matched = () => matchRoute(_routes(), _location());

const params = () => matched().params;
const route = () => matched().route[1](); // routing pure functions for matching

function matchRoute(routes, {
  location
}) {
  const parts = location.pathname.split("/").filter(s => s);

  for (const route of routes) {
    const params = bindRoute(route[0].split("/").filter(s => s), parts);

    if (params) {
      return {
        route,
        params
      };
    }
  }

  return {
    route: ["", () => null],
    params: {}
  };
}

function bindRoute(route, path) {
  if (route.length != path.length) {
    return undefined;
  }

  const params = {};

  for (let i = 0; i < route.length; i++) {
    const routePart = route[i];
    const pathPart = path[i];

    if (routePart[0] === ":") {
      params[routePart.substring(1)] = pathPart;
    } else if (routePart !== pathPart) {
      return undefined;
    }
  }

  return params;
}

function initialize(history) {
  const {
    pushState,
    replaceState
  } = history;

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
function navigate(url, replace) {
  if (replace) {
    history.replaceState({}, "", url.toString());
  } else {
    history.pushState({}, "", url.toString());
  }
}

export { initialize, navigate, params, route, setLocation, setRoutes };
