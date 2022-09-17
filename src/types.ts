import { JSXElement } from 'solid-js';

export interface LocationState {
  location: Location;
}

export type RouteParams = Record<string, string>;

export type Route = [string, () => JSXElement];

export interface MatchedRoute {
  route: Route;
  params: RouteParams;
}
