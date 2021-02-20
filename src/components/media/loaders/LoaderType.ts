import { contentfulLoader } from './contentfulLoader'
import { imgixLoader } from './imgixLoader'
import { LoaderFunction } from './LoaderFunction'


export type LoaderType = 'contentful' | 'imgix' | LoaderFunction

export function getLoaderFunction(loaderType: LoaderType): LoaderFunction {

    // return immediately if already a function
    if (typeof loaderType === 'function') {
        return loaderType
    }

    // return type
    switch (loaderType) {
        case 'contentful':
            return contentfulLoader

        case 'imgix':
            return imgixLoader

        default:
            throw new Error(`Unsupported loader type: ${loaderType}`)
    }
}
