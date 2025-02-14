import CSRF from "./csrf"
import { ImageInfo } from "./image"

export type ImageInfoResponse = {
    status: number,
    data: ImageInfo[]
}

export type ImageResponse = {
    status: number,
    data: Uint8Array
}

export type CSRFResponse = {
    status: number,
    data: CSRF
}

export type DefaultResponse = {
    status: number,
    data: string
}