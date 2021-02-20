export type Format = "webp" | "original"
export type Position = "center" | "top" | "right" | "bottom" | "left"
    | "top_right" | "top_left" | "bottom_right" | "bottom_left"
    | "face" | "faces"
export type LoaderParams = {
    src: string
    width: number
    height: number
    quality: number
    format: Format
    focus: Position
}
export type LoaderFunction = (params: LoaderParams) => string | undefined
