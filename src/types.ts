import {CustomHTMLElement} from "./CustomHTMLElement";

export type CustomHTMLElementConstructor = {
    class?: string | string[],
    id?: string,
    css?: Partial<CSSStyleDeclaration>,
    attributes?: {[key: string]: string},
    body?: string | HTMLElement,
    customBody?: CustomHTMLElement,
}

export type HTMLBuilderBlock = {
    element: 'div' | 'span' | 'button' | 'a' | 'p' | 'strong' | 'em' | 'input' | 'img',
    id?: string,
    class?: string | string[],
    style?: Partial<CSSStyleDeclaration>,
    attributes?: {[key: string]: string},
    content?: (HTMLBuilderBlock | string)[],
    mouseClickEvent?: Function,
    mouseMoveEvent?: Function,
    mouseDownEvent?: Function,
    mouseUpEvent?: Function,
    keyUpEvent?: Function,
}