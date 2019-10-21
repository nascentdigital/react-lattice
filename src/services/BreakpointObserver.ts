// imports
import {BehaviorSubject, Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {
    IGridBreakpoint,
    IGridBreakpoints
} from "../components";
import {Constants} from "../Constants";
import {Breakpoint} from "../types";


// type definitions
interface IBreakpointContext {
    breakpoint: Breakpoint;
    start: number;
    end?: number;
    mediaQuery?: any;
    mediaQueryCallback?: (e: any) => void;
}
type BreakpointObservation = Breakpoint | null;


// class definition
export class BreakpointObserver {

    private static _sharedInstance?: BreakpointObserver;

    public static get sharedInstance() {

        // create instance, if required
        if (this._sharedInstance === undefined) {
            this._sharedInstance = new BreakpointObserver(Constants.defaults.breakpoints);
        }

        // return shared instance
        return this._sharedInstance;
    }

    private static createContexts(gridBreakpoints: IGridBreakpoints): IBreakpointContext[] {

        // create contexts
        const contexts: IBreakpointContext[] = [];

        // iterate over breakpoints


        // return contexts
        return contexts;
    }

    private readonly _contexts: IBreakpointContext[];
    private _current: BreakpointObservation;
    private _current$: BehaviorSubject<BreakpointObservation>;


    constructor(breakpoints: IGridBreakpoints) {

        // initialize instance variables
        this._contexts = [];
        this._current = null;
        this._current$ = new BehaviorSubject<BreakpointObservation>(this._current);

        // transform grid breakpoints into contexts


        // bind breakpoints
        this._contexts.forEach((context) => {

            // initialize media query callback
            const breakpoint = context.breakpoint;
            context.mediaQueryCallback = (e) => {

                // update if matches and not current
                if (e.matches) {
                    this.setCurrent(breakpoint);
                }
            };

            // bind breakpoint (indirectly updates to matching breakpoint)
            this.bindBreakpoint(context);
        });
    }

    get current(): BreakpointObservation {
        return this._current;
    }

    get current$(): Observable<BreakpointObservation> {
        return this._current$
            .pipe(filter((breakpoint) => breakpoint !== null));
    }

    private setCurrent(breakpoint: Breakpoint) {
        if (this._current !== breakpoint) {
            this._current = breakpoint;
            this._current$.next(breakpoint);
        }
    }

    setBreakpoint(breakpoint: Breakpoint, start: number) {

        // TODO: throw if breakpoint shouldn't be directly assigned
        if (breakpoint === Breakpoint.unknown
            || breakpoint === Breakpoint.xs) {
            return;
        }

        // TODO: throw exception if there are conflicts
        if (breakpoint !== Breakpoint.xl
            && (this._breakpointConfigurations[breakpoint + 1].end || 0) <= start) {
            return;
        }

        // skip if breakpoint position is unchanged
        const configuration = this._breakpointConfigurations[breakpoint];
        if (configuration.start === start) {
            return;
        }

        // update breakpoint
        configuration.start = start;
        this.bindBreakpoint(configuration);

        // update previous breakpoint
        const previousConfiguration = this._breakpointConfigurations[breakpoint - 1];
        previousConfiguration.end = start - 1;
        this.bindBreakpoint(previousConfiguration);
    }

    private bindBreakpoint(context: IBreakpointContext) {

        // unbind previous media query (if any)
        if (context.mediaQuery !== undefined) {
            context.mediaQuery.removeEventListener(context.mediaQueryCallback);
        }

        // create last breakpoint query
        let mediaQuery;
        if (context.end === undefined) {
            mediaQuery = `(min-width: ${context.start}px)`;
        }

        // or create first breakpoint query
        else if (context.start === 0) {
            mediaQuery = `(max-width: ${context.end}px)`;
        }

        // or create bounded breakpoint query
        else {
            mediaQuery = `(min-width: ${context.start}px) and (max-width: ${context.end - 1}px)`;
        }

        // bind new media query
        context.mediaQuery = window.matchMedia(mediaQuery);
        context.mediaQuery.addListener(context.mediaQueryCallback);

        // update breakpoint if matching
        if (context.mediaQuery.matches) {
            this.setCurrent(context.breakpoint);
        }
    }
}
