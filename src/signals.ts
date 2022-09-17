import { createSignal } from "solid-js";
import { LocationState, MatchedRoute, Route, RouteParams } from "./types";

// source signals
const [_location, _setLocation] = createSignal<LocationState>({ location });
export const setLocation = (location: Location) => {
  _setLocation({ location });
};

const [_routes, _setRoutes] = createSignal<Route[]>([]);
export const setRoutes = _setRoutes;

// derived signals
const matched = () => matchRoute(_routes(), _location());
export const params = () => matched().params;
export const route = () => matched().route[1]();

// routing pure functions for matching
function matchRoute(routes: Route[], { location }: LocationState): MatchedRoute {
  const parts = location.pathname.split("/").filter(s => s);

  for (const route of routes) {
    const params = bindRoute(
      route[0].split("/").filter(s => s),
      parts
    );

    if (params) {
      return { route, params };
    }
  }

  return { route: ["", () => null], params: {} };
}

function bindRoute(route: string[], path: string[]) {
  if (route.length != path.length) {
    return undefined;
  }

  const params: RouteParams = {};

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
