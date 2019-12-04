// imports
import {BreakpointsDefinition} from "@nascentdigital/lattice";
import {Spacing, SpacingDefinition} from "./components/Grid";


// types
interface ILatticeDefaults {
    breakpoints: BreakpointsDefinition;
    spacing: SpacingDefinition;
    namespacePrefix: string;
}


// exports
export const LatticeDefaults: ILatticeDefaults = {
    breakpoints: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920
    },
    spacing: {
        xs: (space: Spacing) => space * 1,
        sm: (space: Spacing) => space * 2,
        md: (space: Spacing) => space * 3,
        lg: (space: Spacing) => space * 4,
        xl: (space: Spacing) => space * 8
    },
    namespacePrefix: "nd_"
};
