// imports
import {
    GridBreakpoints,
    GridBreakpointWidth
} from "react-lattice";

// constants
export const breakpoints: GridBreakpoints = {
    xs: {width:    0, spacing:  2},
    sm: {width:  680, spacing:  4},
    md: {width:  960, spacing:  8},
    lg: {width: 1280, spacing: 12},
    xl: {width: 1920, spacing: 16}
};
const breakpointWidths: ReadonlyArray<GridBreakpointWidth> = ["xs", "sm", "md", "lg", "xl"];

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
function MediaQueryUpTo(width: GridBreakpointWidth) {
    return `@media (min-width: ${breakpoints[width].width}px)`;
}

function MediaQueryDownTo(width: GridBreakpointWidth) {
    const limitOffset = breakpointWidths.indexOf(width) + 1;
    return limitOffset === breakpointWidths.length
        ? MediaQueryUpTo("xs")
        : `@media (max-width: ${breakpoints[breakpointWidths[limitOffset]].width - 1}px)`;
}

function MediaQueryBetween(startWidth: GridBreakpointWidth, endWidth: GridBreakpointWidth) {
    const limitOffset = breakpointWidths.indexOf(endWidth) + 1;
    return limitOffset === breakpointWidths.length
        ? MediaQueryUpTo(startWidth)
        : `@media (min-width: ${breakpoints[startWidth].width}px) ` +
          `and (max-width: ${breakpoints[breakpointWidths[limitOffset]].width - 1}px)`;
}

function MediaQueryOnly(width: GridBreakpointWidth) {
    return MediaQueryBetween(width, width);
}

function MediaQueryWidth(width: GridBreakpointWidth) {
    return `${breakpoints[width].width}px`;
}
