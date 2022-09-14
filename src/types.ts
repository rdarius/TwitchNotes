import {CustomHTMLElement} from "./CustomHTMLElement";

export type CustomHTMLElementConstructor = {
    class?: string | string[],
    id?: string,
    css?: Partial<CSSStyleDeclaration>,
    attributes?: {[key: string]: string},
    body?: string | HTMLElement,
    customBody?: CustomHTMLElement,
}