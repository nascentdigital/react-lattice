import { BreakpointsDefinition, IResponsiveValue } from '@nascentdigital/lattice'


export interface IContainerOptions {
    breakpoints?: BreakpointsDefinition
    namespace?: string
    width?: string
    widthNarrow?: string
    padding?: IResponsiveValue<string|0>
}
