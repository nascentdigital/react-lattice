// imports
import {IGridBreakpoints, Spacing} from "./components/Grid";


// types
interface ILatticeDefaults {
    breakpoints: IGridBreakpoints;
    namespacePrefix: string;
}
interface ILatticeConstants {
    defaults: ILatticeDefaults;
}


// exports
export const Constants: ILatticeConstants = {
    defaults: {
        breakpoints: {
            xs: {
                width: 0,
                spacing: (space: Spacing) => space * 1
            },
            sm: {
                width: 600,
                spacing: (space: Spacing) => space * 2
            },
            md: {
                width: 960,
                spacing: (space: Spacing) => space * 3
            },
            lg: {
                width: 1280,
                spacing: (space: Spacing) => space * 4
            },
            xl: {
                width: 1920,
                spacing: (space: Spacing) => space * 8
            }
        },
        namespacePrefix: "nd_"
    }
};
