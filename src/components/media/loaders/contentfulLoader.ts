import { LoaderParams } from './LoaderFunction'


export function contentfulLoader({
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
    queryParams.set('fit', 'fill')
    queryParams.set('f', focus)

    // set quality
    queryParams.set('q', quality.toString(10))

    // set format
    if (format === 'webp') {
        queryParams.set('fm', 'webp')
    }

    // return url
    return url.href
}
