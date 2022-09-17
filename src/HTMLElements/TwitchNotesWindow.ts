import TwitchCloseButton from "./TwitchCloseButton";
import NoteStorage from "../NoteStorage";
// import openImportNotesWindow from "../openImprtNotesWindow";
import openClearDataWindow from "../openClearDataWindow";
import TwitchButton from "./TwitchButton";
import TwitchNotesImport from "./TwitchNotesImport";

export default class TwitchNotesWindow {

    private static instance?: TwitchNotesWindow;
    private element?: HTMLDivElement;
    private userList?: HTMLDivElement;

    constructor() {
        this.element = document.createElement('div');
    }

    private buildContent(content: HTMLDivElement) {
        content.innerHTML = '';

        const userButtons: HTMLDivElement[] = [];

        this.userList = document.createElement('div');
        this.userList.classList.add('twitch-notes-container-content-user-list');

        const addNoteButton = document.createElement('div');
        addNoteButton.classList.add('twitch-notes-container-content-user-list-item');
        addNoteButton.textContent = '+ Add New Note';
        addNoteButton.addEventListener('click', () => {
            this.newNote(noteContainer, userButtons);
        });
        this.userList.appendChild(addNoteButton);

        const searchField = document.createElement('input');
        searchField.classList.add('twitch-notes-container-content-user-list-item');
        searchField.classList.add('twitch-notes-container-content-user-list-item-search');
        searchField.placeholder = 'Search...'
        searchField.addEventListener('keyup', () => {
            for(let row of userButtons) {
                if (searchField.value === '') {
                    row.style.display = 'block';
                    continue;
                }
                if(row.textContent?.includes(searchField.value)) {
                    row.style.display = 'block';
                } else {
                    row.style.display = 'none';
                }
            }
        });

        this.userList.appendChild(searchField);

        for (const user of NoteStorage.getSavedUserList()) {
            const userButton = document.createElement('div');
            userButton.classList.add('twitch-notes-container-content-user-list-item');
            userButton.textContent = user;
            userButtons.push(userButton);
            this.userList.appendChild(userButton);
            userButton.addEventListener('click', () => {
                this.openNote(noteContainer, user, userButtons, userButton);
            });
        }

        const noteContainer = document.createElement('div');
        noteContainer.classList.add('twitch-notes-container-content-note-container');

        if (NoteStorage.getSavedUserList().length) {
            userButtons[0].click();
        } else {
            noteContainer.textContent = '';
            const noNotes = document.createElement('div');
            noNotes.classList.add('twitch-notes-container-content-note-container-note');
            noNotes.innerHTML = 'You have not notes yet...';
            noteContainer.appendChild(noNotes);
        }

        content.appendChild(this.userList);
        content.appendChild(noteContainer);
    }

    private newNote(noteContainer: HTMLDivElement, userButtons: HTMLDivElement[]) {
        noteContainer.innerHTML = '';
        for (let btn of userButtons) {
            btn.style.background = 'transparent';
        }

        const noteTitle = document.createElement('input');
        noteTitle.classList.add('twitch-notes-container-header-title');
        noteTitle.classList.add('twitch-notes-container-content-user-list-item-search');
        noteTitle.style.marginTop = '1rem';
        noteTitle.placeholder = 'Note title or username';
        noteContainer.appendChild(noteTitle);

        const note = document.createElement('div');
        note.classList.add('twitch-notes-container-content-note-container-note');
        note.setAttribute('contentEditable', 'true');
        note.innerHTML = '';

        noteContainer.appendChild(note);

        const controls = document.createElement('div');
        controls.classList.add('twitch-notes-container-content-note-container-controls');
        noteContainer.appendChild(controls);

        const save = new TwitchButton('Save');
        controls.appendChild(save.element);

        const savedNote = document.createElement('span');
        savedNote.classList.add('twitch-notes-container-content-note-container-controls-saved')
        savedNote.textContent = 'Note Saved!';
        savedNote.style.opacity = '0';
        controls.appendChild(savedNote);

        save.onClick(() => {
            const user = noteTitle.value.trim().toLowerCase();
            const userButton = document.createElement('div');
            userButton.classList.add('twitch-notes-container-content-user-list-item');
            userButton.textContent = user;
            userButtons.push(userButton);
            this.userList?.appendChild(userButton);
            userButton.addEventListener('click', () => {
                this.openNote(noteContainer, user, userButtons, userButton);
            });
            userButtons.push(userButton);
            NoteStorage.saveNote(user, note.innerHTML);
            this.openNote(noteContainer, user, userButtons, userButton);
        });

    }

    private openNote(noteContainer: HTMLDivElement, user: string, userButtons: HTMLDivElement[], userButton: HTMLDivElement) {
        noteContainer.innerHTML = '';
        for (let btn of userButtons) {
            btn.style.background = 'transparent';
        }
        userButton.style.background = 'var(--color-twitch-purple-5)'
        const noteTitle = document.createElement('div');
        noteTitle.classList.add('twitch-notes-container-header-title');
        noteTitle.textContent = user;
        noteTitle.style.marginTop = '1rem';
        noteContainer.appendChild(noteTitle);

        const note = document.createElement('div');
        note.classList.add('twitch-notes-container-content-note-container-note');
        note.setAttribute('contentEditable', 'true');
        note.innerHTML = NoteStorage.getNote(user);

        noteContainer.appendChild(note);

        const controls = document.createElement('div');
        controls.classList.add('twitch-notes-container-content-note-container-controls');
        noteContainer.appendChild(controls);

        const save = new TwitchButton('Save');
        controls.appendChild(save.element);

        const savedNote = document.createElement('span');
        savedNote.classList.add('twitch-notes-container-content-note-container-controls-saved')
        savedNote.textContent = 'Note Saved!';
        savedNote.style.opacity = '0';
        controls.appendChild(savedNote);

        save.onClick(() => {
            NoteStorage.saveNote(user, note.innerHTML);
            savedNote.style.opacity = '1';
        });
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
        title.textContent = 'Twitch Notes';
        header.appendChild(title);
        container.appendChild(header);
        header.insertAdjacentElement("beforeend", closeButton.element);

        const content = document.createElement('div');
        content.classList.add('twitch-notes-container-content')
        container.appendChild(content);

        this.buildContent(content);

        const footer = document.createElement('div');
        footer.classList.add('twitch-notes-container-footer');
        container.appendChild(footer);

        const exportNotes = document.createElement('span');
        exportNotes.classList.add('twitch-notes-link');
        exportNotes.textContent = 'Export Notes';
        exportNotes.addEventListener('click', () => {
            NoteStorage.exportNotes();
        })
        footer.appendChild(exportNotes);

        const importNotes = document.createElement('span');
        importNotes.classList.add('twitch-notes-link');
        importNotes.textContent = 'Import Notes';
        importNotes.addEventListener('click', () => {
            TwitchNotesImport.open(() => {
                TwitchNotesWindow.update();
            });
        });
        footer.appendChild(importNotes);

        const clearNotes = document.createElement('span');
        clearNotes.classList.add('twitch-notes-link');
        clearNotes.textContent = 'Clear Notes';
        clearNotes.addEventListener('click', () => {
            openClearDataWindow();
        });
        footer.appendChild(clearNotes);

        this.element.appendChild(container);
        document.body.appendChild(this.element);
    }

    private close() {
        if (this.element) this.element.remove();
        this.element = undefined;
    }

    public static update() {
        TwitchNotesWindow.instance?.create();
    }

    public static toggle() {
        if (!TwitchNotesWindow.instance) {
            TwitchNotesWindow.instance = new TwitchNotesWindow();
            TwitchNotesWindow.instance.create();
            return;
        }
        if (TwitchNotesWindow.instance.element) {
            TwitchNotesWindow.instance.close();
        } else {
            TwitchNotesWindow.instance.create();
        }
    }

}