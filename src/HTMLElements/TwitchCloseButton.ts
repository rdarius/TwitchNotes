export default class TwitchCloseButton {

    element: HTMLButtonElement;

    constructor(classes: string|string[] = '') {
        this.element = document.createElement('button');
        this.element.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 20 20" x="0px" y="0px" class="twitch-notes_x-button">
            <g>
                <path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z"></path>
            </g>
        </svg>`;

        this.element.classList.add('twitch-notes_close-button');

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