// imports
import {BreakpointObservation, BreakpointObserver, BreakpointsDefinition} from "@nascentdigital/lattice";
import {useEffect, useState} from "react";
import {distinctUntilChanged} from "rxjs/operators";
import {LatticeDefaults} from "../LatticeDefaults";


// hook definition
export function useBreakpoint(breakpoints: BreakpointsDefinition = LatticeDefaults.breakpoints): BreakpointObservation {

    // get the breakpointObserver instance
    const breakpointObserver = new BreakpointObserver(breakpoints);

    // initialize the breakpoint to the current observation
    const [breakpoint, setBreakpoint] = useState<BreakpointObservation>(breakpointObserver.current);

    useEffect(() => {
        // subscribe to the breakpointObserver
        const subscription = breakpointObserver.current$
            .pipe(
                // filtered unless different from the previously passed value
                distinctUntilChanged()
            )
            .subscribe((observation) => {
                // update the breakpoint with the new observation
                setBreakpoint(observation);
            });

        // unsubscribe breakpointObserver on cleanup
        return () => subscription.unsubscribe();
    }, []);

    // return breakpoint
    return breakpoint;
}
