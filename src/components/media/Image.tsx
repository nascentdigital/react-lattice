import classNames from 'classnames'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { jss, sheets } from '../jss'
import { defaultLoader, getLoaderFunction, LoaderParams, LoaderType } from './loaders'

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

    // define image loader params
    const loaderParams: LoaderParams = {
        src,
        width,
        height,
        format: 'original',
        quality: 80,
        focus: 'center'
    }
    const loaderFn = getLoaderFunction(loader)

    // create preview (if required)
    let previewImage
    if (preview) {
        previewImage = (
            <img className={classes.preview}
                 src={loaderFn(getPreviewParams(loaderParams, 10))}
                 alt="" />
        )
    }

    // create image
    let image = null
    if (inView) {
        image = <img className={classes.image}
                     src={loaderFn(loaderParams)}
                     onLoad={imageLoaded}
                     alt={alt}
                     {...htmlProps} />
    }

    // render
    return (
        <div className={className}>
            <div ref={inViewRef}
                 className={classNames(classes.imageWrap, state)}
                 style={{paddingBottom: width && height ? `${(height / width) * 100}%` : 0}}>
                {previewImage}
                {image}
            </div>
        </div>
    )
}


// styles
const stylesheet = jss.createStyleSheet({
    imageWrap: {
        position: 'relative',
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
const classes = stylesheet.classes
sheets.add(stylesheet)

// helper functions
function getPreviewParams(params: LoaderParams, previewWidth: number): LoaderParams {
    const { width, height, ...rest } = params
    const previewHeight = Math.round(previewWidth * height / width)
    return { width: previewWidth, height: previewHeight, ...rest }
}
