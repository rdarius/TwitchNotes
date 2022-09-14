import {CustomHTMLElementConstructor} from "./types";

export class CustomHTMLElement<T = HTMLElement> {

    element: HTMLElement;

    constructor(element: string, data: CustomHTMLElementConstructor) {
        this.element = document.createElement(element);

        if (data.id) {
            this.setId(data.id);
        } else {
            this.setId(element + '-generated-id-' + Math.floor(Math.random() * 10000000));
        }

        if (data.class) {
            if (typeof data.class === "string") {
                this.addClass(data.class);
            } else {
                for (const className of data.class) {
                    this.addClass(className);
                }
            }
        }

        if (data.attributes) {
            for (const key in data.attributes) {
                this.addAttribute(key, data.attributes[key]);
            }
        }

        if (data.css) this.setStyle(data.css);

        if (data.body) typeof data.body === "string" ? this.setBody(data.body) : this.appendChild(data.body);
        if (data.customBody) this.appendCustomChild(data.customBody);
    }

    setId(id: string): CustomHTMLElement<T> {
        this.element.id = id;
        return this;
    }

    addClass(classes: string): CustomHTMLElement<T> {
        this.element.classList.add(classes);
        return this;
    }

    addAttribute(name: string, value: string): CustomHTMLElement<T> {
        this.element.setAttribute(name, value);
        return this;
    }

    setStyle(attributes: Partial<CSSStyleDeclaration>): CustomHTMLElement<T> {
        for(let key in attributes) {
            this.element.style[key] = attributes[key]  || '';
        }
        return this;
    }

    setBody(body: string): CustomHTMLElement<T> {
        this.element.innerHTML = body;
        return this;
    }

    appendBody(body: string): CustomHTMLElement<T> {
        this.element.innerHTML += body;
        return this;
    }

    appendChild(child: HTMLElement): CustomHTMLElement<T> {
        this.element.appendChild(child);
        return this;
    }

    appendCustomChild(child: CustomHTMLElement): CustomHTMLElement<T> {
        this.element.appendChild(child.getElement());
        return this;
    }

    getElement(): T {
        return this.element as T;
    }

    setClickListener(listener: Function): CustomHTMLElement<T>  {
        this.element.addEventListener('click', () => listener());
        return this;
    }

    setChangeListener(listener: Function): CustomHTMLElement<T>  {
        this.element.addEventListener('change', () => listener());
        return this;
    }

    setMouseMoveListener(listener: Function): CustomHTMLElement<T>  {
        this.element.addEventListener('mousemove', () => listener());
        return this;
    }

    setMouseDownListener(listener: Function): CustomHTMLElement<T>  {
        this.element.addEventListener('mousedown', () => listener());
        return this;
    }

    setMouseUpListener(listener: Function): CustomHTMLElement<T>  {
        this.element.addEventListener('mouseup', () => listener());
        return this;
    }

    remove(): void {
        this.element.remove();
    }

    show(): CustomHTMLElement<T> {
        this.setStyle({
            display: 'unset',
        });
        return this;
    }

    hide(): CustomHTMLElement<T> {
        this.setStyle({
            display: 'none',
        });
        return this;
    }

}

export class CustomDivElement extends CustomHTMLElement<HTMLDivElement> {
    constructor(className: string = '', content: string = '') {
        super('div', {class: className, body: content});
    }
}
export class CustomInputElement extends CustomHTMLElement<HTMLInputElement> {
    constructor(className: string = '') {
        super('input', {class: className});
    }
}

export class CustomPElement extends CustomHTMLElement<HTMLParagraphElement> {
    constructor(className: string = '', content: string = '') {
        super('p', {class: className, body: content});
    }
}

export class CustomButtonElement extends CustomHTMLElement<HTMLButtonElement>  {
    constructor(className: string = '', content: string = '') {
        super('button', {class: className, body: content});
    }
}

export class CustomAElement extends CustomHTMLElement<HTMLAnchorElement>  {
    constructor(className: string = '', content: string = '') {
        super('a', {class: className, body: content});
    }
}

export class CustomSpanElement extends CustomHTMLElement<HTMLSpanElement>  {
    constructor(className: string = '', content: string = '') {
        super('span', {class: className, body: content});
    }
}

export class CustomImgElement extends CustomHTMLElement<HTMLSpanElement>  {
    constructor(className: string = '', content: string = '') {
        super('img', {class: className, body: content});
    }
}