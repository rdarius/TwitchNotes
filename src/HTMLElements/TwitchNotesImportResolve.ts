import TwitchCloseButton from "./TwitchCloseButton";
import NoteStorage from "../NoteStorage";
// import openImportNotesWindow from "../openImprtNotesWindow";
import openClearDataWindow from "../openClearDataWindow";
import TwitchButton from "./TwitchButton";
import TwitchNotesWindow from "./TwitchNotesWindow";
import importNotesResult from "../importNotesResult";
import importNotesConflictResolve from "../importNotesConflictResolve";
import HTMLBuilder from "../HTMLBuilder";

export default class TwitchNotesImportResolve {

    private static instance?: TwitchNotesImportResolve;
    private element?: HTMLDivElement;

    constructor() {
        this.element = document.createElement('div');
    }

    private create(
        user: string,
        parentContainer: HTMLElement,
        blurredBackground: HTMLElement
    ) {
        if (!this.element) {
            this.element = document.createElement('div');
        }

        this.element.innerHTML = '';

        this.element.classList.add('twitch-notes-blurred-background');

        const closeButton = new TwitchCloseButton();
        closeButton.onClick(() => {
            this.close();
        });

        const container = document.createElement('div');
        container.classList.add('twitch-notes-center-floating-container');

        const header = document.createElement('div');
        header.classList.add('twitch-notes-container-header');

        const title = document.createElement('div');
        title.classList.add('twitch-notes-container-header-title');
        title.textContent = 'Resolve note ('+user+') conflict';
        header.appendChild(title);
        container.appendChild(header);
        header.insertAdjacentElement("beforeend", closeButton.element);

        const content = document.createElement('div');
        content.classList.add('twitch-notes-container-content');
        content.style.display = 'block';
        content.style.padding = '1rem';
        container.appendChild(content);

        content.appendChild(importNotesConflictResolve(user, this.element, parentContainer, blurredBackground));

        this.element.appendChild(container);
        document.body.appendChild(this.element);
    }

    private close() {
        if (this.element) this.element.remove();
        this.element = undefined;
    }

    public static open(user: string,
                       container: HTMLElement,
                       blurredBackground: HTMLElement) {
        TwitchNotesImportResolve.instance = new TwitchNotesImportResolve();
        TwitchNotesImportResolve.instance.create(user, container, blurredBackground);
    }


}