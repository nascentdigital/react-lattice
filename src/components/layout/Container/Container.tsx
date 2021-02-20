import { IResponsiveValue, isResponsiveValue, ResponsiveValueIterator } from '@nascentdigital/lattice'
import classNames from 'classnames'
import React, { HTMLAttributes } from 'react'
import { jss } from '../../jss'
import { ContainerStyle } from './ContainerStyle'
import { IContainerOptions } from './ContainerTypes'


interface Props extends HTMLAttributes<HTMLDivElement> {
    tag?: string
    dark?: boolean
    narrow?: boolean
    fullbleed?: boolean | IResponsiveValue<boolean>
}


// factory method
export function createContainer(options?: IContainerOptions): React.FC<Props> {

    // create style
    const containerStyle = new ContainerStyle(options)
    jss.createStyleSheet(containerStyle.create(), { meta: 'lattice/container' })
        .attach()

    // component definition
    return ({
        tag = 'div',
        dark = false,
        narrow = false,
        fullbleed = false,
        className,
        children,
        ...htmlProps
    }: Props) => {

        // determine classes
        const containerClasses = [
            containerStyle.containerClass,
            className
        ]
        const contentClasses = [
            containerStyle.contentClass,
            {
                [containerStyle.contentNarrowClass]: narrow
            }
        ]

        // apply fullbleed to all (if specified)
        if (fullbleed === true) {
            contentClasses.push(containerStyle.getFullbleedClass('xs', true))
        }

        // or apply responsive fullbleed styles (if specified)
        else if (isResponsiveValue(fullbleed)) {
            for (const [breakpoint, value] of new ResponsiveValueIterator(fullbleed).entries()) {
                contentClasses.push(containerStyle.getFullbleedClass(breakpoint, value))
            }
        }

        // render component
        return React.createElement(
            tag,
            {
                className: classNames(containerClasses),
                ...htmlProps
            },
            <div className={classNames(contentClasses)}>{children}</div>
        )
    }
}

