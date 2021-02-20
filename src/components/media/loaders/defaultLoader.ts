import { LoaderParams } from './LoaderFunction'


export function defaultLoader({
    src,
    format
}: LoaderParams) {

    // return original or ignore if in another formation
    return format === 'original'
        ? src
        : undefined
}
