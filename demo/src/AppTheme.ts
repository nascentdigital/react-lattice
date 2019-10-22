// imports
import {
    Breakpoint,
    Breakpoints,
    IGridBreakpoints
} from "react-lattice";

// constants
export const gridBreakpoints: IGridBreakpoints = {
    xs: {width:    0, spacing:  2},
    sm: {width:  680, spacing:  4},
    md: {width:  960, spacing:  8},
    lg: {width: 1280, spacing: 12},
    xl: {width: 1920, spacing: 16}
};

// exports
export const theme = {
    responsive: {
        up: MediaQueryUpTo,
        down: MediaQueryDownTo,
        between: MediaQueryBetween,
        only: MediaQueryOnly,
        width: MediaQueryWidth
    }
};


// helpers
function MediaQueryUpTo(breakpoint: Breakpoint) {
    return `@media (min-width: ${getBreakpointWidth(breakpoint)}px)`;
}

function MediaQueryDownTo(breakpoint: Breakpoint) {
    const limitOffset = Breakpoints.indexOf(breakpoint) + 1;
    return limitOffset === Breakpoints.length
        ? MediaQueryUpTo("xs")
        : `@media (max-width: ${getBreakpointWidth(Breakpoints[limitOffset]) - 1}px)`;
}

function MediaQueryBetween(breakpointStart: Breakpoint, breakpointEnd: Breakpoint) {
    const limitOffset = Breakpoints.indexOf(breakpointEnd) + 1;
    return limitOffset === Breakpoints.length
        ? MediaQueryUpTo(breakpointStart)
        : `@media (min-width: ${getBreakpointWidth(breakpointStart)}px) ` +
          `and (max-width: ${getBreakpointWidth(Breakpoints[limitOffset]) - 1}px)`;
}

function MediaQueryOnly(breakpoint: Breakpoint) {
    return MediaQueryBetween(breakpoint, breakpoint);
}

function MediaQueryWidth(breakpoint: Breakpoint) {
    return `${getBreakpointWidth(breakpoint)}px`;
}

function getBreakpointWidth(breakpoint: Breakpoint) {

    // throw if breakpoint doesn't exist
    const gridBreakpoint = gridBreakpoints[breakpoint];
    if (gridBreakpoint === undefined) {
        throw new Error("No breakpoint defined for " + breakpoint);
    }

    // return width
    return gridBreakpoint.width;

}
