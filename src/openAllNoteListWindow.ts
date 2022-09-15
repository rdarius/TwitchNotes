import {CustomButtonElement, CustomDivElement, CustomSpanElement} from "./CustomHTMLElement";
import NoteStorage from "./NoteStorage";
import {getCloseButtonSVG} from "./HTMLTemplates";

export default function openAllNoteListWindow() {
    let activeNote: string = '';
    const blurredBackground = new CustomDivElement('twitch-notes-blurred-background');

    const noteSaved = new CustomSpanElement('', 'Note saved!');
    noteSaved.setStyle({
        color: 'green',
        marginLeft: '2rem',
    });
    noteSaved.hide();

    const container = new CustomDivElement('twitch-notes-center-floating-container');
    container.setStyle({
        padding: '0',
        paddingTop: '1rem',
        width: '100%',
        maxWidth: '800px',
        height: 'calc(320px + 5rem)',
        maxHeight: '90vh',
    });

    const closeButton = new CustomButtonElement('twitch-notes-settings-close-button', getCloseButtonSVG());
    closeButton.setStyle({
        position: 'absolute',
        top: '1rem',
        right: '1rem',
    });

    const title = new CustomDivElement('twitch-note-title', 'Notes:');
    title.setStyle({
        borderBottom: '1px solid #FFFFFF19',
        paddingBottom: '1rem',
    });
    container.appendCustomChild(title);

    const content = new CustomDivElement();
    content.setStyle({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap',
        width: '100%',
        height: '320px'
    });
    container.appendCustomChild(content);
    closeButton.setClickListener(() => {
        blurredBackground.remove();
    });
    container.appendCustomChild(closeButton);

    const userList = new CustomDivElement();
    userList.setStyle({
        borderRight: '1px solid #FFFFFF19',
        height: '320px',
        minWidth: '240px',
        overflowY: 'auto',
        overflowX: 'hidden',
    });

    const noteContainer = new CustomDivElement();
    noteContainer.setStyle({
        height: '320px',
        padding: '1rem',
        width: '100%',
        opacity: '0',
    });

    const note = new CustomDivElement();
    note.setStyle({
        marginBottom: '3rem',
        border: '1px solid #FFFFFF19',
        height: 'calc(320px - 7rem)',
        width: '100%',
        padding: '6px',
        outline: 'none',
        overflowY: 'auto',
        overflowX: 'hidden',
    });
    note.addAttribute('contentEditable', 'true');

    const saveNote = new CustomButtonElement('twitch-notes-settings-button','Save Note');
    saveNote.setStyle({
        position: 'absolute',
        bottom: '1rem',
        left: '1rem'
    });

    saveNote.setClickListener(() => {
        if(!activeNote) {
            return;
        }
        NoteStorage.saveNote(activeNote, note.getElement().innerHTML);
        noteSaved.setStyle({
            display: 'inline-block',
        });
    });

    for(let user of NoteStorage.getSavedUserList()) {
        const userLine = new CustomDivElement('twitch-notes-user-list-user', user);
        userLine.setClickListener(() => {
            const list = document.getElementsByClassName('twitch-notes-user-list-user');
            for(let i = 0; i < list.length; i++) {
                list.item(i)?.removeAttribute('data-active');
            }
            noteSaved.hide();
            userLine.addAttribute('data-active', 'true');
            noteContainer.setStyle({opacity: '1'});
            note.getElement().innerHTML = NoteStorage.getNote(user);
            activeNote = user;
        });
        userList.appendCustomChild(userLine);
    }

    noteContainer.appendCustomChild(note);
    noteContainer.appendCustomChild(saveNote);
    noteContainer.appendCustomChild(noteSaved);

    content.appendCustomChild(userList);
    content.appendCustomChild(noteContainer);

    blurredBackground.appendCustomChild(container);
    document.body.appendChild(blurredBackground.getElement());
}