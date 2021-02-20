import classNames from 'classnames'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { jss } from '../jss'
import { defaultLoader, LoaderType } from './loaders'


// types
type State = 'loading' | 'loaded' | 'ready';


interface Props extends HTMLAttributes<HTMLImageElement> {
    src: string
    width: number
    height: number
    alt?: string
    preview?: boolean
    loader?: LoaderType
}


export function Image({
    className,
    src,
    width,
    height,
    alt = '',
    preview = true,
    loader = defaultLoader,
    ...htmlProps
}: Props) {

    // state
    const [state, setState] = useState<State>('loading')

    // add lazy loader
    const [inViewRef, inView] = useInView({
        rootMargin: '0px 0px',
        triggerOnce: true
    })

    // bind image if loaded
    useEffect(() => {
        if (state === 'loaded') {
            const timeoutId = setTimeout(() => setState('ready'), 100)
            return () => clearTimeout(timeoutId)
        }
        else {
            return () => {
            }
        }
    }, [state])


    // helpers
    function imageLoaded() {
        setState('loaded')
    }

    // create preview (if required)
    let previewImage
    if (preview) {
        previewImage = (
            <img className={classes.preview}
                 src={previewUrl.href}
                 alt="" />
        )
    }

    // create image
    let image = null
    if (inView) {
        const imageUrl = new URL(src)
        if (width) {
            imageUrl.searchParams.append('w', width.toString())
        }
        image = <img className={classes.image}
                     src={imageUrl.href}
                     onLoad={imageLoaded}
                     alt={alt}
                     {...htmlProps} />
    }

    // render
    return (
        <div ref={inViewRef}
             className={classNames(className, classes.imageWrap, state)}
             style={{paddingBottom: width && height ? `${(height / width) * 100}%` : 0}}>
            {previewImage}
            {image}
        </div>
    )
}


// styles
const styleSheet = jss.createStyleSheet({
    imageWrap: {
        position: 'relative',
        paddingBottom: ({media}) => media
            ? ``
            : '0',
        '&.ready $preview': {
            opacity: 0
        },
        '&.ready $image': {
            opacity: 1
        }
    },
    preview: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        transition: 'opacity 400ms ease-out 100ms'
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: ({preview}) => preview ? 0 : 1,
        transition: ({preview}) => preview ? 'opacity 400ms ease-in' : 'none'
    }
}, {meta: 'lattice/image'}).attach()
const classes = styleSheet.classes
