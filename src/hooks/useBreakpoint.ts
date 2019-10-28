import { useState, useEffect } from 'react';
import { distinctUntilChanged } from 'rxjs/operators';
import { BreakpointObservation } from "../types"
import { BreakpointObserver } from "../services/BreakpointObserver"

export function useBreakpoint(): BreakpointObservation {

  // get the breakpointObserver instance
  const breakpointObserver = BreakpointObserver.sharedInstance;

  // initialize the breakpoint to the current observation
  const [breakpoint, setBreakpoint] = useState<BreakpointObservation>(breakpointObserver.current)

  useEffect(() => {
    // subscribe to the breakpointObserver
    const subscription = breakpointObserver.current$
      .pipe(
        // filtered unless different from the previously passed value
        distinctUntilChanged()
      )
      .subscribe((observation) => {
        // update the breakpoint with the new observation
        setBreakpoint(observation)
      })
    
    // unsubscribe breakpointObserver on cleanup
    return () => subscription.unsubscribe()
  }, [])

  // return breakpoint
  return breakpoint
}