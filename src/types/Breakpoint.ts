
// types
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

// functions
export function breakpointOrdinal(breakpoint: Breakpoint) {
    switch (breakpoint) {
        case "xs":
            return 0;
        case "sm":
            return 1;
        case "md":
            return 2;
        case "lg":
            return 3;
        case "xl":
            return 4;
    }
}
