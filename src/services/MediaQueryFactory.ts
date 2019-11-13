// imports
import {IGridBreakpoints} from "../components/Grid";
import {Breakpoint, Breakpoints} from "../types";


// constants
const BreakpointDelta = 0.05;


// class
export class MediaQueryFactory {

    public readonly breakpoints: IGridBreakpoints;


    constructor(breakpoints: IGridBreakpoints) {
        this.breakpoints = breakpoints;
    }


    public up(start: Breakpoint) {
        return `@media (min-width: ${this.breakpoints[start].width}px)`;
    }

    public down(end: Breakpoint) {
        return end === "xl"
            ? this.up("xs")
            : `@media (max-width: ${this.upperWidth(end)}px)`;
    }

    public between(start: Breakpoint, end: Breakpoint) {
        return end === "xl"
            ? this.up(start)
            : `${this.up(start)} and (max-width: ${this.upperWidth(end)}px)`;
    }

    public only(breakpoint: Breakpoint) {
        return this.between(breakpoint, breakpoint);
    }

    public width(breakpoint: Breakpoint) {
        return this.breakpoints[breakpoint].width;
    }

    private upperWidth(breakpoint: Breakpoint) {

        // throw if breakpoint is xl
        if (breakpoint === "xl") {
            throw new Error(`Breakpoint "xl" has no upper limit.`);
        }

        breakpoint = Breakpoints[Breakpoints.indexOf(breakpoint) + 1];
        return this.breakpoints[breakpoint].width - BreakpointDelta;
    }
}
