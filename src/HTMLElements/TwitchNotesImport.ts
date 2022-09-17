import TwitchCloseButton from "./TwitchCloseButton";
import NoteStorage from "../NoteStorage";
// import openImportNotesWindow from "../openImprtNotesWindow";
import openClearDataWindow from "../openClearDataWindow";
import TwitchButton from "./TwitchButton";
import TwitchNotesWindow from "./TwitchNotesWindow";
import importNotesResult from "../importNotesResult";
import TwitchNotesImportResolve from "./TwitchNotesImportResolve";

export default class TwitchNotesImport {

    private static instance?: TwitchNotesImport;
    private element?: HTMLDivElement;
    private userList?: HTMLDivElement;
    private static resolveCallback?: Function;

    constructor() {
        this.element = document.createElement('div');
    }

    private create() {
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
        title.textContent = 'Import Notes';
        header.appendChild(title);
        container.appendChild(header);
        header.insertAdjacentElement("beforeend", closeButton.element);

        const content = document.createElement('div');
        content.classList.add('twitch-notes-container-content');
        content.style.display = 'block';
        content.style.padding = '1rem';
        container.appendChild(content);

        content.innerHTML = `
        <strong>WARNING!</strong> <em>This action might override existing data!</em><br />
        <br />
        Select exported twitch notes file<br />
        `;

        const blurredBackground = this.element;

        const input = document.createElement('input');
        input.classList.add('twitch-notes-file-input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'json');
        input.addEventListener('change', () => {
            if (!input.files) return;
            // @ts-ignore
            let file = input.files.item(0);
            if (!file) return;
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                if (!evt?.target?.result) return;

                NoteStorage.inputData = JSON.parse(evt.target.result.toString());
                if (NoteStorage.inputData) {
                    input.style.display = 'none';
                    importNotesResult(container, blurredBackground, TwitchNotesImport.resolveCallback);
                }
            }
            reader.onerror = function () {
                console.error("error reading file");
            }
        });

        content.appendChild(input);

        this.element.appendChild(container);
        document.body.appendChild(this.element);
    }

    private close() {
        if (this.element) this.element.remove();
        this.element = undefined;
    }

    public static update() {
        TwitchNotesImport.instance?.create();
    }

    public static open(cb: Function) {
        TwitchNotesImport.resolveCallback = cb;
        TwitchNotesImport.instance = new TwitchNotesImport();
        TwitchNotesImport.instance.create();
    }

    public static close() {
        TwitchNotesImport.instance?.element?.remove();
        TwitchNotesImport.instance = undefined;
    }

}