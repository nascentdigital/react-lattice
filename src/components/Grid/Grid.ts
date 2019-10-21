// imports
import {create as createJss} from "jss";
import preset from "jss-preset-default";
import React, {HTMLAttributes} from "react";
import {
    isResponsiveValue,
    ResponsiveValue
} from "../../types";
import {GridStyle} from "./GridStyle";
import {
    ContentAlignment,
    Direction,
    IGridOptions,
    ItemAlignment,
    ItemColumn,
    ItemFlex,
    ItemOffset,
    ItemOrder,
    Justification,
    Spacing,
    Wrapping
} from "./GridTypes";


// constants
const jss = createJss({
    createGenerateId: () => (rule) => rule.key
});
jss.setup(preset());


// types
export interface IProps extends HTMLAttributes<HTMLDivElement> {
    tag?: string;
    container?: boolean;
    direction?: Direction | ResponsiveValue<Direction>;
    justify?: Justification | ResponsiveValue<Justification>;
    alignItems?: ItemAlignment | ResponsiveValue<ItemAlignment>;
    alignContent?: ContentAlignment | ResponsiveValue<ContentAlignment>;
    spacing?: Spacing | ResponsiveValue<Spacing>;
    wrap?: Wrapping | ResponsiveValue<Wrapping>;
    item?: boolean;
    flex?: boolean | ItemColumn | ItemFlex | ResponsiveValue<boolean | ItemColumn | ItemFlex>;
    offset?: ItemOffset | ResponsiveValue<ItemOffset>;
    order?: ItemOrder | ResponsiveValue<ItemOrder>;
}

// factory method
export function createGrid(options?: IGridOptions): React.FC<IProps> {

    // create style
    const gridStyle = new GridStyle(options);
    const styles = jss.createStyleSheet(gridStyle.create())
        .attach();

    // component definition
    return (props: IProps) => {

        // resolve props
        const {
            className,
            children,
            tag = "div",
            container = false,
            item = false,
            direction,
            wrap,
            justify,
            alignItems,
            alignContent,
            spacing,
            offset,
            order,
            flex,
            ...htmlProps
        } = props;

        // create style
        const classNames = [];

        // apply container styles (if applicable)
        const classes = styles.classes;
        if (container) {

            // add base class
            classNames.push(classes[gridStyle.getContainerClass()]);

            // add content layout classes
            gridStyle.getContainerDirectionClasses(direction)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });

            gridStyle.getContainerWrappingClasses(wrap)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });

            gridStyle.getContainerJustificationClasses(justify)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });

            gridStyle.getContainerContentAlignmentClasses(alignContent)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });

            gridStyle.getContainerItemAlignmentClasses(alignItems)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });

            const spacingValues = isResponsiveValue(spacing)
                ? spacing
                : {xs: spacing, sm: spacing, md: spacing, lg: spacing, xl: spacing};
            gridStyle.getContainerSpacingClasses(spacingValues)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });
        }

        // apply item styles (if applicable)
        if (item) {

            // mark as item
            classNames.push(classes[gridStyle.getItemClass()]);

            // add layout classes
            gridStyle.getItemOrderClasses(order)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });
            gridStyle.getItemOffsetClasses(offset)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });
            gridStyle.getItemFlexClasses(flex)
                .forEach((key) => {
                    classNames.push(classes[key]);
                });
        }

        // add external classes (if any)
        if (className !== undefined) {
            classNames.push(className);
        }

        // render
        return React.createElement(
            tag,
            {
                ...htmlProps,
                className: classNames.join(" ")
            },
            children);
    };
}
