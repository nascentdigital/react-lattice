import {
    Breakpoint,
    Breakpoints,
    BreakpointsDefinition,
    IResponsiveValue,
    MediaQueryFactory
} from '@nascentdigital/lattice'
import { LatticeDefaults } from '../../LatticeDefaults'
import { IContainerOptions } from './ContainerTypes'


export class ContainerStyle {

    public readonly breakpoints: BreakpointsDefinition
    public readonly classPrefix: string
    public readonly width: string
    public readonly widthNarrow: string
    public readonly padding: IResponsiveValue<string|0>

    constructor(options: IContainerOptions = {}) {

        // initialize instance variables
        this.breakpoints = options.breakpoints || LatticeDefaults.breakpoints
        this.classPrefix = (options.namespace || LatticeDefaults.namespacePrefix) + 'cntr'
        this.width = options.width || '1200px'
        this.widthNarrow = options.widthNarrow || '780px'
        this.padding = options.padding || {
            xs: '20px',
            sm: '20px',
            md: '20px',
            lg: 0,
            xl: 0
        }
    }

    public get containerClass() {
        return this.classPrefix + '-wrap'
    }

    public get contentClass() {
        return this.classPrefix
    }

    public get contentNarrowClass() {
        return this.classPrefix + 'nrrw'
    }

    public getFullbleedClass(breakpoint: Breakpoint, on: boolean) {
        return `${this.classPrefix}-bld-${breakpoint}${on ? '': '-off'}`
    }

    public create() {

        // resolve config
        const {
            breakpoints,
            width,
            widthNarrow,
            padding
        } = this

        // create content styles
        const contentStyles = {
            width: '100%',
            maxWidth: width,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: padding.xs,
            paddingRight: padding.xs,
            [`&.${this.contentNarrowClass}`]: {
                maxWidth: widthNarrow
            }
        }

        // apply responsive styles
        const mediaQuery = new MediaQueryFactory(breakpoints)
        Breakpoints.forEach((breakpoint: Breakpoint) => {

            // create breakpoint-specific style
            const paddingStyle = {
                paddingLeft: padding[breakpoint],
                paddingRight: padding[breakpoint]
            }
            const breakpointStyle: any = { ...paddingStyle }

            // apply fullbleed content styles
            breakpointStyle['&.' + this.getFullbleedClass(breakpoint, true)] = {
                paddingLeft: 0,
                paddingRight: 0
            }
            breakpointStyle['&.' + this.getFullbleedClass(breakpoint, false)] = paddingStyle

            // bind breakpoint styling
            contentStyles[mediaQuery.up(breakpoint)] = breakpointStyle
        })

        // create style object
        const styles: any = {

            // container
            [this.containerClass]: {
                width: '100%'
            },

            // item
            [this.contentClass]: contentStyles
        }

        // return styles
        return styles
    }
}
