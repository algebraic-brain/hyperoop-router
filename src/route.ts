import { Component, LazyComponent } from "hyperoop";
import { IMatch, parseRoute } from "./parseRoute";

/** Attributes of target component of `Route` */
export interface ITargetAttributes {
    /** Match information */
    match: IMatch;
}

/** Type of `Route` target component */
export type TargetComponent = Component<ITargetAttributes>;

/** Attributes for the `Route` component */
export interface IRouteAttributes {
    /** Path pattern to compare with `location.pathname`, for example `/user/:id` */
    path:      string;
    /** When true, the `Route` will only match if the path matches the `location.pathname` exactly. */
    exact:     boolean;
    /** A component to render only when the location matches. */
    component: TargetComponent;
}

/** `Route` component renders some UI when a location matches the path */
export const Route: LazyComponent<IRouteAttributes> = (a: IRouteAttributes) => () => {
    const loc = window.location;
    const match = parseRoute(a.path, loc.pathname, a.exact);
    if (!match) { return null; }
    const c = a.component({match}, []);
    if (typeof c === "function") { return c(); }
    return c;
};
