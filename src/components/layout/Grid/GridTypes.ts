// imports
import { BreakpointsDefinition, IResponsiveValue } from '@nascentdigital/lattice'


// constants
export const GridColumnCount = 12
export const MaxSpacing = 10


// grid options types
export type SpacingDefinition = Required<IResponsiveValue<number | SpacingFunction>>


export interface IGridOptions {
    breakpoints?: BreakpointsDefinition
    spacing?: SpacingDefinition
    namespace?: string
}


// grid property types / values
export type ContentAlignment = 'center' | 'flexStart' | 'flexEnd' | 'spaceAround' | 'spaceBetween' | 'stretch'
export const ContentAlignmentValues: ReadonlyArray<ContentAlignment> = [
    'center', 'flexStart', 'flexEnd', 'spaceAround', 'spaceBetween', 'stretch'
]

export type Direction = 'column' | 'columnReverse' | 'row' | 'rowReverse'
export const DirectionValues: ReadonlyArray<Direction> = [
    'column', 'columnReverse', 'row', 'rowReverse'
]

export type ItemAlignment = 'baseline' | 'center' | 'flexStart' | 'flexEnd' | 'stretch'
export const ItemAlignmentValues: ReadonlyArray<ItemAlignment> = [
    'baseline', 'center', 'flexStart', 'flexEnd', 'stretch'
]

export type ItemColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type ItemFlex = 'none' | 'auto' | 'grow' | 'shrink'
export const ItemFlexValues: ReadonlyArray<ItemFlex> = [
    'none', 'auto', 'grow', 'shrink'
]

export type ItemOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type ItemOrder = 'initial' | 'first' | 'last'
export const ItemOrderValues: ReadonlyArray<ItemOrder> = [
    'initial', 'first', 'last'
]

export type Justification = 'center' | 'flexStart' | 'flexEnd' | 'spaceAround' | 'spaceEvenly' | 'spaceBetween'
export const JustificationValues: ReadonlyArray<Justification> = [
    'center', 'flexStart', 'flexEnd', 'spaceAround', 'spaceEvenly', 'spaceBetween'
]

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type SpacingFunction = (spacing: Spacing) => number

export type Wrapping = 'none' | 'wrap' | 'wrapReverse'
export const WrappingValues: ReadonlyArray<Wrapping> = [
    'none', 'wrap', 'wrapReverse'
]


// type guards
export function isItemColumn(value: number): value is ItemColumn {
    return value > 0 && value <= GridColumnCount
}

export function isItemOffset(value: number): value is ItemOffset {
    return value >= 0 && value <= GridColumnCount
}

