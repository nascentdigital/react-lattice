// imports
import React, {HTMLAttributes} from "react";
import {createUseStyles} from "react-jss";
import {
    isResponsiveValue,
    ResponsiveValue
} from "../../types";
import {GridStyle} from "./GridStyle";
import {
    ContentAlignment,
    Direction,
    GridOptions,
    ItemAlignment,
    ItemColumn,
    ItemFlex,
    ItemOffset,
    ItemOrder,
    Justification,
    Spacing,
    Wrapping
} from "./GridTypes";


// define props
export interface Props extends HTMLAttributes<HTMLDivElement> {
    tag?: string,
    container?: boolean,
    direction?: Direction | ResponsiveValue<Direction>,
    justify?: Justification | ResponsiveValue<Justification>,
    alignItems?: ItemAlignment | ResponsiveValue<ItemAlignment>,
    alignContent?: ContentAlignment | ResponsiveValue<ContentAlignment>,
    spacing?: Spacing | ResponsiveValue<Spacing>,
    wrap?: Wrapping | ResponsiveValue<Wrapping>,
    item?: boolean,
    flex?: boolean | ItemColumn | ItemFlex | ResponsiveValue<boolean | ItemColumn | ItemFlex>,
    offset?: ItemOffset | ResponsiveValue<ItemOffset>,
    order?: ItemOrder | ResponsiveValue<ItemOrder>
}

// factory method
export function createGrid(options?: GridOptions): React.FC<Props> {

    // create style
    const gridStyle = new GridStyle(options);
    const useStyles = createUseStyles(gridStyle.create(), {
            generateId: rule => rule.key
    });

    // component definition
    return (props: Props) => {

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
        const classes = useStyles(props);
        if (container) {

            // add base class
            classNames.push(gridStyle.getContainerClass());

            // add content layout classes
            gridStyle.getContainerDirectionClasses(direction)
                .forEach(key => {
                    classNames.push(key);
                });

            gridStyle.getContainerWrappingClasses(wrap)
                .forEach(key => {
                    classNames.push(key);
                });

            gridStyle.getContainerJustificationClasses(justify)
                .forEach(key => {
                    classNames.push(key);
                });

            gridStyle.getContainerContentAlignmentClasses(alignContent)
                .forEach(key => {
                    classNames.push(key);
                });

            gridStyle.getContainerItemAlignmentClasses(alignItems)
                .forEach(key => {
                    classNames.push(key);
                });

            let spacingValues = isResponsiveValue(spacing)
                ? spacing
                : {xs: spacing, sm: spacing, md: spacing, lg: spacing, xl: spacing};
            gridStyle.getContainerSpacingClasses(spacingValues)
                .forEach(key => {
                    classNames.push(key);
                });
        }

        // apply item styles (if applicable)
        if (item) {

            // mark as item
            classNames.push(classes[gridStyle.getItemClass()]);

            // add layout classes
            gridStyle.getItemOrderClasses(order)
                .forEach(key => {
                    classNames.push(key);
                });
            gridStyle.getItemOffsetClasses(offset)
                .forEach(key => {
                    classNames.push(key);
                });
            gridStyle.getItemFlexClasses(flex)
                .forEach(key => {
                    classNames.push(key);
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
