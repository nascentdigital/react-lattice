
// types
export interface ResponsiveValue<T> {

    readonly xs?: T
    readonly sm?: T
    readonly md?: T
    readonly lg?: T
    readonly xl?: T
}


// type guards
export function isResponsiveValue<T>(value: any): value is ResponsiveValue<T> {
    return value instanceof Object
        && (value.hasOwnProperty("xs")
            || value.hasOwnProperty("sm")
            || value.hasOwnProperty("md")
            || value.hasOwnProperty("lg")
            || value.hasOwnProperty("xl"));
}

