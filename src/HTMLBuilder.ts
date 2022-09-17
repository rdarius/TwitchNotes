import {HTMLBuilderBlock} from "./types";

export default class HTMLBuilder {

    element: HTMLElement;

    constructor(data: HTMLBuilderBlock) {
        this.element = document.createElement(data.element);
        this.setId(data.id ?? data.element + '-custom-element-' + Math.floor(Math.random() * 1000000));
        if (data.class) this.setClasses(data.class);
        if (data.attributes)  this.setAttributes(data.attributes);
        if (data.style) this.setStyles(data.style);
        if (data.mouseClickEvent) this.setMouseClickListener(data.mouseClickEvent);
        if (data.mouseMoveEvent) this.setMouseMoveListener(data.mouseMoveEvent);
        if (data.mouseDownEvent) this.setMouseDownListener(data.mouseDownEvent);
        if (data.mouseUpEvent) this.setMouseUpListener(data.mouseUpEvent);
        if (data.keyUpEvent) this.setKeyUpListener(data.keyUpEvent);
        if (data.changeListener) this.setChangeListener(data.changeListener);
        if (data.content) this.setContent(data.content);
    }

    setId(id: string) {
        this.element.id = id;
    }

    setClasses(classes: string | string[]) {
        if (typeof classes === 'string') {
            this.addClass(classes);
        } else {
            for(let className of classes) {
                this.addClass(className);
            }
        }
    }

    addClass(className: string)  {
        this.element.classList.add(className);
    }

    setAttributes(attributes: {[key: string]: string}) {
        for(let key in attributes) {
            if (!attributes[key]) continue;
            this.addAttribute(key, attributes[key]);
        }
    }

    addAttribute(key: string, value: string) {
        this.element.setAttribute(key, value);
    }

    setStyles(style: Partial<CSSStyleDeclaration>) {
        for (const key in style) {
            this.addStyle(key, style[key] || '');
        }
    }

    addStyle(key: string, value: string) {
        this.element.style.setProperty(key, value);
    }

    setMouseClickListener(cb: Function) {
        this.element.addEventListener('click', () => cb());
    }

    setContent(content: (HTMLBuilderBlock|string|HTMLElement)[]) {
        for (let block of content) {
            this.addContent(block);
        }
    }

    addContent(content: HTMLBuilderBlock|string|HTMLElement) {
        if (typeof content === 'string') {
            this.element.innerHTML += content;
        } else {
            if (content instanceof HTMLElement) {
                this.element.appendChild(content);
            } else {
                const el = new HTMLBuilder(content);
                this.element.appendChild(el.element)
            }
        }
    }

    setMouseMoveListener(cb: Function) {
        this.element.addEventListener('mousemove', () => cb());
    }

    setMouseDownListener(cb: Function) {
        this.element.addEventListener('mousedown', () => cb());
    }

    setMouseUpListener(cb: Function) {
        this.element.addEventListener('mouseup', () => cb());
    }

    setKeyUpListener(cb: Function) {
        this.element.addEventListener('keyup', () => cb(this.element.innerHTML));
    }

    setChangeListener(cb: Function) {
        this.element.addEventListener('change', (e) => cb(e));
    }

    getElement() {
        return this.element;
    }

    remove() {
        this.element.remove();
    }

}