// imports
import {
    Breakpoint,
    Breakpoints,
    BreakpointsDefinition
} from "@nascentdigital/lattice";
import {
    SpacingDefinition
} from "@nascentdigital/react-lattice";

// constants
export const gridBreakpoints: BreakpointsDefinition = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
};
export const gridSpacing: SpacingDefinition = {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
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
    return gridBreakpoint;

}
