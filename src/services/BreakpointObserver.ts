// imports
import {BehaviorSubject, Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {IGridBreakpoints} from "../components";
import {Constants} from "../Constants";
import {Breakpoint, Breakpoints, BreakpointObservation } from "../types";


// type definitions
interface IBreakpointContext {
    breakpoint: Breakpoint;
    start: number;
    end?: number;
    mediaQuery?: any;
    mediaQueryCallback?: (e: any) => void;
}

// class definition
export class BreakpointObserver {

    private static _sharedInstance?: BreakpointObserver;

    private readonly _contexts: IBreakpointContext[];
    private _current: BreakpointObservation;
    private _current$: BehaviorSubject<BreakpointObservation>;


    constructor(gridBreakpoints: IGridBreakpoints) {

        // initialize instance variables
        this._contexts = BreakpointObserver.createContexts(gridBreakpoints);
        this._current = null;
        this._current$ = new BehaviorSubject<BreakpointObservation>(this._current);

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
        Breakpoints.forEach((breakpoint: Breakpoint, breakpointIndex: number) => {

            // create base context
            const gridBreakpoint = gridBreakpoints[breakpoint];
            const context: IBreakpointContext = {
                breakpoint: breakpoint,
                start: gridBreakpoint.width
            };

            // special handling for upper breakpoint
            if (breakpointIndex + 1 < Breakpoints.length) {

                // resolve next breakpoint
                const endBreakpoint = Breakpoints[breakpointIndex + 1];
                const endGridBreakpoint = gridBreakpoints[endBreakpoint];

                // update context
                context.end = endGridBreakpoint.width - 1;
            }

            // add context
            contexts.push(context);
        });

        // return contexts
        return contexts;
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
