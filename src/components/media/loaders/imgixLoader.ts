import { LoaderParams, Position } from './LoaderFunction'


export function imgixLoader({
    src,
    width,
    height,
    quality,
    format,
    focus
}: LoaderParams) {

    // create base url
    const url = new URL(src)

    // set dimension
    const queryParams = url.searchParams
    queryParams.set('w', width.toString(10))
    queryParams.set('h', height.toString(10))
    queryParams.set('fit', 'crop')
    queryParams.set('crop', getCropFocus(focus))


    // set quality
    queryParams.set('q', quality.toString(10))

    // set format
    if (format === 'webp') {
        queryParams.set('fm', 'webp')
    }

    // return url
    return url.href
}

function getCropFocus(focus: Position): string {
    switch (focus) {
        case 'center':
            return ''
        case 'top':
            return ''
        case 'top_left':
            return ''
        case 'top_right':
            return ''
        case 'right':
            return ''
        case 'bottom':
            return ''
        case 'bottom_left':
            return ''
        case 'bottom_right':
            return ''
        case 'left':
            return ''
        case 'face':
            return ''
        case 'faces':
            return ''
        default:
            throw new Error(`Unexpected focus frame: ${focus}`)
    }
}
