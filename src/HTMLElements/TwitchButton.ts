export default class TwitchButton {

    element: HTMLButtonElement;

    constructor(content: string, type: 'default' | 'outline' = 'default', classes: string|string[] = '') {
        this.element = document.createElement('button');
        this.element.textContent = content;

        this.element.classList.add('twitch-notes_button');
        if(type === 'outline')  {
            this.element.classList.add('twitch-notes_button__outline');
        }

        if (classes) {
            if (typeof classes === 'string') {
                this.element.classList.add(classes);
            } else {
                for (let className of classes) {
                    this.element.classList.add(className);
                }
            }
        }
    }

    onClick(cb: Function) {
        this.element.addEventListener('click', () => cb());
    }


}