import { JSXElement } from 'solid-js';
export interface LocationState {
    location: Location;
}
export declare type RouteParams = Record<string, string>;
export declare type Route = [string, () => JSXElement];
export interface MatchedRoute {
    route: Route;
    params: RouteParams;
}
