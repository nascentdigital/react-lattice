
// types
export interface IResponsiveValue<T> {
    readonly xs?: T;
    readonly sm?: T;
    readonly md?: T;
    readonly lg?: T;
    readonly xl?: T;
}


// type guards
export function isResponsiveValue<T>(value: any): value is IResponsiveValue<T> {
    return value instanceof Object
        && (value.hasOwnProperty("xs")
            || value.hasOwnProperty("sm")
            || value.hasOwnProperty("md")
            || value.hasOwnProperty("lg")
            || value.hasOwnProperty("xl"));
}

