// imports
import { IResponsiveValue, isResponsiveValue } from '@nascentdigital/lattice'
import React, { HTMLAttributes } from 'react'
import { jss } from '../jss'
import { GridStyle } from './GridStyle'
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
} from './GridTypes'


// types
export interface IProps extends HTMLAttributes<HTMLDivElement> {
    tag?: string;
    container?: boolean;
    direction?: Direction | IResponsiveValue<Direction>;
    justify?: Justification | IResponsiveValue<Justification>;
    alignItems?: ItemAlignment | IResponsiveValue<ItemAlignment>;
    alignContent?: ContentAlignment | IResponsiveValue<ContentAlignment>;
    spacing?: Spacing | IResponsiveValue<Spacing>;
    wrap?: Wrapping | IResponsiveValue<Wrapping>;
    item?: boolean;
    flex?: boolean | ItemColumn | ItemFlex | IResponsiveValue<boolean | ItemColumn | ItemFlex>;
    offset?: ItemOffset | IResponsiveValue<ItemOffset>;
    order?: ItemOrder | IResponsiveValue<ItemOrder>;
}


// factory method
export function createGrid(options?: IGridOptions): React.FC<IProps> {

    // create style
    const gridStyle = new GridStyle(options)
    jss.createStyleSheet(gridStyle.create(), { meta: 'lattice/grid' })
        .attach()

    // component definition
    return (props: IProps) => {

        // resolve props
        const {
            className,
            children,
            tag = 'div',
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
        } = props

        // create style
        const classNames = []

        // apply container styles (if applicable)
        if (container) {

            // add base class
            classNames.push(gridStyle.getContainerClass())

            // add content layout classes
            gridStyle.getContainerDirectionClasses(direction)
                .forEach((key) => {
                    classNames.push(key)
                })

            gridStyle.getContainerWrappingClasses(wrap)
                .forEach((key) => {
                    classNames.push(key)
                })

            gridStyle.getContainerJustificationClasses(justify)
                .forEach((key) => {
                    classNames.push(key)
                })

            gridStyle.getContainerContentAlignmentClasses(alignContent)
                .forEach((key) => {
                    classNames.push(key)
                })

            gridStyle.getContainerItemAlignmentClasses(alignItems)
                .forEach((key) => {
                    classNames.push(key)
                })

            const spacingValues = isResponsiveValue(spacing)
                ? spacing
                : {xs: spacing, sm: spacing, md: spacing, lg: spacing, xl: spacing}
            gridStyle.getContainerSpacingClasses(spacingValues)
                .forEach((key) => {
                    classNames.push(key)
                })
        }

        // apply item styles (if applicable)
        if (item) {

            // mark as item
            classNames.push(gridStyle.getItemClass())

            // add layout classes
            gridStyle.getItemOrderClasses(order)
                .forEach((key) => {
                    classNames.push(key)
                })
            gridStyle.getItemOffsetClasses(offset)
                .forEach((key) => {
                    classNames.push(key)
                })
            gridStyle.getItemFlexClasses(flex)
                .forEach((key) => {
                    classNames.push(key)
                })
        }

        // add external classes (if any)
        if (className !== undefined) {
            classNames.push(className)
        }

        // render
        return React.createElement(
            tag,
            {
                ...htmlProps,
                className: classNames.join(' ')
            },
            children)
    }
}
