// imports
import {
    Breakpoint,
    isResponsiveValue,
    ResponsiveValue,
    ResponsiveValueIterator
} from "../../types";
import {
    ContentAlignment,
    ContentAlignmentValues,
    Direction,
    DirectionValues,
    GridBreakpoints,
    GridColumnCount,
    GridOptions,
    isItemColumn,
    isItemOffset,
    ItemAlignment,
    ItemAlignmentValues,
    ItemColumn,
    ItemFlex,
    ItemFlexValues,
    ItemOffset,
    ItemOrder,
    ItemOrderValues,
    Justification,
    JustificationValues,
    MaxSpacing,
    Spacing,
    Wrapping,
    WrappingValues
} from "./GridTypes";


// constants
const DefaultBreakpoints: GridBreakpoints = {
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
};
const DefaultNamespace = "nd_";


// class definition
export class GridStyle {

    private readonly _breakpoints: GridBreakpoints;
    private readonly _classPrefix: string;


    constructor(options: GridOptions = {}) {

        // initialize instance variables
        this._breakpoints = options.breakpoints || DefaultBreakpoints;
        this._classPrefix = (options.namespace || DefaultNamespace) + "grid";
    }

    create() {

        // create style object
        const styles: any = {

            // container
            [this.getContainerClass()]: {
                display: "flex",
                flex: "0 1 auto",
                flexWrap: "wrap",
                boxSizing: "border-box"
            },

            // item
            [this.getItemClass()]: {
                boxSizing: "border-box"
            }
        };

        // add responsive styles
        const breakpoints: any = this._breakpoints;
        [Breakpoint.xs, Breakpoint.sm, Breakpoint.md, Breakpoint.lg, Breakpoint.xl].forEach(breakpoint => {

            // target correct media query (or use fallback for XS)
            const breakpointName: string = Breakpoint[breakpoint];
            let style: any = styles;
            if (breakpoint !== Breakpoint.xs) {

                // create style for media query
                style = {};

                // bind media query to styles
                styles[`@media screen and (min-width: ${breakpoints[breakpointName].width}px)`] = style;
            }

            // add container styles
            for (const value of DirectionValues) {
                style[this.getContainerDirectionClass(breakpoint, value)] = {
                    flexDirection: GridStyle.getContainerDirectionStyle(value)
                };
            }

            for (const value of WrappingValues) {
                style[this.getContainerWrappingClass(breakpoint, value)] = {
                    flexWrap: GridStyle.getContainerWrappingStyle(value)
                };
            }

            for (const value of JustificationValues) {
                style[this.getContainerJustificationClass(breakpoint, value)] = {
                    justifyContent: GridStyle.getContainerJustificationStyle(value)
                };
            }

            for (const value of ContentAlignmentValues) {
                style[this.getContainerContentAlignmentClass(breakpoint, value)] = {
                    alignContent: GridStyle.getContainerContentAlignmentStyle(value)
                };
            }

            for (let value of ItemAlignmentValues) {
                style[this.getContainerItemAlignmentClass(breakpoint, value)] = {
                    alignItems: GridStyle.getItemAlignmentStyle(value)
                };
            }

            for (let value of ItemOrderValues) {
                style[this.getItemOrderClass(breakpoint, value)] = {
                    order: GridStyle.getItemOrderStyle(value)
                };
            }

            for (let i = 0; i <= MaxSpacing; ++i) {

                // determine spacing / space
                const spacing = i as Spacing;
                const space: number = breakpoints[breakpointName].spacing(spacing);

                style[this.getContainerSpacingClass(breakpoint, spacing)] = {
                    [`& > .${this.getItemClass()}`]: {
                        padding: `0 ${space / 2}px`,
                    },
                    [`& > .${this.getItemClass()}:first-child`]: {
                        paddingLeft: 0,
                    },
                    [`& > .${this.getItemClass()}:last-child`]: {
                        paddingRight: 0,
                    },
                }
            }

            for (let value of ItemFlexValues) {
                style[this.getItemFlexClass(breakpoint, value)] = GridStyle.getItemFlexStyle(value);
            }

            // add items styles
            for (let i = 0; i <= GridColumnCount; ++i) {

                // set item size
                if (isItemColumn(i)) {
                    style[this.getItemFlexClass(breakpoint, i)] = GridStyle.getItemFlexColumnStyle(i);
                }

                // set offset style (if applicable)
                if (isItemOffset(i)) {
                    style[this.getItemOffsetClass(breakpoint, i)] = GridStyle.getItemOffsetStyle(i);
                }
            }
        });

        // return styles
        return styles;
    }

    private static getItemFlexStyle(flex: ItemFlex): any {

        // create column style
        const style: any = {
            flex: "0 0 auto",
            flexBasis: 0,
            boxSizing: "border-box"
        };

        // apply auto-sizing column
        switch (flex) {
            case "none":
                style.flex = "none";
                break;
            case "auto":
                style.flexBasis = "auto";
                style.flexGrow = 1;
                style.maxWidth = "100%";
                break;
            case "grow":
                style.flexGrow = 1;
                style.maxWidth = "100%";
                break;
            case "shrink":
                style.flexShrink = 1;
                break;
        }

        // return style
        return style;
    }

    getContainerClass() {
        return this._classPrefix;
    }

    getContainerDirectionClass(breakpoint: Breakpoint, value: Direction): string {
        return `${this._classPrefix}-dir-${Breakpoint[breakpoint]}-${value}`;
    }

    getContainerDirectionClasses(value?: Direction | ResponsiveValue<Direction>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerDirectionClass(b, v), "row" as Direction);
    }

    getContainerWrappingClass(breakpoint: Breakpoint, value: Wrapping): string {
        return `${this._classPrefix}-wrp-${Breakpoint[breakpoint]}-${value}`;
    }

    getContainerWrappingClasses(value?: Wrapping | ResponsiveValue<Wrapping>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerWrappingClass(b, v), "none" as Wrapping);
    }

    getContainerJustificationClass(breakpoint: Breakpoint, value: Justification): string {
        return `${this._classPrefix}-jst-${Breakpoint[breakpoint]}-${value}`;
    }

    getContainerJustificationClasses(value?: Justification | ResponsiveValue<Justification>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerJustificationClass(b, v), "flexStart" as Justification);
    }

    getContainerContentAlignmentClass(breakpoint: Breakpoint, value: ContentAlignment): string {
        return `${this._classPrefix}-algi-${Breakpoint[breakpoint]}-${value}`;
    }

    getContainerContentAlignmentClasses(value?: ContentAlignment | ResponsiveValue<ContentAlignment>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerContentAlignmentClass(b, v), "stretch" as ContentAlignment);
    }

    getContainerItemAlignmentClass(breakpoint: Breakpoint, alignment: ItemAlignment): string {
        return `${this._classPrefix}-algc-${Breakpoint[breakpoint]}-${alignment}`;
    }

    getContainerItemAlignmentClasses(value?: ItemAlignment | ResponsiveValue<ItemAlignment>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerItemAlignmentClass(b, v), "stretch" as ItemAlignment);
    }

    getContainerSpacingClass(breakpoint: Breakpoint, spacing: Spacing): string {
        return `${this._classPrefix}-spc-${Breakpoint[breakpoint]}-${spacing}`;
    }

    getContainerSpacingClasses(value?: Spacing | ResponsiveValue<Spacing>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerSpacingClass(b, v), 0 as Spacing);
    }

    getItemClass() {
        return this._classPrefix + "-itm";
    }

    getItemOrderClass(breakpoint: Breakpoint, order: ItemOrder): string {
        return `${this._classPrefix}-ord-${Breakpoint[breakpoint]}-${order}`;
    }

    getItemOrderClasses(value?: ItemOrder | ResponsiveValue<ItemOrder>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getItemOrderClass(b, v), "initial" as ItemOrder);
    }

    getItemOffsetClass(breakpoint: Breakpoint, offset: ItemOffset): string {
        return `${this._classPrefix}-off-${Breakpoint[breakpoint]}-${offset}`;
    }

    getItemOffsetClasses(value?: ItemOffset | ResponsiveValue<ItemOffset>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getItemOffsetClass(b, v), 0 as ItemOffset);
    }

    getItemFlexClass(breakpoint: Breakpoint, flex?: boolean | ItemColumn | ItemFlex): string {

        // skip if flex is not set
        const breakpointName = Breakpoint[breakpoint];
        if (flex === false || flex === "none") {
            return `${this._classPrefix}-flx-${breakpointName}-none`;
        }

        // use auto flex if specified
        else if (flex === true || flex === "auto") {
            return `${this._classPrefix}-flx-${breakpointName}`;
        }

        // use flex grow / shrink if specified
        else if (flex === "grow" || flex === "shrink") {
            return `${this._classPrefix}-flx-${breakpointName}-${flex}`;
        }

        // use absolute value if it's a number
        const column = flex as number;
        if (!isNaN(column) && column > 0 && column <= GridColumnCount) {
            return `${this._classPrefix}-flx-${breakpointName}-${column}`;
        }

        // or skip if unrecognized
        else {
            return "";
        }
    }

    getItemFlexClasses(value?: boolean | ItemColumn | ItemFlex | ResponsiveValue<boolean | ItemColumn | ItemFlex>) {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getItemFlexClass(b, v), "auto" as ItemFlex);
    }


    private static resolveResponsiveClasses<T>(value: undefined | T | ResponsiveValue<T>,
                                        classResolver: (breakpoint: Breakpoint, value: T) => string,
                                        defaultValue: T): string[] {

        // don't emit any classes if value isn't specified
        const classes = [];
        if (value === undefined) {
        }

        // or evaluate breakpoints if responsive value is passed in
        else if (isResponsiveValue(value)) {

            // iterate responsive entries
            let defaultRequired = true;
            for (const entry of new ResponsiveValueIterator(value).entries()) {

                // add entry
                classes.push(classResolver(entry[0], entry[1]));

                // look for XS fallback
                if (entry[0] === Breakpoint.xs) {
                    defaultRequired = false;
                }
            }

            // add default if required
            if (defaultRequired) {
                classes.push(classResolver(Breakpoint.xs, defaultValue));
            }
        }

        // or handle singular value (push as xs upward)
        else {
            classes.push(classResolver(Breakpoint.xs, value as T));
        }

        // return classes
        return classes;
    }

    private static getItemFlexColumnStyle(column: ItemColumn): any {

        // compute size
        const width = `${(column * 100 / GridColumnCount)}%`;

        // return  style
        return {
            flex: "0 0 auto",
            flexBasis: width,
            maxWidth: width,
            boxSizing: "border-box"
        };
    }

    private static getItemOffsetStyle(offset: ItemOffset): any {
        return {
            marginLeft: `${offset * 100 / GridColumnCount}%`,
        };
    }

    private static getContainerDirectionStyle(value: Direction): string {
        switch (value) {
            case "column":
                return "column";
            case "columnReverse":
                return "column-reverse";
            case "row":
                return "row";
            case "rowReverse":
                return "row-reverse";
        }
    }

    private static getContainerWrappingStyle(value: Wrapping): string {
        switch (value) {
            case "none":
                return "nowrap";
            case "wrap":
                return "wrap";
            case "wrapReverse":
                return "wrap-reverse";
        }
    }

    private static getContainerJustificationStyle(value: Justification): string {
        switch (value) {
            case "center":
                return "center";
            case "flexEnd":
                return "flex-end";
            case "flexStart":
                return "flex-start";
            case "spaceAround":
                return "space-around";
            case "spaceBetween":
                return "space-between";
            case "spaceEvenly":
                return "space-evenly";
        }
    }

    private static getContainerContentAlignmentStyle(value: ContentAlignment): string {
        switch (value) {
            case "center":
                return "center";
            case "flexEnd":
                return "flex-end";
            case "flexStart":
                return "flex-start";
            case "spaceAround":
                return "space-around";
            case "spaceBetween":
                return "space-between";
            case "stretch":
                return "stretch";
        }
    }

    private static getItemAlignmentStyle(value: ItemAlignment): string {
        switch (value) {
            case "baseline":
                return "baseline";
            case "center":
                return "center";
            case "flexEnd":
                return "flex-end";
            case "flexStart":
                return "flex-start";
            case "stretch":
                return "stretch";
        }
    }

    private static getItemOrderStyle(value: ItemOrder): number {
        switch (value) {
            case "initial":
                return 0;
            case "first":
                return -1;
            case "last":
                return 1;
        }
    }

}
