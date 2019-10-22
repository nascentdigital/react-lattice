// imports
import {Constants} from "../../Constants";
import {
    Breakpoint,
    IResponsiveValue,
    isResponsiveValue,
    ResponsiveValueIterator
} from "../../types";
import {
    ContentAlignment,
    ContentAlignmentValues,
    Direction,
    DirectionValues,
    GridColumnCount,
    IGridBreakpoints,
    IGridOptions,
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


// class definition
export class GridStyle {

    private readonly _breakpoints: IGridBreakpoints;
    private readonly _classPrefix: string;

    constructor(options: IGridOptions = {}) {

        // initialize instance variables
        this._breakpoints = options.breakpoints || Constants.defaults.breakpoints;
        this._classPrefix = (options.namespace || Constants.defaults.namespacePrefix) + "grid";
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

    private static resolveResponsiveClasses<T>(value: undefined | T | IResponsiveValue<T>,
                                               classResolver: (breakpoint: Breakpoint, value: T) => string,
                                               defaultValue: T): string[] {

        // don't emit any classes if value isn't specified
        const classes: string[] = [];
        if (value === undefined) {
            return classes;
        }

        // or evaluate breakpoints if responsive value is passed in
        else if (isResponsiveValue(value)) {

            // iterate responsive entries
            let defaultRequired = true;
            for (const entry of new ResponsiveValueIterator(value).entries()) {

                // add entry
                classes.push(classResolver(entry[0], entry[1] as T));

                // look for XS fallback
                if (entry[0] === "xs") {
                    defaultRequired = false;
                }
            }

            // add default if required
            if (defaultRequired) {
                classes.push(classResolver("xs", defaultValue));
            }
        }

        // or handle singular value (push as xs upward)
        else {
            classes.push(classResolver("xs", value as T));
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


    public create() {

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
        ["xs", "sm", "md", "lg", "xl"].forEach((breakpoint: Breakpoint) => {

            // target correct media query (or use fallback for XS)
            let styleDecl: any = {};
            let style: any = styles;
            if (breakpoint !== "xs") {

                // make style declaration point to core styles
                styleDecl = styles;

                // create style for media query
                style = {};

                // bind media query to styles
                styles[`@media screen and (min-width: ${breakpoints[breakpoint].width}px)`] = style;
            }

            // add container styles
            for (const value of DirectionValues) {
                const className = this.getContainerDirectionClass(breakpoint, value);
                styleDecl[className] = {};
                style[className] = {
                    flexDirection: GridStyle.getContainerDirectionStyle(value)
                };
            }

            for (const value of WrappingValues) {
                const className = this.getContainerWrappingClass(breakpoint, value);
                styleDecl[className] = {};
                style[className] = {
                    flexWrap: GridStyle.getContainerWrappingStyle(value)
                };
            }

            for (const value of JustificationValues) {
                const className = this.getContainerJustificationClass(breakpoint, value);
                styleDecl[className] = {};
                style[className] = {
                    justifyContent: GridStyle.getContainerJustificationStyle(value)
                };
            }

            for (const value of ContentAlignmentValues) {
                const className = this.getContainerContentAlignmentClass(breakpoint, value);
                styleDecl[className] = {};
                style[className] = {
                    alignContent: GridStyle.getContainerContentAlignmentStyle(value)
                };
            }

            for (const value of ItemAlignmentValues) {
                const className = this.getContainerItemAlignmentClass(breakpoint, value);
                styleDecl[className] = {};
                style[className] = {
                    alignItems: GridStyle.getItemAlignmentStyle(value)
                };
            }

            for (const value of ItemOrderValues) {
                const className = this.getItemOrderClass(breakpoint, value);
                styleDecl[className] = {};
                style[className] = {
                    order: GridStyle.getItemOrderStyle(value)
                };
            }

            for (let i = 0; i <= MaxSpacing; ++i) {

                // determine spacing / space
                const spacing = i as Spacing;
                let spacer = breakpoints[breakpoint].spacing;
                if (typeof spacer === "number") {
                    spacer = (s: number) => s * spacer;
                }
                const space: number = spacer(spacing);

                const className = this.getContainerSpacingClass(breakpoint, spacing);
                styleDecl[className] = {};
                style[className] = {
                    [`& > .${this.getItemClass()}`]: {
                        padding: `0 ${space / 2}px`,
                    },
                    [`& > .${this.getItemClass()}:first-child`]: {
                        paddingLeft: 0,
                    },
                    [`& > .${this.getItemClass()}:last-child`]: {
                        paddingRight: 0,
                    },
                };
            }

            for (const value of ItemFlexValues) {
                const className = this.getItemFlexClass(breakpoint, value);
                styleDecl[className] = {};
                style[className] = GridStyle.getItemFlexStyle(value);
            }

            // add items styles
            for (let i = 0; i <= GridColumnCount; ++i) {

                // set item size
                if (isItemColumn(i)) {
                    const className = this.getItemFlexClass(breakpoint, i);
                    styleDecl[className] = {};
                    style[className] = GridStyle.getItemFlexColumnStyle(i);
                }

                // set offset style (if applicable)
                if (isItemOffset(i)) {
                    const className = this.getItemOffsetClass(breakpoint, i);
                    styleDecl[className] = {};
                    style[className] = GridStyle.getItemOffsetStyle(i);
                }
            }
        });

        // return styles
        return styles;
    }

    public getContainerClass() {
        return this._classPrefix;
    }

    public getContainerDirectionClass(breakpoint: Breakpoint, value: Direction): string {
        return `${this._classPrefix}-dir-${breakpoint}-${value}`;
    }

    public getContainerDirectionClasses(value?: Direction | IResponsiveValue<Direction>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerDirectionClass(b, v), "row" as Direction);
    }

    public getContainerWrappingClass(breakpoint: Breakpoint, value: Wrapping): string {
        return `${this._classPrefix}-wrp-${breakpoint}-${value}`;
    }

    public getContainerWrappingClasses(value?: Wrapping | IResponsiveValue<Wrapping>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerWrappingClass(b, v), "none" as Wrapping);
    }

    public getContainerJustificationClass(breakpoint: Breakpoint, value: Justification): string {
        return `${this._classPrefix}-jst-${breakpoint}-${value}`;
    }

    public getContainerJustificationClasses(value?: Justification | IResponsiveValue<Justification>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerJustificationClass(b, v), "flexStart" as Justification);
    }

    public getContainerContentAlignmentClass(breakpoint: Breakpoint, value: ContentAlignment): string {
        return `${this._classPrefix}-algi-${breakpoint}-${value}`;
    }

    public getContainerContentAlignmentClasses(value?: ContentAlignment
                                               | IResponsiveValue<ContentAlignment>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerContentAlignmentClass(b, v), "stretch" as ContentAlignment);
    }

    public getContainerItemAlignmentClass(breakpoint: Breakpoint, alignment: ItemAlignment): string {
        return `${this._classPrefix}-algc-${breakpoint}-${alignment}`;
    }

    public getContainerItemAlignmentClasses(value?: ItemAlignment | IResponsiveValue<ItemAlignment>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerItemAlignmentClass(b, v), "stretch" as ItemAlignment);
    }

    public getContainerSpacingClass(breakpoint: Breakpoint, spacing: Spacing): string {
        return `${this._classPrefix}-spc-${breakpoint}-${spacing}`;
    }

    public getContainerSpacingClasses(value?: Spacing | IResponsiveValue<Spacing>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getContainerSpacingClass(b, v), 0 as Spacing);
    }

    public getItemClass() {
        return this._classPrefix + "-itm";
    }

    public getItemOrderClass(breakpoint: Breakpoint, order: ItemOrder): string {
        return `${this._classPrefix}-ord-${breakpoint}-${order}`;
    }

    public getItemOrderClasses(value?: ItemOrder | IResponsiveValue<ItemOrder>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getItemOrderClass(b, v), "initial" as ItemOrder);
    }

    public getItemOffsetClass(breakpoint: Breakpoint, offset: ItemOffset): string {
        return `${this._classPrefix}-off-${breakpoint}-${offset}`;
    }

    public getItemOffsetClasses(value?: ItemOffset | IResponsiveValue<ItemOffset>): string[] {
        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getItemOffsetClass(b, v), 0 as ItemOffset);
    }

    public getItemFlexClass(breakpoint: Breakpoint, flex?: boolean | ItemColumn | ItemFlex): string {

        // skip if flex is not set
        if (flex === false || flex === "none") {
            return `${this._classPrefix}-flx-${breakpoint}-none`;
        }

        // use auto flex if specified
        else if (flex === true || flex === "auto") {
            return `${this._classPrefix}-flx-${breakpoint}`;
        }

        // use flex grow / shrink if specified
        else if (flex === "grow" || flex === "shrink") {
            return `${this._classPrefix}-flx-${breakpoint}-${flex}`;
        }

        // use absolute value if it's a number
        const column = flex as number;
        if (!isNaN(column) && column > 0 && column <= GridColumnCount) {
            return `${this._classPrefix}-flx-${breakpoint}-${column}`;
        }

        // or skip if unrecognized
        else {
            return "";
        }
    }

    public getItemFlexClasses(
        value?: boolean | ItemColumn | ItemFlex | IResponsiveValue<boolean | ItemColumn | ItemFlex>) {

        return GridStyle.resolveResponsiveClasses(value,
            (b, v) => this.getItemFlexClass(b, v), "auto" as ItemFlex);
    }
}
