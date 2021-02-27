import { sheets } from "./jss";


const SSR_STYLES_ID = 'react-lattice-styles'


export function getServersideStyles(): string {
    return `<style type="text/css" id="${SSR_STYLES_ID}">${sheets.toString()}</style>`
}

export function removeServersideStyles(document: HTMLDocument) {
    const ssrStyles = document.getElementById(SSR_STYLES_ID)
    ssrStyles?.parentNode?.removeChild(ssrStyles)
}
