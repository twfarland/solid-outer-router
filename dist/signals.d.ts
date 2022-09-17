import { Route, RouteParams } from "./types";
export declare const setLocation: (location: Location) => void;
export declare const setRoutes: import("solid-js").Setter<Route[]>;
export declare const params: () => RouteParams;
export declare const route: () => import("solid-js").JSX.Element;
