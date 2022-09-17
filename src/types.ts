export type HTMLBuilderBlock = {
    element: 'div' | 'span' | 'button' | 'a' | 'p' | 'strong' | 'em' | 'input' | 'img',
    id?: string,
    class?: string | string[],
    style?: Partial<CSSStyleDeclaration>,
    attributes?: {[key: string]: string},
    content?: (HTMLBuilderBlock | string | HTMLElement)[],
    mouseClickEvent?: Function,
    mouseMoveEvent?: Function,
    mouseDownEvent?: Function,
    mouseUpEvent?: Function,
    keyUpEvent?: Function,
    changeListener?: Function,
}